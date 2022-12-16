import { StyleSheet, Text, View } from 'react-native'
import { useEffect , useState } from 'react';
import React from 'react'
import axios from 'axios';
import ip from '../ip';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
    let [user , setUser] = useState()

    let handleGetUserProfile = async () => {
        try {
            let user = await AsyncStorage.getItem('user')
            axios.get(`https://${ip}/api/postbyemailsignup/${user}`)
                .then((res) => {
                    setUser(res.data)
                })
                .catch((err) => {
                    console.log(err.message)
                })
            console.log(user, "user")
        } catch (err) {
            console.log(err.message)
        }



    }

    useEffect(() => {
        handleGetUserProfile()
    }, [])


    return (
        <View>
            <Text>Profile</Text>
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({})