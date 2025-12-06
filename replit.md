# Sudoku Solver

## Overview

This is a Sudoku Solver web application built as a freeCodeCamp Quality Assurance project. The application provides REST API endpoints to solve Sudoku puzzles and check whether specific number placements are valid. Users can submit 81-character puzzle strings (using digits 1-9 and periods for empty cells) and receive solutions or validation feedback.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack**: Vanilla JavaScript with server-side rendered HTML

The frontend uses a simple static HTML interface (`views/index.html`) with client-side JavaScript (`public/index.js`) to:
- Display a visual Sudoku grid using HTML tables
- Accept puzzle input via textarea (81-character strings)
- Provide interactive solve and check placement functionality
- Make asynchronous POST requests to backend API endpoints
- Display results and error messages dynamically

**Design Rationale**: The straightforward approach prioritizes simplicity and meets freeCodeCamp project requirements without additional frontend framework overhead.

### Backend Architecture

**Framework**: Express.js with Node.js runtime

**Key Components**:

1. **Server Layer** (`server.js`)
   - Express application setup with middleware (body-parser, CORS)
   - Static file serving for frontend assets
   - Route registration for API and testing endpoints
   - Test runner integration for automated validation

2. **Controller Layer** (`controllers/sudoku-solver.js`)
   - `SudokuSolver` class implementing core puzzle logic
   - Validation methods for puzzle strings (length, character set)
   - Placement checking methods (row, column, 3x3 region)
   - Solve algorithm for completing valid puzzles

3. **Route Layer** (`routes/api.js`)
   - `/api/solve` - POST endpoint accepting puzzle strings, returns solutions
   - `/api/check` - POST endpoint validating specific number placements
   - Request validation and error handling
   - Integration with SudokuSolver controller

**Design Pattern**: Classic MVC-style separation with controllers handling business logic and routes managing HTTP request/response cycles. This separation enables easier testing and maintains single responsibility principle.

### Testing Infrastructure

**Framework**: Mocha test runner with Chai assertions

**Test Structure**:
- Unit tests (`tests/1_unit-tests.js`) - Test SudokuSolver methods in isolation
- Functional tests (`tests/2_functional-tests.js`) - Test API endpoints via chai-http
- Test runner (`test-runner.js`) - Automated execution for freeCodeCamp validation

**Babel Integration**: Uses @babel/register for ES6 module support in test environment, allowing modern JavaScript syntax while maintaining Node.js compatibility.

## External Dependencies

### Core Dependencies

1. **Express** (v4.17.1) - Web application framework
   - Handles HTTP routing and middleware
   - Serves static assets and API endpoints

2. **body-parser** (v1.19.0) - Request body parsing middleware
   - Parses JSON request bodies for API endpoints
   - Enables application/x-www-form-urlencoded support

3. **CORS** (v2.8.5) - Cross-Origin Resource Sharing
   - Configured with wildcard origin for freeCodeCamp testing
   - Required for remote test suite validation

4. **dotenv** (v8.2.0) - Environment variable management
   - Loads configuration from .env file
   - Controls test mode via NODE_ENV variable

### Testing Dependencies

1. **Mocha** (v8.1.3) - Test framework
   - Runs unit and functional test suites
   - TDD-style test organization

2. **Chai** (v4.2.0) - Assertion library
   - Provides assert, expect, and should interfaces
   - Used across all test files

3. **chai-http** (v4.3.0) - HTTP integration testing
   - Enables API endpoint testing
   - Chainable request syntax for functional tests

4. **jsdom** (v16.4.0) - DOM implementation for Node.js
   - Required for freeCodeCamp test infrastructure
   - Simulates browser environment in tests

### Build Tools

1. **Babel** (@babel/core, @babel/preset-env, @babel/register)
   - Transpiles ES6+ JavaScript to compatible Node.js code
   - Enables import/export syntax in controllers
   - Integrated with test runner

2. **nodemon** (v2.0.4) - Development server
   - Automatic server restart on file changes
   - Configured as default start script

### freeCodeCamp Integration

The application includes freeCodeCamp-specific testing infrastructure:
- `routes/fcctesting.js` - Endpoints for remote test validation
- `test-runner.js` - Automated test execution
- `assertion-analyser.js` - Test assertion analysis
- Specific error message formats required for project certification