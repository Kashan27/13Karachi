import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../Components/Header/Header';


const Cart = ({navigation}) => {
  return (
    <>
    <Header width={"60%"} navigation={navigation} showMore={true} search={true} goback={e=>{navigation.goBack()}} title="App" />

    <View>
      <Text>Cart</Text>
    </View>
    </>
  )
}

export default Cart

const styles = StyleSheet.create({})