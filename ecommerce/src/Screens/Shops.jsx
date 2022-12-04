import axios from 'axios';
import React from 'react'
import { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet, FlatList, } from 'react-native'
import ItemCard from '../Components/Card/Card';
import Header from '../Components/Header/Header';
import ShopsSlider from '../Components/ShopSlider/ShopsSlider';
import ip from "../ip"
import { Button } from 'react-native-paper';









const Shops = ({ route, navigation }) => {


    const {area , marketName, markets } = route.params;
    const [shops , setShops] = useState([])
    const [allProd, setAllProd] = useState()
    const [currentMarket, setCurrentMarket] = useState(marketName)
    const [currentArea, setCurrentArea] = useState(area)
    let [shopsList, setShopsList] = useState(shops)



    const handleUpdateMarket = (cMarket) => {
        setCurrentMarket(cMarket)
        console.log(cMarket)
        console.log(shops)
        let filterData = shops.filter(val => val.marketname === currentMarket)
        console.log(filterData)
        setShopsList(filterData)


    }




    useEffect(() => {
        getProducts()
        // setCurrentMarket(marketName)
    }, [])

    const getProducts = () => {
        console.log(marketName)
        axios.get(`http://${ip}:9000/api/getmarket/${marketName}`)
            .then(res => {
                let data = res.data
                // console.log(data , "shops")
                setShops(data)
                setShopsList(data)
            })
            .catch(err => {
                console.error(err)
            })
    }



    const renderItem = ({item}) => {
        return (
            // <ItemCard navigation={navigation} onPress={e => { console.log("itemcard") }} item={item} />
            <TouchableOpacity onPress={e=>{navigation.navigate("products" , {shop:item.hotelname , marketName})}} style={styles.shops}>
                <Text style={styles.shopName}>
                    {item.hotelname}
                </Text>
            </TouchableOpacity>
        )
    }
    const renderMarkets = (item) => {
        return (
            <ShopsSlider name={item.item.marketName} updMarket={handleUpdateMarket} markets={item} />
        )
    }


    return (
        <>
            <Header navigation={navigation} width={"60%"} showMore={true} search={true} goback={e => { navigation.goBack() }} title="App" />
            <View style={{ width: "100%" }}>

                <View style={{ display: "flex", alignItems: "center", width: "100%", height: 50, marginVertical: 10 }}>

                    <FlatList
                        // onPress={e => { console.log(e.target) }}
                        
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


                <View style={styles.mainShopContainer} >
                    {true
                        ?
                        <FlatList
                            data={shopsList}
                            renderItem={renderItem}
                            numColumns={2}
                            showsVerticalScrollIndicator={false}
                        />
                        :
                        <Text style={{ fontSize: 30, textAlign: "center", marginTop: "50%" }}>No Products Found</Text>

                    }
                </View>
            </View>
        </>
    )
}




const styles = StyleSheet.create({
    mainShopContainer:{
        width: "100%",
        display: "flex",
        alignItems:"center",
        // backgroundColor:"pink",
        
    },
    shops:{
        backgroundColor:"white",
        elevation:0.8,
        margin:20,
        // borderColor:"none",
        // borderWidth:1,
        borderRadius:5,
        width:"40%",
        height:50,
        textAlign:"center",
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
    },
    shopName:{
        fontSize:22,
    }
})








export default Shops;