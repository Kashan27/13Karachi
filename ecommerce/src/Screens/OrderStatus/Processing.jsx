import { FlatList, StyleSheet, Text, View } from 'react-native'
import { useEffect, useState } from 'react'
import OrderStatusCard from '../../Components/OrderStatusCard/OrderStatusCard'
import React from 'react'
import themeColor from '../../themeColor/themeColor'

const Processing = ({ data, status , navigation}) => {

  let [pendingOrder, setPendingOrder] = useState([])

  const handleGetData = async () => {

    let processing = data ? data.filter((value) => value.paymentstatus === 'Pending') : []
    setPendingOrder(processing)
  }


  useEffect(() => {
    handleGetData()
  }, []);
  return (
    <View>
      {pendingOrder[0] ?
        <FlatList
        data={pendingOrder}
        renderItem={value => <OrderStatusCard status="Processing" item={value} />}
        keyExtractor={value => value._id}
        /> :
      <View style={styles.headingContainer}>

        <Text style={styles.heading1}>No Orders</Text>
        <Text onPress={e=>{navigation.navigate('home')}} style={styles.heading}>Shop Now...</Text>
      </View>
      }
    </View>
  )
}

export default Processing

const styles = StyleSheet.create({
  headingContainer:{
    marginTop:130
  },  
  heading: {
    textAlign: 'center',
    fontSize: 30,
    color:themeColor
  },
  heading1: {
    textAlign: 'center',
    fontSize: 50,
  }
})