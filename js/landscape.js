/*Document created by Dillon Mendes on June 27th, 2015 */
/*Master Copy*/
/*jslint devel: true */

//Function used to create the background pattern of the opening cinematic.
var Landscape = function () {
	'use strict';

	this.main = function () {
		this.initialize();
		this.createGrid();
	};

	this.initialize = function () {
		this.landscape = document.getElementById('landscape');
		this.width = screen.width;
		this.height = this.landscape.clientHeight;
		this.borderWidth = 3;
		//console.log('Landscape Attributes:' + '\n\tSection ID:\t\t\tlandscape' + '\n\tWidth:\t\t\t\t' + this.width + 'px\n\tHeight:\t\t\t\t' + this.height + 'px\n\tBorder Width:\t\t' + this.borderWidth + 'px');

		this.cells = [];
		this.cellSize = 12;
		this.cellBorderWidth = 1;
		this.columns = Math.ceil(this.width / (this.cellSize + this.cellBorderWidth));
		this.rows = Math.floor(this.height / (this.cellSize + this.cellBorderWidth));
		//console.log('Cell Attributes:' + '\n\tSize:\t\t\t\t' + this.cellSize + 'px\n\tBorder Width:\t\t' + this.cellBorderWidth + 'px\n\tColumns:\t\t\t' + this.columns + '\n\tRows:\t\t\t\t' + this.rows);

		this.cellTones = ['t0', 't1', 't2', 't3', 't4'];
		//console.log('Cell Properties:' + '\n\tTones:\t\t\t\t5');
	};

	this.createGrid = function () {
		var x = 0,
			y = 0,
			colorTone = 0,
			centerWidth = 0,
			centerHeight = 0,
			style = '',
			newDiv = {},
			newStyle = document.createElement('style'),
			fragment = document.createDocumentFragment();

		centerWidth = Math.floor(((this.columns * (this.cellSize + this.cellBorderWidth) + this.cellBorderWidth) - (this.width)) / 2);
		centerHeight = (this.cellSize + this.cellBorderWidth) * this.rows - this.cellBorderWidth;

		for (x = 0; x < this.columns; x += 1) {
			this.cells[x] = [];
			for (y = 0; y < this.rows; y += 1) {
				colorTone = Math.floor(Math.random() * this.cellTones.length);

				newDiv = document.createElement('div');
				newDiv.setAttribute('id', x + ',' + y);
				newDiv.setAttribute('class', 'cell ' + this.cellTones[colorTone]);
				newDiv.style.left = (x * (this.cellSize + this.cellBorderWidth) - centerWidth) + 'px';
				newDiv.style.top = (y * (this.cellSize + this.cellBorderWidth) - this.cellBorderWidth) + 'px';

				fragment.appendChild(newDiv);

				this.cells[x][y] = newDiv;
			}
		}

		newStyle.type = 'text/css';
		style = '\n.cell {\n\twidth: ' + this.cellSize + 'px;\n\theight: ' + this.cellSize + 'px;\n\tborder-width: ' + this.cellBorderWidth + 'px;\n}\n';
		style += '#landscape {\n\theight: ' + centerHeight + 'px;\n\tborder-width: ' + this.borderWidth + 'px 0px;\n}\n';

		if (newStyle.styleSheet) {
			newStyle.styleSheet.cssText = style;
		} else {
			newStyle.appendChild(document.createTextNode(style));
		}

		document.getElementsByTagName('head')[0].appendChild(newStyle);
		this.landscape.appendChild(fragment);
	};

	this.main();
};

var Transition = function () {
	'use strict';

	this.initialize = function (landscape) {
		this.columns = landscape.columns;
		this.rows = landscape.rows;
		this.cells = landscape.cells;

		this.parameters = {
			h: 0,
			k: 0,
			alpha: 1,
			beta: 0,
			amplitude: 1,
			b: 7,
			duration: 5000,
			variance: 0,
			color: 'grey',
			shapeFunction: {},
			criticalValues: [],
			range: 0,
			lag: 0
		};
		//console.log('User Defined Parameters:' + '\n\tPattern:\t\t\t' + this.parameters.transition + '\n\tDuration:\t\t\t' + this.parameters.duration + 'ms\n\tHorizontal Center:\t' + this.parameters.h + ' cells\n\tVertical Center:\t' + this.parameters.k + ' cells\n\tNoise(%):\t\t\t' + (this.parameters.variance * 100) + '%');

		this.cellColors = ['blue', 'green', 'purple', 'grey', 'borderOnly', 'red'];
		this.cycle = 0;

		this.diagonal = {
			shapeFunction: function (x, y, parameters) { return Math.abs(this.parameters.alpha * (x - this.parameters.h) + this.parameters.beta * (y - this.parameters.k)); }.bind(this),
			criticalValues: [[0, 0], [this.columns, 0], [0, this.rows], [this.columns, this.rows]],
			range: 0
		};

		this.circular = {
			shapeFunction: function (x, y, parameters) { return ((x - this.parameters.h) * (x - this.parameters.h)) + ((y - this.parameters.k) * (y - this.parameters.k)); }.bind(this),
			criticalValues: [[0, 0], [this.columns, 0], [0, this.rows], [this.columns, this.rows]],
			range: 0
		};

		this.sinWave = {
			shapeFunction: function (x, y, parameters) { return (Math.abs(this.parameters.amplitude * Math.sin((this.parameters.b * x - this.parameters.h) * (2 * Math.PI / this.columns)) + (y - this.parameters.k))); }.bind(this),
			criticalValues: [[0, 0], [this.columns, 0], [0, this.rows], [this.columns, this.rows], [(((this.columns / 4) + this.parameters.h) / this.parameters.b), 0], [(((this.columns / 4) + this.parameters.h) / this.parameters.b), this.rows], [(((3 * this.columns / 4) + this.parameters.h) / this.parameters.b), 0], [(((3 * this.columns / 4) + this.parameters.h) / this.parameters.b), this.rows]],
			range: 0
		};
	};

	this.setDimensions = function (landscape) {
		var columns = landscape.columns,
			rows = landscape.rows;

		this.columns = columns;
		this.rows = rows;
	};

	this.setCenter = function (x, y) {
		var h = x,
			k = y,
			currentH = this.parameters.h,
			currentK = this.parameters.k;

		if ((h % 1 === 0) && (h >= 0) && (h <= this.columns)) {
			this.parameters.h = h;
		} else {
			h = this.parameters.h;
			alert('Number entered for Horizontal Center is not valid');
		}

		if ((k % 1 === 0) && (k >= 0) && (k <= this.rows)) {
			this.parameters.k = k;
		} else {
			k = this.parameters.k;
			alert('Number entered for Vertical Center is not valid');
		}

		if ((h !== currentH) || (k !== currentK)) {
			console.log('Transition specific data requires updating');
		}

		console.log('New Center:\t\t\t\t(' + this.parameters.h + ', ' + this.parameters.k + ')');
	};

	this.setAngle = function (alpha) {
		var beta = 1 - Math.abs(alpha),
			currentAlpha = this.parameters.alpha;

		if ((typeof alpha === 'number') && (alpha >= 0) && (alpha <= 1)) {
			this.parameters.alpha = alpha;
			this.parameters.beta = beta;
		} else {
			alpha = this.parameters.alpha;
			alert('Number entered for alpha is not valid');
		}

		if (alpha !== currentAlpha) {
			console.log('Transition specific data requires updating');
		}
	};

	this.setAmplitude = function (amplitude) {
		var currentAmplitude = this.parameters.amplitude;

		if ((typeof amplitude === 'number') && (amplitude !== 0)) {
			this.parameters.amplitude = amplitude;
		} else {
			amplitude = this.parameters.amplitude;
			alert('Number entered for amplitude is not valid');
		}

		if (amplitude !== currentAmplitude) {
			console.log('Transition specific data requires updating');
		}
	};

	this.setB = function (b) {
		var currentB = this.parameters.b;

		if ((typeof b === 'number') && (b !== 0)) {
			this.parameters.b = b;
		} else {
			b = this.parameters.b;
			alert('Number entered for amplitude is not valid');
		}

		if (b !== currentB) {
			console.log('Transition specific data requires updating');
		}
	};

	this.setDuration = function (duration) {
		if ((typeof duration === 'number') && (duration >= 0)) {
			this.parameters.duration = duration;
		}
	};

	this.setVariance = function (variance) {
		if ((typeof variance === 'number') && (variance >= 0) && (variance <= 1)) {
			this.parameters.variance = variance;
		}
	};

	this.setColor = function (color) {
		var x = 0;

		if (typeof color === 'string') {
			for (x = 0; x < this.cellColors.length; x += 1) {
				if (color === this.cellColors[x]) {
					this.parameters.color = color;
					break;
				} else if (x === (this.cellColors.length - 1)) {
					alert('String entered for color is not valid');
				}
			}
		}
	};

	this.setLag = function (lag) {
		if ((typeof lag === 'number') && (lag >= 0)) {
			this.parameters.lag = lag;
		}
	};

	this.setTransition = function (transition1, transition2) {
		this.clearTransition();

		if (transition1) {
			this.parameters.shapeFunction[0] = transition1.shapeFunction;
			this.parameters.criticalValues[0] = transition1.criticalValues;
		}

		if (transition2) {
			this.parameters.shapeFunction.push(transition2.shapeFunction);
			this.parameters.criticalValues.push(transition2.criticalValues);
		}
	};

	this.clearTransition = function () {
		this.parameters.shapeFunction = [];
		this.parameters.criticalValues = [];
		this.parameters.range = [];
	};

	this.range = function () {
		var x = 0,
			n = 0,
			value = 0,
			min = [0],
			max = [0],
			compositeMin = 0,
			compositeMax = 0;

		for (n = 0; n < this.parameters.shapeFunction.length; n += 1) {
			min[n] = 0;
			max[n] = 0;

			for (x = 0; x < this.parameters.criticalValues[n].length; x += 1) {
				value = this.parameters.shapeFunction[n](this.parameters.criticalValues[n][x][0], this.parameters.criticalValues[n][x][1]);

				if (value > max[n]) {
					max[n] = value;
				} else if (value < min[n]) {
					min[n] = value;
				}
			}
		}

		for (n = 0; n < this.parameters.shapeFunction.length; n += 1) {
			compositeMin += min[n];
			compositeMax += max[n];
		}

		this.parameters.range = compositeMax - compositeMin;

		console.log(this.parameters.range);

		return (compositeMax - compositeMin);
	};

	this.startTransition = function () {
		var x = 0,
			y = 0,
			n = 0,
			shapeFunction = this.parameters.shapeFunction,
			parameters = this.parameters,
			value = 0,
			range = 0,
			duration = this.parameters.duration,
			variance = this.parameters.variance,
			noise = 0,
			lag = this.parameters.lag,
			delay = 0;

		range = this.range();

		for (x = 0; x < this.columns; x += 1) {
			for (y = 0; y < this.rows; y += 1) {
				value = 0;
				for (n = 0; n < shapeFunction.length; n += 1) {
					value += shapeFunction[n](x, y);
				}
//				value = shapeFunction[0](x, y, parameters);
				noise = Math.random() * variance;
				delay = (((value / range) + noise) * duration) + lag;

				setTimeout(this.change.bind(this, x, y, this.parameters.color), delay);
			}
		}
	};

	this.change = function (x, y, color) {
		this.cells[x][y].setAttribute('color', color);
	};
};

var Interface = function () {
	'use strict';


};

var blank = new Landscape();
var neon = new Transition();

neon.initialize(blank);
neon.setTransition(neon.diagonal);
neon.setCenter(0, 18);
neon.setColor('grey');
neon.setAngle(0);
neon.setVariance(0.15);
neon.setDuration(3200);
neon.setLag(0);
neon.setAmplitude(5);
neon.setB(3.5);
neon.startTransition();

window.setInterval(function () {
	'use strict';
	neon.setAngle(0.6);
	neon.setTransition(neon.sinWave);
	neon.setCenter(Math.floor(Math.random() * neon.columns), Math.floor(Math.random() * neon.rows));
	neon.setColor(neon.cellColors[neon.cycle % 3]);
	neon.setLag(0);
	neon.startTransition();
	neon.cycle += 1;
}, 6400);
