import axios from 'axios';
import React from 'react'
import { useEffect, useState } from 'react';
import { View, TouchableOpacity,  Image, StyleSheet, FlatList, } from 'react-native'
import ItemCard from '../Components/Card/Card';
import Header from '../Components/Header/Header';
import ShopsSlider from '../Components/ShopSlider/ShopsSlider';
import ip from "../ip"
import { Button } from 'react-native-paper';
import { Card, Layout, Text } from '@ui-kitten/components';
import themeColor from '../themeColor/themeColor';








const Shops = ({ route, navigation }) => {

    const {area , marketName, markets } = route.params;
    const [shops , setShops] = useState([])
    const [allProd, setAllProd] = useState()
    const [currentMarket, setCurrentMarket] = useState(marketName)
    const [currentArea, setCurrentArea] = useState(area)
    let [shopsList, setShopsList] = useState(shops)



    const handleUpdateMarket = (cMarket) => {
        setCurrentMarket(cMarket)
        let filterData = shops.filter(val => val.marketname === cMarket)
        setShopsList(filterData)


    }




    useEffect(() => {
        getProducts()
        // setCurrentMarket(marketName)
    }, [])

    const getProducts = () => {
        axios.get(`https://${ip}/api/getmarket/${marketName}`)
            .then(res => {
                let data = res.data
                setShops(data)
                setShopsList(data)
            })
            .catch(err => {
                console.error(err)
            })
    }



    const renderItem = ({item}) => {
        return (
            <Card
             onPress={e=>{navigation.navigate("products" , {shop:item.hotelname , marketName})}}
              style={styles.card} status='primary'
              appearance="filled"
              
              >
            <Text style={styles.shopName}>{item.hotelname}</Text>
          </Card>
                // </TouchableOpacity>
        )
    }
    const renderMarkets = (item) => {
        return (<ShopsSlider name={item.item.title} updMarket={handleUpdateMarket} markets={item} />)
    }


    return (
        <>
            <Header navigation={navigation} width={"60%"} showMore={true} search={true} goback={e => { navigation.goBack() }} title="App" />
            <View style={{ width: "100%" }}>

                <View style={styles.marketList}>
                <Text style={styles.marketsHeader}>Markets</Text>
                    <FlatList

                        data={markets}
                        renderItem={renderMarkets}
                        // numColumns={2}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
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
    card:{
        color:"red",
        margin:15,
    },
    mainShopContainer:{
        width: "100%",
        display: "flex",
        alignItems:"center",
        // backgroundColor:"pink",
        
    },marketsHeader:{
        fontSize:20,
        borderRightColor:"grey",
        borderRightWidth:1,
        borderStyle:"solid",
        paddingRight:7
    },marketList: {
        display:"flex",
        width:"100%",
        height:60,
        flexDirection:"row",
        // backgroundColor:"red",
        alignItems:"center",
    },
    shops:{
        backgroundColor:"white",
        elevation:0.8,
        margin:15,
        // borderColor:"none",
        // borderWidth:1,
        borderRadius:5,
        // width:"45%",
        // height:50,
        textAlign:"center",
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
    },
    shopName:{
        fontSize:20,
    }
    
})








export default Shops;