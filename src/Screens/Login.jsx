
import React, { useCallback, useEffect, useRef } from 'react'
import KeyboardListener from 'react-native-keyboard-listener'
import { useState } from 'react';
import { View, Text, Image , Keyboard} from 'react-native';
import {
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView
} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import axios from 'axios';
import Header from '../Components/Header/Header';
import banner from '../images/login/banner.jpeg';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ip from '../ip';
import themeColor from '../themeColor/themeColor'
// import { TextInput } from 'react-native-paper';





export const Login = ({ navigation }) => {
  console.log('logiin')
  let [loading, setLoading] = useState(false)
  let [isShowKeyBoard , setIsShowKeyBoard] = useState()
  let logo = require('../icons/logo.png')
  // let [userDetails, setUserDetails] = useState({
  //   email: "muhammadkashan267@gmail.com",
  //   password: "888888"
  // })


  let emailRef = useRef()
  let passRef = useRef()
  let userDetails = useRef({ email: "", password: "" })



  const keyboardShowListener = Keyboard.addListener(
    'keyboardDidShow',
    () => {
      // console.log('Keyboard is open')
      setIsShowKeyBoard(true)
      
    }
  );
  const keyboardHideListener = Keyboard.addListener(
    'keyboardDidHide',
    () => {
      // console.log('Keyboard is closed')
      setIsShowKeyBoard(false)
    }
  );





  const handleLogin = async (event) => {

    let { email, password } = userDetails.current
    if (email && password) {
      setLoading(true)
      axios.post(`${ip}/api/signin`, { email, password })
        .then(async (response) => {
          try {
            let role = response.data.data.role
            // if(role === "User") {
            await AsyncStorage.setItem("user", JSON.stringify(response.data))
            navigation.navigate("home")
            // }else{
            //   console.log(response.data.data,"role")
            //   alert("This is a seller account.please go to website to signedIn as Seller ")
            // }

          } catch (err) {
            console.log(err)
          }
          setLoading(false)
        })
        .catch(err => {
          setLoading(false)
          console.log(err.message)
        })
    } else {
      alert("Please fill all details")
    }

  }


  const handleInput = (property, value) => {
    // setUserDetails({ ...userDetails, [property]: value })
    userDetails.current = { ...userDetails.current, [property]: value }
    // console.log(userDetails.current)
  }


  useEffect(() => {
    let getUser = async () => {
      let user = await AsyncStorage.getItem("user")
      if (user) {
        navigation.navigate("home")
      }
    }
    getUser()
  }, [])


  let handleGoBack = useCallback(() => {
    navigation.goBack()
  }, [navigation])





  // ----------------------------------------Render----------------------------------------------------------------

  return (
    <View
      style={{ backgroundColor: "white" }}>

      <Header navigation={navigation} width={"75%"} goback={handleGoBack} title="App" />


      {/* Banner */}
{isShowKeyBoard ?

      <Image
      resizeMode="cover"
      style={styles.logo}
      source={logo}
      />
      :
      <Image
      resizeMode="cover"
      style={styles.banner}
      source={banner}
      />
      
    }


      {/* Login Details */}

      <Text style={styles.heading}>Login</Text>
      <View style={styles.loginContainer} >
        <View style={styles.inputContainer}>
          <View style={{ display: "flex", justifyContent: "space-between", flexDirection: "row" }}>
            <Ionicons name='mail-outline' size={28} style={{ marginTop: 10 }} />
            <TextInput
              // icon="account-outline"
              returnKeyType="next"
              onSubmitEditing={() => {
                passRef.current.focus()
              }}
              onChangeText={e => { handleInput("email", e) }}
              style={styles.input}
              mode="Flat"
              placeholder='Email / username'
              blurOnSubmit={false}
            // textColor='white'
            ></TextInput>
          </View>
          <View style={{ display: "flex", justifyContent: "space-between", flexDirection: "row" }}>
            <Ionicons name='key-outline' size={28} style={{ marginTop: 10 }} />
            <TextInput
              ref={passRef}
              onChangeText={e => { handleInput("password", e) }}
              style={styles.input}
              mode="Flat"
              secureTextEntry={true}
              placeholder='Password'
            ></TextInput>
          </View>
        </View>
        <Text onPress={e => { navigation.navigate("forgotpass") }} style={styles.forgotPassword}>
          Forgot Password?
        </Text>
        <View style={styles.loginButton}>
          <Button
            onPress={e => { handleLogin() }}
            mode="contained"
            style={styles.button}
            loading={loading}
          >Login</Button>
        </View>
        <Text style={styles.register}>
          Don't have an account ?
          <Text onPress={e => { navigation.navigate("signup") }} style={{ color: themeColor }}>
            Register
          </Text>
        </Text>
      </View>


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
    height: "30%",
  },
  logo: {
    width: "100%",
    height: 100,
  },
  container: {
    backgroundColor: "#ffffff",
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  register: {
    fontSize: 15,
    fontWeight: "bold",
    padding: 10,
    marginLeft: 20,
    marginTop: 10,

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
    height: 550,
    width: "100%",
    backgroundColor: "white",
  },
  loginButton: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    marginTop: 20,

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
    marginTop: 20,
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    padding: 30,
    textDecorationColor: "white",
    textDecorationStyle: "solid",
    textDecorationLine: "underline"
  }


});


export default Login;
