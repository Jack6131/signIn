import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import React from 'react';
import {MaterialIcons} from '@expo/vector-icons'
import Guest from '../interfaces/guest';



//takes in the guest interface and generates a card for it
export default function GuestCard (person:Guest){
    return(
        
            <View style={styles.item}>
                <Text style={styles.itemText}>{person.name}</Text>
                <View style={styles.iconShift}>
                    {/*Icons when tap do something but doesnt have functionality yet*/}
                    <TouchableOpacity>
                        <MaterialIcons name='edit' color='#333' size={18}></MaterialIcons>
                    </TouchableOpacity>
                    
                    <TouchableOpacity>
                        <MaterialIcons name='delete' color='#333' size={18}></MaterialIcons>
                    </TouchableOpacity>
                </View>
            </View>
        
    )
}





const styles =StyleSheet.create({
    //style sheet for card
    item:{
        padding:16,
        marginTop:16,
        borderColor:'grey',
        borderWidth:1,
        borderStyle:'dashed',
        borderRadius:10,
        flexDirection:'row',
        justifyContent:'space-between'
        
    },
    // For text
    itemText:{
        justifyContent:'flex-start',
        marginLeft:10,
    },
    // For Icons
    iconShift:{
        flexDirection:'row',
        justifyContent:'flex-end'
    }

})