# Introduction to Inquirer.js

## What is Inquirer?

**Inquirer.js** is a powerful Node.js package that makes it easy to create interactive command-line interfaces (CLIs). Instead of requiring users to pass command-line arguments, Inquirer prompts users with questions and collects their input in a user-friendly way.

## Why Use Inquirer?

- ✅ Create interactive command-line applications
- ✅ Validate user input before processing
- ✅ Support multiple input types (text, lists, checkboxes, passwords, etc.)
- ✅ Provide better user experience than basic console input
- ✅ Perfect for setup scripts, configuration tools, and CLI applications

## Common Use Cases

- Database setup wizards
- Application configuration
- Interactive installers
- Data collection forms
- Menu-driven CLI applications

## Installation

Install the latest version of Inquirer:

```bash
npm install inquirer
```

**Note:** We're using Inquirer v9+, which is a pure ES module. Make sure your `package.json` includes `"type": "module"`.

## Question Types

Inquirer supports various question types:

- **input** - Simple text input
- **number** - Numeric input
- **confirm** - Yes/no questions
- **list** - Select one from a list
- **checkbox** - Select multiple from a list
- **password** - Hidden text input
- **editor** - Opens a text editor

## Basic Example

```javascript
import inquirer from 'inquirer';

const answers = await inquirer.prompt([
  {
    type: 'input',
    name: 'username',
    message: 'What is your username?',
  }
]);

console.log(`Hello, ${answers.username}!`);
```

## Running the Example

Execute the demo file:

```bash
node index.js
```

Follow the prompts to see Inquirer in action!

## Key Concepts

### 1. Prompt Array
Questions are defined as an array of objects, each with properties like `type`, `name`, and `message`.

### 2. Async/Await
Inquirer returns a Promise, so use `await` or `.then()` to handle the responses.

### 3. Answer Object
User responses are returned in an object where keys match the `name` property of each question.

### 4. Validation
Add a `validate` function to ensure input meets your requirements.

## Additional Resources

- [Inquirer.js Documentation](https://github.com/SBoudrias/Inquirer.js)
- [Inquirer Examples](https://github.com/SBoudrias/Inquirer.js/tree/master/packages/inquirer/examples)
- [Building CLI Tools with Node.js](https://nodejs.dev/learn/accept-input-from-the-command-line-in-nodejs)
