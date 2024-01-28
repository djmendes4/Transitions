/* Document created by Dillon Mendes on May 7th, 2023 */
/* Master Copy */

/* eslint-disable max-len */

const Matriarch = function() {
  // Each action will consist of:
  //    id = A unique identifier
  //    timer = The timer (Timer Object)
  //    timestamp = The timestamp the timer was created (Date Object)
  //    delay = The time the timer was set for (Number)
  //    function = The function to be executed when the timer is finished (Function)
  let actions = [];

  let isPaused = false;
  let pausedActions = [];

  let actionCount = 0;

  const tiles = [];

  for (let x = 0; x < Landscape.numberOfColumns; x++) {
    for (let y = 0; y < Landscape.numberOfRows; y++) {
      tiles[y * Landscape.numberOfColumns + x] = new Tile(x, y);
    }
  }

  const awaken = function() {
    console.log('Latent energy resonates in the presence of... something...');
  };

  const add = function(action) {
    if (action === undefined || action === null) {
      return;
    }

    action.timer = setTimeout(execute.bind(null, action.function, actionCount), action.delay);
    action.timestamp = new Date();

    actions.push({
      id: actionCount,
      timer: action.timer,
      timestamp: action.timestamp,
      delay: action.delay,
      function: action.function,
    });

    actionCount += 1;

    // console.log(actions);

    return action.timer;
  };

  const execute = function(action, id, thisArg) {
    subtract(id);
    action();
  };

  const subtract = function(id) {
    if (id === undefined || id === null) {
      console.log('Subtracting an action without an id...');
      return;
    }

    for (let i = 0; i < actions.length; i++) {
      if (actions[i].id === id) {
        actions.splice(i, 1);
      }
    }
  };

  const pause = function() {
    // If the game is not paused
    if (!isPaused) {
      console.log('Pausing the game...');

      const now = new Date();

      for (let i = 0; i < actions.length; i++) {
        // Calculate the amount of time remaining on each timer
        const newDelay = actions[i].delay - (now - actions[i].timestamp);

        // Log the amount of time remaining on each timer before clearing the timer
        console.log(newDelay);

        pausedActions.push({
          id: actions[i].id,
          timer: null,
          timestamp: null,
          delay: newDelay,
          function: actions[i].function,
        });

        // Clear the timer remove from action loop
        clearTimeout(actions[i].timer);
      }

      // Log the paused actions array
      console.log(pausedActions);

      // Clear the actions array
      actions = [];

      // Set the isPaused variable to true
      isPaused = true;
    } else if (isPaused) {
      console.log('Unpausing the game...');

      for (let i = 0; i < pausedActions.length; i++) {
        Matriarch.add({
          function: pausedActions[i].function,
          delay: pausedActions[i].delay,
        });
      }

      // Clear the paused actions array
      pausedActions = [];

      // Set the isPaused variable to false
      isPaused = false;
    }
  };

  const getTile = function(id) {
    if (id.x !== undefined && id.y !== undefined) {
      return tiles[id.y * Landscape.numberOfColumns + id.x];
    } else {
      return tiles[id];
    }
  };

  return {
    awaken: awaken,

    add: add,
    // subtract: subtract,
    pause: pause,

    getTile: getTile,
  };
}();

Matriarch.awaken();
Matriarch.factions = [
  'void',
  'water',
  'earth',
  'fire',
  'air',
];

GodOfEarth.activate();

Keybindings.setKey('space', Matriarch.pause.bind(Matriarch));
Keybindings.setKey('enter', GodOfEarth.initialize.bind(GodOfEarth));

