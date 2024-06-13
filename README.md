Project Overview
The WTWR (What to Wear) project involves developing a backend server to support the front-end application you previously built. This server will include an API and user authorization functionalities. The primary objectives are to create a server using Express.js, connect it to a MongoDB database, implement routing and controllers, handle errors, and set up security and testing. The final goal is to deploy the web application on a remote machine.
Functionalities

1. Project Setup:
   o Initialize an Express.js project.
   o Configure project settings and install necessary dependencies.
   o Set up ESLint with the Airbnb style guide and integrate Prettier.
2. Database Integration:
   o Install and configure MongoDB using Mongoose.
   o Create schemas and models for User and ClothingItem.
3. Routing and Controllers:
   o Implement RESTful routes and controllers for users and clothing items.
   o Handle HTTP requests (GET, POST, DELETE) for user and item data.
4. Error Handling:
   o Implement comprehensive error handling for various scenarios (e.g., invalid data, non-existent resources).
5. Authorization:
   o Set up a temporary authorization middleware to simulate user authentication.
   o Implement routes for liking and disliking items.
6. Testing and Deployment:
   o Use Postman to test API endpoints.
   o Configure GitHub Actions for continuous integration and automated testing.
   o Deploy the application on a remote server.
   Technologies Used
7. Node.js: Runtime environment for executing JavaScript code server-side.
8. Express.js: Framework for building web applications and APIs.
9. MongoDB: NoSQL database for storing user and item data.
10. Mongoose: ODM (Object Data Modeling) library for MongoDB and Node.js.
11. ESLint: Linter for identifying and fixing code errors and maintaining code style.
12. Prettier: Code formatter to ensure consistent code style.
13. Nodemon: Tool for automatically restarting the server during development.
14. Postman: Tool for testing API endpoints.
15. GitHub Actions: CI/CD platform for automated testing and deployment.
    Techniques and Best Practices
16. Project Initialization:
    o Use npm init to create a package.json file.
    o Set up .gitignore to exclude unnecessary files from version control.
    o Install and configure project dependencies.
17. Code Quality:
    o Configure ESLint with the Airbnb style guide.
    o Integrate Prettier for code formatting.
    o Add custom ESLint rules to handle specific project requirements (e.g., allowing \_id).
18. Server Setup:
    o Create an entry point (app.js) for the Express server.
    o Use environment variables to configure the server port.
19. Hot Reload:
    o Install and configure Nodemon for automatic server restarts during development.
20. Project Structure:
    o Organize the project into folders (routes, controllers, models, utils) for better maintainability.
21. Database Schema Design:
    o Define Mongoose schemas and models for User and ClothingItem.
    o Implement URL validation for image fields using the validator package.
22. Routing and Controllers:
    o Create RESTful routes for user and item operations.
    o Implement controllers to handle business logic.
23. Error Handling:
    o Define and handle various error scenarios with appropriate status codes and messages.
    o Use Mongoose's orFail helper to handle not found errors gracefully.
24. Authorization Middleware:
    o Implement a temporary middleware to simulate user authentication by hardcoding a test user ID.
25. API Testing:
    o Use Postman to create and run tests for API endpoints.
    o Fork and run Postman collections to verify API functionality.
26. Continuous Integration:
    o Configure GitHub Actions to run automated tests on each commit and pull request.
    o Ensure that all tests pass before merging code changes.
    By following these steps and utilizing the listed technologies and techniques, you will develop a robust backend server for the WTWR project, complete with API endpoints, user authentication, and thorough testing.
