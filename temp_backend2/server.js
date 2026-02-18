import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors({
    // origin: "http://localhost:3000",
}));

app.get("/contributions/:username/:year", async (req, res) => {
  const { username, year } = req.params;
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    console.error("Missing GITHUB_TOKEN in environment.");
    return res.status(500).json({ error: "Backend missing GITHUB_TOKEN. Add it to .env." });
  }

  if (!username || !year) {
    return res.status(400).json({ error: "Username and year are required." });
  }

  const from = `${year}-01-01T00:00:00Z`;
  const to = `${year}-12-31T23:59:59Z`;

  const query = `
    query($username: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $username) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
                color
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      body: JSON.stringify({
        query,
        variables: { username, from, to },
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("GitHub API HTTP error:", response.status, text);
      const status = response.status === 401 ? 401 : response.status === 403 ? 403 : 502;
      return res.status(status).json({
        error: "GitHub API request failed",
        status: response.status,
      });
    }

    const data = await response.json();

    if (data.errors && data.errors.length) {
      const msg = data.errors[0]?.message || "Unknown GraphQL error";
      console.error("GitHub GraphQL error:", msg, data.errors);
      const notFound = msg.includes("Could not resolve to a User");
      return res.status(notFound ? 404 : 502).json({ error: msg });
    }

    const calendar = data?.data?.user?.contributionsCollection?.contributionCalendar;
    if (!calendar) {
      return res.status(404).json({ error: "User not found or no contribution data." });
    }

    res.json(calendar);
  } catch (error) {
    console.error("Unhandled server error:", error);
    res.status(500).json({ error: "Failed to fetch contributions" });
  }
});

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});
