import Toast from 'react-native-toast-message';

/**
 * Creates a toast message.
 * Needs a \<Toast /> component in the render tree.
 */
export function createToast(message: string) {
	Toast.show({
		type: 'success',
		text1: message,
		visibilityTime: 3500
	});
}
