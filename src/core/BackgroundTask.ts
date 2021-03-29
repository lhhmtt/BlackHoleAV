import {NativeModules} from 'react-native';

const {ProcessModule} = NativeModules;

module.exports = async (taskData: any) => {
  // do stuff
  console.log({taskData});
};
