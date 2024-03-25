import React ,{useState}from "react";
import {View,StyleSheet,Text,Button} from 'react-native'
import AddItem from "../components/AddItemDisplay";
export default function Devices(){

    const [visible,setModalVisible]=useState(false)
    console.log(visible)
    if(visible){
        
        return(
        <View style={styles.container}>
            <AddItem setModalVisible={setModalVisible}></AddItem>
        </View>
        )
        
    }
    return(
    <View style={styles.container}>
        <Button onPress={()=> setModalVisible(true)} title='Add Device'/>
    </View>)
}


const styles= StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    }


})