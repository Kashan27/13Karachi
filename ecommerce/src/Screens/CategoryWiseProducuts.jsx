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
import { TouchableWithoutFeedback } from 'react-native';
import { Autocomplete, AutocompleteItem, Icon } from '@ui-kitten/components';
import themeColor from '../themeColor/themeColor';
import { useIsFocused } from "@react-navigation/native";
import { HStack, Spinner } from 'native-base';






const CategoryWiseProducts = ({ route, navigation }) => {
    const isFocused = useIsFocused();
    const  [loading , setLoading] = useState(false)


    // const filter = (item, query) => item.categoryName.toLowerCase().includes(query.toLowerCase());

    // const StarIcon = (props) => (
    //     <Icon {...props} name='copy-outline' />
    // );


    const [data, setData] = useState([]);
    const [categories, setCategories] = useState([])
    const { shop, marketName , item , allCategories } = route.params;
    const [value, setValue] = useState(item.item.categoryName);
    const [allProd, setAllProd] = useState()
    const [currentShop, setCurrentShop] = useState(shop)
    const [shopList, setShopList] = useState([])
    let [p, setP] = useState([])




    // const handleUpdateShop = (cShop) => {
    //     let filterData = allProd.filter(val => val.hotelname === cShop)

    //     setP(filterData)
    //     setCurrentShop(cShop)
    //     setValue('');


    // }

    const handleSetCategories = () => {
        axios.get(`https://${ip}/api/allgetcategory`)
            .then(res => {
                
                setCategories(res.data)
                setData(res.data)
            })
            .catch(err => {
                console.log(err)
            })
            
    }

    const handleFilterByCategory = (categoryValue) => {
        let filterData = allProd ? allProd.filter(val => (val.category === categoryValue)) : []
        console.log(filterData , "handleFilterByCategory")
        setP(filterData)


    }




    // const onSelect = (index) => {
    //     setValue(data[index].categoryName);
    // };
    
    // const onChangeText = (query) => {
    //     setValue(query);
    //     setData(data.filter(item => filter(item, query)));
    // };

    // const clearInput = () => {
        //     setValue('');
    //     setData(categories);
    //     // handleUpdateShop()
    // };
    
    // const renderOption = (item, index) => (
        //     <AutocompleteItem
        //         key={index}
        //         title={item.categoryName}
        //         accessoryLeft={StarIcon}
    //     />
    //     // <Text>{item.title}</Text>
    // );






    // const renderCloseIcon = (props) => (
    //     <TouchableWithoutFeedback onPress={clearInput}>
    //         {/* <Icon {...props} name='close' /> */}
    //         <Text>Clear Filter</Text>
    //     </TouchableWithoutFeedback>
    // );
    
    useEffect(() => {
        setLoading(true)
        getProducts(item.item.categoryName)
        getShops()
        handleSetCategories()

        // setCurrentMarket(marketName)
    }, [])

    
    // useEffect(() => {
    //     handleFilterByCategory()
    //     console.log(item.item.categoryName)

    // }, [ ]);

    const getShops = (shop) => {

        axios.get(`https://${ip}/api/allsignup`)
        .then(res => {
                let data = res.data
                let filterShops = data.filter(val => val.marketname === marketName)
                setShopList(filterShops)
                
            })
            .catch(err => {
                console.error(err)
            })
            
        }
    
    const getProducts = (categoryValue) => {
        axios.get(`http://${ip}/api/allpostdata`)
        .then(res => {
                
                let data = res.data
                // let filterData = data.filter(val => val.hotelname === currentShop)
                 let filterData = data.filter(val => (val.category === categoryValue))
        console.log(filterData)
        setP(filterData)
        setLoading(false)
                // setP(filterData)
                setAllProd(res.data)
                // handleFilterByCategory(item.item.categoryName)
            })
            .catch(err => {
                console.error(err)
            })
    }





    const renderItem = (item) => {
        return (
            <ItemCard navigation={navigation}  item={item} />
        )
    }
    const renderCategoryList = (item) => {
        return (
            <Button onPress={e=>{handleFilterByCategory(item.item.categoryName)}} mode='filled' style={styles.categories}>{item.item.categoryName}</Button>
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


                <View style={{ display: "flex", width: "100%" }}>
                    {loading ?
                    <HStack style={styles.loadingContainer}>
                        <Spinner color={themeColor} />
                        <Text style={{fontSize:20 , color:{themeColor}}}> Loading ...</Text>
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
    categories:{
      color:themeColor
    },
    shopsHeader: {
        fontSize: 40,
        borderRightColor: "grey",
        borderRightWidth: 1,
        borderStyle: "solid",
        paddingRight: 7
    },
    loadingContainer:{
        display:"flex",
        justifyContent:"center",
        alignItems: "center",
        height:"85%"
        
        
    }
})