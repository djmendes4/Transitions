/* eslint-disable require-jsdoc */
/* Document created by Dillon Mendes on May 28th, 2023 */
/* Master Copy */

/* eslint-disable max-len */
'use strict';

const Ability = function() {
  this.getTile = function() {
    return this.tile;
  };

  this.setName = function(string) {
    console.log(string);
    this.name = string;
  };

  this.getName = function() {
    return this.name;
  };

  this.setFaction = function(string) {
    this.faction = string;
  };

  this.getFaction = function() {
    return this.faction;
  };

  this.setCurrentTimeout = function(timeoutObject, timeInteger) {
    this.currentTimeout = setTimeout(timeoutObject, timeInteger);
  };

  this.getCurrentTimeout = function() {
    return currentTimeout;
  };

  this.setCooldown = function(number) {
    this.cooldown = number;
  };

  this.getCooldown = function() {
    console.log(this.cooldown);
    return this.cooldown;
  };

  this.isOnCooldown = function() {
    if (new Date() - this.timeLastExecuted <= this.cooldown) {
      return true;
    } else {
      return false;
    }
  };

  this.setProbability = function(number) {
    this.probability = number;
  };

  this.getProbability = function() {
    return this.probability;
  };

  this.cooldownRemaining = function() {
    // Check to see if the ability is on cooldown
    if (this.isOnCooldown()) {
      // Return the amount of time remaining on the cooldown
      return (this.cooldown - (new Date() - this.timeLastExecuted));
    } else {
      return 0;
    }
  };

  this.getTimeUntilNextActivation = function() {
    let accumulatedTime = 0;
    let success = false;

    while (!success) {
      if (Math.random() < this.probability) {
        success = true;
        accumulatedTime += Math.floor(Math.random() * 1000);
      } else {
        accumulatedTime += 1000;
      }
    }

    return accumulatedTime;
  };

  this.check = function(number) {
    let delay = number || 0;
    delay += this.getTimeUntilNextActivation();

    this.currentTimeout = Matriarch.add({
      function: this.activate.bind(this),
      delay: delay,
    });
  };

  this.evaluate = function(tileProperty, operator, value, tile, index) {
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
  };

  this.getTilesWithinRadius = function(x, y, radius, callback) {
    const cx = x;
    const cy = y;
    const tiles = [];
    let count = 0;

    for (let x = cx - radius; x <= cx + radius; x++) {
      for (let y = cy - radius; y <= cy + radius; y++) {
        const distance = Math.sqrt(Math.pow((x - cx), 2) + Math.pow((y - cy), 2));
        if (distance <= radius && x >= 0 && x < Landscape.numberOfColumns && y >= 0 && y < Landscape.numberOfRows && (x !== cx || y !== cy)) {
          const tile = Matriarch.getTile({x: x, y: y});
          let isValid = true;

          count += 1;

          for (let index = 0; index < callback.length; index++) {
            if (isValid && callback[index](tile, count)) {
              continue;
            } else {
              // console.log('Tile ' + count + ': This tile is not valid');
              isValid = false;
            }
          }

          if (isValid) {
            tiles.push(tile);
          }
        }
      }
    }

    return tiles;
  };

  this.getAdjacentTiles = function(x, y, callback, tileArray) {
    const cx = x;
    const cy = y;
    const tiles = [];
    let count = 0;

    for (let x = cx - 1; x <= cx + 1; x++) {
      for (let y = cy - 1; y <= cy + 1; y++) {
        if (x >= 0 && x < Landscape.numberOfColumns && y >= 0 && y < Landscape.numberOfRows && (x !== cx || y !== cy)) {
          const tile = Matriarch.getTile({x: x, y: y});
          let isValid = true;

          count += 1;

          for (let index = 0; index < callback.length; index++) {
            if (isValid && callback[index](tile, count)) {
              continue;
            } else {
              // console.log('Tile ' + count + ': This tile is not valid');
              isValid = false;
            }
          }

          if (isValid) {
            tiles.push(tile);
          }
        }
      }
    }

    return tiles;
  };

  this.sort = function(tileArray, criteria) {
    const sortedArray = [];

    // Loop through the tile array
    for (let i = 0; i < tileArray.length; i++) {
      let splicePosition = null;

      // Check if the array is empty
      if (sortedArray.length === 0) {
        sortedArray.push(tileArray[i]);
        continue;
      }

      // For each iteration through the tile array, loop through the sortedArray
      for (let j = 0; j < sortedArray.length; j++) {
        if (tileArray[i][criteria]() < sortedArray[j][criteria]()) {
          splicePosition = j;
          break;
        }
      }

      if (splicePosition === null) {
        splicePosition = sortedArray.length;
      }

      sortedArray.splice(splicePosition, 0, tileArray[i]);
    }

    return sortedArray;
  };

  this.trim = function(tileArray, criteria, value) {
    const trimmedArray = [];

    for (let i = 0; i < tileArray.length; i++) {
      if (tileArray[i][criteria]() === value) {
        trimmedArray.push(tileArray[i]);
      }
    }

    return trimmedArray;
  };

  this.maximum = function(tileArray, criteria) {
    let maximum = 0;

    for (let i = 0; i < tileArray.length; i++) {
      if (tileArray[i][criteria]() > maximum) {
        maximum = tileArray[i][criteria]();
      }
    }

    return maximum;
  };

  this.orthogonalTiles = Functions.Tiles.orthogonalTiles;
  this.diagonalTiles = Functions.Tiles.diagonalTiles;
  this.surroundingTiles = Functions.Tiles.surroundingTiles;
  this.radialTiles = Functions.Tiles.radialTiles;
  this.latitudinalTiles = Functions.Tiles.latitudinalTiles;
  this.longitudinalTiles = Functions.Tiles.longitudinalTiles;
  this.sortRandom = Functions.sortRandom;

  this.chain = Functions.chain;
  this.areArraysEqual = Functions.areArraysEqual;

  return this;
};

const Fault = function(id) {
  this.tile = Matriarch.getTile(id);
  this.x = this.tile.x;
  this.y = this.tile.y;

  this.name = 'Fault';
  this.faction = 'earth';
  this.cooldown = 3200;
  this.probability = 0.10;

  this.timeLastExecuted = new Date();
  this.currentTimeout;

  this.activate = function() {
    // Check to see if this ability is on cooldown
    if (this.isOnCooldown()) {
      // Check again once the ability is no longer on cooldown
      this.check(this.cooldownRemaining());
      return;
    }

    // This tile must have a level no greater than 3
    if (this.tile.getLevel() === 4) {
      // Check again after some time
      this.check();
      return;
    }

    // Select all neighboring tiles matching the preferred criteria
    let adjacentTile = this.getAdjacentTiles(this.x, this.y, [
      // Check if the ability on the neighboring tile is 'Reverse Fault'
      // Check if the level of the neighboring tile is greater than 0
      // Check if the ability on the neighboring tile is not 'Fault'
      this.evaluate.bind(this, 'getAbilityName', '=', 'Reverse Fault'),
      this.evaluate.bind(this, 'getLevel', '>=', 1),
      this.evaluate.bind(this, 'getAbilityName', '!=', 'Fault'),
    ]);

    if (adjacentTile.length === 0) {
      // Select all neighboring tiles matching the criteria
      adjacentTile = this.getAdjacentTiles(this.x, this.y, [
        // Check if the level of the neighboring tile is greater than 0
        // Check if the ability on the neighboring tile is not 'Fault'
        this.evaluate.bind(this, 'getLevel', '>=', 1),
        this.evaluate.bind(this, 'getAbilityName', '!=', 'Fault'),
      ]);
    }

    // There must be at least one valid tile
    if (adjacentTile.length === 0) {
      // Check again after some time
      this.check();
      return;
    };

    // Of the valid, neighboring tiles, select a tile at random
    const targetTile = adjacentTile[Math.floor(Math.random() * adjacentTile.length)];

    // Raise the level of this tile by 1
    this.tile.setLevel(this.tile.getLevel() + 1);

    // Lower the level of the target tile by 1
    targetTile.setLevel(targetTile.getLevel() - 1);

    // Check the faction of the tile and change the faction if necessary
    if (targetTile.getFaction() !== 'earth') {
      targetTile.setFaction('earth');
    }

    // Place this ability on cooldown
    this.timeLastExecuted = new Date();

    // Call next activation after the ability has come off cooldown
    // and some time has passed
    this.check(this.cooldown);
  };
};

const ReverseFault = function(id) {
  this.tile = Matriarch.getTile(id);
  this.x = this.tile.x;
  this.y = this.tile.y;

  this.name = 'Reverse Fault';
  this.faction = 'earth';
  this.cooldown = 3200;
  this.probability = 0.10;

  this.timeLastExecuted = new Date();
  this.currentTimeout;

  this.activate = function() {
    // Check to see if this ability is on cooldown
    if (this.isOnCooldown()) {
      // Check again once the ability is no longer on cooldown
      this.check(this.cooldownRemaining());
      return;
    }

    // This tile must have a level no less than 1
    if (this.tile.getLevel() === 0) {
      this.check();
      return;
    }

    // Select all neighboring tiles matching the preferred criteria
    let adjacentTile = this.getAdjacentTiles(this.x, this.y, [
      // Check if the ability on the neighboring tile is 'Fault'
      // Check if the level of the neighboring tile is less than 4
      // Check if the ability on the neighboring tile is not 'Reverse Fault'
      this.evaluate.bind(this, 'getAbilityName', '=', 'Fault'),
      this.evaluate.bind(this, 'getLevel', '<=', 3),
      this.evaluate.bind(this, 'getAbilityName', '!=', 'Reverse Fault'),
    ]);

    console.log(adjacentTile);

    if (adjacentTile.length === 0) {
      // Select all neighboring tiles matching the criteria
      adjacentTile = this.getAdjacentTiles(this.x, this.y, [
        // Check if the level of the neighboring tile is less than 4
        // Check if the ability on the neighboring tile is not 'Reverse Fault'
        this.evaluate.bind(this, 'getLevel', '<=', 3),
        this.evaluate.bind(this, 'getAbilityName', '!=', 'Reverse Fault'),
      ]);
    }

    console.log(adjacentTile);

    // There must be at least one valid tile
    if (adjacentTile.length === 0) {
      this.check();
      return;
    }

    // Of the valid, neighboring tiles, select a tile at random
    const targetTile = adjacentTile[Math.floor(Math.random() * adjacentTile.length)];

    // Lower the level of this tile by 1
    this.tile.setLevel(this.tile.getLevel() - 1);

    // Raise the level of the target tile by 1
    targetTile.setLevel(targetTile.getLevel() + 1);

    // Check the faction of the tile and change the faction if necessary
    if (targetTile.getFaction() !== 'earth') {
      targetTile.setFaction('earth');
    }

    // Place this ability on cooldown
    this.timeLastExecuted = new Date();

    // Call next activation after the ability has come off cooldown
    // and some time has passed
    this.check(this.cooldown);
  };
};

const Crumble = function(id) {
  this.tile = Matriarch.getTile(id);
  this.x = this.tile.x;
  this.y = this.tile.y;

  this.name = 'Crumble';
  this.faction = 'earth';
  this.cooldown = 1600;
  this.probability = 0.20;

  this.timeLastExecuted = new Date();
  this.currentTimeout;

  this.activate = function() {
    // Check to see if this ability is on cooldown
    if (this.isOnCooldown()) {
      // Check again once the ability is no longer on cooldown
      this.check(this.cooldownRemaining());
      return;
    }

    // Select all tiles within radius matching the preferred criteria
    let selectedTile = this.getTilesWithinRadius(this.x, this.y, this.tile.getLevel() + 1, [
      // Check if the ability of the tile is 'Fault'
      // Check if the faction of the tile is 'earth'
      this.evaluate.bind(this, 'getAbilityName', '=', 'Fault'),
      this.evaluate.bind(this, 'getFaction', '=', 'earth'),
    ]);

    if (selectedTile.length === 0) {
      // Select all tiles within radius matching the criteria
      selectedTile = this.getAdjacentTiles(this.x, this.y, [
        // Check if the faction of the tile is 'earth'
        this.evaluate.bind(this, 'getFaction', '=', 'earth'),
      ]);
    }

    if (selectedTile.length === 0) {
      this.check();
      return;
    }

    selectedTile = this.trim(selectedTile, 'getLevel', this.maximum(selectedTile, 'getLevel'));

    // Of the valid tiles, select a tile at random
    selectedTile = selectedTile[Math.floor(Math.random() * selectedTile.length)];
    let targetTile = this.getAdjacentTiles(selectedTile.x, selectedTile.y, [
      // Check if the level of the targeted tile is two levels less than the selected tile
      this.evaluate.bind(this, 'getLevel', '<=', (selectedTile.getLevel() - 2)),
    ]);

    if (targetTile.length === 0) {
      this.check();
      return;
    }

    // Of the valid tiles, choose target tile at random
    targetTile = targetTile[Math.floor(Math.random() * targetTile.length)];

    // Lower the level of the selected tile by 1
    selectedTile.setLevel(selectedTile.getLevel() - 1);

    // Raise the level of the targeted tile by 1
    targetTile.setLevel(targetTile.getLevel() + 1);

    // Check the faction of the tile and change the faction if necessary
    if (targetTile.getFaction() !== 'earth') {
      targetTile.setFaction('earth');
    }

    // Place this ability on cooldown
    this.timeLastExecuted = new Date();

    // Call next activation after the ability has come off cooldown
    // and some time has passed
    this.check(this.cooldown);
  };
};

const Quake = function(id) {
  this.tile = Matriarch.getTile(id);
  this.x = this.tile.x;
  this.y = this.tile.y;

  this.name = 'Quake';
  this.faction = 'earth';
  this.cooldown = 800;
  this.probability = 1;

  this.timeLastExecuted = new Date();
  this.currentTimeout;

  this.activate = function() {
    // Check to see if this ability is on cooldown
    if (this.isOnCooldown()) {
      // Check again once the ability is no longer on cooldown
      this.check(this.cooldownRemaining());
      return;
    }

    const targets = this.chain({
      tile: this.tile,
      selector: this.radialTiles,
      maximum: 10,
      selectorParameters: {
        radius: (Math.floor(this.tile.getLevel() / 2) + 1),
      },
      validators: [
        this.evaluate.bind(this, 'getLevel', '=', this.tile.getLevel()),
      ],
    });

    // console.log(targets);
    for (let i = 0; i < targets.length; i++) {
      targets[i].setFaction('earth');
    }
  };
};

const ability = new Ability();
Object.setPrototypeOf(Fault.prototype, ability);
Object.setPrototypeOf(ReverseFault.prototype, ability);
Object.setPrototypeOf(Crumble.prototype, ability);
Object.setPrototypeOf(Quake.prototype, ability);
