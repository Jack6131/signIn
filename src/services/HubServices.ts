const API_BASE_URL = 'https://c8zta83ta5.execute-api.us-east-1.amazonaws.com/test';

interface HubData {
	hub_token: string;
}

/**
 * Creates a hub with the provided hub token.
 *
 * @param hub_token - The hub token used to create the hub.
 * @param idToken - The ID token used for authorization.
 * @returns A promise that resolves to the created hub data, or undefined if an error occurs.
 * @throws {Error} - If the API request fails with a non-ok status.
 */
export const createHub = async ({ hub_token }: HubData, idToken: string) => {
	try {
		const response = await fetch(`${API_BASE_URL}/hub`, {
			method: 'POST',
			headers: {
				Authorization: 'Bearer ' + idToken,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				hub_token: hub_token
			})
		});

		if (!response.ok) {
			throw new Error(`API request failed with status ${response.status}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error creating hub: ', error);
		return undefined;
	}
};

/**
 * Deletes a hub from the API.
 *
 * @param idToken - The ID token for authentication.
 * @returns The response data from the API.
 * @throws {Error} - An error if the API request fails.
 */
export const deleteHub = async (idToken: string) => {
	try {
		const response = await fetch(`${API_BASE_URL}/hub`, {
			method: 'DELETE',
			headers: {
				Authorization: 'Bearer ' + idToken,
				'Content-type': 'application/json',
				Accept: '*/*'
			}
		});

		if (!response.ok) {
			throw new Error(`API request failed with status ${response.status}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error deleting hub: ', error);
		return undefined;
	}
};

/**
 * Retrieves hub information for a user.
 *
 * @param idToken - The user's ID token for authentication.
 * @returns A promise that resolves to the hub information, or undefined if an error occurs.
 * @throws {Error} - An error if the API request fails or error occurs.
 */
export const getHubInfoService = async (idToken: string) => {
	try {
		const response = await fetch(`${API_BASE_URL}/getUserInfo`, {
			method: 'GET',
			headers: {
				Authorization: 'Bearer ' + idToken
			}
		});

		if (!response.ok) {
			throw new Error(`API request failed with status ${response.status}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error getting hub info: ', error);
		return undefined;
	}
};

/**
 * Handles a guest leaving a homeowner hub.
 *
 * @param account - The account of the guest leaving the hub.
 * @param value - The value indicating whether the guest has accepted the leave request.
 * @param idToken - The authorization token for the API request.
 * @returns A promise that resolves to the response data from the API request or undefined if an error occurs.
 * @throws {Error} - If the API request fails or error occurs.
 */
export const handleLeavingHub = async (account, value, idToken) => {
	try {
		const response = await fetch(`${API_BASE_URL}/invitation`, {
			method: 'POST',
			headers: {
				Authorization: 'Bearer ' + idToken,
				'Content-type': 'application/json',
				Accept: '*/*'
			},
			body: JSON.stringify({
				account: account,
				accepted: value
			})
		});

		if (!response.ok) {
			throw new Error(`API request failed with status ${response.status}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error guest leaving homeowner hub: ', error);
		return undefined;
	}
};

/**
 * Retrieves user logs from the API.
 *
 * @param idToken - The ID token for authentication.
 * @returns A promise that resolves to the user logs or undefined if an error occurs.
 * @throws {Error} - If the API request fails or returns an internal server error.
 */
export const getLogs = async (idToken) => {
	try {
		const response = await fetch(`${API_BASE_URL}/getuserlogs`, {
			method: 'GET',
			headers: {
				Authorization: 'Bearer ' + idToken
			}
		});

		if (!response.ok) {
			throw new Error(`API request failed with status ${response.status}`);
		}

		const data = await response.json();

		if (data.message == 'Internal server error') {
			throw new Error(data.message);
		}

		return data.message;
	} catch (error) {
		console.error('Error deleting hub: ', error);
		return undefined;
	}
};
