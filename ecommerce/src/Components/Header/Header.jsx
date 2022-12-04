import * as React from 'react';
import { Text, Image, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Appbar } from 'react-native-paper';
import { Button, Menu, Divider, Provider } from 'react-native-paper';
import OptionsMenu from "react-native-menu-platform";







// const MenuComp = ({ visible }) => {
//   return (

//   )
// }


const Header = ({ navigation, title, goback, search, showMore, width }) => {

  const home = () => {
    navigation.navigate("home")
  }
  const _handleSearch = () => console.log('Searching');

  const login = ( ) =>{navigation.navigate("login")}
  const signup = ( ) =>{navigation.navigate("signup")}



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
        <TouchableOpacity onPress={home} style={{ width: width }}><Image  style={styles.logo} source={require("../../icons/logo.png")} /></TouchableOpacity>
        :
        null}

      {/* search */}
      {search
        ?
        <Appbar.Action icon="magnify" onPress={_handleSearch} />
        :
        null}


      {/* show more  */}
      {showMore
        ?
        <OptionsMenu
          customButton={<Appbar.Action icon="dots-vertical" />}
          buttonStyle={{ width: 32, height: 8, margin: 7.5, resizeMode: "contain" }}
          destructiveIndex={1}
          options={["Login", "signup" ,"cancel"]}
          actions={[login , ()=>{navigation.navigate("signup")}]}
        />
        
        :
        null}


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