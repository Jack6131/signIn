import { createToast } from './toast';

/**
 * Checks whether a device is in a given state.
 * @param action - The action to be performed on the device.
 * @param deviceState - The current state of the device.
 * @param deviceType - The type of device object.
 * @returns boolean | True = action will change the device's state; False = device is already in the intended state.
 */
export const checkAction = (action: string, deviceState: string, deviceType: string): boolean => {
	// Lock actions
	if (deviceType == 'Lock') {
		if (action == 'lock' && deviceState == 'Locked') {
			createToast('Already Locked');
			return false;
		}
		if (action == 'unlock' && deviceState == 'Unlocked') {
			createToast('Already Unlocked');
			return false;
		}
	}

	// Light actions
	if (deviceType == 'Light') {
		if (action == 'turn_on' && deviceState == 'on') {
			createToast('Light is already turned on');
			return false;
		}
		if (action == 'turn_off' && deviceState == 'off') {
			createToast('Light is already turned off');
			return false;
		}
	}

	// Alarm actions
	if (deviceType == 'Alarm') {
		if (action == 'alarm_disarm' && deviceState == 'Disarmed') {
			createToast('Alarm is already disarmed');
			return false;
		}
		if (action == 'alarm_arm_home' && deviceState == 'Armed') {
			createToast('Alarm is already armed');
			return false;
		}
	}

	if (deviceState == 'Unavailable') {
		createToast('Device is unavailable');
		return false;
	}

	return true;
};
