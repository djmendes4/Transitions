/* Document created by Dillon Mendes on June 27th, 2015 */
/* Master Copy */

/* eslint-disable max-len */

// Functions used to create a transition that fills the landscape

'use strict';

// eslint-disable-next-line no-unused-vars
const Transition = function(transition) {
  const rows = Landscape.numberOfRows;
  const columns = Landscape.numberOfColumns;
  const cells = Landscape.cellMatrix;

  transition = transition === undefined ? {} : transition;

  let shape;
  let duration;
  let variance;
  let lag;
  let color;

  const setShape = function(object) {
    // console.log('Setting Transition Shape...');
    // console.log('\tPassed Value:');
    // console.log('\t\t' + object);

    shape = object;
  };

  const setDuration = function(number) {
    // console.log('Setting Transition Duration...');
    // console.log('\tPassed Values: ' + number);

    const defaultValue = 3200;
    number = number === undefined ? defaultValue : number;

    // console.log('\tTransition Duration: ' + typeof Number(number) + ' : ' + number);

    if (typeof Number(number) === 'number') {
      duration = Number.parseInt(number, 10);
    } else { // default value
      duration = defaultValue;
    }

    // console.log('\tTransition Duration: ' + typeof Number(h) + ' : ' + duration);
  };

  const setVariance = function(number) {
    // console.log('Setting Transition Variance...');
    // console.log('\tPassed Values: ' + number);

    const defaultValue = 0;
    number = number === undefined ? defaultValue : number;

    // console.log('\tTransition Variance: ' + typeof Number(number) + ' : ' + number);

    if (typeof Number(number) === 'number') {
      variance = Number.parseInt(number, 10);
    } else { // default value
      variance = defaultValue;
    }

    // console.log('\tTransition Variance: ' + typeof Number(h) + ' : ' + variance);
  };

  const setLag = function(number) {
    // console.log('Setting Transition Lag...');
    // console.log('\tPassed Values: ' + number);

    const defaultValue = 0;
    number = number === undefined ? defaultValue : number;

    // console.log('\tTransition Lag: ' + typeof Number(number) + ' : ' + number);

    if (typeof Number(number) === 'number') {
      lag = Number.parseInt(number, 10);
    } else { // default value
      lag = defaultValue;
    }

    // console.log('\tTransition Lag: ' + typeof Number(h) + ' : ' + lag);
  };

  const setColor = function(string) {
    color = string;
  };

  const calculateRange = function() {
    let x = 0;
    let value = 0;
    let min = 0;
    let max = 0;
    const criticalValues = shape.criticalValues();

    for (x = 0; x < criticalValues.length; x += 1) {
      value = shape.shapeFunction(criticalValues[x][0], criticalValues[x][1]);

      if (value > max) {
        max = value;
      } else if (value < min) {
        min = value;
      }
    }

    // console.log(max + ' - ' + min + ' = ' + (max - min));
    return (max - min);
  };

  const change = function(x, y, color) {
    cells[y][x].setAttribute('color', color);
  };

  // eslint-disable-next-line no-unused-vars
  const initialize = function() {
    setShape(transition.shape);
    setDuration(transition.duration);
    setVariance(transition.variance);
    setLag(transition.lag);
    setColor(transition.color);
  }();

  return {
    setShape: setShape,
    setDuration: setDuration,
    setVariance: setVariance,
    setLag: setLag,
    setColor: setColor,

    startTransition: function() {
      let x = 0;
      let y = 0;

      let value = 0;
      let noise;
      let delay;

      const range = calculateRange();

      for (y = 0; y < rows; y += 1) {
        for (x = 0; x < columns; x += 1) {
          value = shape.shapeFunction(y, x);
          noise = (Math.random() - 0.5) * 2 * variance;
          delay = (((value / range) * duration) + noise) + lag;

          setTimeout(change.bind(this, x, y, color), delay);
        }
      }
    },
  };
};

// eslint-disable-next-line no-unused-vars
const Circle = function() {
  let h = 0;
  let k = 0;
  const rows = Landscape.numberOfRows;
  const columns = Landscape.numberOfColumns;

  const shapeFunction = function(x, y, parameters) {
    return Math.pow((x - h), 2) + Math.pow((y - k), 2);
  };

  const criticalValues = function() {
    return [[0, 0], [columns, 0], [0, rows], [columns, rows]];
  };

  const setCenter = function(x, y) {
    // console.log('Setting Transition Center...');
    // console.log('\tPassed Values: ' + x + ', ' + y);

    const defaultValueX = 0;
    const defaultValueY = 0;
    x = x === undefined ? defaultValueX : x;
    y = y === undefined ? defaultValueY : y;

    // console.log('\tTransition Center: (' + typeof Number(x) + ' : ' + x + ', ' + typeof Number(x) + ' : ' + y + ')');

    if (typeof Number(x) === 'number' && typeof Number(y) === 'number') {
      h = Number.parseInt(x, 10);
      k = Number.parseInt(y, 10);
    } else { // default values
      h = defaultValueX;
      k = defaultValueY;
    }

    // console.log('\tTransition Center: (' + typeof Number(x) + ' : ' + x + ', ' + typeof Number(x) + ' : ' + y + ')');
  };

  return {
    setCenter: setCenter,
    shapeFunction: shapeFunction,
    criticalValues: criticalValues,
  };
};

// const purpleWave = new Transition({
//   shape: new Circle(),
//   duration: 3200,
//   variance: 400,
//   lag: 3200,
//   color: 'purple',
// });
// purpleWave.startTransition();

// const greenWave = new Transition({
//   shape: new Circle(),
//   duration: 6400,
//   variance: 400,
//   lag: 0,
//   color: 'green',
// });
// greenWave.startTransition();

// const redWave = new Transition({
//   shape: new Circle(),
//   duration: 12800,
//   variance: 400,
//   lag: 4800,
//   color: 'red',
// });
// redWave.startTransition();
