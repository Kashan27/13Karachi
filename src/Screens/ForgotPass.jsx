import React, { useEffect } from 'react'
import { useState } from 'react';
import { View, Text, Image } from 'react-native';
import { StyleSheet, } from 'react-native';
import { TextInput, Button ,Snackbar} from 'react-native-paper';
import axios from 'axios';
import Header from '../Components/Header/Header';
import banner from '../images/login/banner.jpeg';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import themeColor from '../themeColor/themeColor'
import ip from '../ip';


const ForgotPass = ({ navigation }) => {
    const onDismissSnackBar = () => setVisible(false);
    const [msg , setMsg] = useState()
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [code , setCode] = useState();
    const [inputCode , setInputCode] = useState();
    const [email , setEmail] = useState('') 
    const handleInput = (e) => {
        setEmail(e)
    }
    const handleCodeInput = (e) => {
        setInputCode(e)
    }
    
    const handleSendResetEmail = () => {

        if(email){
            setLoading(true)
            axios.post(`${ip}/api/resetpassword` , {email})
            .then(res =>{
                setLoading(false)
                setCode(res.data.code)
                setMsg(res.data.message)
                setVisible(true)
            })
            .catch(error => {
                setMsg(error.message)
                setVisible(true)
                setLoading(false)
                console.log(error)
            })
        }else{
            alert("Enter Email")
        }

    }

    const handleCheckCode = () => {
        if(parseInt(inputCode) === code){
            navigation.navigate('newpass',{email})
        }else{
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



            <Text style={styles.heading}>Reset Password</Text>
            <View style={styles.loginContainer} >
                <View style={styles.inputContainer}>
                    <View style={{ display: "flex", justifyContent: "space-between", flexDirection: "row" }}>
                        <Ionicons name='mail-outline' size={28} style={{ marginTop: 10 }} />
                        <TextInput
                            // icon="account-outline"
                            onChangeText={e => { handleInput(e) }}
                            style={styles.input}
                            mode="Flat"
                            placeholder='Email'
                        // textColor='white'
                        ></TextInput>
                    </View>
                </View>
                <View style={styles.loginButton}>
                    <Button
                        onPress={e => { handleSendResetEmail() }}
                        mode="contained"
                        style={styles.button}
                        loading={loading}
                    >Send Reset Code</Button>
                </View>
                <Text style={styles.resend}>
                    <Text onPress={e => { navigation.navigate("signup") }} style={{ color: themeColor }}>
                        Resend Code
                    </Text>
                </Text>
                <View style={styles.inputContainer}>
                    <View style={{ display: "flex", justifyContent: "space-between", flexDirection: "row" }}>
                        <Ionicons name='keypad-outline' size={28} style={{ marginTop: 10 }} />
                        <TextInput
                            // icon="account-outline"
                            keyboardType='numeric'
                            onChangeText={e => { handleCodeInput(e) }}
                            style={styles.input}
                            mode="Flat"
                            placeholder='Enter Recived Code'
                        // textColor='white'
                        ></TextInput>
                    </View>
                </View>
                <View style={styles.loginButton}>
                    <Button
                        onPress={e => { handleCheckCode() }}
                        mode="contained"
                        style={styles.button}
                        loading={loading2}
                    >Submit</Button>
                </View>
                
            </View>


            <Snackbar
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
        fontSize: 40,
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
        textAlign:"center",
    
      },


});


export default ForgotPass

