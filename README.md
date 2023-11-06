# Project Management API & Frontend App - README

## Introduction
This project consists of a backend API and a frontend application that work together to manage projects and users. The backend API is built with Laravel, offering endpoints for CRUD operations on projects, while the frontend is a React application that provides a user interface for interacting with the backend.

## Backend - Laravel API

### Requirements
- PHP >= 7.3
- Composer
- Laravel 8.x
- MySQL or compatible database system

### Setup
1. Clone the repository to your local machine.
2. Navigate to the project directory and install dependencies with `composer install`.
3. Copy `.env.example` to `.env` and configure your database settings.
4. Run `php artisan key:generate` to generate an app key.
5. Run `php artisan migrate` to create the database schema.
6. Optionally, run `php artisan db:seed` to populate the database with initial data.
7. Serve the API with `php artisan serve`.

### API Endpoints
- `GET /api/projects`: List all projects with optional sorting and pagination.
- `POST /api/projects`: Create a new project.
- `PUT /api/projects/{project}`: Update an existing project.
- `DELETE /api/projects/{project}`: Delete a project.
- `GET /api/projects/{projectId}`: Retrieve a single project.
- `POST /api/generateProject`: Generate a new project using predefined templates.
- `GET /api/users`: List all users.

### Controllers
- `ProjectController`: Handles project-related requests.
- `UserController`: Manages user-related operations.

## Frontend - React App

### Requirements
- Node.js
- npm or Yarn

### Setup
1. Navigate to the frontend project directory.
2. Install dependencies with `npm install` or `yarn`.
3. Run the application with `npm start` or `yarn start`.

### Pages and Routes
- `/`: Home page listing all projects.
- `/projects/new`: Form to create a new project.
- `/projects/:id`: Form to edit an existing project.
- `/users`: List all users.

### Components
- `Home`: Displays the list of projects and navigation options.
- `EditProject`: Provides a form to edit a project.
- `NewProject`: Form to submit a new project.
- `UserList`: Displays a list of users.

### Context Providers
- `ProjectListProvider`: Provides project list state management.
- `ProjectProvider`: Manages the state for individual projects.

## Testing
- Run `php artisan test` to execute backend tests.
- Run `npm test` within the frontend directory to execute frontend tests.

## Deployment
- Configure a web server like Nginx or Apache to serve the API.
- Build the frontend with `npm run build` and serve it with a static file server or integrate it into the web server.

## Notes
- Authentication endpoints and middleware are defined but require further configuration.
- Frontend routing is managed with React Router.
- State management in the frontend uses React Context API.
- API uses Laravel's Eloquent ORM for database operations and query building.

## Contribution
- Ensure to follow PSR standards for PHP code.
- Use React functional components and hooks.
- Write unit tests for new features and endpoints.

For more details, refer to the inline documentation within the codebase.
