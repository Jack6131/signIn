import React from 'react';
import { Button } from 'react-native';
import 'react-native-url-polyfill/auto';
import 'react-native-get-random-values';
import { Amplify } from 'aws-amplify';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react-native';
import Home from './src/pages/Home';
import About from './src/pages/About';
import amplifyconfig from './src/amplifyconfiguration.json'
import Devices from './src/pages/Devices';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


Amplify.configure(amplifyconfig);

function SignOutButton() {
  const { signOut } = useAuthenticator();
  return <Button title="Sign Out" onPress={signOut} />;
}
const Tab =createBottomTabNavigator()
function App() {
  return (
    <Authenticator.Provider>
      <Authenticator>
        <SignOutButton/> 
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="Home" component={Home}/>
            <Tab.Screen name="About"component={About}/>
            <Tab.Screen name="Devices"component={Devices}/>
          </Tab.Navigator>

        </NavigationContainer>
        
      </Authenticator>
    </Authenticator.Provider>
  );
}

export default App;