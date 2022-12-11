
import React, { useEffect } from 'react'
import { useState } from 'react';
import { View, Text, Image } from 'react-native';
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

// import { TextInput } from 'react-native-paper';





export const Login = ({ navigation }) => {

  let [loading, setLoading] = useState(false)
  let [userDetails, setUserDetails] = useState({
    email: "",
    password: ""
  })



  const handleLogin = async (event) => {
    let user = await AsyncStorage.getItem("user")
    // user ? user = JSON.parse(user) : null
    console.log(user, "user")
    // console.log(axios)
    let { email, password } = userDetails
    if (email && password) {
      setLoading(true)
      axios.post("http://192.168.1.106:9000/api/signin", { email, password })
        .then(async (response) => {
          try {
            await AsyncStorage.setItem("user", JSON.stringify(response.data))
            navigation.navigate("home")
          } catch (err) {
            console.log(err)
          }
          // console.log(response.data);
          setLoading(false)
        })
        .catch(err => {
          setLoading(false)
          console.log(err.message)
        })
    } else {
      console.log(email, password)
      alert("Please fill all details")
    }

  }


  const handleInput = (property, value) => {
    setUserDetails({ ...userDetails, [property]: value })
    console.log(userDetails)
  }


  useEffect(() => {
    let getUser = async () => {
      let user = await AsyncStorage.getItem("user")
      console.log(user, "effect")
      if (user) {
        navigation.navigate("home")
      }
    }
    getUser()
  }, [])





  // ----------------------------------------Render----------------------------------------------------------------

  return (
    <View
      style={{ backgroundColor: "white" }}>
      <Header navigation={navigation} goback={e => { navigation.goBack() }} title="App" />
      <Image
        resizeMode='stretch'
        style={styles.banner}
        source={banner}
      />



      <Text style={styles.heading}>Login</Text>
      <View style={styles.loginContainer} >
        <View style={styles.inputContainer}>
          <View style={{ display: "flex", justifyContent: "space-between", flexDirection: "row" }}>
            <Ionicons name='mail-outline' size={28} style={{ marginTop: 10 }} />
            <TextInput
              // icon="account-outline"
              onChangeText={e => { handleInput("email", e) }}
              style={styles.input}
              mode="Flat"
              placeholder='Email / username'
            // textColor='white'
            ></TextInput>
          </View>
          <View style={{ display: "flex", justifyContent: "space-between", flexDirection: "row" }}>
            <Ionicons name='key-outline' size={28} style={{ marginTop: 10 }} />
            <TextInput
              onChangeText={e => { handleInput("password", e) }}
              style={styles.input}
              mode="Flat"
              secureTextEntry={true}
              placeholder='Password'
            ></TextInput>
          </View>
        </View>
        <Text style={styles.forgotPassword}>
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
          <Text onPress={e => { navigation.navigate("signup") }} style={{ color: "#049f99" }}>
            Register
          </Text>
        </Text>
      </View>

      {/* <ImageBackground style={styles.container} >
      <View style={styles.loginContainer} >
        <View style={styles.inputContainer}>

          <TextInput
            style={styles.input}
            mode="Flat"
            placeholder='Email / username'
          // textColor='white'
          ></TextInput>
          <TextInput
            style={styles.input}
            mode="Flat"
            secureTextEntry={true}
            placeholder='Password'
          ></TextInput>
          <Button onPress={e => { handleLogin() }} mode="contained" style={styles.button}>Login</Button>
        </View>
        <Text onPress={e => { navigation.navigate("markets") }} style={styles.text}>Not have an Account?</Text>
      </View>

    </ImageBackground> */}
    </View>
  )
}


const styles = StyleSheet.create({
  button: {
    width: "75%",
    backgroundColor: "#049f99",
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
    color: "#049f99"
  },
  loginContainer: {
    height: 550,
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
