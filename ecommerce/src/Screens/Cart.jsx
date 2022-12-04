import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import Header from '../Components/Header/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import CartCard from '../Components/Cart_Card/CartCard';
import { Button } from 'react-native-paper';
import { useWindowDimensions } from 'react-native';



const Cart = ({ navigation }) => {

  let [cart, setCart] = useState([])
  let [subTotal , setSubTotal] = useState(0)
  const { height, width } = useWindowDimensions();



  //        useEffect------
  useEffect(() => {
    (async () => {
      abc()
    })();
  }, [cart])



  const handleRemoveItem = async (index) => {
    let cartItems = [...cart]
    cartItems.splice(index , 1)
    try{
    await AsyncStorage.setItem("cart" , JSON.stringify(cartItems))
      setCart(cartItems)
    }catch(err){
      console.log(err)
    }
    
    
  }



  //     renderItem

  const renderItem = ({ item , index }) => {
    console.log(index)
    return (
      <CartCard removeItem={handleRemoveItem} index={index} item={item} />
    )
  }



  const abc = async () => {
    try {
      const cartItems = await AsyncStorage.getItem("cart")
      let parse = JSON.parse(cartItems)
      var sum = 0;
  
    // Calculation the sum using forEach
    parse.forEach(x => {
      console.log(x.qty,"x")
        let total = x.qty * x.productPrice
        sum += total;
    });
    setSubTotal(sum);
      setCart(parse)
      console.log(parse)
    } catch (err) {
      console.log(err.message)
    }

  }


  console.log()


  return (
    <View >
      <Header width={"60%"} navigation={navigation} showMore={true} search={true} goback={e => { navigation.goBack() }} title="App" />

      <View>
        {/* Cart Items */}
        <FlatList
          data={cart}
          renderItem={renderItem}
        />

        {/* Order Summary */}
        <View style={{ display: "flex", alignItems: "center" }} >
          <View style={styles.summaryContainer}>
            <Text style={styles.summaryHeading}>Order Summary</Text>
            <View style={styles.summaryDetailsContainer}>
              <View style={styles.summaryTextContainer}>
                <Text style={styles.summaryText}>SubTotal</Text>
                <Text style={styles.summaryText}>PKR {subTotal}</Text>
              </View>
              <View style={styles.seperator}></View>
              <View style={styles.summaryTextContainer}>
                <Text style={styles.summaryText}>Delivery Charges</Text>
                <Text style={styles.summaryText}>PKR 100</Text>
              </View>
            </View>
          </View>
        </View>


        {/* Procedd to checkOut */}

        <View style={{display:'flex' , alignItems:"center"}}>
          <View style={styles.checkOutContainer} >
            <Button
              mode="contained"
            // width="45%"
            >Proceed to Checkout</Button>
            <Text style={styles.totalAmount}>PKR {subTotal+100}</Text>
          </View>
        </View>



      </View>
    </View>
  )
}



//------------------End of Render---------------------------------- //






export default Cart
const styles = StyleSheet.create({
  checkOutContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginTop:30
  },
  summaryContainer: {
    // backgroundColor: "blue",
    width: "80%",
    margin: "auto",
    // borderRadius:20,
  },
  summaryHeading: {
    fontSize: 25,
    fontWeight: "bold",
    padding: 15,
    display: "flex",
    justifyContent: "center",
    // backgroundColor:"pink"
  },
  summaryDetailsContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    height: 120,
    display: "flex",
    justifyContent: "center",
    elevation: 15
    // backgroundColor:"orange"
  },
  summaryTextContainer: {
    // backgroundColor:"pink",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  summaryText: {
    // display:"flex",
    // width:"20%"
    fontWeight: "bold",
    fontSize: 17,
    padding: 10,
  },
  seperator: {
    borderColor: "grey",
    borderWidth: 0.4,
    borderStyle: "solid",
    marginHorizontal: 10
  },
  totalAmount: {
    fontSize: 25,
    fontWeight: "bold"
  }
})