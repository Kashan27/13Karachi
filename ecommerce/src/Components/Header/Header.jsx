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






// const MenuComp = ({ visible }) => {
//   return (

//   )
// }


const Header = ({ navigation, title, goback, search, showMore, width }) => {

  let [currentUser, setUser] = useState("")
  const home = () => {
    navigation.navigate("home")
  }
  const _handleSearch = () => console.log('Searching');

  const login = () => { navigation.navigate("login") }
  const signup = () => { navigation.navigate("signup") }
  const logout = async () => {
    await AsyncStorage.removeItem("user")
    setUser("")
  }






  useEffect(() => {
    let getUser = async () => {
      let userData = await AsyncStorage.getItem("user")
      console.log(userData, "effect")
      if (userData) {
        setUser(userData)
      } else {
        setUser("")
      }
    }
    getUser()
  }, [])



  return (<>
    <Appbar.Header mode="center-aligned">


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
      {search
        ?
        <Appbar.Action icon="magnify" onPress={_handleSearch} />
        :
        null}

     



     {/* MENU */}

      <Menu shadow={2} w="190" trigger={triggerProps => {
        return <Pressable accessibilityLabel="More options menu" {...triggerProps}>
          {/* <HamburgerIcon /> */}
          <Ionicons size={30} name="menu-outline" />
        </Pressable>;
      }}>
        {currentUser ?
          <>
            <Menu.Item onPress={e => { logout() }}>Logout</Menu.Item>
            <Menu.Item onPress={e => { navigation.navigate('profile') }}>Profile</Menu.Item>
          </>
          :
          <Menu.Item onPress={e => { login() }}>Login</Menu.Item>
        }
        <Menu.Item onPress={e => { navigation.navigate('cart') }}>Cart</Menu.Item>
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