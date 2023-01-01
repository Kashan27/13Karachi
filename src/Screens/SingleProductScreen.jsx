import { FlatList, Image, StyleSheet, Text, View , TouchableOpacity} from 'react-native'
import Header from '../Components/Header/Header'
import React, { useEffect } from 'react'
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { Button, Snackbar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { parse } from '@babel/core';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MultiProdImages from '../Components/MultiProductImages/MultiProdImages';
import themeColor from '../themeColor/themeColor';
import { LogBox } from 'react-native';
import axios from 'axios';
import ip from '../ip';

const SingleProductScreen = ({ route, navigation }) => {


    LogBox.ignoreLogs(['Non-serializable values were found in the navigation state'])
    const { item } = route.params
    let { productName, imageURL, productPrice, _id, multiProd } = item.item
    let [imageList , setImageList] = useState([imageURL,
        "https://cdn.edenrobe.com/media/amasty/amopttablet/catalog/product/images/Men/Men_Shirts/2022/22_M_MenShirts_EMTSI22-50254_1.webp",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr_Dn9cUvCICBFoE5zNkQU4LOnEfw0hFCmjA&usqp=CAU"
    ])
    let [image , setImage] = useState(imageURL)
    const [availableQty, setAvailableQty] = useState()
    let [itemQty, setItemQty] = useState(1)
    const [visible, setVisible] = useState(false);
    const onToggleSnackBar = () => setVisible(!visible);
    const onDismissSnackBar = () => setVisible(false);
    const [msg, setMsg] = useState()
    const [sizeList , setSizeList] = useState([])
    const [colorList , setColorList] = useState(["color"])
    const [itemSize, setItemSize] = useState()
    const [itemColor, setItemColor] = useState()

    const handleAddToCart = async () => {
        axios.get(`${ip}/api/getMultipleFiles`)
            .then(response => {
                // console.log(response.data, "files")
            })
            .catch(error => console.log(error.message))
        const date = Date.now()
        const itemObj = { ...item.item, itemSize, itemColor, qty: itemQty, date, availableQty }
        if (itemQty) {

            try {
                const cart = await AsyncStorage.getItem("cart");
                let parseCart = cart ? JSON.parse(cart) : []
                if (parseCart[0]) {
                    try {
                        // await AsyncStorage.setItem("cart", JSON.stringify(itemObj));
                        let findProduct = parseCart.find(val => {
                            return val._id === _id && val.itemSize === itemSize && val.itemColor === itemColor
                        })
                        if (!findProduct) {
                           
                            parseCart.push(itemObj)
                        
                            AsyncStorage.setItem("cart", JSON.stringify(parseCart));
                            setMsg("item added to cart")
                            setVisible(true)
                        } else {
                        
                            setMsg("you already add this item to cart")
                            setVisible(true)

                        }
                        // await AsyncStorage.removeItem("cart")

                    }
                    catch (error) {
                        console.log(error, "error");
                    }
                } else {
                    let obj = [{ ...itemObj }]
                    await AsyncStorage.setItem("cart", JSON.stringify(obj));

                }
            } catch (error) {
                console.log(error);
            }
        } else {
            alert("please add qty")
        }



    }

    const handleCounter = (value) => {

        switch (value) {
            case "add":

                if (itemQty < availableQty) {
                    setItemQty(itemQty + 1)
                } else {
                    setMsg(` ${availableQty ? availableQty : "No"} items in stock`)
                    setVisible(true)
                }
                break;
            case "less":
                if (itemQty > 0) {
                    setItemQty(itemQty - 1)
                }
                break;
        }
    }

    const handleAvailableQty = (value, prop) => {
        let filter = multiProd.filter(item =>
            item.productSize === itemSize
            &&
            item.productColor === itemColor)
        let qty = filter[0] ? filter[0].otherQty : 0
        setAvailableQty(qty)
    }

    const handleUpdateDetails = (property, value) => {
        switch (property) {
            case "size":
                let color = multiProd.filter(data => data.productSize === value)
                setItemSize(value)
                setColorList(color)
                break;
            case "color":
                setItemColor(value)
                break;
        }
        setItemQty(0)
    }



    /////////////////////////////////    useEffect //////////////////////////////////


    useEffect(() => {
        handleAvailableQty()
        let uniqueArr = [... new Set(multiProd.map(data => data.productSize))]
        setSizeList(["size" , ...uniqueArr])

    }, [itemSize, itemColor])



    /////////////////////////////////    listImage ( Rnder ) //////////////////////////////////

    let renderItem = ({item}) => {
        return (
            <TouchableOpacity
            onPress={e=>{setImage(item)}}
            style={styles.imageBorder}>

            <Image
                style={styles.listImage}
                resizeMode='contain'
                source={{ uri: item }} />
                </TouchableOpacity>
        )
    }




    return (
        <View>
            <Header navigation={navigation} title={true} goback={e => { navigation.goBack() }} showMore={true} width={"70%"} />

            <View style={styles.container}>
                <Image
                    resizeMode='contain'
                    style={styles.image} source={{ uri: image }} />
                <View>
                </View>
                <View style={styles.imageListContainer}>
                    
                    <FlatList
                        data={imageList}
                        renderItem={renderItem}
                        horizontal={true}
                        keyExtractor={(item , index) => `${item}${index}`}
                        />
                </View>

                <Text style={styles.name}>{productName ? productName : "Name Not Found"}</Text>
                <Text style={styles.discrip}>Knor Chiken a quick brown fox jumps over the lazy dog Noodles</Text>
                <View style={{ displa: "flex", justifyContent: "space-around", width: "100%", flexDirection: "row" }}>



                    {/*    Size DropDown          */}

                    <View style={styles.sizeContainer}>
                        <Text style={{ fontSize: 15, marginLeft: 15, marginTop: 10 }}>Size</Text>
                        <Picker
                            // style={{ width: "40%" }}
                            mode={"dropdown"}
                            selectedValue={itemSize}
                            onValueChange={(itemValue, itemIndex) => {
                                handleUpdateDetails('size', itemValue)
                            }
                        }>
                            {/* <Picker.Item label="Size" value="Size" /> */}
                            {sizeList.map((item, index) => {
                                return (
                                    <Picker.Item key={index} label={item} value={item} />
                                )
                            })
                            }

                        </Picker>
                    </View>





                    {/*    Color DropDown          */}

                    <View style={styles.sizeContainer}>
                        <Text style={{ fontSize: 15, marginLeft: 15, marginTop: 10 }}>Color</Text>
                        <Picker
                            // style={{ width: "40%" }}
                            mode={"dropdown"}
                            selectedValue={itemColor}
                            onValueChange={(itemValue, itemIndex) => {
                                handleUpdateDetails('color', itemValue)
                            }
                            }>
                            {colorList.map((item, index) => {
                                let color = item.productColor
                                return (
                                    <Picker.Item key={index}  label={color} value={color} />
                                )
                            })
                            }
                        </Picker>
                    </View>
                </View>



                {/*    Qty Counter          */}

                <View style={styles.countMainContainer}>
                    <View style={styles.countContainer}>

                        <Ionicons
                            onPress={e => { handleCounter("less") }}
                            name="remove-outline"
                            size={28}
                        />


                        <Text style={styles.counterNumber}>
                            {itemQty}
                        </Text>
                        <Ionicons
                            onPress={e => { handleCounter("add") }}
                            name="add-outline"
                            size={28}
                        />


                    </View>
                </View>





                {/*    Price and Cart Button          */}
                <View style={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-between", paddingHorizontal: 18, marginTop: 15 }}>
                    <Text style={styles.price}>{productPrice} PKR</Text>
                    <Button style={{ width: 130 }} buttonColor={themeColor} icon="cart" mode="contained" onPress={() => { handleAddToCart() }}>
                        Add To Cart
                    </Button>
                </View>
            </View>
            <Snackbar
                visible={visible}
                onDismiss={onDismissSnackBar}
                action={{
                    label: 'OK',
                    onPress: () => {
                        // Do something
                    },
                }}>
                {msg}
            </Snackbar>

        </View>
    )
}

export default SingleProductScreen





//  Styles----------

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        height: "84%",
        marginTop: "10%",
        borderRadius: 50,
        marginHorizontal: 8,
        shadowColor: 'black'
        , shadowOffset: { width: 0, height: 2 }
        , shadowOpacity: 0
        , shadowRadius: 2
        , margin: 8,
        elevation: 15
    },
    countMainContainer: {
        display: "flex",
        alignItems: "center"
    },
    countContainer: {
        backgroundColor: "lightgrey",
        discrip: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        width: "35%",
        height: 35,
        marginTop: 10,
        borderRadius: 100,
    },
    counterText: {
        fontSize: 20,
        fontWeight: "bold"
    },
    counterNumber: {
        fontSize: 20,
        fontWeight: "bold",
        backgroundColor: "white",
        borderRadius: 100,
        width: "20%",
        textAlign: "center",
    },
    discrip: {
        padding: 15,
        fontSize: 15,
        paddingTop: 0,
        fontWeight: "bold",

    },
    image: {
        width: "100%",
        height: "40%",
        borderRadius: 50
    },
    imageListContainer: {
        // backgroundColor:"blue",
        width: "100%",
        // height: 45,
        paddingHorizontal: 10
    },
    listImage:{
        height:40,
        width:45,
    },  
    imageBorder:{
        borderRadius:10,
        borderWidth:1,
        borderColor:"purple",
        borderStyle:"solid",
        padding:2,
        marginLeft:2

    },
    name: {
        fontSize: 21,
        padding: 15,
        fontWeight: "bold"
    },
    price: {
        fontSize: 30,
        fontWeight: "600",

    },
    sizeContainer: {
        borderWidth: 1,
        borderColor: "grey",
        borderRadius: 20,
        borderStyle: "solid",
        width: "38%",
        marginLeft: 8
    },
})