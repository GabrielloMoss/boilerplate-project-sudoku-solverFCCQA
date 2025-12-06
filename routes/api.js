'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      const { puzzle, coordinate, value } = req.body;

      if (puzzle === undefined || coordinate === undefined || value === undefined) {
        return res.json({ error: 'Required field(s) missing' });
      }

      const validation = solver.validate(puzzle);
      if (!validation.valid) {
        return res.json({ error: validation.error });
      }

      if (!/^[A-I][1-9]$/i.test(coordinate)) {
        return res.json({ error: 'Invalid coordinate' });
      }

      if (!/^[1-9]$/.test(value.toString())) {
        return res.json({ error: 'Invalid value' });
      }

      const row = coordinate.toUpperCase().charCodeAt(0) - 65;
      const column = parseInt(coordinate[1]) - 1;
      const valStr = value.toString();

      const currentValue = puzzle[row * 9 + column];
      if (currentValue === valStr) {
        return res.json({ valid: true });
      }

      const conflicts = [];
      if (!solver.checkRowPlacement(puzzle, row, column, valStr)) {
        conflicts.push('row');
      }
      if (!solver.checkColPlacement(puzzle, row, column, valStr)) {
        conflicts.push('column');
      }
      if (!solver.checkRegionPlacement(puzzle, row, column, valStr)) {
        conflicts.push('region');
      }

      if (conflicts.length > 0) {
        return res.json({ valid: false, conflict: conflicts });
      }

      return res.json({ valid: true });
    });
    
  app.route('/api/solve')
    .post((req, res) => {
      const { puzzle } = req.body;

      if (!puzzle) {
        return res.json({ error: 'Required field missing' });
      }

      const result = solver.solve(puzzle);
      return res.json(result);
    });
};
