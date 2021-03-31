import {NativeModules, DeviceEventEmitter} from 'react-native';
const {ProcessModule} = NativeModules;

const onCheckingFile = (event: any) => {
  console.log(event);  
};

module.exports = async (taskData: any) => {
  // do stuff
  console.log({taskData});
  DeviceEventEmitter.addListener('onCheckingFile', onCheckingFile);
};
