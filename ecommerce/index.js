

import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { MenuProvider } from 'react-native-popup-menu';






export default function Main() {
  return (
    <MenuProvider>
      <PaperProvider>
        <App />
      </PaperProvider>
    </MenuProvider>

  );
}



AppRegistry.registerComponent(appName, () => Main);
