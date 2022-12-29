import axios from 'axios';
import React from 'react'
import { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet, FlatList, } from 'react-native'
import ItemCard from '../Components/Card/Card';
import Header from '../Components/Header/Header';
import ShopsSlider from '../Components/ShopSlider/ShopsSlider';
import ip from "../ip"
import { Button } from 'react-native-paper';
import { Chip } from 'react-native-paper';
import themeColor from '../themeColor/themeColor';
import { useIsFocused } from "@react-navigation/native";
import { HStack, Spinner } from 'native-base';
import fetchingPost from '../fetchs/fetchingPost';
import fetchingCategories from '../fetchs/fetchingCategories';
import { useQuery } from 'react-query';







const CategoryWiseProducts = ({ route, navigation }) => {
    const allProducts = useQuery('products', fetchingPost)  // get all products

    const isFocused = useIsFocused();
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([]);
    const [categories, setCategories] = useState([])
    const { shop, marketName, item, allCategories } = route.params;
    const [value, setValue] = useState(item.item.categoryName);
    const [allProd, setAllProd] = useState()
    const [currentShop, setCurrentShop] = useState(shop)
    const [shopList, setShopList] = useState([])
    let [p, setP] = useState([])


    const handleFilterByCategory = (categoryValue) => {
        console.log(allProducts)
        let filterData = allProducts.data ? allProducts.data.filter(val => (val.category === categoryValue)) : []
        console.log(filterData, "handleFilterByCategory")
        setValue(categoryValue)
        setP(filterData)


    }



    useEffect(() => {
        handleFilterByCategory(item.item.categoryName)
        // console.log()

    }, []);



    // Render Items of FlatList ----------------------------------------------------------------
    // Product Card
    const renderItem = (item) => {
        return (
            <ItemCard navigation={navigation} item={item} />
        )
    }
    // Categories
    const renderCategoryList = (item) => {
        return (
            <Button onPress={e => { handleFilterByCategory(item.item.categoryName) }} mode='filled' style={styles.categories}>{item.item.categoryName}</Button>
        )
    }


    return (
        <>
            <Header navigation={navigation} width={"60%"} showMore={true} search={true} goback={e => { navigation.goBack() }} title="App" />
            <View style={{ width: "100%" }}>
                <View style={styles.shopsList}>
                    <Text style={styles.shopsHeader}>  Categories</Text>
                    <FlatList

                        data={allCategories}
                        renderItem={renderCategoryList}
                        showsVerticalScrollIndicator={false}
                        horizontal={true}
                    />

                </View>


{/* Current Category Heading  */}
                <Button

                    style={styles.button}
                    buttonColor={themeColor}
                    textColor="white"
                    mode="contained"
                >{value}</Button>


{/* Category wise filter products */}

                <View style={{ display: "flex", width: "100%" }}>
                    {allProducts.isLoading ?
                        <HStack style={styles.loadingContainer}>
                            <Spinner color={themeColor} />
                            <Text style={{ fontSize: 20, color: { themeColor } }}> Loading ...</Text>
                        </HStack>
                        :
                        (p[0] ?

                            <FlatList
                                data={p}
                                renderItem={renderItem}
                                numColumns={3}
                                showsVerticalScrollIndicator={false}
                            />
                            :
                            <Text style={{ fontSize: 30, textAlign: "center", marginTop: "50%" }}>No Products Found</Text>

                        )
                    }
                </View>
            </View>
        </>
    )
}

export default CategoryWiseProducts

// style={{ display: "flex", alignItems: "center", width: "100%", height: 50, marginVertical: 10 
const styles = StyleSheet.create({
    shopsList: {
        display: "flex",
        width: "100%",
        height: 60,
        flexDirection: "row",
        // backgroundColor:"red",
        alignItems: "center",
    },
    categories: {
        color: themeColor
    },
    shopsHeader: {
        fontSize: 30,
        borderRightColor: "grey",
        borderRightWidth: 1,
        borderStyle: "solid",
        paddingRight: 7
    },
    loadingContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "85%"
    },
    button: {
        // textAlign:"center",
        // width:"50%",
        borderRadius: 0,
    }
})