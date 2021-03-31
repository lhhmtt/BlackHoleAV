import React, { useEffect } from 'react';
import { Text, SafeAreaView, NativeModules, TouchableOpacity } from 'react-native';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import * as RNFS from 'react-native-fs';

const { ProcessModule } = NativeModules;
interface HomeProps {
  navigation: NavigationScreenProp<NavigationState>;
}

const Home: React.FC<HomeProps> = (props: HomeProps) => {
  useEffect(() => {
    RNFS.readDir(RNFS.DownloadDirectoryPath).then(files => {
      console.log({ files })
    })
      .catch(err => {
        console.log(err.message, err.code);
      });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity onPress={() => ProcessModule.testModule()}>
        <Text>BlackHoleAV</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Home;
