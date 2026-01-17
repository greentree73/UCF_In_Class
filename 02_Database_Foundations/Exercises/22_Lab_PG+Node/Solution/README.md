# Solution: Securing Database Credentials with Environment Variables

This is the completed solution for the dotenv lab exercise.

## Files Included

- `index.js` - Main application file with dotenv configuration
- `package.json` - Project dependencies including dotenv
- `.env.example` - Template for environment variables
- `.gitignore` - Prevents committing sensitive files

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Create your `.env` file from the example:
```bash
cp .env.example .env
```

3. Update the `.env` file with your actual PostgreSQL password.

4. Run the application:
```bash
npm start
```

## Key Concepts Demonstrated

✅ Using `require('dotenv').config()` to load environment variables  
✅ Accessing environment variables with `process.env.VARIABLE_NAME`  
✅ Keeping sensitive credentials out of source code  
✅ Using `.gitignore` to prevent committing `.env` files  

## Security Best Practices

- Never commit `.env` files to version control
- Use `.env.example` to document required variables (without actual values)
- Always add `.env` to your `.gitignore` file
- Use different `.env` files for different environments (dev, staging, production)
