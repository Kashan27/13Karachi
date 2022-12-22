import { FlatList, StyleSheet, Text, View } from 'react-native'
import { useEffect , useState } from 'react'
import OrderStatusCard from '../../Components/OrderStatusCard/OrderStatusCard'
import React from 'react'

const Shipped = ({data}) => {

let [ShippedOrder, setShippedOrder]= useState([])

    const handleGetData = async () => {

        let shipped = data ? data.filter((value) =>  value.paymentstatus === 'Shipped') : []
        setShippedOrder(shipped)
    }

    useEffect(() => {
        handleGetData()
    }, []);
    return (
    <View>
      {/* <OrderStatusCard item={data} /> */}
      <FlatList  
      data={ShippedOrder}
      renderItem={value=> <OrderStatusCard status="Shipped" item={value} />}
      keyExtractor={value=> value._id}
      />
    </View>
  )
}

export default Shipped;

const styles = StyleSheet.create({})