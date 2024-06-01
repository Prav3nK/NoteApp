# NoteApp

A simple note-taking application built with React Native and a Node.js backend using Express and MySQL.

## Purpose
The purpose of this application is to provide a simple and user-friendly interface for taking, storing, and managing notes.

## Features
- User registration and login
- JWT authentication
- Add, edit, delete, and view notes
- Change user password
- Light and dark theme support
- Font size and style customization

## Getting Started

### Prerequisites
- Node.js
- MySQL
- Expo CLI (for React Native)

### Installation

#### Backend
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/note-app.git
   cd note-app/Backend
   
2. Install dependencies
   npm install
3. Set up environment variables by creating a .env file in the Backend directory with the following content:
   JWT_SECRET=your_secret_key
   BASE_URL=http://your_base_url

4. Run the MySQL database migrations:
   npx knex migrate:latest
5. Start the backend server:
   npm start
### Frontend
1. Install dependencies:
   npm install
2. Set up environment variables by creating a .env file in the Frontend directory with the following content:
   BASE_URL=http://your_base_url
3. Start the frontend:
   npx expo start

## Application Architecture

The application is divided into two main parts:

	1.	Backend: Built with Node.js, Express, and MySQL. It provides a RESTful API for user authentication and note management.
	•	Controllers: Contains the logic for handling requests and responses.
	•	Routes: Defines the API endpoints and links them to the corresponding controllers.
	•	Middleware: Includes middleware for JWT authentication.
	•	Config: Contains the Knex configuration for connecting to the MySQL database.
	2.	Frontend: Built with React Native using Expo. It provides a mobile interface for users to interact with the application.
	•	Screens: Contains different screens for login, signup, home, note detail, and user settings.
	•	Components: Reusable components used across various screens.
	•	Navigation: Handles the navigation between different screens.

## Contributing

	1.	Fork the repository.
	2.	Create a new branch (git checkout -b feature/your-feature).
	3.	Commit your changes (git commit -am 'Add some feature').
	4.	Push to the branch (git push origin feature/your-feature).
	5.	Create a new Pull Request.

## Reporting Issues

If you encounter any issues, please create an issue on the repository’s GitHub page. Provide as much detail as possible, including steps to reproduce the issue and any relevant logs.
