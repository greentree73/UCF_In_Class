# Solution: Inquirer.js Practice Lab

This is the completed solution for the Inquirer.js lab activity.

## Files Included

- **index.js** - Complete implementation with all three questions
- **package.json** - Project configuration with Inquirer dependency

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Run the application:
```bash
npm start
```

## Solution Overview

The solution demonstrates three fundamental Inquirer question types:

### Question 1: Input Type
```javascript
{
  type: 'input',
  name: 'fullName',
  message: 'What is your full name?',
  validate: (input) => {
    if (input.trim().length === 0) {
      return 'Name cannot be empty';
    }
    return true;
  }
}
```
- Collects free-form text input
- Includes validation to prevent empty names
- Stores result in `answers.fullName`

### Question 2: List Type
```javascript
{
  type: 'list',
  name: 'favoriteColor',
  message: 'What is your favorite color?',
  choices: ['Red', 'Blue', 'Green', 'Yellow', 'Purple'],
  default: 'Blue'
}
```
- Presents a selectable list of options
- User navigates with arrow keys
- Includes a default selection
- Stores result in `answers.favoriteColor`

### Question 3: Confirm Type
```javascript
{
  type: 'confirm',
  name: 'subscribe',
  message: 'Would you like to subscribe to our newsletter?',
  default: false
}
```
- Simple yes/no question
- Returns a boolean value
- Stores result in `answers.subscribe`

## Key Concepts Demonstrated

✅ **ES Module Syntax** - Using `import` instead of `require`  
✅ **Async/Await** - Handling asynchronous prompt responses  
✅ **Question Types** - Input, List, and Confirm  
✅ **Validation** - Ensuring input meets requirements  
✅ **Default Values** - Pre-selected options for better UX  
✅ **Answer Object** - Accessing user responses by name  

## Expected Output

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
==================================================

✅ Profile setup complete!
```

## Additional Enhancements

The solution includes optional features:
- Input validation for the name field
- Default values for better user experience
- Clean, formatted output display
- Error handling for edge cases

## Learn More

- [Inquirer.js Documentation](https://github.com/SBoudrias/Inquirer.js)
- [All Question Types](https://github.com/SBoudrias/Inquirer.js#question)
- [Validation Guide](https://github.com/SBoudrias/Inquirer.js#questions)
