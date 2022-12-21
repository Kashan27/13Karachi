import { StyleSheet, Text, View, Image } from 'react-native'
import { useEffect, useState } from 'react';
import React from 'react'
import axios from 'axios';
import ip from '../ip';
import AsyncStorage from '@react-native-async-storage/async-storage';
import themeColor from '../themeColor/themeColor';
import { List } from 'react-native-paper';
import { Button } from 'react-native-paper';

const Profile = ({navigation}) => {
    let [user, setUser] = useState({ email: "", phone: "", address: "" })

    let handleGetUserProfile = async () => {
        try {
            let lsUserData = await AsyncStorage.getItem('user')
            let email = lsUserData ? JSON.parse(lsUserData).data.email : null
            console.log(email, "email")

            axios.get(`https://${ip}/api/postbyemailsignup/${email}`)
                .then((res) => {
                    console.log(res)
                    setUser(res.data[0])
                })
                .catch((err) => {
                    console.log(err.message)
                })
            console.log(user, "user")
        } catch (err) {
            console.log(err.message)
        }



    }


    let handleLogOut = async () => {
        try{
           await AsyncStorage.removeItem('user')
           navigation.navigate('home')
        }catch(err){
            console.log(err.message)
        }
    }

    console.log(user)

    useEffect(() => {
        handleGetUserProfile()
    }, [])


    return (
        <View>
            <View style={styles.header}>
                <View style={styles.profileImage}>
                    <Image
                        style={styles.image}
                        source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuS4q9gPpC3J0mYiARB4gNfrwx3QHNglobOpDduKih&s" }} />
                </View>

            </View>
            <Text style={styles.name}>
                Muhammad Kashan
            </Text>
            <Text style={styles.personalHeading}>
                Personal
            </Text>

            <List.Item
                title="Email"
                description={user.email}
                left={props => <List.Icon {...props} icon="email" />}
            />
            <List.Item
                title="Phone"
                description={user.contact}
                left={props => <List.Icon {...props} icon="phone" />}
            />
            <List.Item
                title="Address"
                description={user.address}
                left={props => <List.Icon {...props} icon="map-marker" />}
            />
            <List.Item
                title="Role"
                description="User"
                left={props => <List.Icon {...props} icon="account" />}
                />

        <View style={{display:"flex" , justifyContent:"space-around" , flexDirection:"row" }}>
            
            <Button
                icon={"pencil-outline"}
                mode='filled'
                textColor='white'
                buttonColor={themeColor}
                style={styles.button}
                
                >Edit Profile</Button>
            <Button
                icon={"account-arrow-left"}
                mode='contained'
                textColor={themeColor}
                buttonColor="#c3f7f5"
                style={styles.button}
                onPress={e=>{handleLogOut()}}
                
                >LogOut</Button>
                </View>
            <Button 
                icon={"format-list-group"}
                mode='filled'
                textColor='white'
                buttonColor={themeColor}
                style={styles.button}
                onPress={e=>{navigation.navigate('orderstatus')}}
            >My Orders</Button>

        </View>
    )
}

export default Profile

const styles = StyleSheet.create({

    header: {
        backgroundColor: "lightgrey",
        height: 150,
    },
    profileImage: {
        height: 130,
        width: 130,
        borderRadius: 100,
        backgroundColor: "grey",
        position: "absolute",
        top: 95,
        left: 10,

    },
    name: {
        color: themeColor,
        fontSize: 20,
        textAlign: "center",
        marginLeft: 80,
        fontWeight: "bold",
        marginTop: 20,
        padding: 5
    },
    personalHeading: {
        fontSize: 20,
        padding: 40,
        fontWeight: "bold",
        color: "grey"
    },
    image: {
        height: 130,
        width: 130,
        borderRadius: 100,
    },
    button:{
        borderRadius:10,
        width:"35%",
        margin:25,
    }

})