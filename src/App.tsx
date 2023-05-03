import React, { LegacyRef, useRef, useState } from 'react'; 
import { RefObject } from 'react'; 
import { View, Text, TextInput, Button, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native'; 
 
const url = 'https://api.tvmaze.com/search/shows?q='; 
 
const App = () => { 
  const [value, setValue] = useState(''); 
  const [movies, setMovies] = useState([]); 
  const scrollRef: RefObject<ScrollView> = useRef(null); 
 
 
 
  const onGetData = async () => { 
 
    const response = await fetch(url + value, { 
      method: 'GET', 
 
    }); 
    const result = await response.json(); 
    console.log(result[0]); 
    setMovies(result); 
 
  }; 
  const ClearArea = () => { 
    setMovies([]); 
    setValue("") 
  }; 
  const onChangeText = (text: string) => { 
    setValue(text) 
  }; 
  const scrollToTop = () => { 
    scrollRef?.current?.scrollTo({ y: 0 }); 
  }; 
  const scrollToEnd = () => { 
    scrollRef?.current?.scrollToEnd({}); 
  }; 
  return ( 
    <View style={styles.container}> 
      <Text style={styles.hooter}>MOVIE</Text> 
      <TextInput 
        style={styles.inputStyle} 
        value={value} 
        placeholder='Enter movie name....' 
        placeholderTextColor='gray' 
        onChangeText={onChangeText} /> 
      <View style={styles.button}> 
        {value ? ( 
          <> 
            <TouchableOpacity style={styles.buttonstyle} onPress={onGetData}> 
              <Text style={styles.title}>SEARCH</Text> 
            </TouchableOpacity> 
            <TouchableOpacity style={styles.buttonstyle} onPress={ClearArea} > 
              <Text style={styles.title}>CLEAR</Text> 
            </TouchableOpacity> 
          </> 
        ) : null} 
      </View> 
      <View style={{ alignItems: 'flex-end' }}> 
 
        <TouchableOpacity style={styles.homend} onPress={scrollToTop}> 
          <Text style={styles.title}>HOME</Text> 
        </TouchableOpacity> 
 
      </View> 
 
      <ScrollView ref={scrollRef}> 
        {movies?.map((item, index) => ( 
          <View style={styles.movielook} key={index} > 
            <Image style={styles.image} 
              source={{ uri: item?.show?.image?.medium || '' }} 
            /> 
            <Text style={styles.name}> {item?.show?.name}</Text> 
          </View> 
        ))} 
      </ScrollView> 
      <View style={{alignItems:'flex-end'}}> 
      <TouchableOpacity style={styles.homend} onPress={scrollToEnd}> 
        <Text style={styles.title}>END</Text> 
      </TouchableOpacity> 
      </View> 
    </View> 
 
  ); 
}; 
export default App; 
const styles = StyleSheet.create({ 
  container: { 
    flex: 1, 
    paddingHorizontal: 10, 
    backgroundColor: '#98AFC7', 
 
 
  }, 
  hooter:{ color: 'blue',  
  fontSize: 25, fontWeight:'500',  
  textAlign: 'center'  
}, 
  inputStyle: { 
    width: '100%', 
    height: 50, 
    borderColor: 'blue', 
    borderWidth: 1, 
    borderRadius: 12, 
    color: 'blue', 
    backgroundColor: 'white' 
  }, 
  buttonstyle: { 
    width: 100, 
    height: 30, 
    borderRadius: 10, 
    alignItems: 'center', 
    justifyContent: "center", 
    gap: 50, 
    backgroundColor: 'blue', 
 
  }, 
  button:{ alignItems: 'center', 
   justifyContent: 'center',  
   flexDirection: 'row', 
    gap:90 
    
   }, 
  movielook: { 
    height: 210, 
    flexDirection: 'row', 
    gap: 15, 
    borderRadius: 20, 
  }, 
  name: { 
    fontSize: 16, 
    color: 'blue', 
    fontWeight: '400' 
  }, 
  title: { 
 fontSize: 16, 
    color: 'white', 
    fontWeight: 'bold', 
   }, 
  homend: { 
    alignItems: 'center', 
    backgroundColor:'green', 
    borderRadius: 5, 
    width:50, 
     
 }, 
  image: { 
    width: 150, 
    height: 200, 
    borderRadius: 10 
  } 
});

// Burda Cavid olub