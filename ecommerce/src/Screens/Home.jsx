import { StyleSheet, Text, View, FlatList, ScrollView, Dimensions } from 'react-native'
import React from 'react'
import { useRef } from 'react';
import Header from '../Components/Header/Header'
import { useState, useEffect} from 'react';
import axios from 'axios';
import { Button, Menu, Divider, Provider } from 'react-native-paper';
import Slider from '../Components/Slider/Slider';
import ip from '../ip';
import ItemCard from '../Components/Card/Card';
import AsyncStorage from '@react-native-async-storage/async-storage';
import emailjs from '@emailjs/browser';






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
       
        // var templateParams = {
        //     hostname:"api.emailjs.com",
        //     to_name:"muhammadkashan267@gmail.com",
        //     message:"Reset password",
        //     name: 'James',
        //     notes: 'Check this out!',
        // };

        // emailjs.send('service_0976cj6', 'template_o58p24g', templateParams , '5j3kaLIoX1Scspn_0')
        //     .then(function (response) {
        //         console.log('SUCCESS!', response.status, response.text);
        //     }, function (error) {
        //         console.log('FAILED...', error);
        //     });


    }, []);


    const sliderImages = [
        { img: 'httpss://cdn.pixabay.com/photo/2018/08/29/17/07/ecommerce-3640321__340.jpg' },
        { img: "httpss://neilpatel.com/wp-content/uploads/2017/12/ecommerce-seo-tips.jpg" },
        { img: "https://bloomidea.com/sites/default/files/styles/og_image/public/blog/Tipos%20de%20come%CC%81rcio%20electro%CC%81nico_0.png?itok=jC9MlQZq" },
    ]
    const [visible, setVisible] = React.useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);
    const login = () => navigation.navigate("login");
    const [selectedLanguage, setSelectedLanguage] = useState();


    const renderItem = (item) => {
        return (
            <ItemCard navigation={navigation} item={item} />
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