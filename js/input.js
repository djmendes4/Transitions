/*jslint devel: true */

var Actions = function () {
	'use strict';

	return {
		move: function (player, step) {
			var start = 0,
				previous = null,
				element = player.getHitBox(),
				animationID = 0,
				progress = step,
				position = player.getPosition(),
				velocity = player.getVelocity(),
				acceleration = player.getAcceleration(),
				deltaT = 0;

//			//Determine the direction of the vector
//			if (!isNaN(velocity.ux)) {
//				velocity.ux = (velocity.ux === 0 ? 0 : velocity.ux);
//			} else {
//				vector.x = velocity.ux;
//			}
//
//			if (!isNaN(vector.y)) {
//				vector.y = (vector.y === 0 ? 0 : vector.y);
//			} else {
//				vector.y = velocity.uy;
//			}

//			// Set velocity unit vector in the traveled direction
//			if (vector.x === 0 || (vector.x + velocity.ux === 0)) {
//				velocity.ux = 0;
//			} else {
//				velocity.ux = vector.x;
//			}
//
//			if (vector.y === 0 || (vector.y + velocity.uy === 0)) {
//				velocity.uy = 0;
//			} else {
//				velocity.uy = vector.y;
//			}

			// Set the velocity vector based on the unit vector and the max velocity
			if (velocity.ux !== 0 || velocity.uy !== 0) {
				velocity.magnitude = Math.sqrt(Math.pow(velocity.ux, 2) + Math.pow(velocity.uy, 2));
				velocity.x = velocity.ux / velocity.magnitude * velocity.max;
				velocity.y = velocity.uy / velocity.magnitude * velocity.max;
			} else {
				velocity.x = 0;
				velocity.y = 0;
			}

			deltaT = progress / 1000;
			position.x += velocity.x * deltaT;
			position.y += velocity.y * deltaT;

			player.setPosition(position);
		}
	};
};

var actions = new Actions();

var Bindings = function () {
	'use strict';

	var bindings = {},
		player = {},
		screen = {},
		held = {
			37: false,
			38: false,
			39: false,
			40: false,
			65: false,
			68: false,
			83: false,
			87: false
		},
		cursorPosition = {x: 0, y: 0};

	return {
		getPlayer: function () {return player; },
		setPlayer: function (object) {
			player = object;
		},

		getScreen: function () {return screen; },
		setScreen: function (object) {
			screen = object;
		},

		keyDownHandler: function (event) {
			var velocity = player.getVelocity(),
				i = 0;

			//console.log(event.keyCode);
			switch (event.keyCode) {
			case 37: //Left
			case 65: //A
				velocity.ux = -1;
				break;
			case 39: //Right
			case 68: //D
				velocity.ux = 1;
				break;
			case 38: //Up
			case 87: //W
				velocity.uy = -1;
				break;
			case 40: //Down
			case 83: //S
				velocity.uy = 1;
				break;
			case 49: //1
				player.abilities.teleport.cast(cursorPosition);
				break;
			case 32: //Spacebar
				Elements.gameOverInstance.destroy();
				screen.removeChild(badGuy.getThisEntity());
				player1.setVelocity({x: 0, y: 0, magnitude: 0, max: 800, ux: 0, uy: 0});
				player1 = new Player();
				player1.materialize();

//				console.log(Collision.objects.entities);
				for (i = 0; i < Collision.objects.entities.length; i += 1) {
					screen.removeChild(Collision.objects.entities[i]);
				}

				break;
			}

			switch (event.keyCode) {
			case 37: //Left
			case 65: //A
			case 39: //Right
			case 68: //D
			case 38: //Up
			case 87: //W
			case 40: //Down
			case 83: //S
				player.setVelocity(velocity);
				if (!held[37] && !held[38] && !held[39] && !held[40] && !held[65] && !held[68] && !held[83] && !held[87]) {
					animate.addObject([player, actions.move.bind(this, player)]);
//					console.log(animate.getObjects());
				}
				held[event.keyCode] = true;
//				console.log(event.keyCode);
//				console.log(held);
				break;
			}
		},

		keyUpHandler: function (event) {
			var velocity = player.getVelocity();

			//console.log(event.keyCode);
			switch (event.keyCode) {
			case 37: //Left
			case 65: //A
			case 39: //Right
			case 68: //D
				velocity.ux = 0;
				break;
			case 38: //Up
			case 87: //W
			case 40: //Down
			case 83: //S
				velocity.uy = 0;
				break;
			}

			switch (event.keyCode) {
			case 37: //Left
			case 65: //A
			case 39: //Right
			case 68: //D
			case 38: //Up
			case 87: //W
			case 40: //Down
			case 83: //S
//				console.log(animate.getObjects());
//				player.setVelocity(velocity);
				held[event.keyCode] = false;
				if (!held[37] && !held[38] && !held[39] && !held[40] && !held[65] && !held[68] && !held[83] && !held[87]) {
					animate.removeObject(player);
				}
//				console.log(event.keyCode);
//				console.log(held);
				break;
			}
		},

		mouseMoveHandler: function (event) {
			cursorPosition.x = event.clientX * 3.125;
			cursorPosition.y = (event.clientY - 60) * 3.125;
//			console.log(cursorPosition);

//			controlledPlayer.cursorLocation = cursorLocation;
//			console.log(controlledPlayer);

//			if (count < 25) {
//				count += 1;
//				console.log(count);
//			} else {
//				count = 0;
//				console.log(count);
//				window.removeEventListener('mousemove', this, false);
//			}
		},

		main: function () {
//			console.log(document.getElementById('guilegames_welcome'));

			window.addEventListener('keydown', this.keyDownHandler, false);
			window.addEventListener('keyup', this.keyUpHandler, false);
			document.getElementById('guilegames_welcome').addEventListener('mousemove', this.mouseMoveHandler, false);
		}
	};
};





//VOID

//var actions = {
//	move: function (player, vector) {
//		'use strict';
//
//		var position = player.getPosition(),
//			velocity = player.getVelocity(),
//			acceleration = player.getAcceleration(),
//			start = player.getTimeStamp(),
//			timeStamp = new Date(),
//			deltaT = (timeStamp - start) / 1000;
//
//		actors.move(player, {});

//		console.log(position);
//		console.log(velocity);
//		console.log(acceleration);
//
//		// Determine the direction of the vector
//		if (!isNaN(vector.x)) {
//			vector.x = (vector.x === 0 ? 0 : vector.x);
//		} else {
//			vector.x = acceleration.ux;
//		}
//
//		if (!isNaN(vector.y)) {
//			vector.y = (vector.y === 0 ? 0 : vector.y);
//		} else {
//			vector.y = acceleration.uy;
//		}
//
//		// Set acceleration unit vector in the traveled direction
//		if (vector.x === 0 || (vector.x + acceleration.ux === 0)) {
//			acceleration.ux = 0;
//		} else {
//			acceleration.ux = vector.x;
//		}
//
//		if (vector.y === 0 || (vector.y + acceleration.uy === 0)) {
//			acceleration.uy = 0;
//		} else {
//			acceleration.uy = vector.y;
//		}
//
//		// Set the acceleration vectors based on the unit vector and the max acceleration
//		if (acceleration.ux !== 0 || acceleration.uy !== 0) {
//			acceleration.magnitude = Math.sqrt(Math.pow(acceleration.ux, 2) + Math.pow(acceleration.uy, 2));
//			acceleration.x = acceleration.ux / acceleration.magnitude * acceleration.max;
//			acceleration.y = acceleration.uy / acceleration.magnitude * acceleration.max;
//		} else {
//			acceleration.x = 0;
//			acceleration.y = 0;
//		}
//
////		console.log(acceleration);
//
//		// Set velocity based on acceleration
//		if (acceleration.x === 0) {
//			velocity.x = 0;
//		} else {
//			velocity.x += acceleration.x * deltaT;
//		}
//
//		if (acceleration.y === 0) {
//			velocity.y = 0;
//		} else {
//			velocity.y += acceleration.y * deltaT;
//		}
//
////		console.log(velocity);
//
//		// Set the change in position based on the velocity;
//		position.x += velocity.x * deltaT;
//		position.y += velocity.y * deltaT;
//
//		console.log(position);
//
//		player.setAcceleration(acceleration);
//		player.setVelocity(velocity);
//		player.setPosition(position);
//		player.setTimeStamp(timeStamp);
//	}
//};
