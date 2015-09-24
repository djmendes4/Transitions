var Handler = function () {
	'use strict';

	this.events = function () {
		document.getElementById('settings-toggle').addEventListener('mouseover', this.temptSettings);
		document.getElementById('settings-toggle').addEventListener('mouseout', this.temptSettings);
		document.getElementById('settings-toggle').addEventListener('mousemove', this.temptSettings);
		document.getElementById('settings-toggle').addEventListener('click', this.toggleSettings);
	};

	this.temptSettings = function (event) {
		var tempted = event.type,
			state = document.getElementById('settings-toggle').getAttribute('state');

		if (tempted === 'mouseover' || (tempted === 'mousemove' && state === null)) {
			document.getElementById('settings-toggle').setAttribute('tempt', '');
			document.getElementById('settings-Menu').setAttribute('tempt', '');
		} else if (tempted === 'mouseout') {
			document.getElementById('settings-toggle').removeAttribute('tempt');
			document.getElementById('settings-Menu').removeAttribute('tempt');
		}
	};

	this.toggleSettings = function (event) {
		var state = (document.getElementById('settings-toggle').getAttribute('state'));

		if (state === null) {
			document.getElementById('settings-toggle').setAttribute('state', '1');
			document.getElementById('settings-Menu').setAttribute('lowered', '');

			setTimeout(function () {
				document.getElementById('settings-toggle').setAttribute('state', '2');
			}, 600);
		} else if (state === '2') {
			document.getElementById('settings-toggle').setAttribute('state', '3');
			document.getElementById('settings-Menu').removeAttribute('lowered');

			document.getElementById('settings-toggle').removeAttribute('tempt');
			document.getElementById('settings-Menu').removeAttribute('tempt');

			setTimeout(function () {
				document.getElementById('settings-toggle').removeAttribute('state');
			}, 600);
		}
	};

//	document.documentElement.webkitRequestFullScreen();
};

var handler = new Handler();
handler.events();

// Consider a form of encryption such that the decryption is dependent on randomly generated segments of a codex;
// Strengths: the security of such an encryption algorithm depends on the rarity of the codex;

// Information-theoretic (One time pad)
// Cryptography and Perfect Forward Secrecy
