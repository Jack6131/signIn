import React, { useState, useEffect } from 'react';
import { Icon } from '@rneui/themed';
import { getIcon } from '../utils/getIcon';
import { StyleSheet, View, Text, Pressable } from 'react-native';

interface Device {
	type: string;
	name: string;
	shared_device_properties_id: string;
}

interface DeviceElementProps {
	currDevice: Device;
	deviceIndex: number;
	cardIndex: number;
	screen: string;
	navigation: any;
}

const DeviceElement = ({ currDevice, deviceIndex, cardIndex, screen, navigation }: DeviceElementProps) => {
	const [iconName, setIconName] = useState('');
	const [iconType, setIconType] = useState('');

	useEffect(() => {
		const { iconName, iconType } = getIcon({ deviceType: currDevice.type });
		setIconName(iconName);
		setIconType(iconType);
	}, [currDevice]);

	function handleClick() {
		if (screen == 'Guests') {
			navigation.navigate('Properties', {
				prevScreen: screen,
				guestIndex: cardIndex,
				deviceIndex: deviceIndex,
				navigation: navigation
			});
		} else {
			navigation.navigate('DeviceControl', {
				hubIndex: cardIndex,
				deviceIndex: deviceIndex
			});
		}
	}

	return (
		<View>
			<Pressable style={{ marginHorizontal: 1 }} onPress={handleClick}>
				<View style={styles.iconHolder}>
					<Icon name={iconName} type={iconType} size={45} color='#60B8FF' />
				</View>
				<Text style={styles.text}>{currDevice.name}</Text>
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	iconHolder: {
		borderWidth: 2,
		borderColor: '#60B8FF',
		justifyContent: 'center',
		borderRadius: 6,
		width: 70,
		height: 70
	},
	text: {
		marginTop: 6,
		fontSize: 10,
		width: 70,
		textAlign: 'center'
	}
});

export default DeviceElement;
