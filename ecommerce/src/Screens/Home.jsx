import { StyleSheet, Text, View, FlatList, ScrollView, Dimensions } from 'react-native'
import React from 'react'
import { useRef } from 'react';
import Header from '../Components/Header/Header'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Menu, Divider, Provider } from 'react-native-paper';
import Slider from '../Components/Slider/Slider';
import ip from '../ip';
import ItemCard from '../Components/Card/Card';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from "@react-navigation/native";







const Height = Dimensions.get("screen").height;

const Home = ({ navigation }) => {
    let [products, setProducts] = useState([])
    let [categories, setCategories] = useState([])
    let [carousel , setCarousel] = useState([])

    useEffect(() => {
        axios.get(`https://${ip}/api/allpostdata`)
            .then(res => {
                let data = res.data
                data = data.slice(-6)
                setProducts(data)
            })
            .catch(error => {
                console.log(error)
            })
        axios.get(`https://${ip}/api/allgetcategory`)
            .then(res => {
                setCategories(res.data)
            })
            .catch(err => {
                console.log(err)
            })
        
        }, []);
        

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);
    const login = () => navigation.navigate("login");


    const renderItem = (item) => {
        return (
            <ItemCard navigation={navigation} item={item} />
        )
    }


    return (
        <View>
            <Header style={{ zIndex: 1 }} navigation={navigation} login={login} width={"80%"} close={closeMenu} showMore={true} title="App" />

          

            <Slider style={{ zIndex: -1 }}
            // customSlide={({ index, item, style, width }) => (
            //     // It's important to put style here because it's got offset inside
            //     <View key={index} style={[style, styles.customSlide]}>
            //         <Image source={{ uri: item.img }} style={styles.customImage} />
            //     </View>
            // )}


            />
            {/*Categories  */}
            <View>
                <FlatList
                    data={categories}
                    renderItem={item => <Text
                         onPress={e=>{navigation.navigate('categorywiseproducts' , {item , allCategories:categories})}}
                          style={styles.categoryName}>{item.item.categoryName}
                          </Text>}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                />
            </View>



            {/* Recently added */}
            <View>
                <Text style={styles.text}>Recently Added</Text>
            </View>
            <View style={{ marginLeft: 10, display: "flex", alignItems: "center", height: (Height*32/100), width: "100%" }}>
                {products[0] ?

                    <FlatList
                        // contentContainerStyle={{display:'flex' ,height:"45%"  , alignItems:"center"}}
                        data={products}
                        renderItem={renderItem}
                        numColumns={3}
                        showsVerticalScrollIndicator={false}
                    />
                    :
                    <Text style={{ fontSize: 30, textAlign: "center", marginTop: "50%" }}>No Products Found</Text>

                }
            </View>



        </View>
    )
}

export default Home

const styles = StyleSheet.create({

    text: {
        borderBottomColor: "grey",
        borderBottomWidth: 2,
        fontSize: 20,
        width: "40%",
        margin: 5,
        textAlign: "center",
        padding: 5
    },
    categoryName: {
        padding: 10,
        fontSize: 20
    }

})