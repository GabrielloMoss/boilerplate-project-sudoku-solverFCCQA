class SudokuSolver {

  validate(puzzleString) {
    if (!puzzleString) {
      return { valid: false, error: 'Required field missing' };
    }
    if (puzzleString.length !== 81) {
      return { valid: false, error: 'Expected puzzle to be 81 characters long' };
    }
    if (!/^[1-9.]+$/.test(puzzleString)) {
      return { valid: false, error: 'Invalid characters in puzzle' };
    }
    return { valid: true };
  }

  checkRowPlacement(puzzleString, row, column, value) {
    const rowStart = row * 9;
    for (let i = 0; i < 9; i++) {
      if (i === column) continue;
      if (puzzleString[rowStart + i] === value.toString()) {
        return false;
      }
    }
    return true;
  }

  checkColPlacement(puzzleString, row, column, value) {
    for (let i = 0; i < 9; i++) {
      if (i === row) continue;
      if (puzzleString[i * 9 + column] === value.toString()) {
        return false;
      }
    }
    return true;
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    const regionRowStart = Math.floor(row / 3) * 3;
    const regionColStart = Math.floor(column / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const currentRow = regionRowStart + i;
        const currentCol = regionColStart + j;
        if (currentRow === row && currentCol === column) continue;
        if (puzzleString[currentRow * 9 + currentCol] === value.toString()) {
          return false;
        }
      }
    }
    return true;
  }

  solve(puzzleString) {
    const validation = this.validate(puzzleString);
    if (!validation.valid) {
      return { error: validation.error };
    }

    let puzzle = puzzleString.split('');
    
    const isValid = (puzzle, row, col, num) => {
      const numStr = num.toString();
      for (let i = 0; i < 9; i++) {
        if (puzzle[row * 9 + i] === numStr) return false;
        if (puzzle[i * 9 + col] === numStr) return false;
      }
      const regionRowStart = Math.floor(row / 3) * 3;
      const regionColStart = Math.floor(col / 3) * 3;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (puzzle[(regionRowStart + i) * 9 + (regionColStart + j)] === numStr) {
            return false;
          }
        }
      }
      return true;
    };

    const solveSudoku = (puzzle) => {
      for (let i = 0; i < 81; i++) {
        if (puzzle[i] === '.') {
          const row = Math.floor(i / 9);
          const col = i % 9;
          for (let num = 1; num <= 9; num++) {
            if (isValid(puzzle, row, col, num)) {
              puzzle[i] = num.toString();
              if (solveSudoku(puzzle)) {
                return true;
              }
              puzzle[i] = '.';
            }
          }
          return false;
        }
      }
      return true;
    };

    if (solveSudoku(puzzle)) {
      return { solution: puzzle.join('') };
    } else {
      return { error: 'Puzzle cannot be solved' };
    }
  }
}

module.exports = SudokuSolver;
