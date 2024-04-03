import { fetchAuthSession, fetchUserAttributes } from 'aws-amplify/auth';
import { Alert, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import { AccountData } from '../interfaces/AuthInterfaces';

const API_BASE_URL = 'https://c8zta83ta5.execute-api.us-east-1.amazonaws.com/test';

/**
 * Registers the device for push notifications.
 *
 * Checks the notification permission status and requests permission if necessary.
 * Then retrieves the push token using the getPushToken function.
 *
 * If the platform is Android, it sets the notification channel.
 *
 * @returns {Promise<string | undefined>} The push token if successful, otherwise undefined.
 */
export const registerPushNotifications = async (): Promise<string | undefined> => {
	const { status: existingStatus } = await Notifications.getPermissionsAsync();
	let finalStatus = existingStatus;

	if (existingStatus !== 'granted') {
		const { status } = await Notifications.requestPermissionsAsync();
		finalStatus = status;
	}
	if (finalStatus !== 'granted') {
		Alert.alert('Access Denied', 'Failed to turn on push notifications. Please try again.');
		return;
	}

	const token = await getPushToken();

	if (Platform.OS === 'android') {
		await Notifications.setNotificationChannelAsync('default', {
			name: 'default',
			importance: Notifications.AndroidImportance.MAX,
			vibrationPattern: [0, 250, 250, 250],
			lightColor: '#FF231F7C'
		});
	}

	Alert.alert('Access Granted', 'Push Notifications are now turned on');

	return token;
};

/**
 * Retrieves the current session for the authenticated user.
 *
 * @returns {Promise<AccountData>} A promise that resolves to an object containing the user's account data, including the ID, tokens, email, and name.
 * @throws {Error} If there is an error retrieving the auth session.
 */
export const getCurrentSession = async (): Promise<AccountData> => {
	try {
		const { tokens } = await fetchAuthSession();
		const attributes = await fetchUserAttributes();

		if (!tokens || !attributes) {
			throw new Error('Invalid auth tokens or user attributes.');
		}

		const { idToken, accessToken } = tokens;

		const accountData: AccountData = {
			id: idToken.payload.sub,
			idToken,
			accessToken,
			email: attributes.email,
			name: attributes.name
		};

		return accountData;
	} catch (error) {
		console.error('Error getting auth session: ', error);
		throw error;
	}
};

/**
 * Checks if a user exists by making a request to the server.
 *
 * @param {string} idToken - The ID token for authentication.
 * @param {string} email - The email of the user to check.
 * @returns {Promise<any>} A promise that resolves to the response data from the server.
 * @throws {Error} - If the API request fails or an error occurs.
 */
export const checkUserExists = async (idToken: string, email: string) => {
	try {
		const response = await fetch(`${API_BASE_URL}/checkUserExists`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${idToken}`,
				'Content-Type': 'application/json',
				Accept: '*/*'
			},
			body: JSON.stringify({ email })
		});

		if (!response.ok) {
			throw new Error(`API request failed with status ${response.status}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error checking user exists:', error);
		throw error;
	}
};

/**
 * Changes a user's role by making a request to the server.
 *
 * @param {string} idToken - The ID token for authentication.
 * @param {string} user_type - The new role for the user.
 * @returns {Promise<any>} A promise that resolves to the response data from the server.
 * @throws {Error} - If the API request fails or an error occurs.
 */
export const changeRole = async (idToken: string, user_type: string) => {
	try {
		const response = await fetch(`${API_BASE_URL}/toggleusertype`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${idToken}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ user_type: user_type })
		});

		if (!response.ok) {
			throw new Error(`API request failed with status ${response.status}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error changing role:', error);
		return undefined;
	}
};

/**
 * Changes the geofencing radius for a user.
 *
 * @param {string} idToken - The ID token for authentication.
 * @param {number} radius - The new geofencing radius.
 * @returns {Promise<any>} - A promise that resolves to the response data from the server.
 * @throws {Error} - If the API request fails or an error occurs.
 */
export const changeRadius = async (idToken: string, radius: number) => {
	try {
		const response = await fetch(`${API_BASE_URL}/gps`, {
			method: 'PUT',
			headers: {
				Authorization: 'Bearer ' + idToken,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				geofencing_range: radius
			})
		});

		if (!response.ok) {
			throw new Error(`API Request failed with status ${response.status}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error changing radius: ', error);
		return undefined;
	}
};

/**
 * Retrieves the push token for the device.
 * Tries maximum 3 times if it fails to get the push token.
 *
 * @param retries - The number of retries attempted (default: 0).
 * @returns A promise that resolves to the push token as a string, or undefined if retrieval fails.
 */
async function getPushToken(retries: number = 0): Promise<string | undefined> {
	const maxRetries = 3;
	const backoffTime = Math.pow(2, retries) * 1000;

	try {
		const { data } = await Notifications.getExpoPushTokenAsync();
		return data;
	} catch (error) {
		if (retries < maxRetries) {
			console.log(`Retrying to get push token. ${maxRetries - retries} retries remaining.`);

			await new Promise((resolve) => setTimeout(resolve, backoffTime));
			return getPushToken(retries + 1);
		} else {
			console.error('Max retries reached, push token retrieval failed.');

			return undefined;
		}
	}
}
