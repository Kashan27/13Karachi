import React, { useEffect } from 'react'
import { useState } from 'react';
import { View, Text, Image } from 'react-native';
import { StyleSheet, } from 'react-native';
import { TextInput, Button, Snackbar } from 'react-native-paper';
import axios from 'axios';
import Header from '../Components/Header/Header';
import banner from '../images/login/banner.jpeg';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import themeColor from '../themeColor/themeColor';
import ip from '../ip';


const NewPass = ({ navigation, route }) => {
    const onDismissSnackBar = () => setVisible(false);
    const { email } = route.params
    const [disable, setDisable] = useState(false)
    const [msg, setMsg] = useState()
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [security, setSecurity] = useState(
        {
            password: "",
            confirmPassword: "",
        })


    const handleInput = (property, value) => {
        setSecurity({ ...security, [property]: value })
    }


    const handleSetNewPassword = async () => {
        let { password, confirmPassword } = security
        if (password === confirmPassword) {

            if (password.length > 6) {
                // setLoading(true)
                axios.post(`http://${ip}/api/updatepassword`, { email, password })
                    .then(res => {
                        setLoading(false)
                        setDisable(true)
                        setMsg(res.data.message)
                        setVisible(true)
                    })
                    .catch(error => {
                        setMsg(error.message)
                        setVisible(true)
                        setLoading(false)
                    })


            } else {
                alert("Password must be greater than 6 characters")
            }
        } else {
            alert("Password Not matched")
        }

    }

    const handleCheckCode = () => {
        if (parseInt(inputCode) === code) {
            alert("matched")

        } else {
            alert("not matched")
        }
    }






    return (
        <View
            style={{ backgroundColor: "white" }}>
            <Header navigation={navigation} goback={e => { navigation.goBack() }} title="App" />
            <Image
                resizeMode='stretch'
                style={styles.banner}
                source={banner}
            />



            <Text style={styles.heading}>New Password</Text>
            <View style={styles.loginContainer} >
                <View style={styles.inputContainer}>
                    <View style={{ display: "flex", justifyContent: "space-between", flexDirection: "row" }}>
                        <Ionicons name='key-outline' size={28} style={{ marginTop: 10 }} />
                        <TextInput
                            // icon="account-outline"
                            onChangeText={e => { handleInput("password", e) }}
                            style={styles.input}
                            mode="Flat"
                            placeholder='New Password'
                            secureTextEntry={true}
                        // textColor='white'
                        ></TextInput>
                    </View>
                </View>
                <View style={styles.inputContainer}>
                    <View style={{ display: "flex", justifyContent: "space-between", flexDirection: "row" }}>
                        <Ionicons name='key-outline' size={28} style={{ marginTop: 10 }} />
                        <TextInput
                            secureTextEntry={true}
                            keyboardType='numeric'
                            onChangeText={e => { handleInput("confirmPassword", e) }}
                            style={styles.input}
                            mode="Flat"
                            placeholder='Re-enter Password'
                        // textColor='white'
                        ></TextInput>
                    </View>
                </View>
                <View style={styles.loginButton}>
                    <Button
                        disabled={disable}
                        onPress={e => { handleSetNewPassword() }}
                        mode="contained"
                        style={styles.button}
                        loading={loading}
                    >Set Password</Button>
                </View>
                <View onPress={e=>{navigation.navigate("login")}} style={styles.resend}>
                    <Text style={styles.text}>
                        Login to account
                    </Text>
                </View>

            </View>


            <Snackbar
                duration={null}
                visible={visible}
                onDismiss={onDismissSnackBar}
                action={{
                    label: 'OK',
                    onPress: () => {
                        // Do something
                    },
                }}>
                {msg}
            </Snackbar>


        </View>
    )
}



const styles = StyleSheet.create({
    button: {
        width: "75%",
        backgroundColor: themeColor,
        borderRadius: 5,
    },
    banner: {
        width: "100%",
        height: 280,

    },
    container: {
        backgroundColor: "#ffffff",
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },

    forgotPassword: {
        fontSize: 18,
        fontWeight: "bold",
        padding: 10,
        marginLeft: 20,
        marginTop: 10,
        color: themeColor
    },
    loginContainer: {
        height: 400,
        width: "100%",
        // displ
        backgroundColor: "white",
        // opacity:0.3,
        // borderRadius: 20,
        // backgroundColor: "rgba(0, 0, 0, 0.3)",
        // marginTop: -100,
    },
    loginButton: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        // marginTop: 20,

    },
    heading: {
        fontSize: 30,
        // color: "white",
        // textAlign: "center",
        paddingHorizontal: 20
    },
    input: {
        backgroundColor: "white",
        width: "80%",
        fontSize: 20,

    },
    inputContainer: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "21%",
        marginTop: 15,
    },
    text: {
        fontSize: 20,
        textAlign: "center",
        padding: 30,
        textDecorationColor: "white",
        textDecorationStyle: "solid",
        textDecorationLine: "underline"
    },
    resend: {
        fontSize: 15,
        fontWeight: "bold",
        padding: 10,
        marginLeft: 20,
        marginTop: 10,
        textAlign: "center",

    },


});


export default NewPass

