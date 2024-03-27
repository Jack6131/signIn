import React ,{useState}from "react";
import {View,StyleSheet,Text,Button,Modal} from 'react-native'
import AddItem from "../components/AddItemDisplay";
export default function Devices(){

    const [visible,setModalVisible]=useState(false)
    console.log(visible)
  
    const toggleAddDevice=()=>{
        setModalVisible(!visible)
    }
    
    return(
    <View style={styles.container}>
            <Modal visible={visible} transparent={true} style={styles.modalView} >
                <View style={styles.modalContainter}>
                    <AddItem/>
                    <Button onPress={()=>toggleAddDevice()} title='bye'></Button>                   
                </View>
            </Modal>
        
        <Button onPress={()=> toggleAddDevice()} title='Add Device'/>
    </View>)
}


const styles= StyleSheet.create({
    container:{
        position:'relative',
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        alignContent:'center',
    },
    modalView:{
        alignContent:'center',
        justifyContent:'center',
        alignItems:'center',
    },
    modalContainter:{
        position:'absolute',
        flex:.3,
        alignContent:'center',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white',
        width:300,
        height:300
    }



})