

import React from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Routes from './Routes/Routes';
import { ApplicationProvider , IconRegistry } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';















const App = () => {

  const isDarkMode = useColorScheme() === 'dark';

  // useEffect(() => {
  //   let fontName = 'arial'
  //   GlobalFont.applyGlobal(fontName)
  // }, []);

  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,

  // };


  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <Routes />
      </ApplicationProvider>
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
