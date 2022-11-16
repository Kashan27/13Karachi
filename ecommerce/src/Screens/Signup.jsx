
import React from 'react'
import { View, Text } from 'react-native';
import {
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView
} from 'react-native';
import { TextInput, Button, FlatList } from 'react-native-paper';
import axios from 'axios';
import { useState } from 'react';
import Header from '../Components/Header/Header';








 const Signup = ({navigation}) => {

  let [loading, setLoading] = useState(false)
  let [input, setInput] = useState({ name: "", email: "", address: "", contact: "+92", password: "", confirmPassword: "" })



  const updateInput = (val, property) => {

    setInput({ ...input, [property]: val })

    console.log(input)

  }

  const handleSignup = async (event) => {
    let { name, email, address, contact, password, confirmPassword } = input
    let userData = {name, email, address, contact, password , role:"User"}
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
            console.log(axios)
            axios.post("http://192.168.126.82:9000/api/signup", {userData})
              .then((response) => {
                console.log(response.data);
              })
              .catch(err => {
                console.log(err.message)
              })
          }
        }
      }
    } else {
      alert("Please fill in all fields")
    }

  }


  const image = { src: "../images/background/background.jpg" };
  return (<>
          <Header navigation={navigation} showMore={true} search={true} goback={e=>{navigation.goBack()}} title="App" />
    <ImageBackground style={styles.container} >
      <View style={styles.loginContainer} >
        <Text style={styles.heading}>Signup</Text>
        <View style={styles.inputContainer}>

          <TextInput
            onChangeText={e => { updateInput(e, "name") }}
            style={styles.input}
            mode="Flat"
            placeholder='Name'
            textColor='white'
          ></TextInput>
          <TextInput
            onChangeText={e => { updateInput(e, "email") }}
            style={styles.input}
            mode="Flat"
            placeholder='Email'
          ></TextInput>
          <TextInput
            onChangeText={e => { updateInput(e, "address") }}
            style={styles.input}
            mode="Flat"
            placeholder='address'
            ></TextInput>
          <TextInput
            onChangeText={e => { updateInput(e, "contact") }}
            style={styles.input}
            mode="Flat"
            placeholder='contact'
            keyboardType="numeric"
          ></TextInput>
          <TextInput
            onChangeText={e => { updateInput(e, "password") }}
            style={styles.input}
            mode="Flat"
            secureTextEntry={true}
            placeholder='Password'
            ></TextInput>
          <TextInput
            onChangeText={e => { updateInput(e, "confirmPassword") }}
            style={styles.input}
            mode="Flat"
            secureTextEntry={true}
            placeholder='Confirm Password'
          ></TextInput>
          <View style={{ padding: 30 }}>
            <Button loading={loading} onPress={e => { handleSignup() }} mode="contained" style={styles.button}><Text style={{ fontSize: 20 }}>Signup</Text></Button>
            <Text onPress={e=>{navigation.navigate("login")}} style={styles.text}>Already Registered ?</Text>
          </View>
        </View>
      </View>

    </ImageBackground>
</>
  )
}




const styles = StyleSheet.create({
  button: {
    width: 150,
  },

  container: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },

  loginContainer: {
    height: 650,
    width: "80%",
    // backgroundColor:"grey",
    // opacity:0.3,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    marginTop: -200,
  },
  heading: {
    fontSize: 60,
    color: "white",
    textAlign: "center",
    padding: 20
  },
  input: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: "80%",
    fontSize: 20,

  },
  inputContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "35%",
    marginTop: 20,
  },
  text: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    padding: 30,
    textDecorationColor: "white",
    textDecorationStyle: "solid",
    textDecorationLine: "underline"
  }


});



export default Signup;



