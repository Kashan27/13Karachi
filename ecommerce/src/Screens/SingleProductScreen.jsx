import { Image, StyleSheet, Text, View } from 'react-native'
import Header from '../Components/Header/Header'
import React from 'react'
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { Button } from 'react-native-paper';

const SingleProductScreen = ({ navigation }) => {

    const [selectedLanguage, setSelectedLanguage] = useState();


    return (
        <View>
            <Header navigation={navigation} title={true} goback={e=>{navigation.goBack()}} showMore={true} width={"70%"} />
            {/* <Text>SingleProductScreen</Text> */}

            <View style={styles.container}>
                <Image
                    resizeMode='contain'
                    style={styles.image} source={{ uri: "https://media.naheed.pk/catalog/product/cache/ed9f5ebe2a117625f6cd6336daddd764/1/0/1036762-1.jpg" }} />

                <Text style={styles.name}>Knor Chiken Noodles</Text>
                <Text style={styles.discrip}>Knor Chiken a quick brown fox jumps over the lazy dog Noodles</Text>
                <View style={{displa:"flex" , justifyContent:"space-around" , width:"100%" , flexDirection:"row"}}>

                    <View style={styles.sizeContainer}>
                        <Text style={{ fontSize: 15, marginLeft: 15, marginTop: 10 }}>Size</Text>
                        <Picker
                            // style={{ width: "40%" }}
                            mode={"dropdown"}
                            selectedValue={selectedLanguage}
                            onValueChange={(itemValue, itemIndex) =>
                                setSelectedLanguage(itemValue)
                            }>
                            <Picker.Item label="Small" value="Small" />
                            <Picker.Item label="Medium" value="Medium" />
                            <Picker.Item label="Large" value="Large" />
                            <Picker.Item label="X-L" value="X-L" />
                            <Picker.Item label="XX-L" value="XX-L" />
                        </Picker>
                    </View>

            
                    <View style={styles.sizeContainer}>
                        <Text style={{ fontSize: 15, marginLeft: 15, marginTop: 10 }}>Color</Text>
                        <Picker
                            // style={{ width: "40%" }}
                            mode={"dropdown"}
                            selectedValue={selectedLanguage}
                            onValueChange={(itemValue, itemIndex) =>
                                setSelectedLanguage(itemValue)
                            }>
                            <Picker.Item label="green" value="green" />
                            <Picker.Item label="blue" value="blue" />
                            <Picker.Item label="Large" value="pink" />
                            <Picker.Item label="red" value="red" />
                            <Picker.Item label="orange" value="orange" />
                        </Picker>
                    </View>

                </View>
                <View style={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-between", paddingHorizontal: 18, marginTop: 15 }}>

                    <Text style={styles.price}>2000 PKR</Text>
                    <Button style={{ width: 130 }} icon="cart" mode="contained" onPress={() => console.log('Pressed')}>
                        Add To Cart
                    </Button>
                </View>
            </View>

        </View>
    )
}

export default SingleProductScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        height: "84%",
        marginTop: "10%",
        borderRadius: 50,
        marginHorizontal: 8,
        shadowColor: 'black'
        , shadowOffset: { width: 0, height: 2 }
        , shadowOpacity: 0
        , shadowRadius: 2
        , margin: 8,
        elevation: 15
    },
    discrip: {
        padding: 15,
        fontSize: 15,
        paddingTop: 0,
        fontWeight: "bold",

    },
    image: {
        width: "100%",
        height: "50%",
        borderRadius: 50
    },
    name: {
        fontSize: 21,
        padding: 15,
        fontWeight: "bold"
    },
    price: {
        fontSize: 30,
        fontWeight: "600",

    },
    sizeContainer: {
        borderWidth: 1,
        borderColor: "grey",
        borderRadius: 20,
        borderStyle: "solid",
        width: "38%",
        marginLeft: 8
    },
})