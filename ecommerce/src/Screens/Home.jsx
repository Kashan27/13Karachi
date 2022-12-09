import { StyleSheet, Text, View, FlatList, ScrollView, Dimensions } from 'react-native'
import React from 'react'
import Header from '../Components/Header/Header'
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Button, Menu, Divider, Provider } from 'react-native-paper';
import Slider from '../Components/Slider/Slider';
import ip from '../ip';
import ItemCard from '../Components/Card/Card';





const Height = Dimensions.get("screen").height;
const Home = ({ navigation }) => {
    let [products, setProducts] = useState([])

    useEffect(() => {
        // console.log(Height, "Height")
        axios.get(`https://${ip}/api/allpostdata`)
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
        { img: "://th.bing.com/th/id/OIP.xEbcztsACaZL-Aw5DeLuZwHaDZ?w=285&h=160&c=7&r=0&o=5&pid=1.7" },
        { img: "://th.bing.com/th/id/R.2db5a3f2be76363303d7c101364da461?rik=zfZFg04CcoCzXQ&pid=ImgRaw&r=0" },
        { img: '://th.bing.com/th/id/OIP.rjVa-ZNOK3w_PQ5x6UyCxwHaFL?pid=ImgDet&rs=1' }
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

                customSlide={({ index, item, style, width }) => (
                    // It's important to put style here because it's got offset inside
                    <View key={index} style={[style, styles.customSlide]}>
                        <Image source={{ uri: item }} style={styles.customImage} />
                    </View>
                )}


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