const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();

const validPuzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
const validSolution = '135762984946381257728459613694517832812936745357824196473298561581673429269145378';

suite('Unit Tests', () => {

  suite('Puzzle Validation', () => {
    test('Logic handles a valid puzzle string of 81 characters', () => {
      const result = solver.validate(validPuzzle);
      assert.isTrue(result.valid);
    });

    test('Logic handles a puzzle string with invalid characters (not 1-9 or .)', () => {
      const invalidPuzzle = '1.5..2.84..63.12.7.2..5..g..9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
      const result = solver.validate(invalidPuzzle);
      assert.isFalse(result.valid);
      assert.equal(result.error, 'Invalid characters in puzzle');
    });

    test('Logic handles a puzzle string that is not 81 characters in length', () => {
      const shortPuzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.3';
      const result = solver.validate(shortPuzzle);
      assert.isFalse(result.valid);
      assert.equal(result.error, 'Expected puzzle to be 81 characters long');
    });
  });

  suite('Row Placement', () => {
    test('Logic handles a valid row placement', () => {
      const result = solver.checkRowPlacement(validPuzzle, 0, 1, 3);
      assert.isTrue(result);
    });

    test('Logic handles an invalid row placement', () => {
      const result = solver.checkRowPlacement(validPuzzle, 0, 1, 1);
      assert.isFalse(result);
    });
  });

  suite('Column Placement', () => {
    test('Logic handles a valid column placement', () => {
      const result = solver.checkColPlacement(validPuzzle, 0, 1, 3);
      assert.isTrue(result);
    });

    test('Logic handles an invalid column placement', () => {
      const result = solver.checkColPlacement(validPuzzle, 0, 1, 9);
      assert.isFalse(result);
    });
  });

  suite('Region Placement', () => {
    test('Logic handles a valid region (3x3 grid) placement', () => {
      const result = solver.checkRegionPlacement(validPuzzle, 0, 1, 3);
      assert.isTrue(result);
    });

    test('Logic handles an invalid region (3x3 grid) placement', () => {
      const result = solver.checkRegionPlacement(validPuzzle, 0, 1, 1);
      assert.isFalse(result);
    });
  });

  suite('Solver', () => {
    test('Valid puzzle strings pass the solver', () => {
      const result = solver.solve(validPuzzle);
      assert.property(result, 'solution');
      assert.equal(result.solution.length, 81);
    });

    test('Invalid puzzle strings fail the solver', () => {
      const invalidPuzzle = '115..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
      const result = solver.solve(invalidPuzzle);
      assert.property(result, 'error');
      assert.equal(result.error, 'Puzzle cannot be solved');
    });

    test('Solver returns the expected solution for an incomplete puzzle', () => {
      const result = solver.solve(validPuzzle);
      assert.equal(result.solution, validSolution);
    });
  });

});
