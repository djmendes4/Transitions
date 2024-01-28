/* Document created by Dillon Mendes on June 27th, 2015 */
/* Master Copy */

/* eslint-disable max-len */

// Function used to create the background pattern for the game

'use strict';

// eslint-disable-next-line no-unused-vars
const Player = function() {
  const faction = 'earth';
  let currentTarget;
  let previousTarget;

  const getCurrentTarget = function() {
    return currentTarget;
  };

  const setCurrentTarget = function(event) {
    const id = event.target.id;
    const tile = Matriarch.getTile(id);

    // console.log(tile);
    // console.log(event.target);
    // console.log(potentialTarget.classList.contains('cell'));

    // Target must be a cell on the landscape
    if (tile.element.classList.contains('cell')) {
      // New target must not be the same as the previous target
      if (tile !== currentTarget) {
        previousTarget = currentTarget;
        currentTarget = tile;

        // console.log(previousTarget);
        // console.log(currentTarget);

        if (previousTarget !== undefined && previousTarget !== null) {
          previousTarget.element.removeAttribute('target');
        }

        currentTarget.element.setAttribute('target', '');
      }
    }
  };

  const activateAbility = function(Ability) {
    currentTarget.setAbility(Ability);
    currentTarget.getAbility().activate();
  };

  return {
    faction: faction,

    getCurrentTarget: getCurrentTarget,
    setCurrentTarget: setCurrentTarget,

    activateAbility: activateAbility,
  };
}();

// eslint-disable-next-line no-unused-vars
const God = function() {
  this.add = function(id) {
    const tile = Matriarch.getTile(id);

    this.ownedTiles.push(tile);

    if (tile.hasAbility()) {
      this.poweredTiles.push(tile);
    } else {
      this.powerlessTiles.push(tile);
    }
  };

  this.updateTiles = function() {
    for (let i = 0; i < this.ownedTiles; i++) {
      if (tile.hasAbility()) {
        this.poweredTiles.push(tile);
      } else {
        this.powerlessTiles.push(tile);
      }
    }
  };

  this.getTimeUntilNextActivation = function(minimum, maximum) {
    const time = Math.round(Math.random() * (maximum - minimum) + minimum);
    return time;
  };

  this.check = function(number) {
    let delay = number || 0;
    delay += this.getTimeUntilNextActivation(this.minimum, this.maximum);

    this.currentTimeout = Matriarch.add({
      function: this.activate.bind(this),
      delay: delay,
    });
  };

  this.surroundingTileSelection = Functions.Tiles.surroundingTiles;
  this.radialTileSelection = Functions.Tiles.radialTiles;
  this.evaluate = Functions.evaluate;

  return this;
};

// eslint-disable-next-line no-unused-vars
const EarthGod = function() {
  this.minimum = 10000;
  this.maximum = 20000;

  this.ownedTiles = [];
  this.poweredTiles = [];
  this.powerlessTiles = [];

  this.initialize = function(target) {
    if (target === undefined || target === null) {
      return;
    }

    const targets = [];
    const initialTiles = 32;
    const probability = 0.60;

    targets[0] = target;

    this.selectTiles = function(tileArray) {
      const newTileArray = [];

      if (tileArray.length === 0) {
        return;
      }

      for (let i = 0; i < tileArray.length; i++) {
        let adjacentTiles = this.radialTileSelection(tileArray[i].x, tileArray[i].y, 1, [
          // Check if the faction on the tile is 'void'
          this.evaluate.bind(this, 'getFaction', '=', 'void'),
        ]);

        const validTiles = [];

        for (let j = 0; j < adjacentTiles.length; j++) {
          if (!this.isTarget(adjacentTiles[j])) {
            validTiles.push(adjacentTiles[j]);
          }
        }

        adjacentTiles = validTiles;

        if (adjacentTiles.length === 0) {
          console.log('Hrmm, something is wrong...');
          continue;
        }

        const guaranteedSuccess = Math.floor(Math.random() * adjacentTiles.length);
        let successful = false;

        for (let j = 0; j < adjacentTiles.length; j++) {
          if (!this.isTarget(adjacentTiles[j]) && Math.random() < probability) {
            if (targets.length >= initialTiles) {
              return;
            }

            targets.push(adjacentTiles[j]);
            newTileArray.push(adjacentTiles[j]);
            successful = true;
          }
        }

        if (!successful) {
          if (targets.length >= initialTiles) {
            return;
          }

          targets.push(adjacentTiles[guaranteedSuccess]);
          newTileArray.push(adjacentTiles[guaranteedSuccess]);
        }
      }

      this.selectTiles(newTileArray);

      return targets;
    };

    this.isTarget = function(tile) {
      for (let i = 0; i < targets.length; i++) {
        if (tile === targets[i]) {
          return true;
        }
      }

      return false;
    };

    this.selectTiles([target]);

    let delay = 0;

    for (let i = 0; i < targets.length; i++) {
      delay += Math.random() * 350;

      Matriarch.add({
        function: targets[i].setFaction.bind(this, 'earth'),
        delay: delay,
      });
    }

    Keybindings.unsetKey('enter');
  };

  this.activate = function() {
    // Check to see if there are powerless tiles
    if (this.powerlessTiles.length === 0) {
      this.check();
      return;
    }

    // Target a random powerless tile and give it the 'Fault' ability
    const targetTile = this.powerlessTiles[Math.floor(Math.random() * this.powerlessTiles.length)];
    console.log(targetTile);
    targetTile.setAbility(Fault);
    targetTile.getAbility().activate();

    this.check();
  };
};

const god = new God();

// eslint-disable-next-line no-unused-vars
const GodOfEarth = new EarthGod();
Object.setPrototypeOf(EarthGod.prototype, god);
