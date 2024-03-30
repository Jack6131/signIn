import React from 'react';
import { Button } from 'react-native';
import 'react-native-url-polyfill/auto';
import 'react-native-get-random-values';
import { Amplify } from 'aws-amplify';

import {Authenticator, useAuthenticator } from '@aws-amplify/ui-react-native';
import Home from './src/pages/Home';
import Guest from './src/pages/Guest';
import amplifyconfig from './src/amplifyconfiguration.json'
import Devices from './src/pages/Devices';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getCurrentUser } from 'aws-amplify/auth';
import Start from './src/pages/Start';

Amplify.configure(amplifyconfig);

function SignOutButton() {
  const { signOut } = useAuthenticator();
  return <Button title="Sign Out" onPress={signOut} />;
}


function App() {
  return (
    <Authenticator.Provider>
      <Authenticator>
        
        <SignOutButton/> 
        <Start></Start>
        
      </Authenticator>
    </Authenticator.Provider>
  );
}

export default App;
