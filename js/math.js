/*jslint devel: true */

var math = {
	pixelToCentimeter: function (numberOfPixels) {
		'use strict';

		var centimeters = 0,
			unitScalar = 2.54 / 96;

		if (numberOfPixels !== null && !isNaN(numberOfPixels)) {
			centimeters = numberOfPixels * unitScalar;
			console.log(centimeters);
			return centimeters;
		} else {
			throw new Error('The argument entered is not a number.');
		}
	},

	pad: function (integer, length) {
		'use strict';
		var integerAsString = integer.toString();

		while (integerAsString.length < length) {
			integerAsString = '0' + integerAsString;
		}

		return integerAsString;
	},

	matrixMultiplication: function (array1, array2) {
		'use strict';

		var x = 0,
			y = 0,
			z = 0,
			matrixA = [],
			matrixARows = 0,
			matrixAColumns = 0,
			matrixB = [],
			matrixBRows = 0,
			matrixBColumns = 0,
			matrixC = [];

		if (Array.isArray(array1)) {
			matrixA = array1;
			matrixARows = matrixA.length;
			matrixAColumns = matrixA[0].length;

			for (x = 0; x < matrixA.length; x += 1) {
				if (matrixA[x].length !== matrixAColumns) {
					throw new Error('argument1 is not a rectangular matrix');
				}
			}
		} else {
			throw new Error('argument 1 is not an array');
		}

		if (Array.isArray(array2)) {
			matrixB = array2;
			matrixBRows = matrixB.length;
			matrixBColumns = matrixB[0].length;

			for (x = 0; x < matrixB.length; x += 1) {
				if (matrixB[x].length !== matrixBColumns) {
					throw new Error('argument2 is not a rectangular matrix');
				}
			}
		} else {
			throw new Error('argument 2 is not an array');
		}

		if (matrixAColumns === matrixBRows) {
			console.log(matrixA);
			console.log(matrixB);
			console.log(Math.sin(57.4));
			for (x = 0; x < matrixARows; x += 1) {
				matrixC[x] = [];
				for (y = 0; y < matrixBColumns; y += 1) {
					matrixC[x][y] = 0;
					for (z = 0; z < matrixAColumns; z += 1) {
						matrixC[x][y] += matrixA[x][z] * matrixB[z][y];
					}
				}
			}
//			console.log(matrixC);
			return matrixC;
		} else {
			throw new Error('the matrices are incompatible');
		}
	},

	thetaX: Math.atan(Math.sqrt(2)),
	thetaZ: 30 * Math.PI / 180,
	rotationXPlane: function () {
		'use strict';
		return [
			[1, 0, 0],
			[0, Math.cos(math.thetaX), -Math.sin(math.thetaX)],
			[0, 0, 1]
		];
	},
	rotationZPlane: function () {
		'use strict';
		return [
			[Math.cos(math.thetaZ), -Math.sin(math.thetaZ), 0],
			[Math.sin(math.thetaZ), Math.cos(math.thetaZ), 0],
			[0, 0, 1]
		];
	},
	isometricScale: function () {
		'use strict';
		return [
			[1, 0, 0],
			[0, Math.sqrt(3) / 2, 0],
			[0, 0, 1]
		];
	},
	isometricShear: function () {
		'use strict';
		return [
			[1, Math.tan(30 * Math.PI / 180), 0],
			[0, 1, 0],
			[0, 0, 1]
		];
	},
	isometricRotate: function () {
		'use strict';
		return [
			[Math.cos(330 * Math.PI / 180), -1 * Math.sin(330 * Math.PI / 180), 0],
			[Math.sin(330 * Math.PI / 180), Math.cos(330 * Math.PI / 180), 0],
			[0, 0, 1]
		];
	}
//	isometric: this.matrixMultiplication(this.rotationZPlane, this.rotationXPlane)
};
