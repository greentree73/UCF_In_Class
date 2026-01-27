
# Introduction to CRUD Operations

## What is CRUD?

**CRUD** is an acronym that stands for the four basic operations you can perform on data:

- **C**reate - Add new records to the database
- **R**ead - Retrieve and view existing records
- **U**pdate - Modify existing records
- **D**elete - Remove records from the database

These operations form the foundation of nearly every application that interacts with persistent data.

## Why is CRUD Important?

CRUD operations are essential because they represent the fundamental ways users interact with data in applications:

- **User accounts**: Create new accounts, read profile information, update settings, delete accounts
- **Blog posts**: Create articles, read content, update drafts, delete old posts
- **E-commerce**: Create products, read inventory, update prices, delete discontinued items

Understanding CRUD is crucial for building functional, real-world applications.

## CRUD with Express and Sequelize

In this exercise, we'll implement CRUD operations using:

- **Express**: A Node.js web framework that handles HTTP requests and routes
- **Sequelize**: An Object-Relational Mapping (ORM) tool that bridges JavaScript and SQL databases

### The Role of the ORM and Database

**Database**: Stores your data persistently in structured tables with rows and columns.

**ORM (Sequelize)**: Acts as a translator between your JavaScript code and the database, allowing you to:
- Write database queries using JavaScript instead of raw SQL
- Work with data as JavaScript objects
- Maintain consistency and reduce errors through model definitions

**Express Routes**: Map HTTP methods to CRUD operations:
- `POST` → Create
- `GET` → Read
- `PUT/PATCH` → Update
- `DELETE` → Delete

Together, these tools create a complete pipeline from user request to database interaction and back.
