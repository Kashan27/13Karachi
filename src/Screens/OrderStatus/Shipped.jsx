import { FlatList, StyleSheet, Text, View } from 'react-native'
import { useEffect , useState } from 'react'
import OrderStatusCard from '../../Components/OrderStatusCard/OrderStatusCard'
import themeColor from '../../themeColor/themeColor'
import React from 'react'

const Shipped = ({data , navigation}) => {

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
      <View style={styles.headingContainer}>

<Text style={styles.heading1}>No Orders</Text>
<Text onPress={e=>{navigation.navigate('home')}} style={styles.heading}>Shop Now...</Text>
</View>
    </View>
  )
}

export default Shipped;

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