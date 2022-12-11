import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useState } from "react"
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

const CartCard = ({ item, handleSnack, index, removeItem, handleOrderQty }) => {
  const [msg, setMsg] = useState()
  let availableQty = item.availableQty
  let [itemQty, setItemQty] = useState(item.qty)

  // console.log(item.availableQty)
  const { imageURL, productName, itemSize, itemColor, productPrice, qty } = item
  const [visible, setVisible] = useState(false);
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);





  const handleCounter = (value) => {
    // console.log(itemQty)

    switch (value) {
      case "add":
        console.log("add")
        // console.log(availableQty)
        if (itemQty < availableQty) {
          setItemQty(itemQty + 1)
          handleOrderQty(itemQty + 1, index)
        } else {
          // setMsg(` ${availableQty ? availableQty : "No" } items in stock`)
          // setVisible(true)
          handleSnack(`${availableQty ? availableQty : "No"} items in stock`, true)
          // alert(`only ${availableQty} items are available`)
        }
        break;
      case "less":
        console.log("less")
        if (itemQty > 1) {
          setItemQty(itemQty - 1)
          handleOrderQty(itemQty - 1, index)

        }
        break;
    }
  }


  const handlecheck = async () => {
    console.log("check")
    try {
      const cartItems = await AsyncStorage.getItem("cart")
      let json = JSON.parse(cartItems)
      json[0].hotelname = "kashan"
      await AsyncStorage.setItem("cart", JSON.stringify(json))
      console.log(json)
    } catch (err) {
      console.log(err)
    }
  }


  return (
    <View style={styles.container}>
      <Pressable onPress={e => { handlecheck() }} style={styles.imageContainer} >
        <Image style={styles.image} source={{ uri: imageURL }} />
      </Pressable>

      <View style={styles.detailContainer}>
        <Text style={styles.productName}>{productName}</Text>
        <Text style={styles.productSize}>Size: {itemSize}</Text>
        <Text style={styles.productColor}>Color: {itemColor}</Text>

        {/* <Text style={styles.productColor}>Qty: {qty}</Text> */}
        <View style={styles.countMainContainer}>
          <View style={styles.countContainer}>

            <Ionicons
              onPress={e => { handleCounter("less") }}
              name="remove-outline"
              size={25}
            />


            <Text style={styles.counterNumber}>
              {itemQty}
            </Text>
            <Ionicons
              onPress={e => { handleCounter("add") }}
              name="add-outline"
              size={25}
            />


          </View>
        </View>



        <Text style={styles.productPrice}>Rs: {productPrice * qty}</Text>
      </View >
      <TouchableOpacity onPress={e => { removeItem(index) }} style={{ marginTop: 50 }}>
        <Text>Remove</Text>
      </TouchableOpacity>
    </View>
  )
}

export default CartCard

const styles = StyleSheet.create({
  container: {
    height: 143,
    width: "80%",
    backgroundColor: "white",
    marginHorizontal: "10%",
    marginVertical: 10,
    diaplay: "flex",
    flexDirection: "row",
    borderRadius: 20,
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

  counterNumber: {
    fontSize: 17,
    fontWeight: "bold",
    backgroundColor: "white",
    borderRadius: 100,
    width: "20%",
    textAlign: "center",
  },
  detailContainer: {
    padding: 10
  },
  imageContainer: {
    width: "40%",
    borderTopLeftRadius: 20
    // backgroundColor:"blue",
  },
  image: {
    resizeMode: "stretch",
    height: 140,
    width: "105%",
    borderRadius: 20
  },
  productName: {
    paddingLeft: 30,
    fontWeight: "bold",
    fontSize: 20,
  },
  productSize: {
    color: "grey",
    fontWeight: "bold",
  },
  productColor: {
    color: "grey",
    fontWeight: "bold",
    // marginTop:6
  },
  productPrice: {
    color: "#426D54",
    fontSize: 23,
    // marginTop:6,
    fontWeight: "bold"
  }
})