import React from "react";
import {View,StyleSheet,Text,FlatList} from 'react-native'

//Interface for information about Guests
import Guest from "../interfaces/guest";


//The Guest Card
import GuestCard from "../components/guestCard";


//Page for Guest Management

export default function Guests(){
  //Since we have no backend this is just to load in dummy info
    const guests:Guest[]=[{
        name:'john',
        permissions:'none'
    },
    {
        name:'Peter',
        permissions:'none'
    }
]
    return(
        <View style={styles.container}>
        {/*HEADER*/}
        
        <View style={styles.content}>
         
          {/*Place to load guest card*/}
          <View style={styles.list}>
            <FlatList
              data={guests}
              renderItem={({item})=>(
                <GuestCard name={item.name} permissions={item.permissions} />
              )}
            
            />
          </View>
        </View>
      </View>)
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
  content:{
    flex:1,

    padding:40,
  },
  list:{
    flex:1,
    marginTop:20,
  }
});
