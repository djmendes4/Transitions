/*jslint devel: true */

var Collision = {
	objects: {
		player: [],
		entities: [],
		walls: []
	},

	collisionHandler: function () {
		'use strict';


	},

	removeObject: function () {
		'use strict';


	},

	// Defines the collision scheme in which a circle collides with a rectangular boundary
	boundary: function (rectangle, circle) {
		'use strict';

		var screen = rectangle,
			width = parseInt(parseFloat(rectangle.getAttribute('width')) * 10, 10) * 96 / 2.54 / 10 * 3.125,
			height = parseInt(parseFloat(rectangle.getAttribute('height')) * 10, 10) * 96 / 2.54 / 10 * 3.125,

			cx = parseInt(parseFloat(circle.getAttribute('cx')) * 1000, 10) / 1000,
			cy = parseInt(parseFloat(circle.getAttribute('cy')) * 1000, 10) / 1000,
			r = parseInt(parseFloat(circle.getAttribute('r')) * 1000, 10) / 1000,

			hasCollided = false;

//		console.log('Checking for collision...');
//		console.log(screen);
//		console.log(rectangle);
//		console.log('Width: ' + width + ' || Height: ' + height + ' || CenterX: ' + cx + ' || CenterY: ' + cy + ' || Radius: ' + r);

		if (cx - r <= 0) {
			console.log('Collision with left wall');
			cx = r;
			hasCollided = true;
		} else if (cx + r >= width) {
			console.log('Collision with right wall');
			cx = width - r;
			hasCollided = true;
		}

		if (cy - r <= 0) {
			console.log('Collision with top wall');
			cy = r;
			hasCollided = true;
		} else if (cy + r >= height) {
			console.log('Collision with bottom wall');
			cy = height - r;
			hasCollided = true;
		}

//		console.log(hasCollided);
//		console.log(cx);
//		console.log(cy);

		return {
			hasCollided: hasCollided,
			cx: cx,
			cy: cy
		};
	},

	circle: function (circle1, circle2) {
		'use strict';

		var cx1 = parseInt(parseFloat(circle1.getAttribute('cx')) * 1000, 10) / 1000,
			cy1 = parseInt(parseFloat(circle1.getAttribute('cy')) * 1000, 10) / 1000,
			r1 = parseInt(parseFloat(circle1.getAttribute('r')) * 1000, 10) / 1000,
			cx2 = parseInt(parseFloat(circle2.getAttribute('cx')) * 1000, 10) / 1000,
			cy2 = parseInt(parseFloat(circle2.getAttribute('cy')) * 1000, 10) / 1000,
			r2 = parseInt(parseFloat(circle2.getAttribute('r')) * 1000, 10) / 1000,
			distance = Math.sqrt(Math.pow(cx1 - cx2, 2) + Math.pow(cy1 - cy2, 2)),
			hasCollided = false;

		if (distance <= (r1 + r2)) {
			hasCollided = true;
		}

		return {
			hasCollided: hasCollided
		};
	}
};
