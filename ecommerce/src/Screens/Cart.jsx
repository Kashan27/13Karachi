import { StyleSheet, Text, View, FlatList,  } from 'react-native'
import React from 'react'
import Header from '../Components/Header/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import CartCard from '../Components/Cart_Card/CartCard';
import { useWindowDimensions } from 'react-native';
import themeColor from '../themeColor/themeColor';
import { Button, Snackbar } from 'react-native-paper';




const Cart = ({ navigation }) => {
  // const height = Math.round(Dimensions.get("screen").height);
  const [visibleDialog, setVisibleDialog] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisibleDialog(false);
  let [cart, setCart] = useState([])
  let [subTotal, setSubTotal] = useState(0)
  const { height, width } = useWindowDimensions();
  const [visible, setVisible] = useState(false);
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);
  const [msg, setMsg] = useState()


  let handleSnackBar = (message, visible) => {
    setMsg(message);
    setVisible(visible)
  }

  //        useEffect------
  useEffect(() => {
    (async () => {
      abc()
    })();
  }, [cart])



  const handleRemoveItem = async (index) => {
    let cartItems = [...cart]
    cartItems.splice(index, 1)
    try {
      await AsyncStorage.setItem("cart", JSON.stringify(cartItems))
      setCart(cartItems)
    } catch (err) {
      console.log(err)
    }


  }



  //     renderItem

  const renderItem = ({ item, index }) => {
    return (
      <CartCard
        handleOrderQty={handleOrderQty}
        handleSnack={handleSnackBar}
        removeItem={handleRemoveItem}
        index={index} item={item} />
    )
  }



  const abc = async () => {
    try {
      const cartItems = await AsyncStorage.getItem("cart")
      let parse = JSON.parse(cartItems)
      var sum = 0;

      // Calculation the sum using forEach
      parse.forEach(x => {
        let total = x.qty * x.productPrice
        sum += total;
      });
      setSubTotal(sum);
      setCart(parse)
    } catch (err) {
      console.log(err.message)
    }

  }


  const handleOrderQty = async (itemQty, index) => {
    cart[index].qty = itemQty
    setCart(cart)
    await AsyncStorage.setItem("cart", JSON.stringify(cart))
  }

  const handleCheckOut = async () => {
      try{
        let user = await AsyncStorage.getItem('user')
        if(user){
          navigation.navigate('checkout' , {subTotal})
        }else{
          navigation.navigate('login')
        }
      }
      catch(err){
        console.log(err)
      }
  }



  return (
    <>
      <View style={{ height: 803 }}>
        <Header width={"70%"} navigation={navigation} showMore={true} search={true} goback={e => { navigation.goBack() }} title="App" />

        <View>
          {/* Cart Items */}
          <View style={{height:"55%" , elevation:1}}>
          <FlatList
            data={cart}
            renderItem={renderItem}
            />
            </View>

          {/* Order Summary */}

          <View style={{ display: "flex", alignItems: "center"}} >
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

          <View style={{ display: 'flex', alignItems: "center" }}>
            <View style={styles.checkOutContainer} >
              <Button
                onPress={e => { handleCheckOut() }}
                mode="contained"
                buttonColor={themeColor}
              // width="45%"
              >Proceed to Checkout</Button>
              <Text style={styles.totalAmount}>PKR {subTotal + 100}</Text>
            </View>
          </View>




        </View>
      </View>
      {/* Snack bar */}
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'OK',
          onPress: () => {
            // Do something
          },
        }}>
        {msg}
      </Snackbar>

      {/* Dialog box */}

      {/* <Portal>
          <Dialog visible={visibleDialog} onDismiss={hideDialog}>
            <Dialog.Title>Select Payment Method</Dialog.Title>
            <Dialog.Content>
              <Button onPress={hideDialog}>Cash On Delivery</Button>
              <Button onPress={hideDialog}>Credit Card</Button>
              <Paragraph>Cash on Delivery</Paragraph>
              <Paragraph>This is simple dialog</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Next</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal> */}


    </>
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
    marginTop: 30
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