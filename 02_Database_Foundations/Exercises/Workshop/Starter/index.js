// ============================================
// Pokemon Card Collection Manager
// ============================================
// An interactive CLI application combining PostgreSQL and Inquirer
// Learn more: https://node-postgres.com/ & https://github.com/SBoudrias/Inquirer.js

// Load environment variables from .env file
import dotenv from 'dotenv';
dotenv.config();

// Import required packages
import pkg from 'pg';
const { Pool } = pkg;
import inquirer from 'inquirer';

// ============================================
// Database Connection Pool
// ============================================
// Pool manages multiple database connections efficiently
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Test database connection on startup
pool.on('connect', () => {
  console.log('🔌 Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('❌ Unexpected database error:', err);
  process.exit(-1);
});

// ============================================
// Global Variables
// ============================================
let currentUser = null;  // Stores logged-in user info

// ============================================
// User Authentication Functions
// ============================================

/**
 * Login or register a user
 * If username exists, verify password
 * If username doesn't exist, create new account
 */
async function loginUser() {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'username',
      message: 'Enter your username:',
      validate: (input) => input.trim().length > 0 || 'Username cannot be empty'
    },
    {
      type: 'password',
      name: 'password',
      message: 'Enter your password:',
      mask: '*',
      validate: (input) => input.length >= 4 || 'Password must be at least 4 characters'
    }
  ]);

  try {
    // #1. ToDo
    // Check if user exists
    // query the db for a user with this username and save it as "result"

    if (result.rows.length > 0) {
      // User exists - verify password
      const user = result.rows[0];
      
      // Note: In production, use bcrypt for password hashing!
      if (user.password === answers.password) {
        currentUser = user;
        console.log(`\n✅ Login successful! Welcome back, ${user.username}!\n`);
        return true;
      } else {
        console.log('\n❌ Invalid password. Please try again.\n');
        return false;
      }
    } else {
      // User doesn't exist - create new account
      // #2. ToDo Create an insert into the db table to save this User
      
      currentUser = newUser.rows[0];
      console.log(`\n✅ Account created! Welcome, ${currentUser.username}!\n`);
      return true;
    }
  } catch (error) {
    console.error('❌ Login error:', error.message);
    return false;
  }
}

// ============================================
// Card Collection Functions
// ============================================

/**
 * Display all available Pokemon cards and let user choose one to add
 */
async function addCardToCollection() {
  try {
    // Get all Pokemon cards
    //#3 ToDo Create a query to get all the Cards save as "cardsResult"

    if (cardsResult.rows.length === 0) {
      console.log('\n⚠️ No Pokemon cards available in the database.\n');
      return;
    }

    // Get user's current collection to show which cards they already have
    const collectionQuery = 'SELECT card_id FROM user_collection WHERE user_id = $1';
    const collectionResult = await pool.query(collectionQuery, [currentUser.id]);
    const ownedCardIds = collectionResult.rows.map(row => row.card_id);

    // Format card choices for Inquirer list
    const cardChoices = cardsResult.rows.map(card => {
      const owned = ownedCardIds.includes(card.id) ? '✓ ' : '';
      return {
        name: `${owned}${card.name} (${card.type}) - ${card.rarity} - HP: ${card.hp}`,
        value: card.id,
        disabled: ownedCardIds.includes(card.id) ? 'Already in collection' : false
      };
    });

    // Prompt user to select a card
    const answer = await inquirer.prompt([
      {
        type: 'list',
        name: 'cardId',
        message: 'Select a Pokemon card to add to your collection:',
        choices: cardChoices,
        pageSize: 15  // Show 15 cards at a time
      }
    ]);

    // Add card to user's collection
    const addCardQuery = `
      INSERT INTO user_collection (user_id, card_id) 
      VALUES ($1, $2) 
      RETURNING *
    `;
    
    await pool.query(addCardQuery, [currentUser.id, answer.cardId]);

    // Get the card details to show confirmation
    const selectedCard = cardsResult.rows.find(card => card.id === answer.cardId);
    console.log(`\n✅ ${selectedCard.name} added to your collection!\n`);

  } catch (error) {
    if (error.code === '23505') {  // Unique constraint violation
      console.log('\n⚠️ You already have this card in your collection!\n');
    } else {
      console.error('❌ Error adding card:', error.message);
    }
  }
}

/**
 * Display user's current Pokemon card collection
 * Uses JOIN to combine user_collection with pokemon_cards
 */
async function viewCollection() {
  try {
    // SQL JOIN query to get user's collection with full card details
    const query = `
      SELECT 
        pc.name,
        pc.type,
        pc.rarity,
        pc.hp,
        uc.collected_at
      FROM user_collection uc
      INNER JOIN pokemon_cards pc ON uc.card_id = pc.id
      WHERE uc.user_id = $1
      ORDER BY uc.collected_at DESC
    `;

    const result = await pool.query(query, [currentUser.id]);

    if (result.rows.length === 0) {
      console.log('\n📦 Your collection is empty. Start collecting Pokemon cards!\n');
      return;
    }

    // Display collection in a nice format
    console.log('\n' + '='.repeat(60));
    console.log(`📦 ${currentUser.username}'s Pokemon Card Collection`);
    console.log('='.repeat(60));

    result.rows.forEach((card, index) => {
      const date = new Date(card.collected_at).toLocaleDateString();
      console.log(`${index + 1}. ${card.name} - ${card.type} Type - ${card.rarity} (HP: ${card.hp})`);
      console.log(`   Collected: ${date}`);
    });

    console.log('='.repeat(60));
    console.log(`Total Cards: ${result.rows.length}`);
    console.log('');

  } catch (error) {
    console.error('❌ Error viewing collection:', error.message);
  }
}

// ============================================
// Main Menu
// ============================================

/**
 * Display main menu and handle user choices
 * Runs in a loop until user chooses to quit
 */
async function mainMenu() {
  let running = true;

  while (running) {
    const answer = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
          { name: '➕ Add a card to your collection', value: 'add' },
          { name: '👁️  View your collection', value: 'view' },
          { name: '🚪 Quit', value: 'quit' }
        ]
      }
    ]);

    // Handle user's choice
    switch (answer.action) {
      case 'add':
        await addCardToCollection();
        break;
      
      case 'view':
        await viewCollection();
        break;
      
      case 'quit':
        running = false;
        console.log('\n👋 Thanks for using Pokemon Card Collection Manager!\n');
        break;
    }
  }
}

// ============================================
// Application Entry Point
// ============================================

/**
 * Main function to start the application
 * 1. Display welcome message
 * 2. Login/register user
 * 3. Show main menu
 * 4. Cleanup and exit
 */
async function main() {
  console.clear();
  console.log('='.repeat(60));
  console.log('⚡ Welcome to Pokemon Card Collection Manager! ⚡');
  console.log('='.repeat(60));
  console.log('');

  try {
    // Login loop - keep trying until successful
    let loggedIn = false;
    while (!loggedIn) {
      loggedIn = await loginUser();
    }

    // Show main menu
    await mainMenu();

  } catch (error) {
    console.error('\n❌ Application error:', error.message);
  } finally {
    // Close database connection pool when app exits
    await pool.end();
    console.log('🔌 Database connection closed');
    console.log('');
  }
}

// Start the application
main();

// ============================================
// Additional Notes
// ============================================
/*
Key Concepts Demonstrated:

1. Connection Pooling - Efficient database connection management
2. Parameterized Queries - Secure SQL with $1, $2 placeholders
3. INNER JOIN - Combining data from multiple tables
4. CRUD Operations:
   - CREATE: Insert new users and collection entries
   - READ: Select cards, users, and collections
   - UPDATE: Not used in this app
   - DELETE: Not used in this app (bonus challenge!)

5. Inquirer Features:
   - Input: Text and password entry
   - List: Selectable menus
   - Validation: Ensure valid input
   - Disabled choices: Show but don't allow already-owned cards

6. Error Handling:
   - Try/catch blocks
   - Database constraint errors
   - Graceful connection cleanup

7. Application Flow:
   - Login/authentication
   - Menu-driven navigation
   - Loops for continuous interaction
*/
