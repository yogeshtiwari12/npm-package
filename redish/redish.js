import Redis from "ioredis";


const redish = new Redis(
    "rediss://default:AZE5AAIjcDExZWFkYmIyOWFjZTU0NzcwODU3MTI5YjAyODMxNjRlOXAxMA@daring-elf-37177.upstash.io:6379"
)

redish.ping()
    .then((data) => {
        console.log("Redis connection successful:", data);
    })
    .catch((error) => {
        console.error("Redis connection error:", error);
    });


export default redish;