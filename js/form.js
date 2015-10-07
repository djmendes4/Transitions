var Handler = function () {
	'use strict';

	this.currentMenuItem = null;
	this.currentSettingsMenu = null;

	this.buildMenu = function (settings) {
		var newElement = settings.elementType || null,
			newTextNode = settings.elementTextNode || null,
			id = settings.id || null,
			className = settings.className || null,
			attribute = settings.attribute || null,
			eventListener = settings.eventListener || null,
			i = 0;

		if (newElement !== null && typeof newElement !== 'undefined' && typeof newElement === 'string') {
			newElement = document.createElement(newElement);

			if (id !== null && typeof id !== 'undefined' && typeof id === 'string') {
				newElement.setAttribute('id', id);
			}

			if (className !== null && typeof className !== 'undefined' && typeof className === 'string') {
				newElement.setAttribute('class', className);
			}

			if (Array.isArray(attribute) && attribute.length > 0 && attribute !== null && typeof attribute !== undefined) {
				for (i = 0; i < attribute.length; i += 1) {
					newElement.setAttribute(attribute[i][0], attribute[i][1]);
				}
			}

			if (newTextNode !== null && typeof newTextNode !== 'undefined' && typeof newTextNode === 'string') {
				newTextNode = document.createTextNode(newTextNode);
				newElement.appendChild(newTextNode);
			}

			settings.self = newElement;
		}

		if (settings.parent !== null && typeof settings.parent !== 'undefined') {
			settings.parent.appendChild(settings.self);
		} else if (settings.parent === null) {
			settings.parent = document.getElementById('container');
			settings.parent.appendChild(newElement);
		}

		if (Array.isArray(settings.child) && settings.child !== null && typeof settings.child !== undefined) {
			for (i = 0; i < settings.child.length; i += 1) {

				settings[settings.child[i]].parent = settings.self;
				settings.child[i] = this.buildMenu(settings[settings.child[i]]);
//				console.log(this.buildMenu(settings[settings.child[i]]));
//				console.log(settings.self);
			}
		}

		return settings.self;
	};

	this.updateEventListeners = function () {
		var eventArray = [],
			menu = this.settingsMenu,
			screen = this.screenSettings,
			i = 0;

		eventArray = [[menu.toggle.self, ['mouseover', 'mousemove', 'mouseout'], this.temptSettingsMenu.bind(this)],
					  [menu.toggle.self, 'click', this.toggleSettingsMenu.bind(this)],
					  [[menu.screen.self, menu.landscape.self, menu.transition.self], ['mouseover', 'mouseout'], this.temptSettings.bind(this)],
					  [[menu.screen.self, menu.landscape.self, menu.transition.self], 'click', [this.toggleSettings.bind(this, screen), this.toggleSettings.bind(this, this.settings.landscape), this.toggleSettings.bind(this, this.settings.transition)]],
					  [screen.fullscreen.checkbox.self, 'change', this.toggleFullscreen.bind(this)],
					  [screen.theater.checkbox.self, 'change', this.toggleTheaterMode.bind(this)]];
//					  [this.settings.landscape.width.number.self, 'change', window.landscape.setLandscapeWidth],
//					  [this.settings.landscape.height.number.self, 'change', window.landscape.setLandscapeHeight],
//					  [this.settings.landscape.borderWidth.number.self, 'change', window.landscape.setBorderWidth],
//					  [this.settings.landscape.cellWidth.number.self, 'change', window.landscape.setCellWidth],
//					  [this.settings.landscape.cellHeight.number.self, 'change', window.landscape.setCellHeight],
//					  [this.settings.landscape.cellBorderWidth.number.self, 'change', window.landscape.setCellBorderWidth],
//					  [this.settings.landscape.cellBorderRadius.number.self, 'change', window.landscape.setCellBorderRadius],
//					  [this.settings.transition.type.select.self, 'change', window.transition.setTransition.bind(null, event)],
//					  [this.settings.transition.horizontalCenter.self, 'change', window.transition.setHorizontalCenter.bind(null, event)],
//					  [this.settings.transition.verticalCenter.self, 'change', window.transition.setVerticalCenter.bind(null, event)],
//					  [this.settings.transition.duration.self, 'change', window.transition.setDuration.bind(null, event)],
//					  [this.settings.transition.variance.self, 'change', window.transition.setVariance.bind(null, event)]];

		return eventArray;
	};

	this.addEventListeners = function (settings) {
		var i = 0,
			j = 0,
			k = 0;

		for (i = 0; i < settings.length; i += 1) {
			if (!Array.isArray(settings[i][0])) {settings[i][0] = [settings[i][0]]; }
			for (j = 0; j < settings[i][0].length; j += 1) {
				if (!Array.isArray(settings[i][1])) {settings[i][1] = [settings[i][1]]; }
				for (k = 0; k < settings[i][1].length; k += 1) {
					if (!Array.isArray(settings[i][2])) {
						settings[i][0][j].addEventListener(settings[i][1][k], settings[i][2]);
					} else {
						settings[i][0][j].addEventListener(settings[i][1][k], settings[i][2][j]);
					}
				}
			}
		}
	};

	this.temptSettingsMenu = function (event) {
		var type = event.type,
			target = event.target,
			state = target.getAttribute('state'),
			i = 0;

		if (type === 'mouseover' || (type === 'mousemove' && (state === null || state === '2'))) {
			target.setAttribute('tempt', '');
			this.settings.self.setAttribute('tempt', '');
		} else if (type === 'mouseout') {
			target.removeAttribute('tempt');
			this.settings.self.removeAttribute('tempt');
		}
	};

	this.toggleSettingsMenu = function (event) {
		var type = event.type,
			target = event.target,
			state = target.getAttribute('state');

		if (state === null) {
			target.setAttribute('state', '1');
			this.settings.self.setAttribute('lowered', '');

			setTimeout(function () {
				target.setAttribute('state', '2');
			}, 600);
		} else if (state === '2') {
			target.setAttribute('state', '3');
			this.settings.self.removeAttribute('lowered');

			target.removeAttribute('tempt');
			this.settings.self.removeAttribute('tempt');

			setTimeout(function () {
				target.removeAttribute('state');
			}, 600);
		}
	};

	this.temptSettings = function (event) {
		var target = event.target,
			type = event.type;

		if (type === 'mouseover') {
			target.setAttribute('tempt', '');
		} else if (type === 'mouseout') {
			target.removeAttribute('tempt');
		}
	};

	this.toggleSettings = function (settings, event) {
		var target = event.target,
			mark = settings.self,
			selected = event.target.getAttribute('selected');

		if (selected === null && this.currentMenuItem === null) {
			this.currentMenuItem = target;
			target.setAttribute('selected', '');

			this.currentSettingsMenu = mark;
			mark.setAttribute('selected', '');
		} else if (selected === null && this.currentMenuItem !== null) {
			this.currentMenuItem.removeAttribute('selected');
			this.currentMenuItem = target;
			target.setAttribute('selected', '');

			this.currentSettingsMenu.removeAttribute('selected');
			this.currentSettingsMenu = mark;
			mark.setAttribute('selected', '');
		} else if (selected === '') {
			this.currentMenuItem = null;
			target.removeAttribute('selected');

			this.currentSettingsMenu = null;
			mark.removeAttribute('selected');
		}
	};

	this.toggleFullscreen = function (event) {
		var target = event.target;

		if (target.checked) {
			document.documentElement.webkitRequestFullscreen();
		} else {
			document.webkitExitFullscreen();
		}
	};

	this.toggleTheaterMode = function (event) {
		var target = event.target;

		if (target.checked) {
			document.getElementById('theater').setAttribute('theater', '');
			target.setAttribute('theater', '');
		} else {
			document.getElementById('theater').removeAttribute('theater');
			target.removeAttribute('theater');
		}
	};

	this.settingsMenu = {
		parent: document.getElementById('container'),
		child: ['toggle', 'screen', 'landscape', 'transition'],
		elementType: 'section',
		id: 'menu-items',
		toggle: {
			elementType: 'div',
			className: 'settings toggle'
		},
		screen: {
			elementType: 'div',
			elementTextNode: 'Screen',
			className: 'screen settings menu-item',
			mark: 'screen'
		},
		landscape: {
			elementType: 'div',
			elementTextNode: 'Landscape',
			className: 'landscape settings menu-item'
		},
		transition: {
			elementType: 'div',
			elementTextNode: 'Transition',
			className: 'transition settings menu-item'
		}
	};

	this.screenSettings = {
		parent: document.getElementById('container'),
		child: ['fullscreen', 'theater'],
		elementType: 'section',
		id: 'screen-settings',
		fullscreen: {
			child: ['checkbox', 'name', 'tooltip'],
			elementType: 'div',
			className: 'screen settings',
			checkbox: {
				elementType: 'input',
				attribute: [['type', 'checkbox'], ['name', 'fullscreen'], ['value', 'fullscreen']]
			},
			name: {
				elementType: 'div',
				elementTextNode: 'Fullscreen mode',
				className: 'option'
			},
			tooltip: {
				elementType: 'div',
				elementTextNode: 'Determines whether or not to request fullscreen access from the browser',
				className: 'tooltip'
			}
		},
		theater: {
			child: ['checkbox', 'name', 'tooltip'],
			elementType: 'div',
			className: 'screen settings',
			checkbox: {
				elementType: 'input',
				attribute: [['type', 'checkbox'], ['name', 'theater'], ['value', 'theater']]
			},
			name: {
				elementType: 'div',
				elementTextNode: 'Theater Mode',
				className: 'option'
			},
			tooltip: {
				elementType: 'div',
				elementTextNode: 'Darkens the background',
				className: 'tooltip'
			}
		}
	};

	this.settings = {
		parent: document.getElementById('container'),
		child: ['landscape', 'transition'],
		elementType: 'section',
		id: 'settings',
		landscape: {
			child: ['width', 'height', 'borderWidth', 'cellWidth', 'cellHeight', 'cellBorderWidth', 'cellBorderRadius'],
			elementType: 'section',
			id: 'landscape-settings',
			width: {
				child: ['number', 'name', 'tooltip'],
				elementType: 'div',
				className: 'screen settings',
				number: {
					elementType: 'input',
					attribute: [['type', 'number'], ['name', 'width'], ['min', '100'], ['max', screen.width], ['step', '25'], ['value', screen.width]]
				},
				name: {
					elementType: 'div',
					elementTextNode: 'Landscape Width',
					className: 'option'
				},
				tooltip: {
					elementType: 'div',
					elementTextNode: '',
					className: 'tooltip'
				}
			},
			height: {
				child: ['number', 'name', 'tooltip'],
				elementType: 'div',
				className: 'screen settings',
				number: {
					elementType: 'input',
					attribute: [['type', 'number'], ['name', 'height'], ['min', '100'], ['max', '600'], ['step', '25'], ['value', window.landscape.height]]
				},
				name: {
					elementType: 'div',
					elementTextNode: 'Landscape Height',
					className: 'option'
				},
				tooltip: {
					elementType: 'div',
					elementTextNode: '',
					className: 'tooltip'
				}
			},
			borderWidth: {
				child: ['number', 'name', 'tooltip'],
				elementType: 'div',
				className: 'screen settings',
				number: {
					elementType: 'input',
					attribute: [['type', 'number'], ['name', 'borderWidth'], ['min', '0'], ['max', '20'], ['step', '1'], ['value', '3']]
				},
				name: {
					elementType: 'div',
					elementTextNode: 'Landscape Border Width',
					className: 'option'
				},
				tooltip: {
					elementType: 'div',
					elementTextNode: '',
					className: 'tooltip'
				}
			},
			cellWidth: {
				child: ['number', 'name', 'tooltip'],
				elementType: 'div',
				className: 'screen settings',
				number: {
					elementType: 'input',
					attribute: [['type', 'number'], ['name', 'cellWidth'], ['min', '1'], ['max', '500'], ['step', '1'], ['value', '10']]
				},
				name: {
					elementType: 'div',
					elementTextNode: 'Landscape Cell Width',
					className: 'option'
				},
				tooltip: {
					elementType: 'div',
					elementTextNode: '',
					className: 'tooltip'
				}
			},
			cellHeight: {
				child: ['number', 'name', 'tooltip'],
				elementType: 'div',
				className: 'screen settings',
				number: {
					elementType: 'input',
					attribute: [['type', 'number'], ['name', 'cellHeight'], ['min', '1'], ['max', '500'], ['step', '1'], ['value', '10']]
				},
				name: {
					elementType: 'div',
					elementTextNode: 'Landscape Cell Height',
					className: 'option'
				},
				tooltip: {
					elementType: 'div',
					elementTextNode: '',
					className: 'tooltip'
				}
			},
			cellBorderRadius: {
				child: ['number', 'name', 'tooltip'],
				elementType: 'div',
				className: 'screen settings',
				number: {
					elementType: 'input',
					attribute: [['type', 'number'], ['name', 'cellBorderRadius'], ['min', '0'], ['max', '500'], ['step', '1'], ['value', '0']]
				},
				name: {
					elementType: 'div',
					elementTextNode: 'Landscape Cell Border Radius',
					className: 'option'
				},
				tooltip: {
					elementType: 'div',
					elementTextNode: '',
					className: 'tooltip'
				}
			},
			cellBorderWidth: {
				child: ['number', 'name', 'tooltip'],
				elementType: 'div',
				className: 'screen settings',
				number: {
					elementType: 'input',
					attribute: [['type', 'number'], ['name', 'cellBorderWidth'], ['min', '0'], ['max', '50'], ['step', '1'], ['value', '1']]
				},
				name: {
					elementType: 'div',
					elementTextNode: 'Landscape Cell Border Width',
					className: 'option'
				},
				tooltip: {
					elementType: 'div',
					elementTextNode: '',
					className: 'tooltip'
				}
			}
		},
		transition: {
			child: ['type', 'horizontalCenter', 'verticalCenter', 'duration', 'variance'],
			elementType: 'section',
			id: 'transition-settings',
			type: {
				child: ['select', 'name', 'tooltip'],
				elementType: 'div',
				className: 'transition settings',
				select: {
					child: ['linear', 'quadratic', 'circular', 'sine'],
					elementType: 'select',
					attribute: [['name', 'width']],
					linear: {
						child: ['name'],
						elementType: 'option',
						className: 'transition-type option',
						attribute: [['value', 'linear']],
						name: {
							elementType: 'div',
							elementTextNode: 'Linear'
						}
					},
					quadratic: {
						child: ['name'],
						elementType: 'option',
						className: 'transition-type option',
						attribute: [['value', 'quadratic']],
						name: {
							elementType: 'div',
							elementTextNode: 'Quadratic'
						}
					},
					circular: {
						child: ['name'],
						elementType: 'option',
						className: 'transition-type option',
						attribute: [['value', 'circular'], ['selected', '']],
						name: {
							elementType: 'div',
							elementTextNode: 'Circular'
						}
					},
					sine: {
						child: ['name'],
						elementType: 'option',
						className: 'transition-type option',
						attribute: [['value', 'sine'], ['selected', '']],
						name: {
							elementType: 'div',
							elementTextNode: 'Sine Wave'
						}
					}
				},
				name: {
					elementType: 'div',
					elementTextNode: 'Transition Type',
					className: 'option'
				},
				tooltip: {
					elementType: 'div',
					elementTextNode: '',
					className: 'tooltip'
				}
			},
			horizontalCenter: {
				child: ['number', 'name', 'tooltip'],
				elementType: 'div',
				className: 'transition settings',
				number: {
					elementType: 'input',
					attribute: [['type', 'number'], ['name', 'horizontalCenter'], ['min', 0], ['max', window.landscape.columns], ['step', 1], ['value', 0]]
				},
				name: {
					elementType: 'div',
					elementTextNode: 'Transition Horizontal Center',
					className: 'option'
				},
				tooltip: {
					elementType: 'div',
					elementTextNode: '',
					className: 'tooltip'
				}
			},
			verticalCenter: {
				child: ['number', 'name', 'tooltip'],
				elementType: 'div',
				className: 'transition settings',
				number: {
					elementType: 'input',
					attribute: [['type', 'number'], ['name', 'verticalCenter'], ['min', 0], ['max', window.landscape.rows], ['step', 1], ['value', 0]]
				},
				name: {
					elementType: 'div',
					elementTextNode: 'Transition Vertical Center',
					className: 'option'
				},
				tooltip: {
					elementType: 'div',
					elementTextNode: '',
					className: 'tooltip'
				}
			},
			duration: {
				child: ['number', 'name', 'tooltip'],
				elementType: 'div',
				className: 'transition settings',
				number: {
					elementType: 'input',
					attribute: [['type', 'number'], ['name', 'duration'], ['min', 100], ['max', 600000], ['step', 100], ['value', 7200]]
				},
				name: {
					elementType: 'div',
					elementTextNode: 'Transition Duration',
					className: 'option'
				},
				tooltip: {
					elementType: 'div',
					elementTextNode: '',
					className: 'tooltip'
				}
			},
			variance: {
				child: ['number', 'name', 'tooltip'],
				elementType: 'div',
				className: 'transition settings',
				number: {
					elementType: 'input',
					attribute: [['type', 'number'], ['name', 'variance'], ['min', 0], ['max', 1], ['step', 0.01], ['value', 0]]
				},
				name: {
					elementType: 'div',
					elementTextNode: 'Transition Variance',
					className: 'option'
				},
				tooltip: {
					elementType: 'div',
					elementTextNode: '',
					className: 'tooltip'
				}
			}
		}
	};

	this.initialize = function () {
		this.buildMenu(this.settingsMenu);
		this.buildMenu(this.screenSettings);
		this.eventListeners = this.updateEventListeners();
		this.addEventListeners(this.eventListeners);
	};

	this.initialize();
};
