import React from 'react'
import { View, Text, ScrollView, FlatList, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native'
import { IndexPath, Layout, Select, SelectItem } from '@ui-kitten/components';
import { List, ListItem } from '@ui-kitten/components';
import { Button } from 'react-native-paper';
import { Spinner , HStack} from 'native-base';
// import { List } from 'react-native-paper';
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
  const [loading , setLoading] = useState(false)
  let [dropDownData, setdropDownData] = useState(["adf", "adfds", "dfasdfsd", "adsfdsf"])
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
  const [message, setMessage] = useState("Select an Area")
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(dropDownData);
  const [markets, setMarkets] = useState()
  const [mName, setmName] = useState('')
  const [expanded, setExpanded] = React.useState(true);
  const [displayValue, setDisplayValue] = useState("Select Area");
  const handlePress = () => setExpanded(!expanded);

  useEffect(() => {
    getData()
  }, [])




  const getData = () => {
    axios.get(`https://${ip}/api/allgetarea`)
      .then((res) => {
        // console.log(res.data,"res");
        let data = res.data
        let arr = [{ label: "select area", value: "select area" }]
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

  }

  const getMarket = (index) => {
    // console.log(index)
    console.log(index)
    setLoading(true)
    setDisplayValue(index)

    axios.get(`https://${ip}/api/getareaname/${index}`)
      .then((res) => {
        console.log(res.data, "markets");
        let arr = []
        for (let i = 0; i < res.data.length; i++) {
          let obj = { title: res.data[i].marketName }
          arr.push(obj)
        }
        if(arr[0]){
          setMessage(`Available Markets in ${index}`)
        }else if (index === "select area"){
          setMessage(`Select an area`)
        }
        else{
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


  const renderItem = ({ item }) => {

    console.log(item.areaName)
    return (
      <Item
        onPress={() => { navigation.navigate("shops", { area: item.areaName, markets, marketName: item.marketName }) }}
        item={item}
      />
    );
  }


  const renderListItem = ({ item, index }) => (
    <ListItem title={`${item.title} ${index + 1}`} />
  );



  return (
    <ImageBackground style={styles.container} >

      <Header navigation={navigation} width={"85%"} showMore={true} search={true} title="App" />



      <Layout style={styles.dropDownContainer} level='1'>
        <Select

          value={displayValue}
          selectedIndex={selectedIndex}
          onSelect={e => { getMarket(dropDownData[e.row].value) }}>
          {
            dropDownData.map((item, index) => {
              return (
                <SelectItem title={item.label} />
              )
            })
          }

        </Select>
      </Layout>
      <Button
        textColor='#049f99'
        buttonColor='#e6fffe'
        mode="filled">
       
          {/* {markets[0] ?
          `Available Markets in ${displayValue}`
          :
          `No Markets are availbale in ${displayValue}`
          } */}
  {message}
        
      </Button>


      <List
        // style={styles.container}
        data={markets}
        renderItem={renderListItem}
      />
      {loading ?
<Spinner size='lg' accessibilityLabel="Loading posts" />
        :
        null
      }






      {/* <View style={{ display: "flex", alignItems: "center" }}>
        <View style={styles.marketsContainer} >
          <Text style={styles.heading}>Markets</Text>
          <View style={styles.inputContainer}>
            <FlatList
              data={markets}
              renderItem={renderItem}
              style={{ width: "100%" }}
              keyExtractor={(item) => item._id}
            />


          </View>
        </View>
      </View> */}

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
    // minHeight: 128,
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