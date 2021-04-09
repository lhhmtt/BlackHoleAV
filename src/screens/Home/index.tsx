import React from 'react';
import { Text, SafeAreaView, NativeModules, TouchableOpacity } from 'react-native';
import { NavigationScreenProp, NavigationState } from 'react-navigation';

const { ProcessModule } = NativeModules;
interface HomeProps {
  navigation: NavigationScreenProp<NavigationState>;
}

const Home: React.FC<HomeProps> = (props: HomeProps) => {

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity onPress={() => ProcessModule.startProcess()}>
        <Text>BlackHoleAV</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Home;
