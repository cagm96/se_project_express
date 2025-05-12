Project Overview
The WTWR (What to Wear) project involves developing a backend server to support the front-end application you previously built. This server will include an API and user authorization functionalities. The primary objectives are to create a server using Express.js, connect it to a MongoDB database, implement routing and controllers, handle errors, and set up security and testing. The final goal is to deploy the web application on a remote machine.
Functionalities

1. Project Setup:
   - Initialize an Express.js project.
   - Configure project settings and install necessary dependencies.
   - Set up ESLint with the Airbnb style guide and integrate Prettier.
2. Database Integration:
   - Install and configure MongoDB using Mongoose.
   - Create schemas and models for User and ClothingItem.
3. Routing and Controllers:
   - Implement RESTful routes and controllers for users and clothing items.
   - Handle HTTP requests (GET, POST, DELETE) for user and item data.
4. Error Handling:
   - Implement comprehensive error handling for various scenarios (e.g., invalid data, non-existent resources).
5. Authorization:
   - Set up a temporary authorization middleware to simulate user authentication.
   - Implement routes for liking and disliking items.
6. Testing and Deployment:
   - Use Postman to test API endpoints.
   - Configure GitHub Actions for continuous integration and automated testing.
   - Deploy the application on a remote server.

Technologies Used

1. Node.js: Runtime environment for executing JavaScript code server-side.
2. Express.js: Framework for building web applications and APIs.
3. MongoDB: NoSQL database for storing user and item data.
4. Mongoose: ODM (Object Data Modeling) library for MongoDB and Node.js.
5. ESLint: Linter for identifying and fixing code errors and maintaining code style.
6. Prettier: Code formatter to ensure consistent code style.
7. Nodemon: Tool for automatically restarting the server during development.
8. Postman: Tool for testing API endpoints.
9. GitHub Actions: CI/CD platform for automated testing and deployment.

Techniques and Best Practices

1. Project Initialization:
   - Use npm init to create a package.json file.
   - Set up .gitignore to exclude unnecessary files from version control.
   - Install and configure project dependencies.
2. Code Quality:
   - Configure ESLint with the Airbnb style guide.
   - Integrate Prettier for code formatting.
   - Add custom ESLint rules to handle specific project requirements (e.g., allowing \_id).
3. Server Setup:
   - Create an entry point (app.js) for the Express server.
   - Use environment variables to configure the server port.
4. Hot Reload:
   - Install and configure Nodemon for automatic server restarts during development.
5. Project Structure:
   - Organize the project into folders (routes, controllers, models, utils) for better maintainability.
6. Database Schema Design:
   - Define Mongoose schemas and models for User and ClothingItem.
   - Implement URL validation for image fields using the validator package.
7. Routing and Controllers:
   - Create RESTful routes for user and item operations.
   - Implement controllers to handle business logic.
8. Error Handling:
   - Define and handle various error scenarios with appropriate status codes and messages.
   - Use Mongoose's orFail helper to handle not found errors gracefully.
9. Authorization Middleware:
   - Implement a temporary middleware to simulate user authentication by hardcoding a test user ID.
10. API Testing:
    - Use Postman to create and run tests for API endpoints.
    - Fork and run Postman collections to verify API functionality.
11. Continuous Integration:
    - Configure GitHub Actions to run automated tests on each commit and pull request.
    - Ensure that all tests pass before merging code changes.

By following these steps and utilizing the listed technologies and techniques, you will develop a robust backend server for the WTWR project, complete with API endpoints, user authentication, and thorough testing.



it worked!
