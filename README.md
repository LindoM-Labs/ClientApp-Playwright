# Playwright Automation Framework

## Overview

This project is an **End-to-End Test Automation Framework** built using **Playwright** and **TypeScript**. The objective of this project was not only to automate an e-commerce application but also to understand how a professional automation framework is designed, structured, and maintained.

Throughout the development of this framework, I focused on writing clean, maintainable, and reusable automation code while applying software engineering principles such as abstraction, modularity, and separation of concerns.

---

## Technologies Used

- Playwright
- TypeScript
- Node.js
- Page Object Model (POM)
- Playwright Fixtures
- Data-Driven Testing
- Allure Reporting
- HTML Reporting
- Git & GitHub

---

# What I Learned

Building this framework gave me practical experience in designing an automation framework rather than simply writing automated tests.

---

## TypeScript

During this project I learned how to:

- Configure TypeScript within a Playwright project
- Work with custom types
- Understand Promises and async/await
- Apply strong typing throughout the framework
- Create reusable classes and methods
- Use ES Module imports and exports
- Handle optional values safely
- Understand TypeScript compiler errors and debugging

### Concepts Learned

- Types
- Promises
- Async/Await
- Generics
- Optional Chaining
- Interfaces
- Type Safety

---

## Playwright

Throughout this project I learned how to effectively use many Playwright features.

### Locators

- locator()
- getByRole()
- getByText()
- getByPlaceholder()
- filter()
- first()
- last()
- nth()

### Assertions

- toBeVisible()
- toHaveText()
- toContainText()
- toHaveURL()
- toBeEnabled()

### Waiting Strategies

Instead of relying on hard waits, I learned how to create stable automation using:

- Auto Waiting
- Locator.waitFor()
- expect() assertions
- Network synchronization
- Explicit waits only where necessary

This greatly improved the stability of the framework.

---

# Framework Architecture

One of the biggest lessons from this project was learning how to structure a scalable automation framework.

The framework is organized into dedicated layers:

- Page Objects
- Page Object Manager
- Validation Layer
- Utilities
- Test Data
- Fixtures
- Reports

Each folder has a single responsibility, making the framework easier to maintain as it grows.

---

## Page Object Model (POM)

The framework follows the **Page Object Model** design pattern.

Each Page Object contains only:

- Locators
- Page actions
- Page-specific functionality

Business logic and assertions are separated from the page classes to improve maintainability.

---

## Page Object Manager

Instead of creating every page object inside every test, I implemented a **Page Object Manager** responsible for creating and managing page instances.

### Benefits

- Cleaner test cases
- Centralized object creation
- Easier maintenance
- Better scalability
- Less duplicated code

---

## Validation Layer

Rather than placing assertions directly inside page classes, I created a reusable validation layer.

This provides:

- Cleaner Page Objects
- Reusable assertions
- Better separation of concerns
- Easier maintenance

---

# Test Data Management

The framework demonstrates multiple approaches for handling test data.

---

## JSON Data Provider

External JSON files are used to supply test data.

### Benefits

- Easy maintenance
- Supports multiple datasets
- Cleaner test scripts
- Better scalability

---

## Custom Playwright Fixtures

I also learned how to extend Playwright's built-in fixtures by creating custom fixtures.

Example fixture data includes:

- Login credentials
- Customer information
- Product details
- Order information

This allows test data to be injected directly into test cases.

---

# Reporting

The framework supports multiple reporting solutions.

---

## HTML Reports

Playwright's built-in HTML report provides:

- Test execution summary
- Passed tests
- Failed tests
- Screenshots
- Trace Viewer

---

## Allure Reports

The framework also integrates Allure Reports for advanced reporting.

Features include:

- Test history
- Execution timeline
- Screenshots
- Trace attachments
- Step-by-step execution
- Failure analysis

---

# Best Practices Applied

Throughout the framework I focused on applying automation testing best practices.

- Page Object Model
- DRY (Don't Repeat Yourself)
- Strong typing with TypeScript
- Separation of Concerns
- Reusable methods
- Data-Driven Testing
- Custom Fixtures
- Modular framework design
- Explicit assertions
- Maintainable folder structure

---

# Running the Tests

## Run all tests

```bash
npm test
```

## Run regression suite

```bash
npm run regression
```

## Run login negative scenarios

```bash
npm run loginNegativeScenarios
```

## Run Data Provider tests

```bash
npm run E2EdataProvider
```

## Run Custom Fixture tests

```bash
npm run dataCustomFixture
```

---

# Reports

## Playwright HTML Report

```bash
npx playwright show-report
```

## Allure Report

```bash
allure serve allure-results
```

---

# Suggested Project Structure

```
PlaywrightAutomation/
│
├── tests/
├── PageObjects/
├── Utils/
├── TestData/
├── Reports/
├── playwright.config.ts
├── package.json
└── README.md
```

---

# Future Improvements

As I continue learning automation engineering, I plan to extend this framework by implementing:

- API Testing
- Visual Testing
- Docker Integration
- Database Validation
- CI/CD with GitHub Actions
- Cross-browser optimization
- Environment configuration
- Performance monitoring
- Parallel execution optimization

---

# Key Takeaways

Developing this framework helped me move beyond writing simple automation scripts and understand how professional automation frameworks are designed and maintained.

This project strengthened my understanding of:

- Playwright
- TypeScript
- Framework Architecture
- Object-Oriented Programming
- Page Object Model
- Custom Fixtures
- Data-Driven Testing
- Test Data Management
- Reporting & Debugging
- Automation Best Practices

---

# Author

**Lindokuhle Makanda**

Associate Software Quality Assurance Engineer

---

## If you found this project useful, feel free to star the repository.
