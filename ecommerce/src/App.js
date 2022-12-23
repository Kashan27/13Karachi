

import React from 'react';
import { StyleSheet, StatusBar , useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Routes from './Routes/Routes';
import { ApplicationProvider , IconRegistry } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { NativeBaseProvider, Text, Box } from "native-base";
import { useEffect , useState} from 'react';
import SplashScreen from 'react-native-splash-screen';
import themeColor from './themeColor/themeColor';
import NetInfo from "@react-native-community/netinfo";
import NetworkStatus from './Components/NetworkStatus/NetworkStatus';



















const App = () => {
  
  const [isOffline, setOfflineStatus] = useState(false);
  
  // NetInfo.addEventListener(networkState => {
  //   console.log("Connection type - ", networkState.type);
  //   console.log("Is connected? - ", networkState.isConnected);
  // })

  useEffect(() => {
    SplashScreen.hide()
    const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
      const offline = !(state.isConnected && state.isInternetReachable);
      // console.log(offline)
      setOfflineStatus(offline);
    });
  
    // console.log(removeNetInfoSubscription)
  }, []);

  // useEffect(() => {
  //   // setOfflineStatus(net)
  //   console.log(NetInfo.getNetwork , "info")

  // },[NetInfo])
  
  const isDarkMode = useColorScheme() === 'dark';



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
      <NetworkStatus status={isOffline} />
        <Routes />
      </ApplicationProvider>
    </NativeBaseProvider>
    </>
  );
};

const styles = StyleSheet.create({

});

export default App;


