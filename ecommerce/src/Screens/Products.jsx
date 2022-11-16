import axios from 'axios';
import React from 'react'
import { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet, FlatList, } from 'react-native'
import ItemCard from '../Components/Card/Card';
import Header from '../Components/Header/Header';
import ShopsSlider from '../Components/ShopSlider/ShopsSlider';
import ip from "../ip"
import { Button } from 'react-native-paper';









const Products = ({ route, navigation }) => {


    const { marketName, markets } = route.params;
    const [allProd, setAllProd] = useState()
    const [currentMarket, setCurrentMarket] = useState(marketName)
    let [p, setP] = useState([])



    const handleUpdateMarket = (shop) => {
        setCurrentMarket(shop)
        let filterData = allProd.filter(val => val.prodmarketname === shop)
        setP(filterData)


    }




    useEffect(() => {
        getProducts()
        // setCurrentMarket(marketName)
    }, [])

    const getProducts = () => {
        axios.get(`http://${ip}:9000/api/allpostdata`)
            .then(res => {
                let data = res.data
                let filterData = data.filter(val => val.prodmarketname === currentMarket)
                console.log(filterData, "filtered")
                setP(filterData)
                setAllProd(res.data)
            })
            .catch(err => {
                console.error(err)
            })
        console.log(markets, "markets")
    }




    const products = [
        {
            image: "https://th.bing.com/th/id/R.bbe108e338d81f7e8c2388c3816ea646?rik=vuI08%2fKOk%2babUw&pid=ImgRaw&r=0",
            name: "Ladies Purse",
            price: '4000'
        },
        {
            image: "https://th.bing.com/th/id/R.bbe108e338d81f7e8c2388c3816ea646?rik=vuI08%2fKOk%2babUw&pid=ImgRaw&r=0",
            name: "Ladies Purse",
            price: '4000'
        },
        {
            image: "https://th.bing.com/th/id/R.bbe108e338d81f7e8c2388c3816ea646?rik=vuI08%2fKOk%2babUw&pid=ImgRaw&r=0",
            name: "Ladies Purse",
            price: '4000'
        },
        {
            image: "https://th.bing.com/th/id/R.bbe108e338d81f7e8c2388c3816ea646?rik=vuI08%2fKOk%2babUw&pid=ImgRaw&r=0",
            name: "Ladies Purse",
            price: '4000'
        },
        {
            image: "https://th.bing.com/th/id/R.bbe108e338d81f7e8c2388c3816ea646?rik=vuI08%2fKOk%2babUw&pid=ImgRaw&r=0",
            name: "Ladies Purse",
            price: '4000'
        },
        {
            image: "https://th.bing.com/th/id/R.bbe108e338d81f7e8c2388c3816ea646?rik=vuI08%2fKOk%2babUw&pid=ImgRaw&r=0",
            name: "Ladies Purse",
            price: '4000'
        },
        {
            image: "https://th.bing.com/th/id/R.bbe108e338d81f7e8c2388c3816ea646?rik=vuI08%2fKOk%2babUw&pid=ImgRaw&r=0",
            name: "Ladies Purse",
            price: '4000'
        },
        {
            image: "https://th.bing.com/th/id/R.bbe108e338d81f7e8c2388c3816ea646?rik=vuI08%2fKOk%2babUw&pid=ImgRaw&r=0",
            name: "Ladies Purse",
            price: '4000'
        },
        {
            image: "https://th.bing.com/th/id/R.bbe108e338d81f7e8c2388c3816ea646?rik=vuI08%2fKOk%2babUw&pid=ImgRaw&r=0",
            name: "Ladies Purse",
            price: '4000'
        },
        {
            image: "https://th.bing.com/th/id/R.bbe108e338d81f7e8c2388c3816ea646?rik=vuI08%2fKOk%2babUw&pid=ImgRaw&r=0",
            name: "Ladies Purse",
            price: '4000'
        },
        {
            image: "https://th.bing.com/th/id/R.bbe108e338d81f7e8c2388c3816ea646?rik=vuI08%2fKOk%2babUw&pid=ImgRaw&r=0",
            name: "Ladies Purse",
            price: '4000'
        },

    ]
    const renderItem = (item) => {
        return (
            <ItemCard navigation={navigation} onPress={e => { console.log("itemcard") }} item={item} />
        )
    }
    const renderMarkets = (item) => {
        return (
            <ShopsSlider updMarket={handleUpdateMarket} markets={item} />
        )
    }


    return (
        <>
            <Header navigation={navigation} width={"60%"} showMore={true} search={true} goback={e => { navigation.goBack() }} title="App" />
            <View style={{ width: "100%" }}>

                <View style={{ display: "flex", alignItems: "center", width: "100%", height: 50, marginVertical:10 }}>

                    <FlatList
                        onPress={e => { console.log(e.target) }}
                        ListHeaderComponent={<Text style={{ fontSize: 20 }}>Markets</Text>}
                        data={markets}
                        renderItem={renderMarkets}
                        // numColumns={2}
                        showsVerticalScrollIndicator={false}
                        horizontal={true}
                    />
                </View>


                <View style={{ display: "flex", width: "100%", alignItems: "center" }}>
                    <Button style={{ margin: 10 }} labelStyle={{ fontSize: 18 }} mode='contained' >{currentMarket}</Button>
                </View>


                    <View style={{ display: "flex", width: "100%" }}>
                {p[0] ? 

                        <FlatList
                            data={p}
                            renderItem={renderItem}
                            numColumns={2}
                            showsVerticalScrollIndicator={false}
                        />
                        :
                        <Text style={{fontSize:30 , textAlign:"center", marginTop:"50%"}}>No Products Found</Text>

                    }
                    </View>
            </View>
        </>
    )
}

export default Products