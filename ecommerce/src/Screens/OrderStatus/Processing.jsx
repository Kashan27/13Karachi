import { FlatList, StyleSheet, Text, View } from 'react-native'
import { useEffect , useState } from 'react'
import OrderStatusCard from '../../Components/OrderStatusCard/OrderStatusCard'
import React from 'react'

const Processing = ({data, status}) => {
    // console.log(data,"processing")

let [pendingOrder, setPendingOrder]= useState([])

    const handleGetData = async () => {

        let processing = data ? data.filter((value) =>  value.paymentstatus === 'Pending') : []
        setPendingOrder(processing)
    }

    console.log(pendingOrder)
    useEffect(() => {
        handleGetData()
    }, []);
    // console.log(pendingOrder,"pendingOrder")
    return (
    <View>
      {/* <OrderStatusCard item={data} /> */}
      <FlatList  
      data={pendingOrder}
      renderItem={value=> <OrderStatusCard status="Processing" item={value} />}
      keyExtractor={value=> value._id}
      />
    </View>
  )
}

export default Processing

const styles = StyleSheet.create({})