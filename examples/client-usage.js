/**
 * Example client-side implementation of authmate-js
 * 
 * This example shows how to use the authmate-js package in a client application
 * that consumes a server API built with the package.
 */

// Example of frontend fetch requests to an API built with authmate-js

// Signup example
async function signup(name, email, password) {
  try {
    const response = await fetch('http://localhost:4000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Signup failed:', error);
    return { error: error.message };
  }
}

// Login example
async function login(email, password) {
  try {
    const response = await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Important for cookies
      body: JSON.stringify({ email, password }),
    });
    
    const data = await response.json();
    
    // Store token in localStorage if you're not using cookies
    if (data.token) {
      localStorage.setItem('token', data.token);
    }
    
    return data;
  } catch (error) {
    console.error('Login failed:', error);
    return { error: error.message };
  }
}

// Get user data example
async function getUser() {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      return { error: 'No authentication token found' };
    }
    
    const response = await fetch('http://localhost:4000/user', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Important for cookies
    });
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to get user:', error);
    return { error: error.message };
  }
}

// Logout example
async function logout() {
  try {
    const token = localStorage.getItem('token');
    
    const response = await fetch('http://localhost:4000/logout', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Important for cookies
    });
    
    const data = await response.json();
    
    // Clear token from localStorage
    localStorage.removeItem('token');
    
    return data;
  } catch (error) {
    console.error('Logout failed:', error);
    return { error: error.message };
  }
}

// Example usage
async function exampleFlow() {
  // 1. Signup a new user
  const signupResult = await signup('John Doe', 'john@example.com', 'password123');
  console.log('Signup result:', signupResult);
  
  // 2. Login with the new user
  const loginResult = await login('john@example.com', 'password123');
  console.log('Login result:', loginResult);
  
  // 3. Get user data
  const userData = await getUser();
  console.log('User data:', userData);
  
  // 4. Logout
  const logoutResult = await logout();
  console.log('Logout result:', logoutResult);
}

// Run the example flow
exampleFlow().catch(err => console.error('Example flow failed:', err));
