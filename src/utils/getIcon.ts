// Returns the name, type, and color for an icon based on device action or deviceType

interface Icon {
	iconName: string;
	iconType: string;
	iconColor?: string;
}

/**
 * Returns the name, type, and color for an icon based on device action or device type
 * @param deviceType - The type of device object.
 * @param action - The action to be performed on the device.
 * @returns Icon object
 */
export const getIcon = (deviceType: string, action: string): Icon => {
	let icon: Icon = {
		iconName: '',
		iconType: ''
	};

	if (action) {
		icon = getActionIconByAction(action);
	} else if (deviceType) {
		icon = getActionIconByDevice(deviceType);
	} else {
		icon = {
			iconName: 'home-assistant',
			iconType: 'material-community'
		};
	}

	return icon;
};

const getActionIconByAction = (action: string): Icon => {
	let icon: Icon = {
		iconName: '',
		iconType: ''
	};

	if (action == 'lock') {
		icon = {
			iconName: 'lock',
			iconType: 'simple-line-icon',
			iconColor: '#57E455'
		};
	} else if (action == 'unlock') {
		icon = {
			iconName: 'lock-open',
			iconType: 'simple-line-icon',
			iconColor: '#FF5722'
		};
	} else {
		icon = {
			iconName: 'home-assistant',
			iconType: 'material-community'
		};
	}

	return icon;
};

const getActionIconByDevice = (deviceType: string) => {
	let icon: Icon = {
		iconName: '',
		iconType: ''
	};

	if (deviceType.includes('doorbell')) {
		icon = {
			iconName: 'doorbell-video',
			iconType: 'material-community'
		};
	} else if (deviceType.includes('lock')) {
		icon = {
			iconName: 'lock',
			iconType: 'simple-line-icon'
		};
	} else if (deviceType.includes('light')) {
		icon = {
			iconName: 'lightbulb-outline',
			iconType: 'material-community'
		};
	} else if (deviceType.includes('alarm')) {
		icon = {
			iconName: 'alarm-light-outline',
			iconType: 'material-community'
		};
	}

	return icon;
};
