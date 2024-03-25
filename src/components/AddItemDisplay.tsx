import { StatusBar } from 'expo-status-bar';
import { Pressable,StyleSheet, Text, View,TouchableOpacity, Modal,Button } from 'react-native';
import React,{useState} from 'react';
import {MaterialIcons} from '@expo/vector-icons'

export default function AddItem({setModalVisible:func}){
   
    
    
    return (
       
            <View style={style.container}>
                 <Modal>
                <Text>Hello World</Text>
                <Button onPress={()=>func(false)} title='bye'>
                    
                </Button>
                </Modal>
            </View>
            
        
    )
}

const style = StyleSheet.create({
    container:{
        flex:.3,
    }
})