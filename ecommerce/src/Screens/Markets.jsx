import React from 'react'
import { View, Button, Text, ScrollView, FlatList, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native'
import { List } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../Components/Header/Header';
import ip from "../ip"











const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <View style={{ display: "flex", alignItems: "center" }}>
    <TouchableOpacity style={styles.marketName} onPress={onPress}>
      <Text style={styles.marketText} >{item.marketName}</Text>
    </TouchableOpacity>
  </View>
);


const Markets = ({ navigation }) => {

  let [dropDownData, setdropDownData] = useState(["adf", "adfds", "dfasdfsd", "adsfdsf"])

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(dropDownData);
  const [markets, setMarkets] = useState()
  const [mName, setmName] = useState('')
  const [expanded, setExpanded] = React.useState(true);
  const handlePress = () => setExpanded(!expanded);

  useEffect(() => {
    getData()
  }, [])




  const getData = () => {
    axios.get(`http://${ip}/api/allgetarea`)
      .then((res) => {
        // console.log(res.data,"res");
        let data = res.data
        let arr = []
        for (let i = 0; i < res.data.length; i++) {
          let obj = { label: data[i].areaName, value: data[i].areaName }
          arr.push(obj)
          console.log(obj)
        }
        setdropDownData(arr)
      })
      .catch(err => {
        console.log(err.message, "err")
      })
    console.log("pressed")

    console.log(value)
  }

  const getMarket = () => {

    axios.get(`http://${ip}/api/getareaname/${value}`)
      .then((res) => {
        console.log(res.data, "markets");
        setMarkets(res.data)

      })
      .catch(err => {
        console.log(err.message, "err")
      })
  }


  const renderItem = ({ item }) => {

    console.log(item.areaName)
    return (
      <Item
        onPress={() => { navigation.navigate("shops", {area:item.areaName , markets, marketName: item.marketName }) }}
        item={item}
      />
    );
  }



  return (
    <ImageBackground style={styles.container} >

      <Header navigation={navigation} width={"70%"} showMore={true} search={true} title="App" />

      <DropDownPicker
        onChangeValue={e => { getMarket() }}
        style={{
          backgroundColor: "#426D54",
          fontSize: 20,
        }}
        textStyle={{
          fontSize: 20,
          padding: 5,
        }}
        labelStyle={{
          fontSize: 20,
          color: "white"
        }}
        open={open}
        value={value}
        items={dropDownData}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
      />



      <View style={{ display: "flex", alignItems: "center" }}>
        <View style={styles.marketsContainer} >
          <Text style={styles.heading}>Markets</Text>
          <View style={styles.inputContainer}>
            <FlatList
              data={markets}
              renderItem={renderItem}
              style={{ width: "100%" }}
            />


          </View>
        </View>
      </View>

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