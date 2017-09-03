/*jslint devel: true */

var Screen = function (screenProperties) {
	'use strict';

	var parentElement = screenProperties.parentElement || document.body,

		screenID = screenProperties.screenID || '',
		width = screenProperties.width || screen.width,
		height = screenProperties.height || parentElement.clientHeight,
		borderThickness = screenProperties.borderThickness || 3,
		unitScalar = screenProperties.unitScalar || 1,

		svgns = "http://www.w3.org/2000/svg",
		newSVG = document.createElementNS(svgns, 'svg'),
		fragment = document.createDocumentFragment();

	return {
		getParentElement: function () {return parentElement; },
		setParentElement: function (object) {
			parentElement.removeChild(document.getElementById(screenID));
			parentElement = object;
			this.refresh();
		},

		getScreenID: function () {return screenID; },
		setScreenID: function (string) {
			screenID = string;
			this.refresh();
		},

		getWidth: function () {return width; },
		setWidth: function (number) {
			width = number;
			this.refresh();
		},

		getHeight: function () {return height; },
		setHeight: function (number) {
			height = number;
			this.refresh();
		},

		getBorderWidth: function () {return borderThickness; },
		setBorderWidth: function (number) {
			borderThickness = number;
			this.refresh();
		},

		getUnitScalar: function () {return unitScalar; },
		setUnitScalar: function (number) {
			unitScalar = number;
			this.refresh();
		},

		refresh: function () {
			//console.log('Screen Attributes:');
			//console.log('\t' + 'Parent ID: ' + parentElement.getAttribute('id'));

			//console.log('\n\t' + 'Screen ID: ' + screenID);
			//console.log('\t' + 'Width: ' + width);
			//console.log('\t' + 'Height: ' + height);
			//console.log('\t' + 'Border Thickness: ' + borderThickness);

			newSVG.setAttribute('id', screenID);
			newSVG.setAttribute('width', width + 'cm');
			newSVG.setAttribute('height', height + 'cm');
			newSVG.setAttribute('viewBox', ('0 0 ' + (width * unitScalar) + ' ' + (height * unitScalar)));

			fragment.appendChild(newSVG);
			parentElement.insertBefore(fragment, parentElement.firstChild);
		}
	};
};

var Landscape = function (screen) {
	'use strict';

	var parentElement = document.getElementById(screen.getScreenID()),
		tiles = [],
		tileWidth = 100,
		tileHeight = 100,
		tileBorderThickness = 2.54 / 96 * screen.getUnitScalar(), //1px
		numberOfRows = Math.ceil(screen.getHeight() * screen.getUnitScalar() / (tileHeight + tileBorderThickness)),
		numberOfColumns = Math.ceil(screen.getWidth() * screen.getUnitScalar() / (tileWidth + tileBorderThickness));

	return {
		getTiles: function () {return tiles; },
		setTiles: function (array) {
			tiles = array;
		},

		getTileWidth: function () {return tileWidth; },
		setTileWidth: function (number) {
			tileWidth = number;
		},

		getTileHeight: function () {return tileHeight; },
		setTileHeight: function (number) {
			tileHeight = number;
		},

		getTileBorderThickness: function () {return tileBorderThickness; },
		setTileBorderThickness: function (number) {
			tileBorderThickness = number;
		},

		getNumberOfRows: function () {return numberOfRows; },
		getNumberOfColumns: function () {return numberOfColumns; },

		generate: function () {
			var x = 0,
				y = 0,
				centerWidth = ((numberOfColumns * (tileWidth + tileBorderThickness) + tileBorderThickness) - (screen.getWidth() * screen.getUnitScalar())) / 2,
				centerHeight = (tileHeight + tileBorderThickness) * numberOfRows - tileBorderThickness,
				style = '',
				svgns = "http://www.w3.org/2000/svg",
				newDiv = {},
				newSVGRect = {},
				newStyle = document.createElement('style'),
				fragment = document.createDocumentFragment(),
				transformMatrix = 0,
				translationMatrix = [],
				translateX = 0,
				translateY = 0;

			for (x = 0; x < numberOfColumns; x += 1) {
				tiles[x] = [];
				for (y = 0; y < numberOfRows; y += 1) {
					translateX = x * (tileWidth + tileBorderThickness) - centerWidth;
					translateY = y * (tileHeight + tileBorderThickness) - tileBorderThickness;

					newSVGRect = document.createElementNS(svgns, 'rect');
					newSVGRect.setAttribute('x', translateX);
					newSVGRect.setAttribute('y', translateY);
					newSVGRect.setAttribute('width', tileWidth);
					newSVGRect.setAttribute('height', tileHeight);
					newSVGRect.setAttribute('id', x + ',' + y);
					newSVGRect.setAttribute('class', 'cell t' + Math.floor(Math.random() * 5));
					newSVGRect.setAttribute('color', 'grey');

					tiles[x][y] = newSVGRect;

					fragment.appendChild(newSVGRect);
				}
			}

			parentElement.appendChild(fragment);
		},

		refresh: function () {
			while (parentElement.hasChildNodes()) {
				parentElement.removeChild(parentElement.firstChild);
			}

			parentElement = document.getElementById(screen.getScreenID());
			numberOfRows = Math.ceil(screen.getHeight() * screen.getUnitScalar() / (tileHeight + tileBorderThickness));
			numberOfColumns = Math.ceil(screen.getWidth() * screen.getUnitScalar() / (tileWidth + tileBorderThickness));
			tileBorderThickness = 2.54 / 96 * screen.getUnitScalar(); //1px

			this.generate();
		},

		initialize: function () {
			//console.log('Landscape Attributes:');
			//console.log('\t' + 'Tile Width: ' + tileWidth);
			//console.log('\t' + 'Tile Height: ' + tileHeight);
			//console.log('\t' + 'Tile Border Thickness: ' + tileBorderThickness);

			this.generate();
		}
	};
};

var Tile = function () {
	'use strict';

	var	tileRadius = 0,
		tileID = ['tone0', 'tone1', 'tone2', 'tone3', 'tone4'];

	return {
		getTileRadius: function () {return tileRadius; },
		setTileRadius: function (number) {
			tileRadius = number;
		},

		getTileID: function () {return tileID; },
		setTileID: function (string) {
			tileID = string;
		},

		initialize: function () {
			//console.log('Tile Attributes: ');
			//console.log('\t' + 'Tile Radius: ' + tileRadius);
		}
	};
};

//translateX = x * (tileWidth + tileBorderThickness) - centerWidth;
//					translateY = y * (tileHeight + tileBorderThickness) - tileBorderThickness;
//
//					newSVGRect.setAttribute('x', translateX);
//					newSVGRect.setAttribute('y', translateY);
//
//					translateX += tileWidth / 2;
//					translateY += tileHeight / 2;
//
//					translationMatrix = [
//						[1, 0, translateX],
//						[0, 1, translateY],
//						[0, 0, 1]
//					];
//
//					transformMatrix = math.matrixMultiplication(translationMatrix, math.isometricScale());
//					transformMatrix = math.matrixMultiplication(transformMatrix, math.isometricShear());
////					transformMatrix = math.matrixMultiplication(transformMatrix, math.isometricRotate());
//
//					translationMatrix = [
//						[1, 0, -translateX],
//						[0, 1, -translateY],
//						[0, 0, 1]
//					];
//
////					transformMatrix = math.matrixMultiplication(transformMatrix, translationMatrix);
//					newSVGRect.setAttribute('transform', ('matrix(' + transformMatrix[0][0] + ' ' + transformMatrix[1][0] + ' ' + transformMatrix[0][1] + ' ' + transformMatrix[1][1] + ' ' + transformMatrix[0][2] + ' ' + transformMatrix[1][2] + ')'));