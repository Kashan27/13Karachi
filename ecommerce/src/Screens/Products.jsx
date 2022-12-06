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


const Products = ({ route, navigation }) => {
    
    

    const filter = (item, query) => item.categoryName.toLowerCase().includes(query.toLowerCase());

    const StarIcon = (props) => (
        <Icon {...props} name='copy-outline' />
        );
        
        
    const [data, setData] = useState([]);
    const [categories, setCategories] = useState([])
    const [value, setValue] = useState(null);
    const {shop, marketName } = route.params;
    const [allProd, setAllProd] = useState()
    const [currentShop, setCurrentShop] = useState(shop)
    const [shopList, setShopList] = useState([])
    let [p, setP] = useState([])
    
    
    
    const handleUpdateShop = () => {
        setCurrentShop(shop)
        let filterData = allProd.filter(val => val.hotelname === shop)
        setP(filterData)


    }

    const handleSetCategories = () => {
        axios.get(`http://${ip}:9000/api/allgetcategory`)
        .then(res => {
            // console.log(res.data[0].categoryName,"categoories")
            setCategories(res.data)
            setData(res.data)
        })
        .catch(err => {
            console.log(err)
        })

    }

    const handleFilterByCategory = () => {
            console.log(value, "value")
            console.log(value, "value")
            let filterData = allProd ? allProd.filter(val => val.category === value && val.hotelname === shop) : []
            setP(filterData)
            console.log(filterData , "filterData")
            
    }




    const onSelect = (index) => {
        setValue(data[index].categoryName);
        console.log(data[index].categoryName)
    };

    const onChangeText = (query) => {
        setValue(query);
        setData(data.filter(item => filter(item, query)));
    };

    const clearInput = () => {
        setValue('');
        setData(categories);
        handleUpdateShop()
    };

    const renderOption = (item, index) => (
        <AutocompleteItem
            key={index}
            title={item.categoryName}
            accessoryLeft={StarIcon}
        />
        // <Text>{item.title}</Text>
    );

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
        console.log(p)
        handleFilterByCategory()
    }, [value]);

    const getShops = (shop) => {

        axios.get(`http://${ip}:9000/api/allsignup`)
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
        axios.get(`http://${ip}:9000/api/allpostdata`)
            .then(res => {
                let data = res.data
                let filterData = data.filter(val => val.hotelname === currentShop)
                // console.log(filterData, "filtered")
                setP(filterData)
                setAllProd(res.data)
            })
            .catch(err => {
                console.error(err)
            })
    }

    // console.log(p, "p")



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
    const renderShopList = (item) => {
        return (
            <ShopsSlider name={item.item.hotelname} updMarket={handleUpdateShop} markets={item} />
        )
    }


    return (
        <>
            <Header navigation={navigation} width={"60%"} showMore={true} search={true} goback={e => { navigation.goBack() }} title="App" />
            <View style={{ width: "100%" }}>

                <View style={{ display: "flex", alignItems: "center", width: "100%", height: 50, marginVertical: 10 }}>

                    <FlatList
                        // onPress={e => { console.log(e.target) }}
                        ListHeaderComponent={<Text style={{ fontSize: 20 }}>Shops</Text>}
                        data={shopList}
                        renderItem={renderShopList}
                        // numColumns={2}
                        showsVerticalScrollIndicator={false}
                        horizontal={true}
                    />

                </View>

                <Autocomplete
                    placeholder='Place your Text'
                    value={value}
                    accessoryRight={renderCloseIcon}
                    onChangeText={onChangeText}
                    onSelect={onSelect}>
                    {data.map(renderOption)}
                </Autocomplete>
                <View style={{ display: "flex", width: "100%", alignItems: "center" }}>
                    <Button onClick={e => { navigation.navigate('shops') }} style={{ margin: 10 }} labelStyle={{ fontSize: 18 }} mode='contained' >{currentShop}</Button>
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
                        <Text style={{ fontSize: 30, textAlign: "center", marginTop: "50%" }}>No Products Found</Text>

                    }
                </View>
            </View>
        </>
    )
}

export default Products