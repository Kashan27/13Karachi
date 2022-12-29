import { StyleSheet, Text, View, FlatList, Dimensions } from 'react-native'
import React from 'react'
import Header from '../Components/Header/Header'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from '../Components/Slider/Slider';
import ip from '../ip';
import ItemCard from '../Components/Card/Card';
import { useQuery } from 'react-query';
import fetchingCategories from '../fetchs/fetchingCategories'
import fetchingPost from '../fetchs/fetchingPost'






const Height = Dimensions.get("screen").height;
console.log(Height)

const Home = ({ navigation }) => {


    let queryMultiple = () => {
        const products = useQuery("products", fetchingPost);
        const categories = useQuery("category", fetchingCategories);
        return [products, categories]
    }
    const [
        { loading: loading1, data: data1 },
        { loading: loading2, data: data2 }
    ] = queryMultiple()












    // let [categories, setCategories] = useState(data2)
    // let [carousel, setCarousel] = useState([])

    useEffect(() => {
        // axios.get(`https://${ip}/api/allpostdata`)
        //     .then(res => {
        //         let data = res.data
        //         data = data.slice(-6)
        //         setProducts(data)
        //     })
        //     .catch(error => {
        //         console.log(error)
        //     })
        // axios.get(`https://${ip}/api/allgetcategory`)
        //     .then(res => {
        //         setCategories(res.data)
        //     })
        //     .catch(err => {
        //         console.log(err)
        //     })

    }, []);





    const renderItem = (item) => {
        return (
            <ItemCard navigation={navigation} item={item} />
        )
    }


    return (
        <View>
            <Header style={{ zIndex: 1 }} navigation={navigation}  width={"80%"}  showMore={true} title="App" />


            <Slider style={{ zIndex: -1 }}



            />
            {/*Categories  */}
            <View>
                <FlatList
                    data={data2}
                    renderItem={item => <Text
                        onPress={e => { navigation.navigate('categorywiseproducts', { item, allCategories: data2 }) }}
                        style={styles.categoryName}>{item.item.categoryName}
                    </Text>}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => item._id}
                />
            </View>



            {/* Recently added */}
            <View>
                <Text style={styles.text}>Recently Added</Text>
            </View>
            <View style={{ marginLeft: 10, display: "flex", alignItems: "center", height: (Height * 32 / 100), width: "100%" }}>
                {data1 ?

                    <FlatList
                        // contentContainerStyle={{display:'flex' ,height:"45%"  , alignItems:"center"}}
                        data={data1}
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