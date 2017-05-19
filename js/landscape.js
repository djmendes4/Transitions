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
		this.cellWidth = 12;
		this.cellHeight = 12;
		this.cellBorderWidth = 1;
		this.cellBorderRadius = 0;
		this.columns = Math.ceil(this.width / (this.cellWidth + this.cellBorderWidth));
		this.rows = Math.floor(this.height / (this.cellHeight + this.cellBorderWidth));
		console.log('Cell Attributes:' + '\n\tSize:\t\t\t\t' + this.cellSize + 'px\n\tBorder Width:\t\t' + this.cellBorderWidth + 'px\n\tColumns:\t\t\t' + this.columns + '\n\tRows:\t\t\t\t' + this.rows);

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
			svgns = "http://www.w3.org/2000/svg",
			newDiv = {},
			newSVGRect = {},
			newStyle = document.createElement('style'),
			newSVG = document.createElementNS(svgns, 'svg'),
			fragment = document.createDocumentFragment();

		centerWidth = Math.ceil(((this.columns * (this.cellWidth + this.cellBorderWidth) + this.cellBorderWidth) - (this.width)) / 2);
		centerHeight = (this.cellHeight + this.cellBorderWidth) * this.rows - this.cellBorderWidth;

		newSVG.setAttribute('id', 'Guile');
		newSVG.setAttribute('width', this.columns * (this.cellWidth + this.cellBorderWidth) + this.cellBorderWidth);
		newSVG.setAttribute('height', centerHeight);

		for (x = 0; x < this.columns; x += 1) {
			this.cells[x] = [];
			for (y = 0; y < this.rows; y += 1) {
				colorTone = Math.floor(Math.random() * this.cellTones.length);

				newSVGRect = document.createElementNS(svgns, 'rect');
				newSVGRect.setAttribute('id', x + ',' + y);
				newSVGRect.setAttribute('class', 'cell ' + this.cellTones[colorTone]);
				newSVGRect.setAttribute('color', 'grey');
				newSVGRect.setAttribute('x', (x * (this.cellWidth + this.cellBorderWidth) - centerWidth));
				newSVGRect.setAttribute('y', (y * (this.cellHeight + this.cellBorderWidth) - this.cellBorderWidth));
				newSVGRect.setAttribute('width', this.cellWidth);
				newSVGRect.setAttribute('height', this.cellHeight);

				newSVG.appendChild(newSVGRect);

				this.cells[x][y] = newSVGRect;
			}
		}

		fragment.appendChild(newSVG);

//		for (x = 0; x < this.columns; x += 1) {
//			this.cells[x] = [];
//			for (y = 0; y < this.rows; y += 1) {
//				colorTone = Math.floor(Math.random() * this.cellTones.length);
//
//				newDiv = document.createElement('div');
//				newDiv.setAttribute('id', x + ',' + y);
//				newDiv.setAttribute('class', 'cell ' + this.cellTones[colorTone]);
//				newDiv.style.left = (x * (this.cellWidth + this.cellBorderWidth) - centerWidth) + 'px';
//				newDiv.style.top = (y * (this.cellHeight + this.cellBorderWidth) - this.cellBorderWidth) + 'px';
//
//				fragment.appendChild(newDiv);
//			}
//		}

		newStyle.type = 'text/css';
		newStyle.setAttribute('id', 'landscape-css');
//		style = '\n.cell {\n\twidth: ' + this.cellWidth + 'px;\n\theight: ' + this.cellHeight + 'px;\n\tborder-width: ' + this.cellBorderWidth + 'px;\n\tborder-radius: ' + this.cellBorderRadius + 'px;\n}\n';
		style = '#landscape {\n\theight: ' + centerHeight + 'px;\n\tborder-width: ' + this.borderWidth + 'px;\n\twidth: ' + this.width + 'px;\n}\n';

		if (newStyle.styleSheet) {
			newStyle.styleSheet.cssText = style;
		} else {
			if (document.getElementById('landscape-css')) {
				document.getElementsByTagName('head')[0].removeChild(document.getElementById('landscape-css'));
			}
			newStyle.appendChild(document.createTextNode(style));
		}

		document.getElementsByTagName('head')[0].appendChild(newStyle);
		this.landscape.innerHTML = '';
		this.landscape.appendChild(fragment);
	};

	this.getCells = function () {
		return this.cells;
	};

	this.setLandscapeWidth = function (event) {
		var width = Number(event.target.value);

		this.width = width;
		this.columns = Math.ceil(this.width / (this.cellWidth + this.cellBorderWidth));
//		console.log('Landscape Width: ' + this.width + '\n' + 'Columns: ' + this.columns);

		this.createGrid();
	}.bind(this);

	this.setLandscapeHeight = function (event) {
		var height = Number(event.target.value);

		this.height = height;
		this.rows = Math.floor(this.height / (this.cellHeight + this.cellBorderWidth));
//		console.log('Landscape Height: ' + this.height + '\n' + 'Rows: ' + this.rows);

		this.createGrid();
	}.bind(this);

	this.setBorderWidth = function (event) {
		var width = event.target.value;

		this.borderWidth = width;
//		console.log('Landscape Border Thickness: ' + this.borderWidth);

		this.createGrid();
	}.bind(this);

	this.setCellWidth = function (event) {
		var width = Number(event.target.value);

		this.cellWidth = width;
//		console.log('Cell Width: ' + this.cellWidth);

		this.columns = Math.ceil(this.width / (this.cellWidth + this.cellBorderWidth));
		this.createGrid();
	}.bind(this);

	this.setCellHeight = function (event) {
		var height = Number(event.target.value);

		this.cellHeight = height;
//		console.log('Cell Height: ' + this.cellHeight);

		this.rows = Math.floor(this.height / (this.cellHeight + this.cellBorderWidth));
		this.createGrid();
	}.bind(this);

	this.setCellBorderWidth = function (event) {
		var width = Number(event.target.value);

		this.cellBorderWidth = width;
//		console.log('Cell Border Width: ' + this.cellBorderWidth);

		this.createGrid();
	}.bind(this);

	this.setCellBorderRadius = function (event) {
		var radius = Number(event.target.value);

		this.cellBorderRadius = radius;
//		console.log('Cell Border Radius: ' + this.cellBorderRadius);

		this.createGrid();
	}.bind(this);

	this.main();
};

var Transition = function () {
	'use strict';

	this.initialize = function () {
		this.columns = window.landscape.columns;
		this.rows = window.landscape.rows;
		this.cells = window.landscape.cells;

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

		this.transitionTypes = {
			linear: {
				shapeFunction: function (x, y, parameters) { return Math.abs(this.parameters.alpha * (x - this.parameters.h) + this.parameters.beta * (y - this.parameters.k)); }.bind(this),
				criticalValues: [[0, 0], [this.columns, 0], [0, this.rows], [this.columns, this.rows]],
				range: 0
			},
			quadratic: {
				shapeFunction: function (x, y, parameters) { return Math.abs(0.01 * Math.pow((x - this.parameters.h), 2) + (y - this.parameters.k)); }.bind(this),
				criticalValues: [[0, 0], [window.landscape.columns, 0], [0, window.landscape.rows], [window.landscape.columns, window.landscape.rows]],
				range: 0
			},
			sine: {
				shapeFunction: function (x, y, parameters) { return (Math.abs(this.parameters.amplitude * Math.sin((this.parameters.b * x - this.parameters.h) * (2 * Math.PI / this.columns)) + (y - this.parameters.k))); }.bind(this),
				criticalValues: [[0, 0], [window.landscape.columns, 0], [0, window.landscape.rows], [window.landscape.columns, window.landscape.rows], [(((window.landscape.columns / 4) + this.parameters.h) / this.parameters.b), 0], [(((window.landscape.columns / 4) + this.parameters.h) / this.parameters.b), window.landscape.rows], [(((3 * window.landscape.columns / 4) + this.parameters.h) / this.parameters.b), 0], [(((3 * window.landscape.columns / 4) + this.parameters.h) / this.parameters.b), window.landscape.rows]],
				range: 0
			},
			circular: {
				shapeFunction: function (x, y, parameters) { return ((x - this.parameters.h) * (x - this.parameters.h)) + ((y - this.parameters.k) * (y - this.parameters.k)); }.bind(this),
				criticalValues: [[0, 0], [this.columns, 0], [0, this.rows], [this.columns, this.rows]],
				range: 0
			}
		};
	};

	this.setVerticalCenter = function (y) {
		var k = y || event.target.value,
			currentK = this.parameters.k;

//		console.log(k);

		if ((k % 1 === 0) && (k >= 0) && (k <= this.rows)) {
			this.parameters.k = k;
		} else {
			k = this.parameters.k;
			alert('Number entered for Vertical Center is not valid');
		}

		if ((k !== currentK)) {
//			console.log('Transition specific data requires updating');
		}

//		console.log('New Center:\t\t\t\t(' + this.parameters.h + ', ' + this.parameters.k + ')');
	}.bind(this);

	this.setHorizontalCenter = function (x) {
		var h = x || event.target.value,
			currentH = this.parameters.h;

		if ((h % 1 === 0) && (h >= 0) && (h <= this.columns)) {
			this.parameters.h = h;
		} else {
			h = this.parameters.h;
			alert('Number entered for Horizontal Center is not valid');
		}

		if ((h !== currentH)) {
//			console.log('Transition specific data requires updating');
		}

//		console.log('New Center:\t\t\t\t(' + this.parameters.h + ', ' + this.parameters.k + ')');
	}.bind(this);

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
//			console.log('Transition specific data requires updating');
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
//			console.log('Transition specific data requires updating');
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
//			console.log('Transition specific data requires updating');
		}
	};

	this.setDuration = function (time) {
		var duration = time || Number(event.target.value);
//		console.log(duration);

		if ((typeof duration === 'number') && (duration >= 0)) {
			this.parameters.duration = duration;
		}
	}.bind(this);

	this.setVariance = function (variance) {
		if ((typeof variance === 'number') && (variance >= 0) && (variance <= 1)) {
			this.parameters.variance = variance;
		} else {
			this.parameters.variance = Number(event.target.value);
		}
	}.bind(this);

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

	this.setTransition = function (transition1, event) {
		this.clearTransition();

		if (event) {
			transition1 = this.transitionTypes[event.target.value];
//			console.log(transition1.shapeFunction);
		}

		if (transition1) {
			this.parameters.shapeFunction[0] = transition1.shapeFunction;
			this.parameters.criticalValues[0] = transition1.criticalValues;
		}
	}.bind(this);

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

//		console.log(this.parameters.range);

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

		for (x = 0; x < window.landscape.columns; x += 1) {
			for (y = 0; y < window.landscape.rows; y += 1) {
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
