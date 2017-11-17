<<<<<<< HEAD
var screen = new Screen({
	parentElement: document.getElementById('guilegames'),
	screenID: 'guilegames_welcome',
	width: screen.width / 96 * 2.54,
	height: 480 / 96 * 2.54,
	borderThickness: 3,
	unitScalar: 100 / 32 * 96 / 2.54 // 32 pixels per box
});
screen.refresh();

var landscape = new Landscape(screen);
landscape.initialize();

var shape = new Shape();

var transition1 = new Transition(landscape);

var colorMatrix = ['brown', 'blue', 'green', 'yellow', 'red'],
	cycle = 0;

transition1.setDuration((4800 - Math.random() * 1600));
transition1.setCenter(Math.floor(Math.random() * landscape.getNumberOfColumns()), Math.floor(Math.random() * landscape.getNumberOfRows()));
transition1.setShape(shape.circle());
transition1.setDelay(0);
transition1.setColor(colorMatrix[cycle % colorMatrix.length]);
transition1.initialize();

//var timeout = setInterval(function () {
//	'use strict';
//
//	cycle = cycle + 1;
//
//	transition1.setDuration((4800 - Math.random() * 1600));
//	transition1.setCenter(Math.floor(Math.random() * landscape.getNumberOfColumns()), Math.floor(Math.random() * landscape.getNumberOfRows()));
//	transition1.setShape(shape.circle());
//	transition1.setDelay(0);
//	transition1.setColor(colorMatrix[cycle % colorMatrix.length]);
//	transition1.initialize();
//}, 4800);

//var settings = new Settings({
//	parent: document.getElementById('guilegames'),
//	screen: screen,
//	landscape: landscape
//});
//settings.initialize();
//
//var request = new XMLHttpRequest();
//request.onreadystatechange = function () {
//	'use strict';
//
//    if (this.readyState === 4 && this.status === 200) {
//        var myObj = JSON.parse(this.responseText);
//		model = myObj;
//
//		var player1 = new Player();
//		player1.setModel(model.mender);
//
//		console.log(player1.getModel());
//    }
//};
//
//model = request.open("GET", "./js/model.json", true);
//request.send();

var abilities = new Actions();

var model = {},
	player1 = new Player();

var initialize = [
	['model', './js/model.json', function (callback) {
		'use strict';

		var model = {};

		if (this.readyState === 4 && this.status === 200) {
			model = JSON.parse(this.responseText);
			callback(model);
		}
	}, function (object) {
		'use strict';

		model = object;

//		console.log(model);
	}],
	['player', './js/player.json', function (callback) {
		'use strict';

		var player = {};

		if (this.readyState === 4 && this.status === 200) {
			player = JSON.parse(this.responseText);
			callback(player);
		}
	}, function (player) {
		'use strict';

		player1.setName(player.name);
		player1.setRole(player.role);
		player1.setModel(model[player.model]);

		bindings.setPlayer(player1);
		bindings.setScreen(document.getElementById('guilegames_welcome'));
		bindings.main();

//		console.log(player1.getName());
//		console.log(player1.getRole());
//		console.log(player1.getModel());
//		console.log(bindings.getPlayer());
//		console.log(bindings.getScreen());

		player1.abilities = {
			teleport: Abilities.teleport(player1)
		};

		player1.materialize();
	}]
];

var scoreBoard = Elements.scoreCounter();
scoreBoard.main();

var badGuy = Entity.badGuy();
badGuy.main();

var requestData = function (data) {
	'use strict';

	var request = [],
		x = 0;

	for (x = 0; x < data.length; x += 1) {
		request[x] = new XMLHttpRequest();
		request[x].onreadystatechange = data[x][2].bind(request[x], data[x][3]);
		request[x].open("GET", data[x][1], true);
		data[x][0] = request[x].send();
	}
};

requestData(initialize);

var bindings = new Bindings();

var animate = new Animate();
animate.startAnimation();
=======
this.landscape = new Landscape();
//this.dimensionalize = new Dimensionalize();
//this.raindrops = new Raindrops();
this.transition = new Transition();
this.handler = new Handler();

this.transition.initialize(this.landscape);
this.transition.setTransition(this.transition.transitionTypes.sine);
//console.log(this.transition.columns);
//console.log(this.transition.rows);
this.transition.setColor('grey');
this.transition.setAngle(0);
this.transition.setVariance(0.1);
this.transition.setDuration(3200);
this.transition.setLag(0);
this.transition.setAmplitude(4);
this.transition.setB(5);
this.transition.startTransition();

window.setInterval(function () {
	'use strict';
	this.transition.setAngle(0.6);
	this.transition.setColor(this.transition.cellColors[this.transition.cycle % 2]);
	this.transition.setHorizontalCenter(Math.floor(Math.random() * this.transition.columns));
	this.transition.setVerticalCenter(Math.floor(Math.random() * this.transition.rows));
	this.transition.setLag(0);
	this.transition.startTransition();
	this.transition.setVariance(0.2);
	this.transition.cycle += 1;
}, 2000);
>>>>>>> origin/gh-pages

/*
Body Systems Analogy
Integumentary - External defensive mechanisms responsible for the protection of program (hacking, hijacking, etc.)(encapsulation?).
Skeletal - Framework of the program, primarily based on html and css, though not those exclusively.
Nervous - Primarily responsible for immediate action and response in the form of event handling and intent of external processed data.
Cardiovascular - Responsible for the transport (communication) of program parts (state, behaviors, etc.).
Endocrine - Primarily responsible for non-immediate action and response in the form of callback functions.
Muscular - Provides the interface between external communications and the nervous/endocrine systems to create dynamic actions and responses.
Lymphatic - Works directly with the cardiovascular system to the aid the immune system in identifying potential threats for removal.
Respiratory - Contributes to the conversion of innate external stimuli to internal information for execution via the nervous or endocrine systems.
Urinary - Responsible for purging information deemed threatening by the immune system.
Excretory - Responsible for purging excess or non-information from the digestive system.
Reproductive - Concerns the compatibility of the program with others in addition to progenetic maintenance.
Digestive - Contributes to the conversion of external stimuli (user input) to internal information for execution via the nervous or endocrine systems.
Immune - Works with the lymphatic and cardiovascular systems to remove internally threatening information.
*/

// Consider a form of encryption such that the decryption is dependent on randomly generated segments of a codex;
// Strengths: the security of such an encryption algorithm depends on the rarity of the codex;

// Information-theoretic (One time pad)
// Cryptography and Perfect Forward Secrecy

//Settings Menu
//	Transition Settings
//		Transition Type
//			*Transition Specific Data
//		Transition Duration
//		Transition Variance
//		Transition Lag
//		Transition Interval
