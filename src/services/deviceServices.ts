/**
 * Contains the services that are related to managing devices, including:
 * - Creating a new device
 * - Setting and updating device properties
 * - Retrieving device properties and action access
 * - Deleting a device
 * - Retrieving all devices and shared devices
 * - Using a device (sending actions)
 * - Retrieving device status values
 * - Toggling the ring stream for a device
 */

/**
 * Creates a new device.
 *
 * @param account - The account associated with the device.
 * @param idToken - The ID token for authentication.
 * @param title - The title of the device.
 * @param entity_id - The entity ID of the device.
 * @param type - The type of the device.
 * @returns A Promise that resolves to the response data from the server.
 */
export const createADevice = async (
	account: string,
	idToken: string,
	{ title, entity_id, type }: { title: string; entity_id: string; type: string }
): Promise<any> => {
	return await fetch('https://c8zta83ta5.execute-api.us-east-1.amazonaws.com/test/shareddevice', {
		method: 'POST',
		headers: {
			Authorization: 'Bearer ' + idToken,
			'Content-type': 'application/json',
			Accept: '*/*'
		},
		body: JSON.stringify({
			account: account,
			name: title,
			entity_id: entity_id,
			type: type
		})
	})
		.then((response) => response.json())
		.then((data) => {
			console.log('Calling setProperties: ' + JSON.stringify(data));
			setProperties(account, idToken, data.message);
			return data;
		})
		.catch((err) => console.log(err));
};

/**
 * Sets the properties for a shared property.
 *
 * @param account - The account associated with the property.
 * @param idToken - The ID token for authentication.
 * @param sharedPropertyID - The ID of the shared property.
 * @returns A Promise that resolves to the response data.
 */
export const setProperties = async (account: string, idToken: string, sharedPropertyID: string): Promise<any> => {
	const response = await fetch('https://c8zta83ta5.execute-api.us-east-1.amazonaws.com/test/property', {
		method: 'POST',
		headers: {
			Authorization: 'Bearer ' + idToken,
			'Content-type': 'application/json',
			Accept: '*/*'
		},
		body: JSON.stringify({
			account: account,
			device: sharedPropertyID,
			geofencing: 0,
			access_type: 0,
			all_day: 0,
			time_start: null,
			time_end: null,
			date_start: null,
			date_end: null,
			reoccuring: null,
			reoccuring_type: 0
		})
	})
		.then((response) => response.json())
		.then((data) => {
			return data;
		})
		.catch((err) => console.log(err));
};

/**
 * Updates the properties of an object.
 *
 * @param properties - The properties to update.
 * @param idToken - The ID token for authorization.
 * @returns A promise that resolves to the updated properties.
 */
export const updateProperties = async (properties: any, idToken: string): Promise<any> =>
	new Promise((resolve, reject) => {
		fetch('https://c8zta83ta5.execute-api.us-east-1.amazonaws.com/test/property', {
			method: 'PUT',
			headers: {
				Authorization: 'Bearer ' + idToken,
				'Content-type': 'application/json',
				Accept: '*/*'
			},
			body: JSON.stringify(properties)
		})
			.then((response) => response.json())
			.then((data) => {
				resolve(data);
			})
			.catch((err) => console.log('updateProperties ERROR', err));
	});

/**
 * Retrieves the properties of a device from the server.
 *
 * @param accountID - The ID of the account.
 * @param deviceID - The ID of the device.
 * @param idToken - The ID token for authentication.
 * @returns A promise that resolves with the device properties.
 */
export const getDeviceProperties = async (accountID: string, deviceID: string, idToken: string): Promise<any> =>
	new Promise((resolve, reject) => {
		fetch('https://c8zta83ta5.execute-api.us-east-1.amazonaws.com/test/getproperty', {
			method: 'POST',
			headers: {
				Authorization: 'Bearer ' + idToken,
				'Content-Type': 'application/json',
				Accept: '*/*'
			},
			body: JSON.stringify({
				account: accountID,
				device_id: deviceID
			})
		})
			.then((resp) => resp.json())
			.then((data) => {
				resolve(data);
			})
			.catch((err) => reject(err));
	});

/**
 * Retrieves the action access for a given idToken and shared_device_properties_id.
 *
 * @param idToken - The idToken used for authentication.
 * @param shared_device_properties_id - The shared_device_properties_id for which to retrieve the action access.
 * @returns - A promise that resolves to the action access data.
 * @throws - If there is an error retrieving the action access.
 */
export const getActionAccess = async (idToken: string, shared_device_properties_id: string): Promise<any> =>
	new Promise((resolve, reject) => {
		fetch('https://c8zta83ta5.execute-api.us-east-1.amazonaws.com/test/action', {
			method: 'POST',
			headers: {
				Authorization: 'Bearer ' + idToken,
				'Content-type': 'application/json',
				Accept: '*/*'
			},
			body: JSON.stringify({ shared_device_properties_id })
		})
			.then((response) => response.json())
			.then((data) => {
				resolve(data);
			})
			.catch((err) => {
				reject(err);
			});
	});

/**
 * Updates the access level of an action.
 *
 * @param idToken - The authentication token.
 * @param account - The account identifier.
 * @param shared_device_properties_id - The identifier of the shared device properties.
 * @param name - The name of the action.
 * @param access - The new access level for the action.
 * @param type - The type of the action.
 * @returns A promise that resolves to the updated action data.
 */
export const updateActionAccess = async (
	idToken: string,
	account: string,
	shared_device_properties_id: string,
	name: string,
	access: number,
	type: string
): Promise<any> =>
	new Promise((resolve, reject) => {
		fetch('https://c8zta83ta5.execute-api.us-east-1.amazonaws.com/test/action', {
			method: 'PUT',
			headers: {
				Authorization: 'Bearer ' + idToken,
				'Content-type': 'application/json',
				Accept: '*/*'
			},
			body: JSON.stringify({ account, shared_device_properties_id, name, access, type })
		})
			.then((response) => response.json())
			.then((data) => {
				resolve(data);
			})
			.catch((err) => {
				reject(err);
			});
	});

/**
 * Deletes a device for a given login ID.
 *
 * @param {string} login_id - The login ID of the user.
 * @param {string} device - The device to be deleted.
 * @param {string} idToken - The ID token for authentication.
 * @returns {Promise<any>} - A promise that resolves to the response data.
 */
export const deleteADevice = async (login_id: string, device: string, idToken: string): Promise<any> => {
	const response = await fetch('https://c8zta83ta5.execute-api.us-east-1.amazonaws.com/test/device', {
		method: 'DELETE',
		headers: {
			Authorization: 'Bearer ' + idToken,
			'Content-type': 'application/json',
			Accept: '*/*'
		},
		body: JSON.stringify({
			account: login_id,
			device: device
		})
	})
		.then((response) => response.json())
		.then((data) => {
			console.log('Device Deleted: ', data);
			return data;
		})
		.catch((err) => console.log(err));
};

/**
 * Retrieves all devices using the provided idToken.
 *
 * @param idToken - The authentication token used for authorization.
 * @returns A Promise that resolves to an array of devices.
 * @throws An error if the request fails.
 */
export const getDevices = async (idToken: string): Promise<any> =>
	new Promise((resolve, reject) => {
		fetch('https://c8zta83ta5.execute-api.us-east-1.amazonaws.com/test/getalldevices', {
			method: 'GET',
			headers: {
				Authorization: 'Bearer ' + idToken
			}
		})
			.then((response) => response.json())
			.then((data) => {
				//console.log("getAllDevices: " + JSON.stringify(data))
				resolve(data.devices);
			})
			.catch((err) => reject(err));
	});

/**
 * Retrieves a list of devices that have been shared with the user (as a guest), along with information about who shared it and whether the user accepted their hub invite.
 *
 * @param hasNextToken - Optional. A token indicating whether there are more devices to retrieve.
 * @param idToken - The ID token used for authentication.
 * @returns A Promise that resolves to the shared devices list.
 */
export const getSharedDevicesList = async (hasNextToken: string | null = null, idToken: string): Promise<any> =>
	new Promise((resolve, reject) => {
		fetch('https://c8zta83ta5.execute-api.us-east-1.amazonaws.com/test/getshareddevices', {
			method: 'GET',
			headers: {
				Authorization: 'Bearer ' + idToken
			}
		})
			.then((response) => response.json())
			.then((data) => {
				//console.log("getSharedDevicesList: " + JSON.stringify(data))
				resolve(data.message);
			})
			.catch((err) => reject(err));
	});

/**
 * Sends a request to use a device.
 *
 * @param {string} action - The action to perform on the device.
 * @param {string} idToken - The ID token for authentication.
 * @param {any} device - The device object.
 * @param {boolean} isHomeowner - Optional. Indicates if the user is a homeowner. Default is false.
 * @returns {Promise<void>} - A promise that resolves when the request is successful, or rejects with an error message.
 */
export const useDevice = async (
	action: string,
	idToken: string,
	device: any,
	isHomeowner: boolean = false
): Promise<void> =>
	new Promise((resolve, reject) => {
		const bodyData = isHomeowner
			? {
					entity_id: device.entity_id,
					device_id: device.shared_device_properties_id,
					action
			  }
			: {
					account: device.login_credentials_id,
					device_id: device.shared_device_properties_id,
					action
			  };

		try {
			fetch('https://c8zta83ta5.execute-api.us-east-1.amazonaws.com/test/usedevice', {
				method: 'POST',
				headers: {
					Authorization: 'Bearer ' + idToken,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(bodyData)
			})
				.then((response) => response.json())
				.then((data) => {
					console.log('USE DEVICE RETURN:', data);
					if (data.statusCode == 200) resolve();
					else if (data.statusCode == 407 || data.statusCode == 408) reject(data.message);
				})
				.catch((err) => console.log('ERROR', err));
		} catch (e) {
			console.error('ERROR: ', e);
		}
	});

/**
 * Retrieves the status values of a device.
 *
 * @param idToken - The ID token for authentication.
 * @param device - The device object containing login credentials and shared device properties.
 * @returns A promise that resolves to the device values.
 * @throws An error if the fetch request fails.
 */
export const getDeviceValues = async (idToken: string, device: any): Promise<any> =>
	new Promise((resolve, reject) => {
		try {
			fetch('https://c8zta83ta5.execute-api.us-east-1.amazonaws.com/test/getvalues', {
				method: 'POST',
				headers: {
					Authorization: 'Bearer ' + idToken,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					account: device.login_credentials_id,
					device: device.shared_device_properties_id
				})
			})
				.then((response) => response.json())
				.then((data) => {
					resolve(data);
				})
				.catch((err) => {
					reject(err);
				});
		} catch (e) {
			console.error('ERROR: ', e);
		}
	});

/**
 * Toggles the ring stream for a device.
 *
 * @param idToken - The ID token for authentication.
 * @param device - The device object.
 * @param action - The action to perform on the ring stream.
 * @returns A promise that resolves with the response data or rejects with an error message.
 */
export const toggleRingStream = async (idToken: string, device: any, action: string): Promise<any> =>
	new Promise((resolve, reject) => {
		try {
			fetch('https://c8zta83ta5.execute-api.us-east-1.amazonaws.com/test/toggleRingStream', {
				method: 'POST',
				headers: {
					Authorization: 'Bearer ' + idToken,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					account: device.login_credentials_id,
					action: action
				})
			})
				.then((response) => response.json())
				.then((data) => {
					console.log('Livestream: ' + JSON.stringify(data));
					if (data.statusCode == 200) resolve(data);
					else if (data.statusCode == 407) reject('No access at this time');
					else reject('Unable to turn on stream. Please try again.');
				})
				.catch(() => reject('Unable to turn on stream. Please try again.'));
		} catch (e) {
			console.error('ERROR: ', e);
		}
	});
