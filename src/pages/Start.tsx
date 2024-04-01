import React from 'react';
import { Button } from 'react-native';
import 'react-native-url-polyfill/auto';
import 'react-native-get-random-values';
import { Amplify } from 'aws-amplify';
import Profile from './Profile';
import {Authenticator, useAuthenticator } from '@aws-amplify/ui-react-native';
import Home from './Home';
import Guest from './Guest';
import amplifyconfig from '../amplifyconfiguration.json'
import Devices from './Devices';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';




const Tab =createBottomTabNavigator()
export default function Start(){
  
    return(
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="Home" component={Home}/>
            <Tab.Screen name="Guest"component={Guest}/>
            <Tab.Screen name="Devices"component={Devices}/>
            <Tab.Screen name="Profile"component={Profile}/>
          </Tab.Navigator>

        </NavigationContainer>
    )
}