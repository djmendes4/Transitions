/* Document created by Dillon Mendes on June 13th, 2023 */
/* Master Copy */

/* eslint-disable max-len */

'use strict';

// eslint-disable-next-line no-unused-vars
const Tile = function(xCoordinate, yCoordinate) {
  const x = xCoordinate;
  const y = yCoordinate;

  const id = y * Landscape.numberOfColumns + x;
  const element = document.getElementById(id);

  let level = Math.floor(Math.random() * 5);
  let faction = 'void';
  let ability = null;
  let abilityName = null;

  element.setAttribute('level', level);
  element.setAttribute('faction', faction);

  const getLevel = function() {
    return level;
  };

  const setLevel = function(integer) {
    // Must be an integer between 0 and 4
    if (Number.parseInt(integer) >= 0 && Number.parseInt(integer) <= 4) {
      level = integer;
    }

    element.setAttribute('level', level);
    return level;
  };

  const getFaction = function() {
    return faction;
  };

  const setFaction = function(string) {
    if (validateFaction(string)) {
      faction = string;
    }

    element.setAttribute('faction', faction);
    GodOfEarth.add(id);

    return faction;
  };

  const validateFaction = function(string) {
    for (let i = 0; i < Matriarch.factions.length; i++) {
      if (Matriarch.factions[i] === string) {
        // console.log('Faction is \'' + string + '\'');
        return true;
      }
    }

    return false;
  };

  const getAbility = function() {
    return ability;
  };

  const getAbilityName = function() {
    return abilityName;
  };

  const setAbility = function(Ability) {
    ability = new Ability(id);
    abilityName = ability.getName();

    setFaction(ability.getFaction());

    return ability;
  };

  const hasAbility = function() {
    if (ability !== null && ability !== undefined) {
      return true;
    } else {
      return false;
    }
  };

  return {
    id: id,
    element: element,
    x: x,
    y: y,

    getLevel: getLevel,
    setLevel: setLevel,

    getFaction: getFaction,
    setFaction: setFaction,

    hasAbility: hasAbility,
    getAbility: getAbility,
    getAbilityName: getAbilityName,
    setAbility: setAbility,
  };
};

Functions.Tiles = {
  orthogonalTiles: function(x, y) {
    const orthogonalTiles = [];
    let id;

    if (x - 1 >= 0 && x - 1 < Landscape.numberOfColumns) {
      id = y * Landscape.numberOfColumns + (x - 1);
      orthogonalTiles.push(Matriarch.getTile(id));
    }

    if (x + 1 >= 0 && x + 1 < Landscape.numberOfColumns) {
      id = y * Landscape.numberOfColumns + (x + 1);
      orthogonalTiles.push(Matriarch.getTile(id));
    }

    if (y - 1 >= 0 && y - 1 < Landscape.numberOfRows) {
      id = (y - 1) * Landscape.numberOfColumns + x;
      orthogonalTiles.push(Matriarch.getTile(id));
    }

    if (y + 1 >= 0 && y + 1 < Landscape.numberOfRows) {
      id = (y + 1) * Landscape.numberOfColumns + x;
      orthogonalTiles.push(Matriarch.getTile(id));
    }

    return orthogonalTiles;
  },

  diagonalTiles: function(x, y) {
    const diagonalTiles = [];
    let id;

    if (x - 1 >= 0 && y - 1 >= 0) {
      id = (y - 1) * Landscape.numberOfColumns + (x - 1);
      diagonalTiles.push(Matriarch.getTile(id));
    }

    if (x + 1 <= Landscape.numberOfColumns && y - 1 >= 0) {
      id = (y - 1) * Landscape.numberOfColumns + (x + 1);
      diagonalTiles.push(Matriarch.getTile(id));
    }

    if (x - 1 >= 0 && y + 1 <= Landscape.numberOfRows) {
      id = (y + 1) * Landscape.numberOfColumns + (x - 1);
      diagonalTiles.push(Matriarch.getTile(id));
    }

    if (x + 1 <= Landscape.numberOfColumns && y + 1 <= Landscape.numberOfRows) {
      id = (y + 1) * Landscape.numberOfColumns + (x + 1);
      diagonalTiles.push(Matriarch.getTile(id));
    }

    return diagonalTiles;
  },

  surroundingTiles: function(x, y) {
    const cx = x;
    const cy = y;

    const surroundingTiles = [];
    let id;

    for (let x = cx - 1; x <= cx + 1; x++) {
      for (let y = cy - 1; y <= cy + 1; y++) {
        if (x >= 0 && x < Landscape.numberOfColumns && y >= 0 && y < Landscape.numberOfRows && (x !== cx || y !== cy)) {
          id = (y) * Landscape.numberOfColumns + (x);
          surroundingTiles.push(Matriarch.getTile(id));
        }
      }
    }

    return surroundingTiles;
  },

  radialTiles: function(x, y, parameters) {
    const cx = x;
    const cy = y;
    const radius = parameters.radius;

    // Radius greater than or equal to 1 and less than (2)^1/2 = Orthogonally Tiles
    // Radius greater than (2)^1/2 and less than 2 = Surrounding Tiles

    const radialTiles = [];
    let id;

    for (let x = cx - radius; x <= cx + radius; x++) {
      for (let y = cy - radius; y <= cy + radius; y++) {
        const distance = Math.sqrt(Math.pow((x - cx), 2) + Math.pow((y - cy), 2));

        if (distance <= radius && x >= 0 && x < Landscape.numberOfColumns && y >= 0 && y < Landscape.numberOfRows && (x !== cx || y !== cy)) {
          id = (y) * Landscape.numberOfColumns + (x);
          radialTiles.push(Matriarch.getTile(id));
        }
      }
    }

    return radialTiles;
  },

  latitudinalTiles: function(x, y) {
    const latitudinalTiles = [];
    let id;

    if (x - 1 >= 0 && x - 1 < Landscape.numberOfColumns) {
      id = y * Landscape.numberOfColumns + (x - 1);
      latitudinalTiles.push(Matriarch.getTile(id));
    }

    if (x + 1 >= 0 && x + 1 < Landscape.numberOfColumns) {
      id = y * Landscape.numberOfColumns + (x + 1);
      latitudinalTiles.push(Matriarch.getTile(id));
    }

    return latitudinalTiles;
  },

  longitudinalTiles: function(x, y) {
    const longitudinalTiles = [];
    let id;

    if (y - 1 >= 0 && y - 1 < Landscape.numberOfRows) {
      id = (y - 1) * Landscape.numberOfColumns + x;
      longitudinalTiles.push(Matriarch.getTile(id));
    }

    if (y + 1 >= 0 && y + 1 < Landscape.numberOfRows) {
      id = (y + 1) * Landscape.numberOfColumns + x;
      longitudinalTiles.push(Matriarch.getTile(id));
    }

    return longitudinalTiles;
  },
};

import {getTilesWithinRadius} from './tile_selection_functions';

Functions.Tiles.test = getTilesWithinRadius;
