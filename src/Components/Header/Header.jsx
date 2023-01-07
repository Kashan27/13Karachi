import * as React from 'react';
import { Text, Image, StyleSheet, View, TouchableOpacity, ImageBackground } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Menu, Pressable } from 'native-base';
import { Appbar } from 'react-native-paper';
// import { Button, Menu, Divider, Provider } from 'react-native-paper';
import { useState } from 'react';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from "@react-navigation/native";
import { memo } from 'react';
import themeColor from '../../themeColor/themeColor';







// const MenuComp = ({ visible }) => {
//   return (

//   )
// }


const Header = ({ navigation, title, goback, width }) => {
  const isFocused = useIsFocused(); 
  const bg = require("../../../bg/bg.png")
  const menu = require("../../../icon/menu.png")
  let [currentUser, setUser] = useState("")
  const home = () => {
    navigation.navigate("home")
  }
  
  const login = () => { navigation.navigate("login") }
  const signup = () => { navigation.navigate("signup") }
  const logout = async () => {
    await AsyncStorage.removeItem("user")
    setUser("")
    navigation.navigate("home")
  }
  
  
  
  
  
  
  // console.log("header")
  useEffect(() => {
    let getUser = async () => {
      try{
        let userData = await AsyncStorage.getItem("user")
        // console.log("try")
        if (userData) {
          setUser(userData)
          // console.log("if")
        } else {
          setUser("")
          // console.log("else")
        }
      }catch(err){
        console.log(err)
      }
    }
    // console.log("headerEffect")
    getUser()
  }, [isFocused])


  



  return (<ImageBackground  style={styles.background} >
    <Appbar.Header style={{backgroundColor:"transparent"}} mode="center-aligned">


      {/* goback action */}
      {goback
        ?
        <Appbar.BackAction onPress={goback} />
        :
        null}


      {/* header title */}
      {title
        ?
        <TouchableOpacity
         onPress={home}
          style={{ width: width }}><Image style={styles.logo} source={require("../../icons/logo.png")} /></TouchableOpacity>
        :
        null}

  

     



     {/* MENU */}

     <Menu shadow={2} w="190" trigger={triggerProps => {
        return <Pressable accessibilityLabel="More options menu" {...triggerProps}>
          {/* <HamburgerIcon /> */}
          {/* <Ionicons size={30} name="menu-outline" /> */}
          <Image source={menu} style={styles.menuIcon} />
        </Pressable>;
      }}>
        <Menu.Item onPress={e => { navigation.navigate('cart') }}>Cart</Menu.Item>
        {currentUser ?
          <React.Fragment>
            <Menu.Item onPress={e => { logout() }}>Logout</Menu.Item>
            <Menu.Item onPress={e => { navigation.navigate('profile') }}>Profile</Menu.Item>
            <Menu.Item onPress={e => { navigation.navigate('orderstatus') }}>My Orders</Menu.Item>
          </React.Fragment>
          :
          <Menu.Item onPress={e => { login() }}>Login</Menu.Item>
        }
        <Menu.Item onPress={e => { signup() }}>Signup</Menu.Item>
      </Menu>

    </Appbar.Header>


  </ImageBackground>
  );
};


const styles = StyleSheet.create({

  background:{
    resizeMode:"contain",
    // height:105
  },

  menuIcon:{
      height:35,
      width:35
  },
  logo: {
    height: 160,
    width: 160,
  }
})



export default memo(Header);