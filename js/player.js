/*jslint devel: true */

var Player = function () {
	'use strict';

	var screen = {},
		bindings = {},

		model = {},
		hitBox = {},
		hitBoxRadius = 0,

		name = '',
		role = '',

		timeStamp = new Date(),
		position = {x: 500, y: 150, magnitude: 0},
		velocity = {x: 0, y: 0, magnitude: 0, max: 800, ux: 0, uy: 0},
		acceleration = {x: 0, y: 0, magnitude: 0, max: 200, ux: 0, uy: 0};

	return {
		getName: function () {return name; },
		setName: function (string) {
			name = string;
		},

		getModel: function () {return model; },
		setModel: function (object) {
			model = object;
		},

		getHitBox: function () {return hitBox; },
		setHitBox: function (object) {
			hitBox = object;
		},

		updateHitBox: function () {
			var svgns = 'http://www.w3.org/2000/svg',
				newCircle = document.createElementNS(svgns, 'circle');

//			hitBoxRadius = math.pixelToCentimeter(parseFloat(model.hitBoxRadius));

			newCircle.setAttribute('id', 'player1');
			newCircle.setAttribute('cx', position.x);
			newCircle.setAttribute('cy', position.y);
			newCircle.setAttribute('r', model.hitBoxRadius);
			newCircle.setAttribute('fill', model.fill);
			newCircle.setAttribute('stroke', 'black');
			newCircle.setAttribute('stroke-width', '5');

			this.setHitBox(newCircle);
		},

		getRole: function () {return role; },
		setRole: function (string) {
			role = string;
		},

		getTimeStamp: function () {return timeStamp; },
		setTimeStamp: function (object) {
			timeStamp = object;
		},

		getPosition: function () {return position; },
		setPosition: function (object) {
			var collision = Boolean,
				i = 0;

			hitBox.setAttribute('cx', object.x);
			hitBox.setAttribute('cy', object.y);

//			console.log(Collision.objects.entities.length);

			// JOB FOR THE COLLISION HANDLER
			for (i = 0; i < Collision.objects.entities.length; i += 1) {
				collision = Collision.circle(hitBox, Collision.objects.entities[i]).hasCollided;

				if (collision) {
//					console.log('Two objects have collided:');
//					console.log(hitBox);
//					console.log(Collision.objects.entities[i]);

					if (Collision.objects.entities[i].getAttribute('name') === 'coin') {
						scoreBoard.incrementScore();
						document.getElementById('guilegames_welcome').removeChild(Collision.objects.entities[i]);
						Collision.objects.entities.splice(i, 1);
					} else if (Collision.objects.entities[i].getAttribute('name') === 'Bad Guy') {
						this.setVelocity({x: 0, y: 0, magnitude: 0, max: 0, ux: 0, uy: 0});
						Collision.objects.entities.splice(i, 1);
						Elements.gameOverInstance = Elements.gameOver();
						Elements.gameOverInstance.main();
						badGuy.cancelSpawnTimer();
					}
				}
			}

			collision = Collision.boundary(screen, hitBox);

			if (!collision.hasCollided) {
//				console.log(collision.hasCollided);
				position = object;
			} else {
				console.log(collision);
				position.x = collision.cx;
				position.y = collision.cy;
			}

			hitBox.setAttribute('cx', position.x);
			hitBox.setAttribute('cy', position.y);
		},

		getVelocity: function () {return velocity; },
		setVelocity: function (object) {
			velocity = object;
		},

		getAcceleration: function () {return acceleration; },
		setAcceleration: function (object) {
			acceleration = object;
		},

		materialize: function () {
			screen = document.getElementById('guilegames_welcome');
//			console.log(screen);

			this.updateHitBox();

			screen.appendChild(hitBox);
		},

		main: function () {
			this.materialize();
		}
	};
};
