/* Document created by Dillon Mendes on June 27th, 2015 */
/* Master Copy */

/* eslint-disable max-len */

// Function used to create the background pattern for the game

const getTilesWithinRadius = function(x, y, radius) {
  const tiles = {};
  const count = 0;

  for (let dx = x - radius; dx <= x + radius; x++) {
    for (let dy = y - radius; dy <= y + radius; y++) {
      const distance = Math.sqrt(Math.pow((x - cx), 2) + Math.pow((y - cy), 2));
      // To be selected:
      //  - The tile must be within the radius of the selection circle (i.e. less than the radius)
      //  - The tile must be on the grid (greater than 0 and less than the maximum number of tiles both vertically and horizontally)
      //  - The tile must not be the tile these calculations are based on (x, y)
      if (distance <= radius && x >= 0 && x < Landscape.numberOfColumns && y >= 0 && y < Landscape.numberOfRows && (x !== cx || y !== cy)) {
        tiles[count].x = dx;
        tiles[count].y = dy;
      }
    }
  }

  return tiles;
};

export {getTilesWithinRadius};
