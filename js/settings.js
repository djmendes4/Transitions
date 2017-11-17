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
			var wrapper = document.createElement('div'),
				input = document.createElement('input'),
				parent = object.parent || this.getParent(),
				type = object.type || null,
				id = object.id || null,
				group = object.group || null,
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
//				console.log(id);
				if (typeof (id) === 'string') {
					input.setAttribute('id', id);
				} else {
					throw new Error('the id is not valid');
				}
			}

			if (group !== null) {
//				console.log(group);
				if (typeof (group) === 'string') {
					input.setAttribute('class', group);
				} else {
					throw new Error('the group name is not valid');
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
			case 'landscapeHeight-100':
			case 'landscapeHeight-25':
			case 'landscapeHeight-5':
			case 'landscapeHeight-1':
			case 'landscapeHeight+1':
			case 'landscapeHeight+5':
			case 'landscapeHeight+25':
			case 'landscapeHeight+100':
				newValue = Math.round((parseFloat(screen.getHeight()) + parseFloat(value)) * 100) / 100;
				console.log(parseFloat(screen.getHeight()) + ' + ' + parseFloat(value) + ' = ' + newValue);
				screen.setHeight(newValue);
				document.getElementById('landscapeHeight').setAttribute('value', newValue);
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
				group: 'landscape button left',
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
				group: 'landscape button left',
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
				group: 'landscape button left',
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
				group: 'landscape button left',
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
				group: 'landscape number',
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
				group: 'landscape button right',
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
				group: 'landscape button right',
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
				group: 'landscape button right',
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
				group: 'landscape button right',
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
				type: 'button',
				id: 'landscapeHeight-100',
				group: 'landscape button',
				name: 'landscapeHeight-100',
				value: -100,
				text: '-100',
				listener: {
					type: 'click'
				}
			});
			this.createInput({
				parent: div.children[1],
				type: 'button',
				id: 'landscapeHeight-25',
				group: 'landscape button',
				name: 'landscapeHeight-25',
				value: -25,
				text: '-25',
				listener: {
					type: 'click'
				}
			});
			this.createInput({
				parent: div.children[1],
				type: 'button',
				id: 'landscapeHeight-5',
				group: 'landscape button',
				name: 'landscapeHeight-5',
				value: -5,
				text: '-5',
				listener: {
					type: 'click'
				}
			});
			this.createInput({
				parent: div.children[1],
				type: 'button',
				id: 'landscapeHeight-1',
				group: 'landscape button',
				name: 'landscapeHeight-1',
				value: -1,
				text: '-1',
				listener: {
					type: 'click'
				}
			});
			this.createInput({
				parent: div.children[1],
				type: 'number',
				id: 'landscapeHeight',
				group: 'landscape number',
				name: 'landscapeHeight',
				min: 0,
				step: 0.001,
				value: screen.getHeight(),
				listener: {
					type: 'input'
				}
			});
			this.createInput({
				parent: div.children[1],
				type: 'button',
				id: 'landscapeHeight+1',
				group: 'landscape button',
				name: 'landscapeHeight+1',
				value: 1,
				text: '+1',
				listener: {
					type: 'click'
				}
			});
			this.createInput({
				parent: div.children[1],
				type: 'button',
				id: 'landscapeHeight+5',
				group: 'landscape button',
				name: 'landscapeHeight+5',
				value: 5,
				text: '+5',
				listener: {
					type: 'click'
				}
			});
			this.createInput({
				parent: div.children[1],
				type: 'button',
				id: 'landscapeHeight+25',
				group: 'landscape button',
				name: 'landscapeHeight+25',
				value: 25,
				text: '+25',
				listener: {
					type: 'click'
				}
			});
			this.createInput({
				parent: div.children[1],
				type: 'button',
				id: 'landscapeHeight+100',
				group: 'landscape button',
				name: 'landscapeHeight+100',
				value: 100,
				text: '+100',
				listener: {
					type: 'click'
				}
			});

			section.setAttribute('id', 'settings');
			section.appendChild(div);

			fragment.appendChild(section);

			parent.appendChild(fragment);
		}
	};
};
