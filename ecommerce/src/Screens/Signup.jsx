
import React from 'react'
import { View, Text, Image ,ScrollView} from 'react-native';
import {
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView
} from 'react-native';
import { TextInput, Button, FlatList } from 'react-native-paper';
import axios from 'axios';
import { useState } from 'react';
import Header from '../Components/Header/Header';
import banner from '../images/login/banner.jpeg';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';



const Signup = ({ navigation }) => {

  let [loading, setLoading] = useState(false)
  let [input, setInput] = useState({ name: "", email: "", address: "", contact: "+92", password: "", confirmPassword: "" })



  const updateInput = (property , val) => {

    setInput({ ...input, [property]: val })

    console.log(input,"input")

  }

  const handleSignup = async (event) => {
   
    let { name, email, address, contact, password, confirmPassword } = input
    let userData = { name, email, address, contact, password, role: "User" }
    if (name, email, address, contact, password, confirmPassword) {
      if (!input.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
        alert("Email is not in correct format")
      } else {
        if (input.contact.length !== 11) {
          alert("contact number must be 11 digits")
        } else {
          if (password !== confirmPassword) {
            alert("passwords are not same")
          } else {
            setLoading(true)
            axios.post("https://192.168.1.106:9000/api/signup", { ...userData })
              .then(async(response) => {
                console.log(response.data);
                setLoading(false)
                try{
                  let user = await AsyncStorage.getItem("user")
                  if(response.data.success){
                    if(user){
                      navigation.navigate("home")
                    }else{
                      navigation.navigate("login")
                    }
                  }
                }catch(err){
                  console.log(err.message)
                }
              })
              .catch(err => {
                setLoading(false)
                console.log(err)
              })
          }
        }
      }
    } else {
      alert("Please fill in all fields")
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



      <Text style={styles.heading}>Signup</Text>
      <View style={styles.loginContainer} >
        <View style={styles.inputContainer}>

        <ScrollView >


          {/* Inputs           ------------------------------------------------------- */}

          <View style={{ display: "flex", justifyContent: "space-between", flexDirection: "row" }}>
            <Ionicons name='person-outline' size={28} style={{ marginTop: 10 }} />
            <TextInput
              // icon="account-outline"
              onChangeText={e => { updateInput("name", e) }}
              style={styles.input}
              mode="Flat"
              placeholder='User Name'
            // textColor='white'
            ></TextInput>
          </View>

          <View style={{ display: "flex", justifyContent: "space-between", flexDirection: "row" }}>
            <Ionicons name='mail-outline' size={28} style={{ marginTop: 10 }} />
            <TextInput
              // icon="account-outline"
              onChangeText={e => { updateInput("email", e) }}
              style={styles.input}
              mode="Flat"
              placeholder='Email'
            // textColor='white'
            ></TextInput>
          </View>

          <View style={{ display: "flex", justifyContent: "space-between", flexDirection: "row" }}>
            <Ionicons name='location-outline' size={28} style={{ marginTop: 10 }} />
            <TextInput
              onChangeText={e => { updateInput("address", e) }}
              style={styles.input}
              mode="Flat"
              placeholder='Address'
            ></TextInput>
          </View>

          <View style={{ display: "flex", justifyContent: "space-between", flexDirection: "row" }}>
            <Ionicons name='call-outline' size={28} style={{ marginTop: 10 }} />
            <TextInput
              onChangeText={e => { updateInput("contact", e) }}
              style={styles.input}
              mode="Flat"
              keyboardType='numeric'
              placeholder='Phone'
            ></TextInput>
          </View>

          <View style={{ display: "flex", justifyContent: "space-between", flexDirection: "row" }}>
            <Ionicons name='key-outline' size={28} style={{ marginTop: 10 }} />
            <TextInput
              onChangeText={e => { updateInput("password", e) }}
              style={styles.input}
              mode="Flat"
              secureTextEntry={true}
              placeholder='Password'
            ></TextInput>
          </View>

          <View style={{ display: "flex", justifyContent: "space-between", flexDirection: "row" }}>
            <Ionicons name='key-outline' size={28} style={{ marginTop: 10 }} />
            <TextInput
              onChangeText={e => { updateInput("confirmPassword", e) }}
              style={styles.input}
              mode="Flat"
              secureTextEntry={true}
              placeholder='Password'
              ></TextInput>
          </View>

        </ScrollView>
              </View>


        {/* SignupButton */}
        <View style={styles.loginButton}>
          <Button
            onPress={e => { handleSignup() }}
            mode="contained"
            style={styles.button}
            loading={loading}
          >Register</Button>
        </View>



        {/* already Register */}
        <Text style={styles.register}>
          Already Register ?
          <Text onPress={e => { navigation.navigate("login") }} style={{ color: "#049f99" }}>
            Login
          </Text>
        </Text>
      </View>


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
    height: 250,

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
    height: "45%",
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



export default Signup;



