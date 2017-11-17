/*jslint devel: true */

var Abilities = {
	teleport: function (player) {
		'use strict';

		var caster = player || {},
			target = {};

		return {
			getCaster: function () {return caster; },
			setCaster: function (playerObject) {
				caster = playerObject;
			},

			getTarget: function () {return target; },
			setTarget: function (position) {
				if (!isNaN(position.x) && position.x !== null) {
					target.x = position.x;
				}

				if (!isNaN(position.y) && position.y !== null) {
					target.y = position.y;
				}
			},

			cast: function (position) {
				this.setTarget(position);
				caster.setPosition(target);
			}
		};
	}
};
//
//
//		teleport: function (player, position) {
//			var cursorPosition = position;
//
//			player.setPosition(cursorPosition);
//
//			console.log(cursorPosition.x);
//			console.log(cursorPosition.y);
//		}

//Abilities.teleport().test();
