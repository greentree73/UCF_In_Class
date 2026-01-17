# Workshop: Pokemon Card Collection Manager

## Overview
Build an interactive command-line application that manages a Pokemon card collection using PostgreSQL and Inquirer.js. This workshop combines database operations, SQL joins, and interactive CLI prompts.

## What You'll Build
A Pokemon card collection manager where users can:
- Login or register with username/password
- Browse available Pokemon cards
- Add cards to their personal collection
- View their collected cards
- Interactive menu-driven experience

## Learning Objectives
✅ Connect Node.js to PostgreSQL using connection pools  
✅ Perform CRUD operations with parameterized queries  
✅ Use SQL JOINs to retrieve related data  
✅ Create interactive CLI applications with Inquirer  
✅ Manage many-to-many relationships in databases  
✅ Implement application flow control  

## Database Structure

### Tables
1. **users** - Stores user accounts
2. **pokemon_cards** - Master list of all available Pokemon cards
3. **user_collection** - Junction table linking users to their collected cards

## Setup Instructions

### 1. Create the Database
```bash
psql -U postgres
CREATE DATABASE pokemon_collection;
\q
```

### 2. Run Schema
```bash
psql -U postgres -d pokemon_collection -f schema.sql
```

### 3. Seed the Database
```bash
psql -U postgres -d pokemon_collection -f seeds.sql
```

### 4. Install Dependencies
```bash
npm install
```

### 5. Configure Environment
```bash
cp .env.example .env
# Edit .env and add your PostgreSQL password
```

### 6. Run the Application
```bash
npm start
```

## Application Flow

### 1. Welcome & Login
```
Welcome to Pokemon Card Collection Manager!

? Enter your username: ash
? Enter your password: ****

✅ Login successful! Welcome back, ash!
```

### 2. Main Menu
```
? What would you like to do?
  > Add a card to your collection
    View your collection
    Quit
```

### 3. Browse & Add Cards
```
? Select a Pokemon card to add:
  > Charizard (Fire) - Rare
    Blastoise (Water) - Rare
    Venusaur (Grass) - Rare
    ...

✅ Charizard added to your collection!
```

### 4. View Collection
```
📦 Your Pokemon Card Collection
===============================================
1. Charizard - Fire Type - Rare (HP: 120)
   Collected: 2026-01-15
2. Pikachu - Electric Type - Common (HP: 60)
   Collected: 2026-01-15
===============================================
Total Cards: 2
```

## Key Features

### User Authentication
- Simple username/password login
- Auto-registration for new users
- Personalized collections per user

### Card Management
- Browse all available Pokemon cards
- Add cards to personal collection
- Prevent duplicate cards in collection
- View collection with full card details

### Database Operations
- **INSERT** - Adding users and collection entries
- **SELECT** - Querying users, cards, and collections
- **JOIN** - Combining user_collection with pokemon_cards

## Technical Highlights

### Connection Pooling
Efficient database connection management for multiple operations.

### Parameterized Queries
All queries use `$1, $2` placeholders to prevent SQL injection.

### Many-to-Many Relationship
Junction table allows multiple users to collect multiple cards.

### Interactive Loops
Menu keeps running until user chooses to quit.

## Bonus Challenges

If you finish early, try adding:
1. **Remove card from collection** - DELETE operation
2. **Card statistics** - Show rarest cards, most collected, etc.
3. **Search functionality** - Find cards by name or type
4. **Trading system** - Transfer cards between users
5. **Enhanced validation** - Password requirements, username uniqueness checks

## Database Schema Reference

```sql
-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Pokemon cards table
CREATE TABLE pokemon_cards (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  type VARCHAR(50) NOT NULL,
  rarity VARCHAR(50) NOT NULL,
  hp INTEGER NOT NULL
);

-- User collection junction table
CREATE TABLE user_collection (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  card_id INTEGER REFERENCES pokemon_cards(id) ON DELETE CASCADE,
  collected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, card_id)  -- Prevent duplicate cards
);
```

## Tips for Success

1. **Test incrementally** - Run the app after implementing each feature
2. **Check your SQL** - Test queries directly in psql first
3. **Read error messages** - They often tell you exactly what's wrong
4. **Use console.log** - Debug by logging query results
5. **Handle edge cases** - What if no cards available? Collection empty?

## Resources

- [node-postgres Documentation](https://node-postgres.com/)
- [Inquirer.js Examples](https://github.com/SBoudrias/Inquirer.js/tree/master/packages/inquirer/examples)
- [PostgreSQL Joins](https://www.postgresql.org/docs/current/tutorial-join.html)
- [Many-to-Many Relationships](https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-many-to-many-relationship/)

Good luck, and have fun building your Pokemon card collection manager! 🎴⚡
