# Lab Activity: Practice with Inquirer.js

## Objective
Practice creating interactive command-line prompts using Inquirer.js. You'll complete a simple user profile collection form with three questions.

## What You'll Build
A Node.js script that asks users three questions and displays their responses in a formatted output.

## Your Task

Complete the `index.js` file by filling in the three TODO sections:

### Question 1: Name Input
Create an `input` type question that asks for the user's full name.

### Question 2: Favorite Color
Create a `list` type question with color choices.

### Question 3: Newsletter Subscription
Create a `confirm` type question asking if they want to subscribe.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Run the application:
```bash
npm start
```

## Instructions

Open `index.js` and look for the three `TODO` comments. Each TODO section needs you to add a question object with the following properties:

- `type` - The question type (input, list, or confirm)
- `name` - The key name for this answer
- `message` - The question to display

### Hints

**Question 1 Example Structure:**
```javascript
{
  type: 'input',
  name: 'propertyName',
  message: 'Your question here?'
}
```

**Question 2 - List Structure:**
```javascript
{
  type: 'list',
  name: 'propertyName',
  message: 'Your question here?',
  choices: ['Option 1', 'Option 2', 'Option 3']
}
```

**Question 3 - Confirm Structure:**
```javascript
{
  type: 'confirm',
  name: 'propertyName',
  message: 'Your question here?'
}
```

## Success Criteria

✅ All three questions are properly defined  
✅ The script runs without errors  
✅ User responses are displayed at the end  
✅ Each question uses the correct type  

## Expected Output

When you run the completed script, you should see:

```
Welcome to User Profile Setup!

? What is your full name? John Doe
? What is your favorite color? Blue
? Would you like to subscribe to our newsletter? Yes

==================================================
📋 User Profile Summary
==================================================
Name: John Doe
Favorite Color: Blue
Newsletter: Subscribed
```

## Additional Challenge

If you finish early, try adding:
- Input validation to ensure name is not empty
- A default value for the favorite color
- Additional color choices to the list

## Resources

- [Inquirer Question Types](https://github.com/SBoudrias/Inquirer.js#question)
- [Inquirer Examples](https://github.com/SBoudrias/Inquirer.js/tree/master/packages/inquirer/examples)
