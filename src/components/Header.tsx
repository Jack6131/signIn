import React from 'react';
import { View, Text, StyleSheet, Image, Platform } from 'react-native';

interface HeaderProps {
	title: string;
	guest?: boolean;
}

const Logo = () => {
	return (
		<View style={styles.image}>
			<Image style={styles.tinyLogo} source={require('../assets/MISUv2.png')} />
		</View>
	);
};

const Header = ({ title, guest }: HeaderProps) => {
	return (
		<View style={styles.header}>
			<Text style={styles.headerText}>{title}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	header: {
		alignSelf: 'center'
	},
	headerText: {
		fontSize: 25,
		fontWeight: 'normal',
		color: '#242424'
	},
	tinyLogo: {
		width: 70,
		height: 70
	},
	image: {
		marginBottom: Platform.OS === 'ios' ? 10 : 0
	}
});

export default Header;
export { Header, Logo };
