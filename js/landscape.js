/* Document created by Dillon Mendes on June 27th, 2015 */
/* Master Copy */

/* eslint-disable max-len */

// Function used to create the background pattern for the game

'use strict';

// eslint-disable-next-line no-unused-vars
const Landscape = function() {
  const root = document.querySelector(':root');
  const landscape = document.getElementById('landscape');

  const width = screen.width;
  let height = 0;

  const cellSize = 32;
  const cells = [];

  const rows = 16;
  // const columns = Math.ceil(width / cellSize);
  const columns = 32;

  height = rows * cellSize;

  const createLandscape = function() {
    root.style.setProperty('--landscapeWidth', width + 'px');
    root.style.setProperty('--landscapeHeight', height + 'px');

    root.style.setProperty('--cellSize', cellSize + 'px');
  };

  const createGrid = function() {
    let x = 0;
    let y = 0;
    let newRow = {};
    let newCell = {};
    const fragment = document.createDocumentFragment();

    for (y = 0; y < rows; y += 1) {
      cells[y] = [];

      newRow = document.createElement('div');
      newRow.setAttribute('class', 'row ' + y);

      for (x = 0; x < columns; x += 1) {
        newCell = document.createElement('div');
        newCell.setAttribute('id', (y * columns + x));
        newCell.setAttribute('class', 'cell');

        newRow.appendChild(newCell);

        cells[y][x] = newCell;
      }

      fragment.appendChild(newRow);
    }

    landscape.appendChild(fragment);
  };

  const loopThroughCells = function(anonymousFunction) {
    let x = 0;
    let y = 0;

    for (y = 0; y < rows; y += 1) {
      for (x = 0; x < columns; x += 1) {
        anonymousFunction(cells[y][x]);
      }
    }
  };

  const resetLandscape = function() {
    loopThroughCells(function(cell) {
      cell.setAttribute('color', 'grey');
    });
  };

  // eslint-disable-next-line no-unused-vars
  const initialize = function() {
    createLandscape();
    createGrid();
  }();

  return {
    element: landscape,
    numberOfRows: rows,
    numberOfColumns: columns,
    cellMatrix: cells,

    resetLandscape: resetLandscape,
  };
}();
