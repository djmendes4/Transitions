/*jslint devel: true */

var Animate = function () {
	'use strict';

	var start = 0,
		previous = null,
		increment = 0,
		objects = [],
		frameCount = 0,
		animationID = 0;

	return {
		getObjects: function () {return objects; },
		addObject: function (object) {
			objects.push(object);
//			console.log(objects);
		},

		removeObject: function (object) {
			var x = 0;

//			console.log(objects[x][0]);
			for (x = 0; x < objects.length; x += 1) {
				if (objects[x][0] === object) {
					objects.splice(x, 1);
				}
			}
		},

		step: function (timestamp) {
			var i = 0;

			if (!previous) {
				previous = timestamp;
				start = timestamp;
			}

			frameCount += 1;

			if ((timestamp - start) >= 1000) {
//				console.log('FPS: ' + Math.floor(frameCount * (timestamp - start) / 1000));
				frameCount = 0;
				start = timestamp;
			}

			increment = timestamp - previous;
			previous = timestamp;

			for (i = 0; i < objects.length; i += 1) {
				objects[i][1](increment);
			}

			animationID = window.requestAnimationFrame(this.step.bind(this));

//			console.log(objects.length);
		},

		startAnimation: function () {
			window.requestAnimationFrame(this.step.bind(this));
		},

		endAnimation: function () {
			window.cancelAnimationFrame(animationID);
		}
	};
};
