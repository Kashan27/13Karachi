import React from 'react'
import { View, Text, ScrollView, FlatList, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native'
import { IndexPath, Layout, Select, SelectItem } from '@ui-kitten/components';
import { List, ListItem } from '@ui-kitten/components';
import { Button } from 'react-native-paper';
import { Spinner } from 'native-base';
// import { List } from 'react-native-paper';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../Components/Header/Header';
import themeColor from '../themeColor/themeColor';
import { Picker } from '@react-native-picker/picker';

import ip from "../ip"











const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <View style={{ display: "flex", alignItems: "center" }}>
    <TouchableOpacity style={styles.marketName} onPress={onPress}>
      <Text style={styles.marketText} >{item.marketName}</Text>
    </TouchableOpacity>
  </View>
);


const Markets = ({ navigation }) => {
  const [loading, setLoading] = useState(false)
  let [dropDownData, setdropDownData] = useState(["adf", "adfds", "dfasdfsd", "adsfdsf"])
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
  const [message, setMessage] = useState("Select an Area")
  const [markets, setMarkets] = useState()
  const [expanded, setExpanded] = React.useState(true);
  const [displayValue, setDisplayValue] = useState("Select Area");
  const handlePress = () => setExpanded(!expanded);




  const getData = () => {
    axios.get(`https://${ip}/api/allgetarea`)
      .then((res) => {

        let arr = [{ value: "select area" }]
        res.data.forEach((e) => {
          let obj = { value: e.areaName }
          arr.push(obj)
        })
        setdropDownData(arr)
      })
      .catch(err => {
        console.log(err.message, "err")
      })





  }

  const getMarket = (index) => {
    setLoading(true)
    setDisplayValue(index)
    axios.get(`https://${ip}/api/getareaname/${index}`)
      .then((res) => {
        let arr = []
        for (let i = 0; i < res.data.length; i++) {
          let obj = { title: res.data[i].marketName }
          arr.push(obj)
        }
        if (arr[0]) {
          setMessage(`Available Markets in ${index}`)
        } else if (index === "select area") {
          setMessage(`Select an area`)
        }
        else {
          setMessage(`No Markets available in ${index}`)
        }
        setLoading(false)
        setMarkets(arr)
      })
      .catch(err => {
        setLoading(false)
        console.log(err.message, "err")
      })
  }

  // UseEffect

  useEffect(() => {
    getData()
    console.log('effect')
  }, [])



  const renderListItem = ({ item, index }) =>
  (
    <ListItem onPress={e => { navigation.navigate('shops', { markets, marketName: item.title, area: displayValue }) }} title={`${item.title} ${index + 1}`} />
  );



  return (
    <ImageBackground style={styles.container} >

      <Header navigation={navigation} width={"85%"} showMore={true} search={true} title="App" />



      {/* <Layout style={styles.dropDownContainer} level='1'>
        <Select

          value={displayValue}
          selectedIndex={selectedIndex}
          onSelect={e => { getMarket(dropDownData[e.row].value) }}>
          {
            dropDownData.map((item, index) => {
              return (
                <SelectItem key={index} title={item.value} />
              )
            })
          }

        </Select>
      </Layout> */}



{/* Areas List */}

      <Picker
        // style={{ width: "40%" }}
        mode={"dropdown"}
        selectedValue={displayValue}
        onValueChange={(itemValue, itemIndex) => {
          // handleUpdateDetails(itemValue)
          console.log(dropDownData[itemIndex].value)
          getMarket(dropDownData[itemIndex].value)
        }
        }>
        {dropDownData.map((item, index) => {

          return (
            <Picker.Item label={item.value} value={item.value} />
          )
        })
        }
      </Picker>


{/* Current Area Message */}
      <Button
        textColor='#049f99'
        buttonColor='#e6fffe'
        mode="filled">


        {message}

      </Button>




      {/* Markets List */}

      <List
        data={markets}
        renderItem={renderListItem}
      />
      {loading ?
        <Spinner size='lg' accessibilityLabel="Loading posts" />
        :
        null
      }


    </ImageBackground>
  )
}






//  ////             styles



const styles = StyleSheet.create({
  button: {
    width: 150,
  },

  container: {
    height: "100%",
    width: "100%",
    // backgroundColor:"#E1EDBD"
  },
  dropDownContainer: {
    maxHeight: 128,
  },

  marketsContainer: {
    height: "105%",
    width: "85%",
    // backgroundColor:"grey",
    // opacity:0.3,
    borderRadius: 20,
    // backgroundColor: "rgba(0, 0, 0, 0.3)",
    marginTop: 30
  },
  marketText: {
    textAlign: "center",
    fontSize: 25,
    lineHeight: 60,
    // height:50
  },
  heading: {
    fontSize: 50,
    color: "#426D54",
    textAlign: "center",
    padding: 10,
    // backgroundColor:"#B0CF98",
    borderBottomColor: "grey",
    borderStyle: "solid",
    borderBottomWidth: 2,
    borderRadius: 10,
    // height:80
  },
  inputContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "35%",

  },
  marketName: {
    width: "90%",
    // backgroundColor:"#B0CF98",
    borderRadius: 5,
    marginTop: 20,
    textAlign: "center",
    height: 50,
    borderWidth: 2,
    borderColor: "grey",
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,


  },
  text: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    padding: 30,
    textDecorationColor: "white",
    textDecorationStyle: "solid",
    textDecorationLine: "underline"
  }


});

export default Markets