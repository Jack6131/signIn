import React, { useEffect,useState } from "react";
import {View,StyleSheet,Text} from 'react-native'
import SignOutButton from "../components/signOutButton";
import {Avatar} from '@rneui/themed'
import currentAuthenticatedUser from "../functions/getUserInfo";
import { getCurrentUser } from 'aws-amplify/auth';

function resolvePromises(){
    const user=currentAuthenticatedUser()
    return user;
}

//const user=currentAuthenticatedUser()
export default  function Profile(){
   const [user,setUser]=useState(null)


   //Gets the authenticated user
   useEffect(()=>{
    const fetchUser = ()=>{
        return currentAuthenticatedUser()
    }
    fetchUser().then((result)=>{
        setUser(result)
    }).catch((error)=>{
        console.log(error)
    })
   },[])
   

    return(

    <View style={styles.container}>
        
            {user !== null ? (
                <View style={styles.userInfoContainer}>
                <Avatar size={64} rounded title={user.charAt(0)} containerStyle={{ backgroundColor: '#3d4db7' }} ></Avatar>
                <Text style={styles.textSize}>{user}</Text>
                </View>
            ):(
                <Text>Loading...</Text>
            )}
        
        
        <SignOutButton></SignOutButton>
    </View>)
}


const styles= StyleSheet.create({
    container:{
        flex:1,
        
       
    },
    userInfoContainer:{
        flex:.3,
        marginTop:0,
        justifyContent:'center',
        alignItems:'center',
    },
    textSize:{
        fontStyle:'normal',
        fontSize:25,
    }

    
   

})