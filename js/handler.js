/* Document created by Dillon Mendes on June 27th, 2015 */
/* Master Copy */

/* eslint-disable max-len */

// Function used to create the background pattern for the game

'use strict';

// eslint-disable-next-line no-unused-vars
const Handler2 = function() {
  const listeners = [];

  const addListener = function(element, type, action) {
    const newListener = document.getElementById(element).addEventListener(type, action);

    listeners.push(newListener);
  };

  // eslint-disable-next-line no-unused-vars
  const initialize = function() {
  }();

  return {
    addListener: addListener,
  };
}();

Handler2.addListener('landscape', 'click', Player.setCurrentTarget);

// eslint-disable-next-line no-unused-vars
const Keybindings = function() {
  const keys = {
    digit1: {},
    digit2: {},
    digit3: {},
    digit4: {},
    digit5: {},
    digit6: {},
    digit7: {},
    digit8: {},
    digit9: {},
    digit0: {},
  };

  const setKey = function(code, action) {
    // console.log(keys[code]);
    keys[code] = action;
    // console.log(keys[code]);

    document.addEventListener('keydown', handler);
  };

  const unsetKey = function(code) {
    keys[code] = function() {};
  };

  const handler = function(event) {
    // console.log(event.code);
    switch (event.code) {
      case 'Digit1':
        Player.getCurrentTarget().setAbility(keys['digit1']).activate();
        break;
      case 'Digit2':
        Player.activateAbility(keys['digit2']);
        break;
      case 'Digit3':
        Player.activateAbility(keys['digit3']);
        break;
      case 'Digit4':
        Player.activateAbility(keys['digit4']);
        break;
      case 'Digit5':
        Player.activateAbility(keys['digit5']);
        break;
      case 'Space':
        keys['space']();
        break;
      case 'Enter':
        keys['enter'](Player.getCurrentTarget());
        break;
    };
  };

  setKey('digit1', Fault);
  setKey('digit2', ReverseFault);
  setKey('digit3', Crumble);
  setKey('digit4', Slip);
  setKey('digit5', Quake);

  return {
    setKey: setKey,
    unsetKey: unsetKey,
  };
}();
