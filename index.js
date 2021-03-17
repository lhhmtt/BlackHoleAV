/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import CONST from './src/constant';
import BackgroundTask from './src/core/BackgroundTask';

AppRegistry.registerHeadlessTask(CONST.APP.BACKGROUND_TASK_NAME, () => BackgroundTask);
AppRegistry.registerComponent(appName, () => App);
