import { StatusBar } from 'expo-status-bar';
import  React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Touchable } from 'react-native';
import { SearchBar } from 'react-native-elements';

export default function App() {
  const API_URL='https://jsonplaceholder.typicode.com/users'
  const [isLoading, setLoading] = useState(true);
  const [usrDetails, setUserDetails] = useState([]);
  const [userFilter, setUserFilter] = useState([]);

  useEffect(() => {
    async function apiCall(){
    let res = await fetch(API_URL)
    let json = await res.json()
    console.log("json", json);
    setLoading(false);
    setUserDetails(json);
    } 
    apiCall();
  },[]);
  console.log("usrDetails", usrDetails);

  const renderSeparator = () => {
    return(
      <View
        style={{
          height:1,
          backgroundColor: "#CED0CE"
        }}
      />
    );
  }

  const searchUser = (text) => {
    if(text){
      const newData= usrDetails.filter(
        function(item){
          const itemData = item.username
          ? item.username.toUpperCase()
          : ''.toLowerCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        }
      );
      setUserFilter(newData);
    } else {
      setUserFilter(usrDetails);
    }
  }

  const getItem = (item) => {
    alert('Id:' + item.id + 
    ' Name:' + item.name + 
    ' UserName:' + item.username +
    ' Email:' + item.email +
    ' Phone:' + item.phone +
    ' Website:' + item.website
    );
  }

  const renderHeader = () => {
    return <SearchBar placeholder='Type here' lightTheme round editable={true} onChangeText={(text)=>searchUser(text)}/>
  }

  return (
    <View style={{flex: 1, backgroundColor: '#bad555'}}>
      {isLoading == true? (
        <View style={{...StyleSheet.absoluteFill,alignItems:'center',justifyContent:'center'}}>
          <ActivityIndicator size="large" color="#bad555" />
        </View>
      ): 
        <FlatList
          data={userFilter}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={renderSeparator}
          ListHeaderComponent={renderHeader}
          ListHeaderComponentStyle={{marginTop:25}}
          renderItem={({item})=> (
            <View style={{minHeight:70, padding:5}}>
              <Text style={{color:'green', fontWeight:'bold', fontSize:25}} onPress={()=>getItem(item)}>
                {item.username}
              </Text>
              <Text style={{color:'blue', fontWeight:'bold', fontSize:15}}>
                {item.email}
              </Text>
            </View>
          )}
        />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
