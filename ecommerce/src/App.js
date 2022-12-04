

import React from 'react';
import { StyleSheet, useColorScheme} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Routes from './Routes/Routes';












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
