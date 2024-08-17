# Review Management System

## Project Overview

The Review Management System is a comprehensive platform designed to facilitate the management of formal reviews or evaluations. Built with AdonisJS for the backend and Vue.js for the frontend, the system provides a polished, user-friendly interface. It is highly adaptable for various use cases, such as employee performance reviews or academic evaluations.

## Backend (AdonisJS)

The backend of the Review Management System is implemented using AdonisJS version 5. AdonisJS is a comprehensive Node.js framework packed with many built-in features like ORM, authentication, error handling, and validation.

### Database Configuration

I initially configured Lucid ORM and connected the application to a local MySQL database. AdonisJS simplifies the setup process; by running a few commands, everything is pre-configured for you. Once Lucid was configured, I created migrations, which allow the creation of database tables using the ORM. For this application, I kept it simple and created only one table:

- **Review Table:** Contains fields such as `title`, `type`, `rating`, `pros`, `cons`, and `suggestions`. This table is linked to a `User` table to associate reviews with users.

### Authorization

AdonisJS offers multiple ways to handle authorization, and I chose to use API tokens. AdonisJS simplifies the process: once you run the appropriate commands, it sets up everything from creating the `User` table to writing the middleware for authentication. You just need to define the routes and controllers for actions like login, registration, and logout.

### Controllers and Routes

After setting up the database, I implemented controllers for CRUD operations on reviews. AdonisJS allows you to generate a controller template with a command, which speeds up development. Routes were implemented for each controller, leveraging AdonisJS's resourceful routing, a feature that stands out with its support for grouping, middleware, and parameter validation.

### Validators

Validation is a crucial feature in any application. AdonisJS makes validation straightforward by allowing you to define schemas for data validation. It provides many built-in rules for constraints like length, formatting (e.g., email, password), and data types. AdonisJS also comes with convenient error messages for validation failures, which are returned directly in the response if the validation fails.

## Frontend Repository

For the frontend implementation using Vue.js, Vuetify, and Tailwind CSS, please visit the [Frontend Repository](https://github.com/Varunkumar0812/rms-frontend).
