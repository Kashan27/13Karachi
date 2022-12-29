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
// import { Autocomplete, AutocompleteItem, Icon } from '@ui-kitten/components';
import themeColor from '../themeColor/themeColor';
// import AutocompleteInput from 'react-native-autocomplete-input';
// import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import { SelectList } from 'react-native-dropdown-select-list'




const Products = ({ route, navigation }) => {



    const filter = (item, query) => item.categoryName.toLowerCase().includes(query.toLowerCase());

    const StarIcon = (props) => (
        <Icon {...props} name='copy-outline' />
    );


    const [data, setData] = useState([]);
    const [categories, setCategories] = useState([])
    const [value, setValue] = useState(null);
    // const { shop, marketName } = route.params;
    const [allProd, setAllProd] = useState()
    const [currentShop, setCurrentShop] = useState("shop")
    const [shopList, setShopList] = useState([])
    let [p, setP] = useState([])



    const handleUpdateShop = (cShop) => {
        let filterData = allProd.filter(val => val.hotelname === cShop)
        setP(filterData)
        setCurrentShop(cShop)
        setValue('');


    }

    const handleSetCategories = () => {
        axios.get(`https://${ip}/api/allgetcategory`)
            .then(res => {
                let array = []
                res.data.forEach(e => {
                    let obj = { key: e._id, value: e.categoryName }
                    array.push(obj)
                })
                setCategories(array)
                setData(res.data)
            })
            .catch(err => {
                console.log(err)
            })

    }

    console.log(categories)

    const handleFilterByCategory = () => {
        let filterData = allProd ? allProd.filter(val =>
            (value ? val.category === value : true)
            &&
            val.hotelname === currentShop) : []
        setP(filterData)

        // setDropDownData




    }




    const onSelect = (index) => {
        setValue(data[index].categoryName);
    };

    const onChangeText = (query) => {
        setValue(query);
        setData(data.filter(item => filter(item, query)));
    };

    const clearInput = () => {
        setValue('');
        setData(categories);

        // handleUpdateShop()
    };

    // const renderOption = (item, index) => (
    //     <AutocompleteItem
    //         key={index}
    //         title={item.categoryName}
    //         accessoryLeft={StarIcon}
    //     />
    //     // <Text>{item.title}</Text>
    // );






    const renderCloseIcon = (props) => (
        <TouchableWithoutFeedback onPress={clearInput}>
            {/* <Icon {...props} name='close' /> */}
            <Text>Clear Filter</Text>
        </TouchableWithoutFeedback>
    );

    useEffect(() => {
        getProducts()
        getShops()
        handleSetCategories()

        // setCurrentMarket(marketName)
    }, [])


    useEffect(() => {
        handleFilterByCategory()
    }, [value]);

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

    const getProducts = () => {
        axios.get(`http://${ip}/api/allpostdata`)
            .then(res => {
                let data = res.data
                let filterData = data.filter(val => val.hotelname === currentShop)
                setP(filterData)
                setAllProd(res.data)
            })
            .catch(err => {
                console.error(err)
            })
    }





    const renderItem = (item) => {
        return (
            <ItemCard navigation={navigation} item={item} />
        )
    }
    const renderShopList = (item) => {
        return (
            <ShopsSlider name={item.item.hotelname} updMarket={handleUpdateShop} markets={item} />
        )
    }

    // console.log(data[0].categoryName)
    return (
        <>
            <Header navigation={navigation} width={"72%"} showMore={true} search={true} goback={e => { navigation.goBack() }} title="App" />
            <View style={{ width: "100%" }}>
                <View style={styles.shopsList}>
                    <Text style={styles.shopsHeader}>Shops</Text>
                    <FlatList
                        data={shopList}
                        renderItem={renderShopList}
                        showsVerticalScrollIndicator={false}
                        horizontal={true}
                    />

                </View>

                <View style={{zIndex:1, display: "flex", width: "100%", alignItems: "center" }}>
                    <Button buttonColor={themeColor} onClick={e => { navigation.navigate('shops') }} style={{ margin: 10 }} labelStyle={{ fontSize: 18 }} mode='contained' >{currentShop}</Button>
                </View>

                <SelectList
                    style={{zIndex:10000}}
                    setSelected={(val) => setValue(val)}
                    data={categories}
                    save="value"
                />




                <View  style={{zIndex:1, display: "flex", width: "100%" }}>
                    {p[0] ?

                        <FlatList
                            data={p}
                            renderItem={renderItem}
                            numColumns={3}
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

export default Products

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
    shopsHeader: {
        fontSize: 20,
        borderRightColor: "grey",
        borderRightWidth: 1,
        borderStyle: "solid",
        paddingRight: 7
    },
    autocompleteContainer: {
        backgroundColor: '#ffffff',
        borderWidth: 0,
    },
})