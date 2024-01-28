/* eslint-disable require-jsdoc */
/* Document created by Dillon Mendes on May 28th, 2023 */
/* Master Copy */

/* eslint-disable max-len */

'use strict';

// eslint-disable-next-line no-unused-vars
const Slip = function(xInteger, yInteger) {
  const x = xInteger;
  const y = yInteger;
  const tile = Cells.getCellEntity(x, y);

  const name = 'slip';
  const faction = 'earth';
  const cooldown = 3200;
  const probability = 0.16;

  let timeLastExecuted = new Date();
  let currentTimeout;

  const getCurrentTimeout = function() {
    return currentTimeout;
  };

  const setCurrentTimeout = function(timeoutObject, timeInteger) {
    currentTimeout = setTimeout(timeoutObject, timeInteger);
    console.log(currentTimeout);
  };

  const isOnCooldown = function() {
    if (new Date() - timeLastExecuted <= cooldown) {
      return true;
    } else {
      return false;
    }
  };

  const timeUntilNextActivation = function() {
    if (isOnCooldown()) {
      // console.log(cooldown - (new Date() - timeLastExecuted));
      setCurrentTimeout(timeUntilNextActivation, (cooldown - (new Date() - timeLastExecuted)));
    } else {
      let accumulatedTime = 0;
      let success = false;

      while (!success) {
        if (Math.random() < probability) {
          success = true;
          accumulatedTime += Math.floor(Math.random() * 1000);
        } else {
          accumulatedTime += 1000;
        }
      }

      // console.log(accumulatedTime);
      setCurrentTimeout(activate, accumulatedTime);
    }
  };

  const selectTargetTile = function() {
    const radius = 1;
    const potentialTargets = [];

    let i;
    let j;

    for (i = -radius; i <= radius; i += 1) {
      for (j = -radius; j <= radius; j += 1) {
        const distance = Math.sqrt(Math.pow(i, 2) + Math.pow(j, 2));
        if (Math.ceil(distance) >= 1 && Math.ceil(distance) <= radius) {
          if (x + i < 0 || x + i >= Landscape.numberOfColumns) {
            continue;
          }

          if (y + j < 0 || y + j >= Landscape.numberOfRows) {
            continue;
          }

          const tileToCheck = Cells.getCellEntity(x + i, y + j);

          potentialTargets.push(tileToCheck);
        }
      }
    }

    // There must be at least one valid tile
    if (potentialTargets.length === 0) {
      timeUntilNextActivation();
      return;
    }

    // Select a potential target at random
    const targetTile = potentialTargets[Math.floor(Math.random() * potentialTargets.length)];

    return targetTile;
  };

  const activate = function() {
    const targetTile = selectTargetTile();
    const tileLevel = tile.getLevel();

    // Switch the level of this tile with the target tile
    tile.setLevel(targetTile.getLevel());

    // Switch the level of the target tile with this tile
    targetTile.setLevel(tileLevel);

    // Place this ability on cooldown
    timeLastExecuted = new Date();

    // Call next activation
    setCurrentTimeout(timeUntilNextActivation, cooldown);
  };

  return {
    name: name,
    faction: faction,

    isOnCooldown: isOnCooldown,
    timeUntilNextActivation: timeUntilNextActivation,
    getCurrentTimeout: getCurrentTimeout,
  };
};

// eslint-disable-next-line no-unused-vars
const Earthquake = function(xInteger, yInteger) {
  const x = xInteger;
  const y = yInteger;
  const tile = Cells.getCellEntity(x, y);

  const name = 'earthquake';
  const faction = 'earth';
  const cooldown = 30000;
  const probability = 0.02;

  let timeLastExecuted = new Date();
  let currentTimeout;

  const getCurrentTimeout = function() {
    return currentTimeout;
  };

  const setCurrentTimeout = function(timeoutObject, timeInteger) {
    currentTimeout = setTimeout(timeoutObject, timeInteger);
    console.log(currentTimeout);
  };

  const isOnCooldown = function() {
    if (new Date() - timeLastExecuted <= cooldown) {
      return true;
    } else {
      return false;
    }
  };

  const timeUntilNextActivation = function() {
    if (isOnCooldown()) {
      setCurrentTimeout(timeUntilNextActivation, (cooldown - (new Date() - timeLastExecuted)));
    } else {
      let accumulatedTime = 0;
      let success = false;

      while (!success) {
        if (Math.random() < probability) {
          success = true;
          accumulatedTime += Math.floor(Math.random() * 1000);
        } else {
          accumulatedTime += 1000;
        }
      }

      setCurrentTimeout(activate, accumulatedTime);
    }
  };

  const getPotentialTargets = function(xInteger, yInteger, potentialTargetsArray) {
    const dx = xInteger || x;
    const dy = yInteger || y;
    const potentialTargets = potentialTargetsArray || [];

    let i;
    let j;
    let k;

    for (i = -1; i <= 1; i += 1) {
      for (j= -1; j <= 1; j += 1) {
        if (dx + i >= 0 && dx + i < Landscape.numberOfColumns && dy + j >= 0 && dy + j < Landscape.numberOfRows) {
          const tileToCheck = Cells.getCellEntity(dx + i, dy + j);
          let isPotentialTarget;

          if (i === 0 && j === 0 || (dx + i) === x && (dy + j) === y) {
            continue;
          }

          // Check if the level of this tile is not equal to the level of the adjacent tile
          if (tile.getLevel() !== tileToCheck.getLevel()) {
            continue;
          }

          // Check if this tile is already in the list of valid tiles
          for (k = 0; k < potentialTargets.length; k+= 1) {
            if (tileToCheck === potentialTargets[k]) {
              isPotentialTarget = true;
            }
          }

          // Continue to next iteration if tile is already in the list of valid tiles
          if (isPotentialTarget) {
            continue;
          }

          // Add tile to list of valid tiles
          potentialTargets.push(tileToCheck);

          // Call next iteration (chain method to adjacent tiles)
          getPotentialTargets(dx + i, dy + j, potentialTargets);
        }
      }
    }

    return potentialTargets;
  };

  const sortTilesByDistance = function(potentialTargetsArray) {
    const potentialTargets = [];

    // Loop through the potential targets array
    for (let i = 0; i < potentialTargetsArray.length; i += 1) {
      const tileToCheck = potentialTargetsArray[i];
      const distance = Math.sqrt(Math.pow((tileToCheck.x - x), 2) + Math.pow((tileToCheck.y - y), 2));
      const arrayLength = potentialTargets.length;

      let splicePosition;

      // Determine where to insert this tile into the potential targets array
      for (let j = 0; j < arrayLength; j += 1) {
        if (distance >= potentialTargets[j].distance) {
          splicePosition = j;
        }
      }

      // Check to see the above for loop never satisfies the greater than condition
      if (splicePosition === undefined) {
        // Insert this tile at the beginning of the potential targets array
        potentialTargets.splice(0, 0, {
          distance: distance,
          tileToCheck: tileToCheck,
        });
        // Skip the remaining execution and continue to the next iteration
        continue;
      }

      // Insert this tile into the array at the designated position (+1)
      potentialTargets.splice((splicePosition + 1), 0, {
        distance: distance,
        tileToCheck: tileToCheck,
      });
    }

    // Trim the array of objects and distance information
    for (let i = 0; i < potentialTargets.length; i += 1) {
      potentialTargets[i] = potentialTargets[i].tileToCheck;
    }

    return potentialTargets;
  };

  const activate = function() {
    // Rearrange potential target tiles by order of distance from this tile
    const targets = sortTilesByDistance(getPotentialTargets(x, y));

    // Select each target tile
    for (let i = 0; i < targets.length; i += 1) {
      // Simplify the verbage to only deal with one target tile at a time
      const target = targets[i];

      // Check to see if the target tile has an ability or if the target tile has the 'earthquake' ability
      if (target.getAbility() === undefined || target.getAbility().name === 'earthquake') {
        continue;
      }

      // Check to see if the target tile is not of the earth faction
      if (target.getFaction() !== 'earth') {
        continue;
      }

      // Check if the target tile has an ability
      target.useAbility();
      console.log('Earthquake has triggered a ' + target.getAbility().name);
    }

    // Place this ability on cooldown
    timeLastExecuted = new Date();

    // Call next activation
    setCurrentTimeout(timeUntilNextActivation, cooldown);
  };

  return {
    name: name,
    faction: faction,

    isOnCooldown: isOnCooldown,
    timeUntilNextActivation: timeUntilNextActivation,
    getCurrentTimeout: getCurrentTimeout,
  };
};
