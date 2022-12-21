import React from 'react'
import { View, TouchableOpacity, Text, Image, StyleSheet, } from 'react-native'

function ItemCard({ item , navigation }) {

    let product = item.item
    // console.log(item , "item from products")
    return (
        <TouchableOpacity onPress={e=>{navigation.navigate("item" , {item})}} style={styles.container}>
            <Image
                resizeMode={"contain"}
                // source={{uri:"://n3.sdlcdn.com/imgs/a/2/6/New-Fancy-Purse-House-Black-SDL825681176-2-1b9a6.jpg"}}
                source={{ uri: product.imageURL}}
                style={styles.image}
            />
            <View>
                <Text numberOfLines={1} ellipsizeMode="tail" style={styles.prodName}>
                    {product.productName}
                </Text>
            </View>
            <View>
                <Text
                    style={{ color: "#426D54", fontWeight: "bold", fontSize: 17 }}
                >Rs
                    <Text
                        style={{ fontSize: 17 }}
                    > {product.productPrice}</Text></Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

    container: {
        width: "27%",
        display:"flex",
        // backgroundColor:"white",
        // marginLeft: 20,
        margin:10,
        backgroundColor: "white",
        padding: 6,
        borderRadius: 10,
        shadowColor: "grey",
        shadowOffset: { width: 10, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 15
    },
    image: {
        // width: 100    ,
        height: 100,
    },
    prodName: {
        fontFamily: "arial",
        fontSize: 18,
    },
    prodPrice: {

    }
})


export default ItemCard