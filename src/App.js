

import React from 'react';
import { StyleSheet, StatusBar, useColorScheme } from 'react-native';
import Routes from './Routes/Routes';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { NativeBaseProvider } from "native-base";
import { useEffect, useState } from 'react';
// import SplashScreen from 'react-native-splash-screen';
import themeColor from './themeColor/themeColor';
import NetInfo from "@react-native-community/netinfo";
import NetworkStatus from './Components/NetworkStatus/NetworkStatus';
import RNBootSplash from "react-native-bootsplash";
import { QueryClient, QueryClientProvider } from "react-query";
import { memo } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';










const App = () => {

  const [isOffline, setOfflineStatus] = useState(false);


  useEffect(() => {
    RNBootSplash.hide({ fade: true }); // fade with 220ms default duration
    const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
      const offline = !(state.isConnected && state.isInternetReachable);
      setOfflineStatus(offline);
    });

  }, []);




  const queryClient = new QueryClient();

  return (
    <><StatusBar
      animated={true}
      backgroundColor={themeColor}
      // barStyle={statusBarStyle}
      // showHideTransition={statusBarTransition}
      hidden={false} />

      <NativeBaseProvider>
        {/* <ApplicationProvider {...eva} theme={eva.light}> */}
        {/* <IconRegistry icons={EvaIconsPack} /> */}
        <NetworkStatus status={isOffline} />
        <QueryClientProvider client={queryClient}>
          <PaperProvider>
            <Routes />
          </PaperProvider>
        </QueryClientProvider>
        {/* </ApplicationProvider> */}
      </NativeBaseProvider>
    </>
  );
};

const styles = StyleSheet.create({

});

export default App;


