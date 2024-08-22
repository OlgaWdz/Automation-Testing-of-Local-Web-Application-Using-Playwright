Project Description

This project involves automated functional testing of a local web application using Playwright and JavaScript. The project was created for educational purposes to demonstrate automation testing skills and to be added to a portfolio.

Technologies
Playwright: A browser automation tool that supports multiple browsers (Chromium, Firefox, WebKit).
JavaScript: The primary programming language for writing tests.

Functionality
The automated tests cover the following features:
User authentication
Form validation
Page navigation checks
Data handling validation

Project Structure

page-object/: This folder contains classes representing the different pages or components of the application (e.g., LoginPage, Navigation, RegisterPage, DeliveryDetails). Each class follows the Page Object Model (POM) pattern, encapsulating page-specific actions, elements, and behaviors. This design promotes reusability and simplifies test maintenance.

Example classes:
LoginPage.js: Contains methods to interact with the login form (e.g., inputting username and password, clicking the login button).
Navigation.js: Includes methods for interacting with the navigation bar (e.g., navigating to different pages).
RegisterPage.js: Handles actions related to user registration (e.g., entering user details, submitting the form).

test/: This folder contains all the test scripts that utilize the page-object classes. Each test imports the relevant page objects to interact with the application. This structure allows tests to be written in a more readable and maintainable way by leveraging reusable components from the page-object/ folder.
