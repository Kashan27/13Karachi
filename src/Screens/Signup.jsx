
import React from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import {
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView
} from 'react-native';
import { TextInput, Button, FlatList } from 'react-native-paper';
import axios from 'axios';
import { useState , useRef , useCallback} from 'react';
import Header from '../Components/Header/Header';
import banner from '../images/login/banner.jpeg';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import themeColor from '../themeColor/themeColor'
import DocumentPicker from 'react-native-document-picker';
// import * as ImagePicker from 'expo-image-picker';
import ip from '../ip';




const Signup = ({ navigation }) => {
  let [singleFile, setSingleFile] = useState('')
  let [loading, setLoading] = useState(false)
  // let [input, setInput] = useState({img:"" ,  name: "", email: "", address: "", contact: "+92", password: "", confirmPassword: "" })
  let input = useRef({img:"" ,  name: "", email: "", address: "", contact: "+92", password: "", confirmPassword: "" })
  let [imgName, setImgName] = useState('')



  const updateInput = (property, val) => {

    // setInput({ ...input, [property]: val })
    input.current = {...input.current, [property]: val}
    // console.log(input.current)


  }

  const handleSignup = async (event) => {

    let {img , name, email, address, contact, password, confirmPassword } = input.current
    let userData = {img , name, email, address, contact, password, role: "User" }
    if (name, email, address, contact, password, confirmPassword) {
      if (!email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
        alert("Email is not in correct format")
      } else {
        if (input.current.contact.length !== 11) {
          alert("contact number must be 11 digits")
        } else {
          if (password !== confirmPassword) {
            alert("passwords are not same")
          } else {
            setLoading(true)
            // console.log(userData)
            axios.post(`${ip}/api/signup`, { ...userData })
              .then(async (response) => {
                setLoading(false)
                try {
                  let user = await AsyncStorage.getItem("user")
                  if (response.data.success) {
                    if (user) {
                      navigation.navigate("home")
                    } else {
                      navigation.navigate("login")
                    }
                  }
                } catch (err) {
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



  // console.log('signup')

  const selectOneFile = async () => {
    //Opening Document Picker for selection of one file
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
        //There can me more options as well

        // DocumentPicker.types.allFiles
        // DocumentPicker.types.images
        // DocumentPicker.types.plainText
        // DocumentPicker.types.audio
        // DocumentPicker.types.pdf
      });
      // console.log(res[0],"res")
      const data = new FormData();
      // data.append('name', 'avatar');
      setImgName(res[0].name)
      data.append('file', {
        uri: res[0].uri,
        type: res[0].type,
        name: res[0].name
      });
      data.append('upload_preset', '13karachi')
      data.append('cloud_name', 'dhcxv86kr')

            console.log(data, "data")
      fetch('https://api.cloudinary.com/v1_1/dhcxv86kr/image/upload', {
        method: 'POST',
        body: data
      }).then(res => res.json())
      .then(data=>{
        setSingleFile(data)
        console.log(data.url)
        setInput({...input , img:data.url})
      })


    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        console.log('Canceled from single doc picker');
      } else {
        //For Unknown Error
        console.log('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }



  };


  let handleGoBack = useCallback(()=>{
    navigation.goBack()
  } ,[navigation]) 


  return (
    <View
      style={{ backgroundColor: "white" }}>
      <Header width="71%" navigation={navigation} goback={handleGoBack} title="App" />
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
              <TextInput
                left={<TextInput.Icon icon="account-outline" />}
                onChangeText={e => { updateInput("name", e) }}
                style={styles.input}
                mode="Flat"
                placeholder='User Name'
                activeUnderlineColor={themeColor}
                ></TextInput>
            </View>
            <View style={{ display: "flex", justifyContent: "space-between", flexDirection: "row" }}>
              <TextInput
                activeUnderlineColor={themeColor}
                left={<TextInput.Icon icon="email-outline" />}
                onChangeText={e => { updateInput("email", e) }}
                style={styles.input}
                mode="Flat"
                placeholder='Email'
              ></TextInput>
            </View>

            <View style={{ display: "flex", justifyContent: "space-between", flexDirection: "row" }}>
              <TextInput
            activeUnderlineColor={themeColor}
            left={<TextInput.Icon icon="map-marker" />}
            onChangeText={e => { updateInput("address", e) }}
                style={styles.input}
                mode="Flat"
                placeholder='Address'
              ></TextInput>
            </View>

            <View style={{ display: "flex", justifyContent: "space-between", flexDirection: "row" }}>
              <TextInput
                activeUnderlineColor={themeColor}
                left={<TextInput.Icon icon="phone-outline" />}
                onChangeText={e => { updateInput("contact", e) }}
                style={styles.input}
                mode="Flat"
                keyboardType='numeric'
                placeholder='Phone'
              ></TextInput>
            </View>

            <View style={{ display: "flex", justifyContent: "space-between", flexDirection: "row" }}>
              <TextInput
                activeUnderlineColor={themeColor}
                left={<TextInput.Icon icon="key-variant" />}
                onChangeText={e => { updateInput("password", e) }}
              style={styles.input}
                mode="Flat"
                secureTextEntry={true}
                placeholder='Password'
              ></TextInput>
            </View>

            <View style={{ display: "flex", justifyContent: "space-between", flexDirection: "row" }}>
              <TextInput
                activeUnderlineColor={themeColor}
              left={<TextInput.Icon icon="key-variant" />}
                onChangeText={e => { updateInput("confirmPassword", e) }}
                style={styles.input}
                mode="Flat"
                secureTextEntry={true}
                placeholder='con-Pass'
              ></TextInput>
            </View>
            <View style={{ marginTop: 5, display: "flex", justifyContent: "space-around", flexDirection: "row" }}>
              <Button textColor={themeColor} onPress={selectOneFile} mode="outlined">Image</Button>
              <Button textColor={themeColor}>{imgName}</Button>
            </View>


          </ScrollView>
        </View>


        {/* SignupButton */}
        <View style={styles.loginButton}>
          <Button
            buttonColor={themeColor}
            onPress={e => { handleSignup() }}
            mode="contained"
            style={styles.button}
            loading={loading}
          >Register</Button>
        </View>



        {/* already Register */}
        <Text style={styles.register}>
          Already Register ?
          <Text onPress={e => { navigation.navigate("login") }} style={{ color: themeColor }}>
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
    backgroundColor: themeColor,
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
    // color: themeColor
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
    fontSize: 30,
    // color: "white",
    // textAlign: "center",
    paddingHorizontal: 20
  },
  input: {
    backgroundColor: "white",
    width: "90%",
    fontSize: 17,

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



