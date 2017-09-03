/* Dillon Mendes - Orig. 9/2/2017 */

/*jslint devel: true */

var Settings = function (parameters) {
	'use strict';

	var parent = document.body,
		screen = parameters.screen,
		landscape = parameters.landscape;

	return {
		getParent: function () {return parent; },
		setParent: function (object) {
			parent = object;
		},

		createInput: function (object) {
			var input = document.createElement('input'),
				parent = object.parent || this.getParent(),
				type = object.type || null,
				id = object.id || null,
				name = object.name || null,
				text = object.text || null,
				min = object.min || (object.min === 0 ? 0 : null),
				max = object.max || (object.max === 0 ? 0 : null),
				step = object.step || null,
				value = object.value || (object.value === 0 ? 0 : null),
				listener = object.listener || null;

			if (type === 'button') {
				input = document.createElement('button');
			}

			if (type !== null) {
				if (typeof (type) === 'string') {
					input.setAttribute('type', type);
				} else {
					throw new Error('the input type is not valid');
				}
			}

			if (id !== null) {
				console.log(id);
				if (typeof (id) === 'string') {
					input.setAttribute('id', id);
				} else {
					throw new Error('the id is not valid');
				}
			}

			if (name !== null) {
				if (typeof (name) === 'string') {
					input.setAttribute('name', name);
				} else {
					throw new Error('the name is not valid');
				}
			}

			if (text !== null) {
				if (typeof (text) === 'string') {
					input.appendChild(document.createTextNode(text));
				} else {
					throw new Error('the text entered is not valid');
				}
			}

			if (min !== null) {
				if (!isNaN(min)) {
					input.setAttribute('min', min);
				} else {
					throw new Error('the minimum value is not a number');
				}
			}

			if (max !== null) {
				if (!isNaN(max)) {
					input.setAttribute('max', max);
				} else {
					throw new Error('the maximum value is not a number');
				}
			}

			if (step !== null) {
				if (!isNaN(step)) {
					input.setAttribute('step', step);
				} else {
					throw new Error('the step value is not a number');
				}
			}

			if (value !== null) {
				input.setAttribute('value', value);
			}

			if (listener !== null) {
				input.addEventListener(listener.type, this.handleEvent);
			}

			parent.appendChild(input);
		},

		handleEvent: function (event) {
			var name = event.srcElement.name,
				value = event.srcElement.value,
				newValue = 0;

			switch (name) {
			case 'landscapeWidth':
				screen.setWidth(value);
				landscape.refresh();
				break;
			case 'landscapeHeight':
				screen.setHeight(value);
				landscape.refresh();
				break;
			case 'landscapeWidth-100':
			case 'landscapeWidth-25':
			case 'landscapeWidth-5':
			case 'landscapeWidth-1':
			case 'landscapeWidth+1':
			case 'landscapeWidth+5':
			case 'landscapeWidth+25':
			case 'landscapeWidth+100':
				newValue = Math.round((parseFloat(screen.getWidth()) + parseFloat(value)) * 100) / 100;

//				console.log(parseFloat(screen.getWidth()) + ' + ' + parseFloat(value) + ' = ' + newValue);

				screen.setWidth(newValue);
				document.getElementById('landscapeWidth').setAttribute('value', newValue);
				landscape.refresh();
				break;
			}
		},

		initialize: function () {
			var section = document.createElement('section'),
				div = document.createElement('div'),
				fragment = document.createDocumentFragment();

			this.setParent(parameters.parent);

			div.setAttribute('id', 'landscape_properties');
			div.appendChild(document.createElement('div'));
			div.children[0].setAttribute('id', 'settings_landscapeWidth');
			this.createInput({
				parent: div.children[0],
				type: 'button',
				id: 'landscapeWidth-100',
				name: 'landscapeWidth-100',
				value: -100,
				text: '-100',
				listener: {
					type: 'click'
				}
			});
			this.createInput({
				parent: div.children[0],
				type: 'button',
				id: 'landscapeWidth-25',
				name: 'landscapeWidth-25',
				value: -25,
				text: '-25',
				listener: {
					type: 'click'
				}
			});
			this.createInput({
				parent: div.children[0],
				type: 'button',
				id: 'landscapeWidth-5',
				name: 'landscapeWidth-5',
				value: -5,
				text: '-5',
				listener: {
					type: 'click'
				}
			});
			this.createInput({
				parent: div.children[0],
				type: 'button',
				id: 'landscapeWidth-1',
				name: 'landscapeWidth-1',
				value: -1,
				text: '-1',
				listener: {
					type: 'click'
				}
			});
			this.createInput({
				parent: div.children[0],
				type: 'number',
				id: 'landscapeWidth',
				name: 'landscapeWidth',
				min: 0,
				step: 0.001,
				value: screen.getWidth(),
				listener: {
					type: 'input'
				}
			});
			this.createInput({
				parent: div.children[0],
				type: 'button',
				id: 'landscapeWidth+1',
				name: 'landscapeWidth+1',
				value: 1,
				text: '+1',
				listener: {
					type: 'click'
				}
			});
			this.createInput({
				parent: div.children[0],
				type: 'button',
				id: 'landscapeWidth+5',
				name: 'landscapeWidth+5',
				value: 5,
				text: '+5',
				listener: {
					type: 'click'
				}
			});
			this.createInput({
				parent: div.children[0],
				type: 'button',
				id: 'landscapeWidth+25',
				name: 'landscapeWidth+25',
				value: 25,
				text: '+25',
				listener: {
					type: 'click'
				}
			});
			this.createInput({
				parent: div.children[0],
				type: 'button',
				id: 'landscapeWidth+100',
				name: 'landscapeWidth+100',
				value: 100,
				text: '+100',
				listener: {
					type: 'click'
				}
			});
			div.appendChild(document.createElement('div'));
			div.children[1].setAttribute('id', 'landscapeHeight');
			this.createInput({
				parent: div.children[1],
				type: 'number',
				name: 'landscapeHeight',
				min: 0,
				step: 0.001,
				value: screen.getHeight(),
				listener: {
					type: 'input'
				}
			});

			section.setAttribute('id', 'settings');
			section.appendChild(div);

			fragment.appendChild(section);

			parent.appendChild(fragment);
		}
	};
};
