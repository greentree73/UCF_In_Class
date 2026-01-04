/**
 * Simple API GET request example
 * Demonstrates fetching user data from JSONPlaceholder API
 */

// Simple type for the user data we expect
interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

async function fetchUser() {
  console.log('🚀 Fetching user data...\n');
  
  try {
    // Make a GET request to fetch user with ID 1
    const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
    console.log(`📊 Response Object: ${response}`);
    
    
    // Check if the request was successful
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    // Parse the JSON response
    const user: User = await response.json();
    
    // Display the results
    console.log('✅ Success! User data received:');
    console.log(`Name: ${user.name}`);
    console.log(`Email: ${user.email}`);
    console.log(`Username: ${user.username}`);
    
  } catch (error) {
    console.error('❌ Error fetching user:', error);
  }
}

// Run the example
fetchUser();