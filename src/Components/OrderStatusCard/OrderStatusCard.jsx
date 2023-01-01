import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useState, useEffect } from "react"
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import themeColor from '../../themeColor/themeColor';

const OrderStatusCard = ({ item , status}) => {
  const [msg, setMsg] = useState()
  const [date, setDate] = useState()
  // let availableQty = item.availableQty
  // let [itemQty, setItemQty] = useState(item.qty)

  // const { imageURL, productName, itemSize, itemColor, productPrice, qty } = item

  const [names, setNames] = useState([])
  const [visible, setVisible] = useState(false);
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);


  let handleGetNames = () => {
    let arr = item.item.cartItems

    let namesArray = []
    arr.forEach((value) => {
      namesArray.push(value.productName)
    })
    setNames(namesArray)
    let date = item.item.hotelDate
    const findDate = date.substring(0, date.indexOf(','));
    setDate(findDate)

  }


  useEffect(() => {
    handleGetNames()
  }, []);










  return (
    <View style={styles.mainContainer}>

      <View style={styles.container}>
        <Pressable onPress={e => { }} style={styles.imageContainer} >
          <Image style={styles.image} source={{ uri: "https://media.naheed.pk/catalog/product/cache/49dcd5d85f0fa4d590e132d0368d8132/1/0/1036762-1.jpg" }} />
        </Pressable>




        <View style={styles.detailContainer}>
          <Text style={styles.orderNum}>{"Order no#465478"}</Text>

          <Text numberOfLines={1} ellipsizeMode='tail' style={styles.productName}>{
            names.map((name, index) => <Text
              key={index}
            >
              {name}
              {index < names.length - 1 ? " ," : null}
            </Text>)
          }
          </Text>
          <Text style={styles.productSize}>{date}</Text>
          {/* <Text style={styles.productPrice}>Rs: {'asdfsdf'}</Text> */}
        </View >
      </View>



      <View style={styles.otherDetails}>
        <View style={styles.otherDetailsSubContainer}>
          <Text style={styles.textStyle}>OrderId</Text>
          <Text style={styles.textStyle}>1681354</Text>
        </View>
        <View style={styles.otherDetailsSubContainer}>
          <Text style={styles.textStyle}>Amount</Text>
          <Text style={styles.textStyle}>1681354</Text>
        </View>
        <View style={styles.otherDetailsSubContainer}>
          <Text style={styles.textStyle}>Status</Text>
          <Text style={styles.textStatus}>{status}</Text>
        </View>

      </View>
    </View>
  )
}

export default OrderStatusCard

const styles = StyleSheet.create({
  mainContainer: {
    // height: 143,
    width: "85%",
    backgroundColor: "white",
    marginHorizontal: "10%",
    borderRadius: 20,
    marginVertical: 10,

  },
  container: {
    diaplay: "flex",
    flexDirection: "row",
  },
  countMainContainer: {
    borderRadius: 100,
    display: "flex",
    backgroundColor: "lightgrey",
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    height: 27,
    marginTop: 5,
  },
  countContainer: {
    discrip: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // width: "50%",
    height: 26,
    borderRadius: 100,
    // backgroundColor: "lightgrey",
  },

  detailContainer: {
    padding: 10
  },
  imageContainer: {
    width: "30%",
    borderTopLeftRadius: 20
    // backgroundColor:"blue",
  },
  image: {
    resizeMode: "stretch",
    height: 100,
    width: "105%",
    borderRadius: 20
  },
  productName: {
    paddingLeft: 5,
    fontWeight: "bold",
    fontSize: 15,
    width: "70%",
    flex: 1
  },
  otherDetails: {
    // height: 50,
    paddingVertical:10,
    borderBottomEndRadius:20,
    borderBottomStartRadius:20,
    // backgroundColor: "lightgrey"
  },
  otherDetailsSubContainer:{
    marginTop:5,
      display:"flex",
      flexDirection:"row",
    justifyContent:"space-between",
    paddingHorizontal:20
    },
  orderNum: {
    paddingLeft: 5,
    fontWeight: "bold",
    fontSize: 17,
  },
  productSize: {

    color: "grey",
    fontWeight: "bold",
  },
  productPrice: {
    color: "#426D54",
    fontSize: 23,
    // marginTop:6,
    fontWeight: "bold"
  },
  textStyle:{
    fontSize:17,
    fontWeight: "bold",
  },
  textStatus:{
    fontSize:17,
    fontWeight: "bold",  
    // color:themeColor
  }
})