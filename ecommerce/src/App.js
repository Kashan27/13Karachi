

import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View, } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import Login from './Screens/Login';
import Signup from './Screens/Signup';
import Markets from './Screens/Markets';
import ItemCard from './Components/Card/Card';
import GlobalFont from 'react-native-global-font'
import Header from './Components/Header/Header';
import { useEffect } from 'react';
import Products from './Screens/Products';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Routes from './Routes/Routes';
import ip from "./ip"








const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


const App = () => {

  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    let fontName = 'arial'
    GlobalFont.applyGlobal(fontName)
  }, []);

  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,

  // };


  return (
    <Routes/>    
  );
};

const styles = StyleSheet.create({

});

export default App;






// navigation.navigate('Details', {
//   itemId: 86,
//   otherParam: 'anything you want here',
// });


//update params
// navigation.setParams({
//   query: 'someText',
// });



//passing params to nested navigatior
// navigation.navigate('Account', {
//   screen: 'Settings',
//   params: { user: 'jane' },
// });
