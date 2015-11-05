var Dimensionalize = function () {
	'use strict';

	this.main = function () {
		this.cells = landscape.getCells();
		this.color = [];
		this.scale = [];
		this.getColor();
		console.log(this.scale);
	};

	this.getColor = function () {
		var x = 0,
			y = 0,
			newWidth = 0,
			newHeight = 0,
			offsetWidth = 0,
			offsetHeight = 0;

		for (x = 0; x < this.cells.length; x += 1) {
			this.color[x] = [];
			this.scale[x] = [];
			for (y = 0; y < this.cells[x].length; y += 1) {
				this.color[x][y] = this.cells[x][y].getAttribute('color');
				this.scale[x][y] = 1 - Math.random() * 0.8;

				newWidth = 2 * Math.ceil(this.scale[x][y] * this.cells[x][y].getAttribute('width') / 2);
				offsetWidth = Number(this.cells[x][y].getAttribute('x')) + ((this.cells[x][y].getAttribute('width') - newWidth) / 2);
				newHeight = 2 * Math.ceil(this.scale[x][y] * this.cells[x][y].getAttribute('height') / 2);
				offsetHeight = Number(this.cells[x][y].getAttribute('y')) + ((this.cells[x][y].getAttribute('height') - newHeight) / 2);

				this.cells[x][y].setAttribute('width', newWidth);
				this.cells[x][y].setAttribute('height', newHeight);
				this.cells[x][y].setAttribute('x', offsetWidth);
				this.cells[x][y].setAttribute('y', offsetHeight);
			}
		}
	};

	this.main();
};
