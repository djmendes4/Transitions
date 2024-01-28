/* Document created by Dillon Mendes on May 7th, 2023 */
/* Master Copy */

/* eslint-disable max-len */

'use strict';

// const Handler2 = function() {
//   const listOfEventListeners = [];

//   return {
//     getEventListeners: function() {
//       return listOfEventListeners;
//     },
//   };
// };

const Handler = function() {
  const thisTimer = {};

  this.initializeEvents = function() {
    document.getElementById('settings-toggle').addEventListener('click', this.toggleSettingsMenu);

    Object.values(document.getElementsByClassName('option')).forEach((option) => {
      thisTimer[option.attributes['name'].value] = [];
      option.addEventListener('mouseover', this.showTooltip.bind(this, option));
      option.addEventListener('mouseout', this.hideTooltip.bind(this, option));
    });

    document.getElementById('transition_duration').addEventListener('change', this.update);

    document.getElementById('clear_transition').addEventListener('click', this.clearTransition);
  };

  this.toggleSettingsMenu = function(event) {
    const state = (document.getElementById('settings-toggle').getAttribute('state'));

    if (state === null) {
      document.getElementById('settings-toggle').setAttribute('state', '1');
      document.getElementById('settings-Menu').setAttribute('lowered', '');

      setTimeout(function() {
        document.getElementById('settings-toggle').setAttribute('state', '2');
      }, 600);
    } else if (state === '2') {
      document.getElementById('settings-toggle').setAttribute('state', '3');
      document.getElementById('settings-Menu').removeAttribute('lowered');

      setTimeout(function() {
        document.getElementById('settings-toggle').removeAttribute('state');
      }, 600);
    }
  };

  this.showTooltip = function(option, event) {
    // console.log(option.attributes['name'].value);

    Object.values(document.getElementsByClassName('tooltip')).forEach((tooltip) => {
      if (tooltip.attributes['name'].value === option.attributes['name'].value) {
        thisTimer[tooltip.attributes['name'].value].forEach((timer) => {
          clearTimeout(timer);
        });

        tooltip.setAttribute('enable', '');

        thisTimer[tooltip.attributes['name'].value][0] = setTimeout(function() {
          tooltip.setAttribute('tooltip', '');
        }, 300);
      }
    });
  },

  this.hideTooltip = function(option, event) {
    Object.values(document.getElementsByClassName('tooltip')).forEach((tooltip) => {
      if (tooltip.attributes['name'].value === option.attributes['name'].value) {
        thisTimer[tooltip.attributes['name'].value].forEach((timer) => {
          clearTimeout(timer);
        });

        thisTimer[tooltip.attributes['name'].value][1] = (setTimeout(function() {
          tooltip.removeAttribute('tooltip');
        }, 50));
        thisTimer[tooltip.attributes['name'].value][2] = (setTimeout(function() {
          tooltip.removeAttribute('enable');
        }, 1200));
      }
    });
  };

  this.update = function(event) {
    console.log(event.target.value);
    matriarch.getTransition().setDuration(event.target.value);
    console.log(matriarch.getTransition().parameters);
    matriarch.getTransition().setColor('red');
    matriarch.getTransition().startTransition();
    console.log(matriarch.getTransition());
  };

  this.clearTransition = function() {
    console.log('Clearing Landscape...');
    matriarch.getLandscape().resetLandscape();
  };

  this.validateSetting = function(parameterName) {
    console.log(parameterName['duration']);
  };

  // document.documentElement.webkitRequestFullScreen();
};

const handler = new Handler();
handler.initializeEvents();

// Consider a form of encryption such that the decryption is dependent on randomly generated segments of a codex;
// Strengths: the security of such an encryption algorithm depends on the rarity of the codex;

// Information-theoretic (One time pad)
// Cryptography and Perfect Forward Secrecy
