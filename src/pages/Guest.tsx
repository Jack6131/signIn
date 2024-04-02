import React,{useEffect, useState} from "react";
import {View,StyleSheet,Text,FlatList,SafeAreaView,TextInput} from 'react-native'

//Interface for information about Guests
import Guest from "../interfaces/guest";


//The Guest Card
import GuestCard from "../components/guestCard";


//Page for Guest Management

export default function Guests(){
  //Since we have no backend this is just to load in dummy info
    const guests:Guest[]=
    [{
        name:'John',
        permissions:'none'
    },
    {
        name:'Peter',
        permissions:'none'
    }
  ]
  const [searchQuery,setSearchQuery]=useState("")
  const[isLoading, setIsLoading]=useState(false)
  const [guestUsers,setDisplayedUser]=useState([])
  const [error,setError]=useState(null)
  const [fullData,setFullData]=useState([]);
/*
  useEffect(()=>{
    setIsLoading(true)

  },[])
  const fetchData=async(url)=>{
    try{
      const response = await fetch(url)
      const json=await response.json();
      setDisplayedUser(json.results)
    }catch(error){
      setError(error)
      console.log(error)
    }
  }
  const handleSearch=(query)=>{
    setSearchQuery(query)
  }*/
    return(

      <View style={styles.container}>
        {/*HEADER*/}
        
        <View style={styles.content}>
         <SafeAreaView style={styles.searchBarContainer}>
          <TextInput autoCapitalize='none'
          placeholder="Search" 
          
          style={styles.searchBarStyle}
          //value={searchQuery}
          //onChangeText={(query)=>handleSearch(query)}
          />
          
         
          {/*Place to load guest card*/}
          <View style={styles.list}>
            <FlatList
              data={guests}
              renderItem={({item})=>(
                <GuestCard name={item.name} permissions={item.permissions} />
              )}
            
            />
            
          </View>
          </SafeAreaView>
        </View>
        </View>
        )
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
  searchBarContainer:{
    flex:1,
    marginHorizontal:20,
  },
  searchBarStyle:{
    paddingHorizontal:20,
    paddingVertical:10,
    borderColor:"#ccc",
    borderWidth:1,
    borderRadius:8,
  },
  list:{
    flex:1,
    marginTop:20,
  }
});
