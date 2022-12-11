import { StyleSheet, Text, View, FlatList, ScrollView, Dimensions } from 'react-native'
import React from 'react'
import Header from '../Components/Header/Header'
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Button, Menu, Divider, Provider } from 'react-native-paper';
import Slider from '../Components/Slider/Slider';
import ip from '../ip';
import ItemCard from '../Components/Card/Card';
import AsyncStorage from '@react-native-async-storage/async-storage';





const Height = Dimensions.get("screen").height;
const Home = ({ navigation }) => {
    let [products, setProducts] = useState([])
    useEffect(() => {
        // console.log(Height, "Height")
        axios.get(`http://${ip}/api/allpostdata`)
            .then(res => {
                let data = res.data
                data = data.slice(-6)
                setProducts(data)
            })
            .catch(error => {
                console.log(error)
            })

    }, []);


    const sliderImages = [
        { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5a5uCP-n4teeW2SApcIqUrcQApev8ZVCJkA&usqp=CAU' },
        { img: "https://neilpatel.com/wp-content/uploads/2017/12/ecommerce-seo-tips.jpg" },
        { img: "http://bloomidea.com/sites/default/files/styles/og_image/public/blog/Tipos%20de%20come%CC%81rcio%20electro%CC%81nico_0.png?itok=jC9MlQZq" },
    ]
    const [visible, setVisible] = React.useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);
    const login = () => navigation.navigate("login");
    const [selectedLanguage, setSelectedLanguage] = useState();


    const renderItem = (item) => {
        return (
            <ItemCard navigation={navigation}  item={item} />
        )
    }


    return (
        <View>
            <Header style={{ zIndex: 1 }} navigation={navigation} login={login} width={"80%"} close={closeMenu} showMore={true} title="App" />

            {/* <Text>Home</Text> */}
            {/* <Text style={{ textAlign: "center" }} onPress={e => { navigation.navigate("login") }} >Login</Text> */}

            <Slider style={{ zIndex: -1 }} images={sliderImages}
                // customSlide={({ index, item, style, width }) => (
                //     // It's important to put style here because it's got offset inside
                //     <View key={index} style={[style, styles.customSlide]}>
                //         <Image source={{ uri: item.img }} style={styles.customImage} />
                //     </View>
                // )}


            />


            <View>
                <Text style={styles.text}>Recently Added</Text>
            </View>
            <View style={{ marginLeft: 10, display: "flex", alignItems: "center", height: Height - 530, width: "100%" }}>
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


    }

})