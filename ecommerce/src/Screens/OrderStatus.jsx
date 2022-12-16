import { StyleSheet, Text, View } from 'react-native'
import { useState , useEffect } from 'react'
import ip from '../ip'
import axios from 'axios'
import React from 'react'

const OrderStatus = () => {

    let [statusDetails , setStatusDetails] = useState()

    useEffect(() => {
        axios.patch(`https://${ip}/api/ordersupdate/6365861747d99219e9be2dd1`)
        .then((res)=>{
            console.log(res.data)
        })
        .catch((err)=>{
            console.log(err.message)
        })

    }, []);


  return (
    <View>
      <Text>OrderStatus</Text>
    </View>
  )
}

export default OrderStatus

const styles = StyleSheet.create({})