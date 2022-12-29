import * as React from 'react';
import { Text, Image, StyleSheet, View, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Menu, Pressable } from 'native-base';
import { Appbar } from 'react-native-paper';
// import { Button, Menu, Divider, Provider } from 'react-native-paper';
import OptionsMenu from "react-native-menu-platform";
import { useState } from 'react';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from "@react-navigation/native";
import themeColor from '../../themeColor/themeColor';







// const MenuComp = ({ visible }) => {
//   return (

//   )
// }


const Header = ({ navigation, title, goback, search, showMore, width }) => {
  const isFocused = useIsFocused();


  let [currentUser, setUser] = useState("")
  const home = () => {
    navigation.navigate("home")
  }

  const login = () => { navigation.navigate("login") }
  const signup = () => { navigation.navigate("signup") }
  const logout = async () => {
    await AsyncStorage.removeItem("user")
    setUser("")
  }






  useEffect(() => {
    let getUser = async () => {
      try{
        let userData = await AsyncStorage.getItem("user")
        if (userData) {
          setUser(userData)
        } else {
          setUser("")
        }
      }catch(err){
        console.log(err)
      }
    }
    getUser()
  }, [isFocused])



  return (<>
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
        <TouchableOpacity onPress={home} style={{ width: width }}><Image style={styles.logo} source={require("../../icons/logo.png")} /></TouchableOpacity>
        :
        null}

      {/* search */}
      {/* {false
        ?
        <Appbar.Action icon="magnify"  />
        :
        null} */}

     



     {/* MENU */}

     <Menu shadow={2} w="190" trigger={triggerProps => {
        return <Pressable accessibilityLabel="More options menu" {...triggerProps}>
          {/* <HamburgerIcon /> */}
          <Ionicons size={30} name="menu-outline" />
        </Pressable>;
      }}>
        <Menu.Item onPress={e => { navigation.navigate('cart') }}>Cart</Menu.Item>
        {currentUser ?
          <>
            <Menu.Item onPress={e => { logout() }}>Logout</Menu.Item>
            <Menu.Item onPress={e => { navigation.navigate('profile') }}>Profile</Menu.Item>
            <Menu.Item onPress={e => { navigation.navigate('orderstatus') }}>My Orders</Menu.Item>
          </>
          :
          <Menu.Item onPress={e => { login() }}>Login</Menu.Item>
        }
        <Menu.Item onPress={e => { signup() }}>Signup</Menu.Item>
      </Menu>

    </Appbar.Header>


  </>
  );
};


const styles = StyleSheet.create({


  logo: {
    height: 160,
    width: 160,
  }
})



export default Header;