import React from 'react'
import { View, Touchable, Text, Image, StyleSheet, Pressable, } from 'react-native'
import { memo } from 'react';
import themeColor from '../../themeColor/themeColor';


function ItemCard({ item , navigation }) {

    let product = item.item
    console.log('card')
    return (
        <Pressable onPress={e=>{navigation.navigate("item" , {item})}} style={styles.container}>
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
                    style={styles.prodPrice}
                >Rs
                    <Text
                        style={styles.prodPrice}
                    > {product.productPrice}</Text></Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({

    container: {
        width: "47%",
        display:"flex",
        margin:10,
        backgroundColor: "white",
        // padding: 6,
        borderRadius: 15,
        shadowColor: "grey",
        shadowOffset: { width: 10, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 15,
        height:140
    },
    image: {
        // width: "100%" 
        borderTopRightRadius:15,
        borderTopLeftRadius:15,
        borderBottomRightRadius:10,
        borderBottomLeftRadius:10,
        height: "55%",
    },
    prodName: {
        fontFamily: "arial",
        fontSize: 18,
        padding:5
    },
    prodPrice: {
        padding:5,
        paddingTop: 0,
        color:themeColor,
        fontWeight:"bold",
        fontSize:17
    }
})


export default memo(ItemCard)