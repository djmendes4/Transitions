/*jslint devel: true */

// Family - a collection of all entities considered as descendants of a common progenitor.
// Genesis - an origin, creation, or beginning.
var Genesis = function () {
	'use strict';

	this.decayRate = [0.8, 0.8];
	this.thickness = 2;

	// Gene (short for generation) - a single step in natural descent.
	this.gene = [];
	this.gene[0] = {
		parent: null,
		children: [],
		siblings: [],
		seeds: 6,
		width: 30,
		height: 30,
		abscissa: Math.ceil(Math.random() * document.getElementById('landscape').clientWidth),
		ordinate: Math.ceil(Math.random() * document.getElementById('landscape').clientHeight),
		angle: 0,
		left: 0,
		top: 0
	};

	this.setDecayRate = function (family) {
	};

	this.setThickness = function (family) {
	};

	this.setChildren = function (entity) {
		var x = 0;

		entity.children = [];
		for (x = 0; x < entity.seeds; x += 1) {
			this.gene.push({});
			entity.children.push(this.gene[this.gene.length - 1]);
		}
	};

	this.setParent = function (entity) {
		var x = 0;

		for (x = 0; x < entity.children.length; x += 1) {
			entity.children[x].parent = entity;
		}
	};

	this.setSiblings = function (entity) {
		var x = 0,
			y = 0;

		for (x = 0; x < entity.children.length; x += 1) {
			entity.children[x].siblings = [];
			for (y = 0; y < entity.children.length; y += 1) {
				if (x !== y) {
					entity.children[x].siblings.push(entity.children[y]);
				}
			}
		}
	};

	this.setSize = function (entity) {
		var decay = Math.random(),
			scale = (this.decayRate[0] * (1 - decay)) + (this.decayRate[1] * decay);

		entity.width = Math.round(scale * entity.parent.width);
		entity.height = Math.round(scale * entity.parent.height);
	};

	this.setAngle = function (entity) {
		var x = 0,
			perimeter = 0,
			tolerance = 0,
			testAngle = 0,
			successCount = 0,
			noSolution = true;

		perimeter = (2 * entity.parent.height) + (2 * entity.parent.width);
		tolerance = (360 / ((perimeter / this.decayRate[1]) + 4));

		while (noSolution) {
			successCount = 0;
			testAngle = Math.ceil(Math.random() * 360);
			for (x = 0; x < entity.siblings.length; x += 1) {
				if ((testAngle > entity.siblings[x].angle - 45) && (testAngle < entity.siblings[x].angle + 45)) {
					//console.log('Failure');
					break;
				} else {
					successCount += 1;
				}
			}
			if (successCount === entity.siblings.length) {
				noSolution = false;
			}
		}

		entity.angle = testAngle;
//		console.log(entity.angle);
	};

	this.setPosition = function (entity) {
		var x = 0,
			y = 0,
			radians = 0,
			angleOffset = 0;

		radians = (entity.angle * Math.PI / 180);
		angleOffset = ((entity.angle + 45) * Math.PI / 180);

		if (Math.abs(Math.tan(radians)) < 0.00001) {
			//console.log('Case 1: Tangent is Zero.');
			x = ((entity.parent.width / 2) + (entity.width / 2) + this.thickness) * (Math.cos(radians) / Math.abs(Math.cos(radians)));
			y = 0;
		} else if (Math.abs(Math.tan(radians)) > 100000) {
			//console.log('Case 2: Tangent is Infinity.');
			x = 0;
			y = ((entity.parent.height / 2) + (entity.height / 2) + this.thickness) * (Math.sin(radians) / Math.abs(Math.sin(radians)));
		} else if (Math.tan(angleOffset) > 0) {
			//console.log('Case 3: Tangent is Positive.');
			x = ((entity.parent.width / 2) + (entity.width / 2) + this.thickness) * (Math.cos(radians) / Math.abs(Math.cos(radians)));
			y = (Math.abs((x * Math.tan(radians)))) * (Math.sin(radians) / Math.abs(Math.sin(radians)));
		} else if (Math.tan(angleOffset) < 0) {
			//console.log('Case 4: Tangent is Negative.');
			y = ((entity.parent.height / 2) + (entity.height / 2) + this.thickness) * (Math.sin(radians) / Math.abs(Math.sin(radians)));
			x = (Math.abs((y / Math.tan(radians)))) * (Math.cos(radians) / Math.abs(Math.cos(radians)));
		}

		entity.abscissa = Math.round(entity.parent.abscissa + x);
		entity.ordinate = Math.round(entity.parent.ordinate + y);

		//console.log('Abscissa: ' + entity.parent.abscissa + ', ' + entity.abscissa);
		//console.log('Ordinate: ' + entity.parent.ordinate + ', ' + entity.ordinate);
	};

	this.setOffset = function (entity) {
		entity.left = entity.abscissa - Math.floor((entity.width / 2));
		entity.top = entity.ordinate - Math.floor((entity.height / 2));
	};

	//Grow - to arise or issue as a natural development from an original happening, circumstance, or source.
	this.grow = function (entity) {
		var newDiv = document.createElement('div'),
			newTextNode = document.createTextNode(entity.angle);

		newDiv.style.position = 'absolute';
		newDiv.style.left = entity.left + 'px';
		newDiv.style.top = entity.top + 'px';
		newDiv.style.width = entity.width + 'px';
		newDiv.style.height = entity.height + 'px';
		newDiv.style.border = this.thickness + 'px solid black';

		newDiv.appendChild(newTextNode);
		document.getElementById('landscape').appendChild(newDiv);
	};

	//Autogenesis - self generation.
	this.enableAutogenesis = function () {
		var x = 0;

		for (x = 0; x < 4; x += 1) {
			this.setChildren(this.gene[x]);
			this.setParent(this.gene[x]);
			this.setSiblings(this.gene[x]);
			if (this.gene[x].parent !== null) {
				this.setSize(this.gene[x]);
				this.setAngle(this.gene[x]);
				this.setPosition(this.gene[x]);
			}
			this.setOffset(this.gene[x]);
			this.grow(this.gene[x]);
		}
	};
};
//
//window.onload = function () {
//	'use strict';
//	//console.log('The page has been successfully loaded!');
//
//	var newStrand = new Genesis();
//	newStrand.enableAutogenesis();
//};
