var Raindrops = function () {
	'use strict';

	this.main = function () {
		var drops = 100,
			x = 0;

		this.cells = landscape.getCells();
		this.columns = landscape.columns;
		this.cellWidth = landscape.cellWidth;
		this.cellBorderWidth = landscape.cellBorderWidth;
		this.time = 0;
		this.svg = document.getElementById('Guile');
		this.svgns = 'http://www.w3.org/2000/svg';

		this.rain = [];

		for (x = 0; x < drops; x += 1) {
			this.rain[x] = this.createRain();
		}

		this.animate();
	};

//	this.createRain = function () {
//		var startPoint = {
//				x: 0,
//				y: 0
//			},
//			newDrop = {};
//
//		newDrop = document.createElementNS(this.svgns, 'line');
//
//		startPoint.x = Math.round((this.cellWidth + this.cellBorderWidth) * (Math.random() * (this.columns + 1)));
//		startPoint.y = -Math.random() * 1000;
//
//		newDrop.setAttribute('x1', startPoint.x);
//		newDrop.setAttribute('y1', startPoint.y - 10 + (Math.random() * 20));
//		newDrop.setAttribute('x2', startPoint.x);
//		newDrop.setAttribute('y2', startPoint.y + 20);
//		newDrop.setAttribute('class', 'raindrop');
//		newDrop.style.stroke = 'rgba(20, 80, 255, 1.0)';
//		newDrop.style.strokeWidth = '2px';
//
//		this.svg.appendChild(newDrop);
//
//		return newDrop;
//	};

	this.createRain = function () {
		var startPoint = {
				x: 0,
				y: 0
			},
			newDrop = {};

		newDrop = document.createElementNS(this.svgns, 'ellipse');

		startPoint.x = Math.round((this.cellWidth + this.cellBorderWidth) * (Math.random() * (this.columns + 1)));
		startPoint.y = -Math.random() * 1000;

		newDrop.setAttribute('cx', startPoint.x);
		newDrop.setAttribute('cy', startPoint.y - 10);
		newDrop.setAttribute('rx', Math.floor(Math.random() * 2) + 2);
		newDrop.setAttribute('ry', Math.floor(Math.random() * 3) + 3);
		newDrop.setAttribute('class', 'raindrop');
		newDrop.setAttribute('fill', 'rgba(20, 80, 255, 1.0)');

		this.svg.appendChild(newDrop);

		return newDrop;
	};

	this.animate = function () {
		window.requestAnimationFrame(this.animate.bind(this));

		var now = new Date().getTime(),
			dt = now - (this.time || now),
			x = 0;

		this.time = now;

		for (x = 0; x < this.rain.length; x += 1) {
			if (this.rain[x].getAttribute('cy') - this.rain[x].getAttribute('ry') < this.svg.clientHeight) {
				this.rain[x].setAttribute('cy', Number(this.rain[x].getAttribute('cy')) + 0.40 * dt);
			} else {
				this.svg.removeChild(this.rain[x]);
				this.rain[x] = this.createRain();
			}
		}
	};

	this.main();
};
