
import React from 'react'
import { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';




{/* <ion-icon name="checkmark-circle-outline"></ion-icon> */}


const SuccessOrder = () => {
  return (
    <View style={styles.container}>

      <View
        style={styles.successContainer}>
        <View>
          <Text style={styles.success}>Order Success</Text>
          {/* <Text style={styles.success}>Buy More...!</Text> */}
          <Ionicons style={styles.tickMark} 
          name="checkmark-circle-outline"
           size={64} />
        </View>

      </View>
          <Text style={styles.thank}>Thank You
           <Text style={{color:"grey"}}> For Your Order</Text>
           </Text>
    </View>
  )
}

export default SuccessOrder

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    // backgroundColor:"blue",
    alignItems:"center",
    height:"100%",
  },
  successContainer: {
    borderRadius: 300,
    backgroundColor: "#23bc24",
    width: "75%",
    height: 300,
    display: "flex",
    justifyContent: "center"
  },
  success: {
    textAlign: "center",
    fontSize: 30,
    color: "white",
  },
  thank:{
    textAlign: "center",
    fontSize: 70,
    color: "#5591ff",
  },
  tickMark:{
    textAlign: "center",
    fontSize: 120,
    color: "white",

  }
})