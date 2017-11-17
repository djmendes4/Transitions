/*Document created by Dillon Mendes on June 27th, 2015 */
/*Master Copy*/
/*jslint devel: true */

var Transition = function (landscape) {
	'use strict';

	var numberOfRows = landscape.getNumberOfRows(),
		numberOfColumns = landscape.getNumberOfColumns(),
		tiles = landscape.getTiles(),

		shape = {},
		shapeFunction = {},
		criticalValues = [],

		horizontalCenter = Math.floor(numberOfColumns / 2),
		verticalCenter = Math.floor(numberOfRows / 2),
		color = 'black',
		duration = 3000,
		variance = 0.125,
		delay = 0,
		range = 0;

	return {
		getNumberOfColumns: function () {return numberOfColumns; },
		getNumberOfRows: function () {return numberOfRows; },

		getHorizontalCenter: function () {return horizontalCenter; },
		setHorizontalCenter: function (number) {
			horizontalCenter = number;
		},

		getVerticalCenter: function () {return verticalCenter; },
		setVerticalCenter: function (number) {
			verticalCenter = number;
		},

		getColor: function () {return color; },
		setColor: function (string) {
			color = string;
		},

		getCenter: function () {return [horizontalCenter, verticalCenter]; },
		setCenter: function (number1, number2) {
			if (Array.isArray(number1) && number1.length === 2) {
				if (number1[0] >= 0 && number1[0] < numberOfColumns) {
					horizontalCenter = number1[0];
				} else {
					throw new Error('Horizontal center is either less than 0 or greater than ' + numberOfColumns);
				}

				if (number1[1] >= 0 && number1[1] < numberOfRows) {
					verticalCenter = number1[1];
				} else {
					throw new Error('Vertical center is either less than 0 or greater than ' + numberOfRows);
				}
			} else if (Number.isInteger(number1) && Number.isInteger(number2)) {
				if (number1 >= 0 && number1 < numberOfColumns) {
					horizontalCenter = number1;
				} else {
					throw new Error('Horizontal center is either less than 0 or greater than ' + numberOfColumns);
				}

				if (number2 >= 0 && number2 < numberOfRows) {
					verticalCenter = number2;
				} else {
					throw new Error('Vertical center is either less than 0 or greater than ' + numberOfRows);
				}
			} else {
				throw new Error('Incorrect data type for center');
			}
			//console.log([horizontalCenter, verticalCenter]);
		},

		getDuration: function () {return duration; },
		setDuration: function (number) {
			if (!isNaN(number)) {
				if (number >= 0 && number < 43200000) {
					duration = number;
				} else {
					throw new Error('\'Duration\' parameter value is either negative or greater than 43,200,000');
				}
			} else {
				throw new Error('Incorrect data type for \'duration\' parameter');
			}
			//console.log('New duration: ' + number);
		},

		getVariance: function () {return variance; },
		setVariance: function (number) {
			if (!isNaN(number)) {
				if (number >= 0) {
					variance = number;
				} else {
					throw new Error('\'Variance\' parameter value is negative');
				}
			} else {
				throw new Error('Incorrect data type for \'variance\' parameter');
			}
			//console.log('New variance: ' + number);
		},

		getDelay: function () {return delay; },
		setDelay: function (number) {
			if (!isNaN(number)) {
				if (number >= 0) {
					delay = number;
				} else {
					throw new Error('\'Lag\' parameter value is negative');
				}
			} else {
				throw new Error('Incorrect data type for \'delay\' parameter');
			}
			//console.log('New delay: ' + number);
		},

		getShape: function () {return shape; },
		setShape: function (object) {
			shape = object;
		},

		getShapeFunction: function () {return shapeFunction; },
		setShapeFunction: function (object) {
			shapeFunction = object;
		},

		setCriticalValues: function (object) {
			criticalValues = object;
		},

		range: function () {
			var x = 0,
				value = 0,
				absoluteMinimum = 0,
				absoluteMaximum = 0;

			for (x = 0; x < shape.getCriticalValues()(this).length; x += 1) {
				value = shapeFunction(criticalValues[x][0], criticalValues[x][1], this);

				if (value > absoluteMaximum) {
					absoluteMaximum = value;
				} else if (value < absoluteMinimum) {
					absoluteMinimum = value;
				}
			}

			range = absoluteMaximum - absoluteMinimum;
		},

		startTransition: function () {
			var x = 0,
				y = 0,
				noise = 0,
				time = 0,
				value = 0;

			for (x = 0; x < numberOfColumns; x += 1) {
				for (y = 0; y < numberOfRows; y += 1) {
					value = shapeFunction(x, y, this);
					noise = Math.random() * variance;
					time = (((value / range) + noise) * duration) + delay;
//					console.log(delay);
//					console.log(range);

					setTimeout(this.updateCell.bind(this, {
						x: x,
						y: y,
						color: color
					}), time);
				}
			}
		},

		updateCell: function (parameters) {
			tiles[parameters.x][parameters.y].setAttribute('color', parameters.color);
		},

		initialize: function () {
			//console.log('Transition Parameters:');
			//console.log('\t' + 'Horizontal Center: ' + horizontalCenter);
			//console.log('\t' + 'Vertical Center: ' + verticalCenter);
			//console.log('\t' + 'Duration: ' + duration);
			//console.log('\t' + 'Variance: ' + variance);

			shapeFunction = shape.getShapeFunction();
			criticalValues = shape.getCriticalValues()(this);
			this.range();
			this.startTransition();
		}
	};
};

var Shape = function () {
	'use strict';

	var shapeFunction = {},
		criticalValues = [];

	return {
		circle: function () {
			shapeFunction = function (x, y, transition) { return (Math.pow(x - transition.getHorizontalCenter(), 2) + Math.pow(y - transition.getVerticalCenter(), 2)); };
			criticalValues = function (transition) {return [[0, 0], [transition.getNumberOfColumns(), 0], [0, transition.getNumberOfRows()], [transition.getNumberOfColumns(), transition.getNumberOfRows()], [transition.getHorizontalCenter(), transition.getVerticalCenter()]]; };
			return this;
		},

		getShapeFunction: function () {return shapeFunction; },
		getCriticalValues: function () {return criticalValues; }
	};
};

//var Transition = function () {
//	'use strict';
//
//	this.initialize = function () {
//		this.columns = window.landscape.columns;
//		this.rows = window.landscape.rows;
//		this.cells = window.landscape.cells;
//
//		this.parameters = {
//			h: 0,
//			k: 0,
//			alpha: 1,
//			beta: 0,
//			amplitude: 1,
//			b: 7,
//			duration: 5000,
//			variance: 0,
//			color: 'grey',
//			shapeFunction: {},
//			criticalValues: [],
//			range: 0,
//			lag: 0
//		};
//		//console.log('User Defined Parameters:' + '\n\tPattern:\t\t\t' + this.parameters.transition + '\n\tDuration:\t\t\t' + this.parameters.duration + 'ms\n\tHorizontal Center:\t' + this.parameters.h + ' cells\n\tVertical Center:\t' + this.parameters.k + ' cells\n\tNoise(%):\t\t\t' + (this.parameters.variance * 100) + '%');
//
//		this.cellColors = ['blue', 'green', 'purple', 'grey', 'borderOnly', 'red'];
//		this.cycle = 0;
//
//		this.transitionTypes = {
//			linear: {
//				shapeFunction: function (x, y, parameters) { return Math.abs(this.parameters.alpha * (x - this.parameters.h) + this.parameters.beta * (y - this.parameters.k)); }.bind(this),
//				criticalValues: [[0, 0], [this.columns, 0], [0, this.rows], [this.columns, this.rows]],
//				range: 0
//			},
//			quadratic: {
//				shapeFunction: function (x, y, parameters) { return Math.abs(0.01 * Math.pow((x - this.parameters.h), 2) + (y - this.parameters.k)); }.bind(this),
//				criticalValues: [[0, 0], [window.landscape.columns, 0], [0, window.landscape.rows], [window.landscape.columns, window.landscape.rows]],
//				range: 0
//			},
//			sine: {
//				shapeFunction: function (x, y, parameters) { return (Math.abs(this.parameters.amplitude * Math.sin((this.parameters.b * x - this.parameters.h) * (2 * Math.PI / this.columns)) + (y - this.parameters.k))); }.bind(this),
//				criticalValues: [[0, 0], [window.landscape.columns, 0], [0, window.landscape.rows], [window.landscape.columns, window.landscape.rows], [(((window.landscape.columns / 4) + this.parameters.h) / this.parameters.b), 0], [(((window.landscape.columns / 4) + this.parameters.h) / this.parameters.b), window.landscape.rows], [(((3 * window.landscape.columns / 4) + this.parameters.h) / this.parameters.b), 0], [(((3 * window.landscape.columns / 4) + this.parameters.h) / this.parameters.b), window.landscape.rows]],
//				range: 0
//			},
//			circular: {
//				shapeFunction: function (x, y, parameters) { return ((x - this.parameters.h) * (x - this.parameters.h)) + ((y - this.parameters.k) * (y - this.parameters.k)); }.bind(this),
//				criticalValues: [[0, 0], [this.columns, 0], [0, this.rows], [this.columns, this.rows]],
//				range: 0
//			}
//		};
//	};
//
//	this.setAngle = function (alpha) {
//		var beta = 1 - Math.abs(alpha),
//			currentAlpha = this.parameters.alpha;
//
//		if ((typeof alpha === 'number') && (alpha >= 0) && (alpha <= 1)) {
//			this.parameters.alpha = alpha;
//			this.parameters.beta = beta;
//		} else {
//			alpha = this.parameters.alpha;
//			alert('Number entered for alpha is not valid');
//		}
//
//		if (alpha !== currentAlpha) {
////			console.log('Transition specific data requires updating');
//		}
//	};
//
//	this.setAmplitude = function (amplitude) {
//		var currentAmplitude = this.parameters.amplitude;
//
//		if ((typeof amplitude === 'number') && (amplitude !== 0)) {
//			this.parameters.amplitude = amplitude;
//		} else {
//			amplitude = this.parameters.amplitude;
//			alert('Number entered for amplitude is not valid');
//		}
//
//		if (amplitude !== currentAmplitude) {
////			console.log('Transition specific data requires updating');
//		}
//	};
//
//	this.setB = function (b) {
//		var currentB = this.parameters.b;
//
//		if ((typeof b === 'number') && (b !== 0)) {
//			this.parameters.b = b;
//		} else {
//			b = this.parameters.b;
//			alert('Number entered for amplitude is not valid');
//		}
//
//		if (b !== currentB) {
////			console.log('Transition specific data requires updating');
//		}
//	};
//
//	this.setDuration = function (time) {
//		var duration = time || Number(event.target.value);
////		console.log(duration);
//
//		if ((typeof duration === 'number') && (duration >= 0)) {
//			this.parameters.duration = duration;
//		}
//	}.bind(this);
//
//	this.setVariance = function (variance) {
//		if ((typeof variance === 'number') && (variance >= 0) && (variance <= 1)) {
//			this.parameters.variance = variance;
//		} else {
//			this.parameters.variance = Number(event.target.value);
//		}
//	}.bind(this);
//
//	this.setColor = function (color) {
//		var x = 0;
//
//		if (typeof color === 'string') {
//			for (x = 0; x < this.cellColors.length; x += 1) {
//				if (color === this.cellColors[x]) {
//					this.parameters.color = color;
//					break;
//				} else if (x === (this.cellColors.length - 1)) {
//					alert('String entered for color is not valid');
//				}
//			}
//		}
//	};
//
//	this.setLag = function (lag) {
//		if ((typeof lag === 'number') && (lag >= 0)) {
//			this.parameters.lag = lag;
//		}
//	};
//
//	this.setTransition = function (transition1, event) {
//		this.clearTransition();
//
//		if (event) {
//			transition1 = this.transitionTypes[event.target.value];
////			console.log(transition1.shapeFunction);
//		}
//
//		if (transition1) {
//			this.parameters.shapeFunction[0] = transition1.shapeFunction;
//			this.parameters.criticalValues[0] = transition1.criticalValues;
//		}
//	}.bind(this);
//
//	this.clearTransition = function () {
//		this.parameters.shapeFunction = [];
//		this.parameters.criticalValues = [];
//		this.parameters.range = [];
//	};
//
//	this.range = function () {
//		var x = 0,
//			n = 0,
//			value = 0,
//			min = [0],
//			max = [0],
//			compositeMin = 0,
//			compositeMax = 0;
//
//		for (n = 0; n < this.parameters.shapeFunction.length; n += 1) {
//			min[n] = 0;
//			max[n] = 0;
//
//			for (x = 0; x < this.parameters.criticalValues[n].length; x += 1) {
//				value = this.parameters.shapeFunction[n](this.parameters.criticalValues[n][x][0], this.parameters.criticalValues[n][x][1]);
//
//				if (value > max[n]) {
//					max[n] = value;
//				} else if (value < min[n]) {
//					min[n] = value;
//				}
//			}
//		}
//
//		for (n = 0; n < this.parameters.shapeFunction.length; n += 1) {
//			compositeMin += min[n];
//			compositeMax += max[n];
//		}
//
//		this.parameters.range = compositeMax - compositeMin;
//
////		console.log(this.parameters.range);
//
//		return (compositeMax - compositeMin);
//	};
//
//	this.startTransition = function () {
//		var x = 0,
//			y = 0,
//			n = 0,
//			shapeFunction = this.parameters.shapeFunction,
//			parameters = this.parameters,
//			value = 0,
//			range = 0,
//			duration = this.parameters.duration,
//			variance = this.parameters.variance,
//			noise = 0,
//			lag = this.parameters.lag,
//			delay = 0;
//
//		range = this.range();
//
//		for (x = 0; x < window.landscape.columns; x += 1) {
//			for (y = 0; y < window.landscape.rows; y += 1) {
//				value = 0;
//				for (n = 0; n < shapeFunction.length; n += 1) {
//					value += shapeFunction[n](x, y);
//				}
////				value = shapeFunction[0](x, y, parameters);
//				noise = Math.random() * variance;
//				delay = (((value / range) + noise) * duration) + lag;
//
//				setTimeout(this.change.bind(this, x, y, this.parameters.color), delay);
//			}
//		}
//	};
//
//	this.change = function (x, y, color) {
//		this.cells[x][y].setAttribute('color', color);
//	};
//};
