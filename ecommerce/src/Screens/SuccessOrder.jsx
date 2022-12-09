
import React from 'react'
import { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'



const SuccessOrder = () => {
  return (
    <View
    style={{textAlign:"center"}}>
        <View>
      <Text style={styles.success}>Order Success</Text>
        </View>
      
    </View>
  )
}

export default SuccessOrder

const styles = StyleSheet.create({
    successContainer: {
        borderRadius:100,
        backgroundColor:"green",
        width:"50%",
        display:"flex",
    },
    success:{
        textAlign:"center",
        fontSize: 30,
        color:"white",

    }
})