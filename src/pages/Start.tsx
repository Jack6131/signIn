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
import {MaterialIcons} from '@expo/vector-icons'



const Tab =createBottomTabNavigator()
export default function Start(){
  
    return(
        <NavigationContainer>
          <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;
    
              if (route.name === 'Home') {
                iconName = 'home'; // Example icon name from Ionicons
              } else if (route.name === 'Guest') {
                iconName = 'people'; // Example icon name from Ionicons
              }else if(route.name ==='Devices'){
                iconName='lightbulb'
              }else if(route.name==='Profile'){
                iconName='person'
              }
    
              // You can return any component here that you like. We'll use Ionicons here
              return <MaterialIcons name={iconName} size={size} color={color} />;
            },
          })}
      
          >
            <Tab.Screen name="Home" component={Home}/>
            <Tab.Screen name="Guest"component={Guest}/>
            <Tab.Screen name="Devices"component={Devices}/>
            <Tab.Screen name="Profile"component={Profile}/>
          </Tab.Navigator>

        </NavigationContainer>
    )
}