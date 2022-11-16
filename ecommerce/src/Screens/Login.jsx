
import React from 'react'
import { View, Text } from 'react-native';
import { 
  StyleSheet,
  ImageBackground , 
  KeyboardAvoidingView
} from 'react-native';
import { TextInput , Button } from 'react-native-paper';
import axios from 'axios';
import Header from '../Components/Header/Header';




export const Login = ({navigation}) => {

  
  const handleLogin  = async (event) => {

    // fetch("https://172.25.64.1:9000/api/signin")

//    let res = await fetch("https://172.25.64.1:9000/api/signin", {
//   method: 'POST',
//   headers: {
//     Accept: 'application/json',
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({
//     email: 'abcde@gmail.com',
//     password:123456
//   })
// });
// let json = await res.json();
// console.log(json)





    // console.log(axios)
      console.log("login")
      axios.post("http://192.168.1.106:9000/api/signin" , {email:"abcde@gmail.com",password:123456} )
      .then((response) => {
        console.log(response.data);
      })
      .catch(err=>{
        console.log(err.message)
      })

  }

  const image = { src: "../images/background/background.jpg" };
  return (<>
                <Header navigation={navigation} goback={e=>{navigation.goBack()}} title="App" />
    <ImageBackground style={styles.container} >
      <View  style={styles.loginContainer} >
        <Text style={styles.heading}>Login</Text>
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
        <Button onPress={e=>{handleLogin()}} mode="contained" style={styles.button}>Login</Button>
        </View>
        <Text onPress={e=>{navigation.navigate("markets")}} style={styles.text}>Not have an Account?</Text>
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
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
  },

  loginContainer:{
      height: 550,
      width:"80%",
      // backgroundColor:"grey",
      // opacity:0.3,
      borderRadius:20,
      backgroundColor: "rgba(0, 0, 0, 0.3)",
      marginTop:-100,
  },
  heading:{
    fontSize:60,
    color:"white",
    textAlign:"center",
    padding:20
  },
  input:{
    // backgroundColor: "rgba(0, 0, 0, 0.5)",
    width:"80%",
    fontSize:20,
    
  },
  inputContainer:{
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center",
    height:"35%",
    marginTop:80,
  },
  text:{
    // color:"white",
    fontSize:20,
    textAlign:"center",
    padding:30,
    textDecorationColor:"white",
    textDecorationStyle:"solid",
    textDecorationLine:"underline"
  }


});


export default Login;
