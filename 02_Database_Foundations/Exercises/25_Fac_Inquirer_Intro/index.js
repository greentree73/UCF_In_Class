// Import the inquirer package
// Inquirer v9+ is a pure ES module, so we use import instead of require
// Learn more: https://github.com/SBoudrias/Inquirer.js
import inquirer from 'inquirer';

// ============================================
// Basic Inquirer Demo - Three Question Types
// ============================================

// Main function to demonstrate Inquirer prompts
// Using async/await because inquirer.prompt() returns a Promise
async function runDemo() {
  console.log('👋 Welcome to the Inquirer.js Demo!\n');
  
  try {
    // ============================================
    // Define your questions as an array of objects
    // Each question has: type, name, message, and optional validation
    // ============================================
    const answers = await inquirer.prompt([
      
      // Question 1: Text Input
      // This is the most basic question type - accepts any text
      {
        type: 'input',              // Type of question
        name: 'username',           // Key name in the answers object
        message: 'What is your username?',  // Question displayed to user
        default: 'user123',         // Default value if user presses Enter
        validate: (input) => {      // Optional: validate the input
          if (input.length < 3) {
            return 'Username must be at least 3 characters long';
          }
          return true;  // Return true if validation passes
        }
      },
      
      // Question 2: List Selection
      // User selects one option from a list using arrow keys
      {
        type: 'list',               // Creates a selectable list
        name: 'favoriteLanguage',   // Key name for this answer
        message: 'What is your favorite programming language?',
        choices: [                  // Array of options to choose from
          'JavaScript',
          'Python',
          'TypeScript',
          'Go',
          'Rust',
          'Other'
        ],
        default: 'JavaScript'       // Pre-selected option
      },
      
      // Question 3: Confirmation (Yes/No)
      // Simple true/false question - user types Y or N
      {
        type: 'confirm',            // Creates a yes/no question
        name: 'hasExperience',      // Key name for this answer
        message: 'Do you have experience with Node.js?',
        default: true               // Default answer (Y/n or y/N)
      },
      
      // BONUS Question 4: Number Input
      // Uncomment to see numeric input in action
      // {
      //   type: 'number',
      //   name: 'yearsExperience',
      //   message: 'How many years of programming experience do you have?',
      //   default: 0,
      //   validate: (input) => {
      //     if (isNaN(input) || input < 0) {
      //       return 'Please enter a valid number';
      //     }
      //     return true;
      //   }
      // }
      
    ]);
    
    // ============================================
    // Process the answers
    // ============================================
    // The 'answers' object contains all responses
    // Keys match the 'name' property from each question
    
    console.log('\n' + '='.repeat(50));
    console.log('📋 Your Answers:');
    console.log('='.repeat(50));
    
    // Access individual answers using the question name
    console.log(`Username: ${answers.username}`);
    console.log(`Favorite Language: ${answers.favoriteLanguage}`);
    console.log(`Node.js Experience: ${answers.hasExperience ? 'Yes' : 'No'}`);
    
    // You can also log the entire answers object
    console.log('\n📦 Complete answers object:');
    console.log(answers);
    
    // ============================================
    // Conditional prompting based on previous answers
    // ============================================
    // You can ask follow-up questions based on previous responses
    if (answers.hasExperience) {
      const followUp = await inquirer.prompt([
        {
          type: 'input',
          name: 'favoritePackage',
          message: 'What is your favorite Node.js package?',
          default: 'express'
        }
      ]);
      
      console.log(`\n💚 Favorite Package: ${followUp.favoritePackage}`);
    }
    
    console.log('\n✅ Demo complete! Thanks for trying Inquirer.js!\n');
    
  } catch (error) {
    // Handle errors (e.g., user presses Ctrl+C to cancel)
    if (error.isTtyError) {
      console.error('❌ Prompt couldn\'t be rendered in this environment');
    } else {
      console.error('❌ Something went wrong:', error.message);
    }
  }
}

// Execute the demo
// Top-level await is supported in ES modules
runDemo();

// ============================================
// Additional Question Types to Explore
// ============================================
/*

// Password Input - hides user input
{
  type: 'password',
  name: 'userPassword',
  message: 'Enter your password:',
  mask: '*'  // Character to show while typing
}

// Checkbox - select multiple options
{
  type: 'checkbox',
  name: 'skills',
  message: 'Select your skills:',
  choices: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js']
}

// Editor - opens default text editor
{
  type: 'editor',
  name: 'bio',
  message: 'Write your bio:'
}

*/

// ============================================
// Learn More
// ============================================
// Official Documentation: https://github.com/SBoudrias/Inquirer.js
// Question Types: https://github.com/SBoudrias/Inquirer.js#question
// Advanced Examples: https://github.com/SBoudrias/Inquirer.js/tree/master/packages/inquirer/examples
