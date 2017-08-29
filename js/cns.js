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
	this.transition.setColor(this.transition.cellColors[this.transition.cycle % 3]);
	this.transition.setHorizontalCenter(Math.floor(Math.random() * this.transition.columns));
	this.transition.setVerticalCenter(Math.floor(Math.random() * this.transition.rows));
	this.transition.setLag(0);
	this.transition.startTransition();
	this.transition.setVariance(0.2);
	this.transition.cycle += 1;
}, 3200);

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
