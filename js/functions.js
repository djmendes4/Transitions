/* eslint-disable require-jsdoc */
/* Document created by Dillon Mendes on May 28th, 2023 */
/* Master Copy */

/* eslint-disable max-len */
'use strict';

// eslint-disable-next-line no-unused-vars
const Functions = {
  chain: function(parameters) {
    const tile = parameters.tile;
    const selector = parameters.selector;
    const validators = parameters.validators;
    // The maximum number of tiles to iterate through, defaults to the number of tiles in the landscape
    const maximum = parameters.maximum || Landscape.numberOfColumns * Landscape.numberOfRows;

    const adjacentTiles = [];
    const visitedTiles = new Set();
    let count = 1;

    // Add the initially given tile to the visited tiles set
    visitedTiles.add(tile);

    // Queue to store the tiles to be processed
    const queue = [tile];

    while (queue.length > 0 && count < maximum) {
      const currentTile = queue.shift();
      const neighbors = selector(currentTile.x, currentTile.y, parameters.selectorParameters);

      for (let i = 0; i < neighbors.length; i++) {
        if (!visitedTiles.has(neighbors[i])) {
          if (validators.length === 0) {
            adjacentTiles.push(neighbors[i]);
            queue.push(neighbors[i]);
            count += 1;
          } else {
            for (let j = 0; j < validators.length; j++) {
              if (validators[j](neighbors[i])) {
                adjacentTiles.push(neighbors[i]);
                queue.push(neighbors[i]);
                count += 1;
              }
            }
          }

          visitedTiles.add(neighbors[i]);
        }
      }
    }

    return adjacentTiles;
  },

  areArraysEqual: function(firstArray, secondArray) {
    if (firstArray.length !== secondArray.length) {
      return false;
    }

    for (let i = 0; i < firstArray.length; i++) {
      if (firstArray[i] !== secondArray[i]) {
        return false;
      }
    }

    return true;
  },

  sortRandom: function(array) {
    // Create a copy of the original array
    const randomizedArray = array.slice();

    for (let i = randomizedArray.length - 1; i > 0; i--) {
      // Generate a random index
      const randomIndex = Math.floor(Math.random() * (i + 1));

      // Swap elements between current index and random index
      const temp = randomizedArray[i];
      randomizedArray[i] = randomizedArray[randomIndex];
      randomizedArray[randomIndex] = temp;
    }

    return randomizedArray;
  },

  sortAscending: function(array, criteria) {
    array.sort(function(a, b) {
      return a[criteria] - b[criteria];
    });

    return array;
  },

  sortDescending: function(array, criteria) {
    array.sort(function(a, b) {
      return b[criteria] - a[criteria];
    });

    return array;
  },

  evaluate: function(tileProperty, operator, value, tile, index) {
    switch (operator) {
      case '>=':
        if (tile[tileProperty]() >= value) {
          // console.log('Tile ' + index + ': The level of this tile is ' + tile[tileProperty]() + ' which is greater than (or equal too) the value of ' + value);
          return true;
        } else {
          // console.log('\tINVALID - Tile ' + index + ': The level of this tile is ' + tile[tileProperty]() + ' which is less than the value of ' + value);
          return false;
        }
      case '<=':
        if (tile[tileProperty]() <= value) {
          // console.log('Tile ' + index + ': The level of this tile is ' + tile[tileProperty]() + ' which is less than (or equal too) the value of ' + value);
          return true;
        } else {
          // console.log('\tINVALID - Tile ' + index + ': The level of this tile is ' + tile[tileProperty]() + ' which is greater than the value of ' + value);
          return false;
        }
      case '=':
        if (tile[tileProperty]() === value) {
          // console.log('Tile ' + index + ': The property of this tile is ' + tile[tileProperty]() + ' which matches the value of ' + value);
          return true;
        } else {
          // console.log('\tINVALID - Tile ' + index + ': The level of this tile is ' + tile[tileProperty]() + ' which does not match the value of ' + value);
          return false;
        }
      case '!=':
        if (tile[tileProperty]() !== value) {
          // console.log('Tile ' + index + ': The property of this tile is ' + tile[tileProperty]() + ' which does not match the value of ' + value);
          return true;
        } else {
          // console.log('\tINVALID - Tile ' + index + ': The level of this tile is ' + tile[tileProperty]() + ' which matches the value of ' + value);
          return false;
        }
    };
  },
};
