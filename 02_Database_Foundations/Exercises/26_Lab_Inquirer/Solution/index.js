// Import the inquirer package
// Remember: Inquirer v9+ requires ES modules
import inquirer from 'inquirer';

// ============================================
// User Profile Setup - SOLUTION
// ============================================

async function getUserProfile() {
  console.log('Welcome to User Profile Setup!\n');
  
  try {
    // ============================================
    // Three completed questions demonstrating
    // input, list, and confirm question types
    // ============================================
    
    const answers = await inquirer.prompt([
      
      // Question 1: INPUT type - Collects text from the user
      // This is the most basic question type for free-form text entry
      {
        type: 'input',              // Text input field
        name: 'fullName',           // Key name in the answers object
        message: 'What is your full name?',  // Question displayed to user
        // Optional: Add validation to ensure name is not empty
        validate: (input) => {
          if (input.trim().length === 0) {
            return 'Name cannot be empty';
          }
          return true;
        }
      },
      
      // Question 2: LIST type - User selects from predefined choices
      // Arrow keys to navigate, Enter to select
      {
        type: 'list',               // Creates a selectable list
        name: 'favoriteColor',      // Key name in the answers object
        message: 'What is your favorite color?',  // Question text
        choices: [                  // Array of options
          'Red',
          'Blue',
          'Green',
          'Yellow',
          'Purple'
        ],
        default: 'Blue'             // Optional: Pre-selected option
      },
      
      // Question 3: CONFIRM type - Simple yes/no question
      // User types 'y' or 'n' (or just presses Enter for default)
      {
        type: 'confirm',            // Yes/no question
        name: 'subscribe',          // Key name in the answers object
        message: 'Would you like to subscribe to our newsletter?',  // Question
        default: false              // Optional: Default answer (true = Yes, false = No)
      }
      
    ]);
    
    // ============================================
    // Display the results
    // ============================================
    // The 'answers' object contains all three responses
    // Access them using the 'name' property from each question
    
    console.log('\n' + '='.repeat(50));
    console.log('📋 User Profile Summary');
    console.log('='.repeat(50));
    
    // Access answers using dot notation
    console.log(`Name: ${answers.fullName}`);
    console.log(`Favorite Color: ${answers.favoriteColor}`);
    
    // For boolean values, use a ternary operator for readable output
    console.log(`Newsletter: ${answers.subscribe ? 'Subscribed' : 'Not subscribed'}`);
    
    console.log('='.repeat(50));
    console.log('\n✅ Profile setup complete!\n');
    
    // Optional: Return the answers for further processing
    return answers;
    
  } catch (error) {
    // Handle errors gracefully
    // Common errors: User presses Ctrl+C, or validation fails
    console.error('❌ Error:', error.message);
  }
}

// Run the function
// Top-level await is supported in ES modules
getUserProfile();

// ============================================
// How This Works:
// ============================================
// 1. inquirer.prompt() displays questions one at a time
// 2. User provides input for each question
// 3. All answers are collected in a single object
// 4. The object keys match the 'name' property from each question
// 5. We can then use these answers however we need
//
// Learn more: https://github.com/SBoudrias/Inquirer.js
