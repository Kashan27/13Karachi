

import React from 'react';
import { StyleSheet, StatusBar , useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Routes from './Routes/Routes';
import { ApplicationProvider , IconRegistry } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { NativeBaseProvider, Text, Box } from "native-base";
import { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import themeColor from './themeColor/themeColor';
















const App = () => {


  useEffect(() => {
    SplashScreen.hide()
  }, []);

  const isDarkMode = useColorScheme() === 'dark';

  // useEffect(() => {
  //   let fontName = 'arial'
  //   GlobalFont.applyGlobal(fontName)
  // }, []);

  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,

  // };


  return (
    <><StatusBar
    animated={true}
    backgroundColor={themeColor}
    // barStyle={statusBarStyle}
    // showHideTransition={statusBarTransition}
    hidden={false} />
    <NativeBaseProvider>

      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <Routes />
      </ApplicationProvider>
    </NativeBaseProvider>
    </>
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
