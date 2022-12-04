import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const CartCard = ({item , index , removeItem}) => {
  console.log(item.imageURL)
  const {imageURL , productName , itemSize , itemColor , productPrice , qty} = item



  

  
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer} >
        <Image style={styles.image} source={{uri:imageURL}} />
      </View>

      <View style={styles.detailContainer}>
              <Text style={styles.productName}>{productName}</Text>
              <Text style={styles.productSize}>Size: {itemSize}</Text>
              <Text style={styles.productColor}>Color: {itemColor}</Text>
              <Text style={styles.productColor}>Qty: {qty}</Text>
              <Text style={styles.productPrice}>Rs: {productPrice*qty}</Text>
      </View >
      <TouchableOpacity onPress={e=>{removeItem(index)}} style={{marginTop:50}}>
        <Text>Remove</Text>
      </TouchableOpacity>
    </View>
  )
}

export default CartCard

const styles = StyleSheet.create({
  container: {
    height: 130,
    width: "80%",
    backgroundColor: "white",
    marginHorizontal: "10%",
    marginVertical: 10,
    diaplay: "flex",
    flexDirection: "row",
    borderRadius:20,
  },
  detailContainer:{
    padding:10
  },
  imageContainer:{
    width: "40%",
    borderTopLeftRadius:20
    // backgroundColor:"blue",
  },  
  image: {
    resizeMode: "stretch",
    height: 126,
    width: "100%",
    borderRadius:20
  },
  productName:{
    paddingLeft:30,
    fontWeight:"bold",
    fontSize:20,
  },
  productSize:{
    color:"grey",
    fontWeight:"bold",
  },
  productColor:{
    color:"grey",
    fontWeight:"bold",
    // marginTop:6
    },
  productPrice:{
    color:"#426D54",
    fontSize:23,
    // marginTop:6,
    fontWeight:"bold"
  }
})