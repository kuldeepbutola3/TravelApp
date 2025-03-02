/**
 * @format
 */
import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
// import App from './App';
import { name as appName } from './app.json';
// import App from './App';
// import App from './src/App';
// import App from 'src/App';
import App from './src/App';

AppRegistry.registerComponent(appName, () => App);
