/*jslint devel: true */

var Entity = {
	badGuy: function () {
		'use strict';

		var screen = {},
			name = 'Bad Guy',
			spawnTimer = {},
			coinCountID = 0,
			thisEntity = {};

		return {
			getName: function () {return name; },
			setName: function (string) {
				name = string;
			},

			getThisEntity: function () {return thisEntity; },

			startSpawnTimer: function () {
				spawnTimer = setTimeout(this.spawnCoin.bind(this), 2000 + Math.random() * 2000);
			},

			cancelSpawnTimer: function () {
				clearTimeout(spawnTimer);
			},

			spawnCoin: function () {
				var svgns = 'http://www.w3.org/2000/svg',
					coin = document.createElementNS(svgns, 'circle');

				coinCountID += 1;
				coin.setAttribute('id', coinCountID);
				coin.setAttribute('name', 'coin');
				coin.setAttribute('cx', Math.random() * screen.clientWidth * 3.125);
				coin.setAttribute('cy', Math.random() * screen.clientHeight * 3.125);
				coin.setAttribute('r', 28);
				coin.setAttribute('fill', 'white');
				coin.setAttribute('stroke', 'black');
				coin.setAttribute('stroke-width', '5');

				Collision.objects.entities.push(coin);
//				console.log(Collision.objects.entities);

				screen.appendChild(coin);

				this.startSpawnTimer();
			},

			main: function () {
				var svgns = 'http://www.w3.org/2000/svg',
					newCircle = document.createElementNS(svgns, 'circle');

				screen = document.getElementById('guilegames_welcome');
//				console.log(screen.clientHeight);
//				console.log(screen.clientWidth);

				newCircle.setAttribute('id', name);
				newCircle.setAttribute('name', 'Bad Guy');
				newCircle.setAttribute('cx', Math.random() * screen.clientWidth * 3.125);
				newCircle.setAttribute('cy', Math.random() * screen.clientHeight * 3.125);
				newCircle.setAttribute('r', 60);
				newCircle.setAttribute('fill', 'black');
				newCircle.setAttribute('stroke', 'black');
				newCircle.setAttribute('stroke-width', '5');

				thisEntity = newCircle;
				Collision.objects.entities.push(thisEntity);
				screen.appendChild(newCircle);

				this.startSpawnTimer();
			}
		};
	}
};
