![cf](https://i.imgur.com/7v5ASc8.png) 12: Express Middleware
======

## Submission Instructions
  * fork this repository & create a new branch for your work
  * write all of your code in a directory named `lab-` + `<your name>` **e.g.** `lab-susan`
  * push to your repository
  * submit a pull request to this repository
  * submit a link to your PR in canvas
  * write a question and observation on canvas

## Learning Objectives
* students will be able to work with application, router, and 3rd party middleware through the use of express.js
* students will be able to implement custom middleware through the use of express.js
* students will be able to create custom routers for a specific resource

## Requirements

#### Configuration
* `package.json`
* `.eslintrc`
* `.gitignore`
* `README.md`
  * your `README.md` should include detailed instructions on how to use your API

#### Feature Tasks
* Complete the test suite for your API, including all request methods and any error handling potentialities.
* Integration test each request method for your resource, including successful and unsuccessful scenarios.
    - Ensure that you've covered differential outcomes for 400 vs 404
* Unit test the following modules:
    1. `model/note.js`
    2. `lib/error-handler.js`
    3. `lib/storage.js`
    - Ensure that your unit tests are not dependant on any other functionality within the app. Each method should have input/output dedicated to the focus of the test.
