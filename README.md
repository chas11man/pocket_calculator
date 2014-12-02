# Pocket Calculator

This is a web based pocket calculator. It functions exactly the same as every other pocket calculator.

## Installation

This project runs on Flask 0.10.1 and Python 2.7.6. It is recommended that you run this in a virtualenv.

In the virtualenv, run the following command to install all necissary packages.

```
$ pip install -r requirements.txt
```

## Run the app

Once all packages have been installed, cd into the calculator folder.

```
$ cd pocket_calculator/calculator
```

From that folder, excecute the following command:

```
$ python calculator.py
```

This will start the web server. Navigate to `http://localhost:5000/` or `http://127.0.0.1:5000/` and calculate away!

## Assignment

The goal: To test your coding experience.

This is a two-part coding exercise that aims to test your skills with

1. Building HTML5 web applications
2. Building and interacting with RESTful APIs

Your first task will be to implement an HTML pocket calculator using your choice of Javascript/CSS tools, libraries and frameworks. We like Angular and Coffeescript, but feel free to use what you're most comfortable with.

Your second task will be to implement a back-end API which will power the calculator. We're big fans of Python so Flask would be a great tool to use for this, but again feel free to build this in Node, Ruby, or any other tool.

We're leaving the implementation details intentionally vague, but here are some of the things that we would like to see:

1. Your understanding of design, UI/UX, coding, and testing best practices.
2. In the UI we're looking at how you structure the pieces of the application, and how you separate logic and presentation
3. With the API we're looking at how you serialize/deserialize data and handle potential vulnerabilities.
4. How you choose (or not choose) third party libraries and frameworks.
5. Your concept of a finished product.

Below is a small list of requirements for this exercise:

- All code should be written yourself, excluding third party libraries or frameworks
- All of the math performed within the calculator should be calculated by the back-end service.
- Please include documentation and installation instructions.
- The front-end calculator app should be served via the same back-end that provides the RESTful API
- Email a tarball of the solution to me.
