
import React from 'react'
import { View, Text, Image, ScrollView } from 'react-native';
import { StyleSheet, } from 'react-native';
import { TextInput, Button, FlatList } from 'react-native-paper';
import axios from 'axios';
import { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import themeColor from '../themeColor/themeColor'
import Header from '../Components/Header/Header';
import ip from '../ip';

const EditProfile = ({ navigation, route }) => {
    let [loading , setLoading] = useState(false)
    let { name, email, address, contact, _id } = route.params
    let [userDetails, setUserDetails] = useState({
        name: name,
        email: email,
        address: address,
        contact: contact.toString(),

    })

    const handleUpdateInput = (value, property) => {
        setUserDetails({ ...userDetails, [property]: value })
    }

    const handleEditUser = () => {
        if(name || email || address || contact){
            setLoading(true)
            axios.patch(`https://${ip}/api/profileupdate/${_id}` , {...userDetails})
            .then((res)=>{
                try{
                    let obj = {_id , email:userDetails.email}
                        AsyncStorage.setItem("user" , JSON.stringify({data:{...obj}}))
                        navigation.navigate('profile')
                    }catch(err){
                        console.log(err)
                    }
                    setLoading(false)
            })
            .catch((err) =>{
                setLoading(false)
                console.log(err.message , "This is handleEditUser Catch Console")
            })
        }else{
            alert("Please fill all fields")
        }
    }








    return (

        <View>
            <Header style={{ zIndex: 1 }} navigation={navigation}  width={"80%"}  showMore={true} title="App" />


            <Text style={styles.heading}>Edit Profile</Text>
            <View style={{ display: "flex", alignItems: "center" }}>
                <View style={styles.container}>
                    <View style={{ display: "flex", justifyContent: "space-around", flexDirection: "row" }}>
                        <Ionicons name='person-outline' size={25} style={{ marginTop: 18 }} />
                        <TextInput
                            value={userDetails.name}
                            onChangeText={e => { handleUpdateInput(e, "name") }}
                            style={styles.input}
                            mode="Flat"
                            placeholder='Name'
                        ></TextInput>
                    </View>
                    <View style={{ display: "flex", justifyContent: "space-around", flexDirection: "row" }}>
                        <Ionicons name='mail-outline' size={25} style={{ marginTop: 18 }} />
                        <TextInput
                            disabled={true}
                            value={userDetails.email}
                            onChangeText={e => { handleUpdateInput(e, "email") }}
                            style={styles.input}
                            mode="Flat"
                            placeholder='Email'
                        ></TextInput>
                    </View>
                    <View style={{ display: "flex", justifyContent: "space-around", flexDirection: "row" }}>
                        <Ionicons name='call-outline' size={25} style={{ marginTop: 18 }} />
                        <TextInput
                            textContentType='number'
                            value={userDetails.contact}
                            onChangeText={e => { handleUpdateInput(e, "contact") }}
                            style={styles.input}
                            mode="Flat"
                            placeholder='Contact'
                            keyboardType='numeric'
                        ></TextInput>
                    </View>
                    <View style={{ display: "flex", justifyContent: "space-around", flexDirection: "row" }}>
                        <Ionicons name='location-outline' size={25} style={{ marginTop: 18 }} />
                        <TextInput
                            onChangeText={e => { handleUpdateInput(e, "address") }}
                            value={userDetails.address}
                            style={styles.input}
                            mode="Flat"
                            placeholder='Email'
                        ></TextInput>
                    </View>
                    <View style={{ display: "flex", justifyContent: "space-around", flexDirection: "row" }}>
                        <Ionicons name='body' size={25} style={{ marginTop: 18 }} />
                        <TextInput
                            disabled={true}
                            onChangeText={e => { handleUpdateInput(e, "address") }}
                            value={"User"}
                            style={styles.input}
                            mode="Flat"
                            placeholder='role'
                        ></TextInput>
                    </View>
                </View>
            </View>
            <Button
                loading={loading}
                icon={"update"}
                mode='filled'
                textColor='white'
                buttonColor={themeColor}
                style={styles.button}
                onPress={e => { handleEditUser() }}
            >Update Profile</Button>
        </View>
    )
}

export default EditProfile

const styles = StyleSheet.create({
    container: {
        width: "85%",
        display: "flex",

    },
    button: {
        width: "50%",
        backgroundColor: themeColor,
        borderRadius: 5,
        margin:40
      },
    input: {
        backgroundColor: "transparent",
        width: "92%",
        fontSize: 17,
        marginTop: 2
        // borderColor:"none"
    },
    heading: {
        fontSize: 20,
        padding: 40,
        paddingBottom: 10,
        fontWeight: "bold",
        color: "grey"
    },

})