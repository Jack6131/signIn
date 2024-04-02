import React from 'react';
import { Button,Image,StyleSheet,View } from 'react-native';
import 'react-native-url-polyfill/auto';
import 'react-native-get-random-values';
import { Amplify } from 'aws-amplify';

import {Authenticator, useAuthenticator } from '@aws-amplify/ui-react-native';

import amplifyconfig from './src/amplifyconfiguration.json'

import Start from './src/pages/Start';

Amplify.configure(amplifyconfig);

function SignOutButton() {
  const { signOut } = useAuthenticator();
  return <Button title="Sign Out" onPress={signOut} />;
}
function Header(){
  return (
  <View style={styles.container}>
  <Image style={styles.logo} source={require('./assets/MISUv2.png') }></Image>
  </View>
  )
}

function App() {
  return (
    <Authenticator.Provider>
      <Authenticator Header={Header}>
        
        
        <Start></Start>
        
      </Authenticator>
    </Authenticator.Provider>
  );
}


const styles=StyleSheet.create
  ({
    container:{
     
      
      alignItems:'center',
     
  },
    logo:{
      width:200,
      height:200
    },
    userInfoContainer:{
        flex:.3,
        marginTop:0,
        justifyContent:'center',
        alignItems:'center',
    },
  })
export default App;
