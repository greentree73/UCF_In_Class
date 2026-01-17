// Import the inquirer package
// Remember: Inquirer v9+ requires ES modules
import inquirer from 'inquirer';

// ============================================
// User Profile Setup - Practice Activity
// ============================================

async function getUserProfile() {
  console.log('Welcome to User Profile Setup!\n');
  
  try {
    // ============================================
    // TODO: Complete the three questions below
    // ============================================
    
    const answers = await inquirer.prompt([
      
      // TODO 1: Create an INPUT question for the user's name
      // - type: 'input'
      // - name: 'fullName'
      // - message: Ask for their full name
      {
        // Your code here
      },
      
      // TODO 2: Create a LIST question for favorite color
      // - type: 'list'
      // - name: 'favoriteColor'
      // - message: Ask for their favorite color
      // - choices: ['Red', 'Blue', 'Green', 'Yellow', 'Purple']
      {
        // Your code here
      },
      
      // TODO 3: Create a CONFIRM question for newsletter subscription
      // - type: 'confirm'
      // - name: 'subscribe'
      // - message: Ask if they want to subscribe to the newsletter
      {
        // Your code here
      }
      
    ]);
    
    // ============================================
    // Display the results
    // ============================================
    console.log('\n' + '='.repeat(50));
    console.log('📋 User Profile Summary');
    console.log('='.repeat(50));
    console.log(`Name: ${answers.fullName}`);
    console.log(`Favorite Color: ${answers.favoriteColor}`);
    console.log(`Newsletter: ${answers.subscribe ? 'Subscribed' : 'Not subscribed'}`);
    console.log('='.repeat(50));
    console.log('\n✅ Profile setup complete!\n');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Run the function
getUserProfile();
