import React from 'react';
import { Text, SafeAreaView } from 'react-native';
import { NavigationScreenProp, NavigationState } from 'react-navigation';

interface HomeProps {
  navigation: NavigationScreenProp<NavigationState>;
}

const Home: React.FC<HomeProps> = (props: HomeProps) => {

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}> 
        <Text>BlackHoleAV</Text>
    </SafeAreaView>
  );
};

export default Home;
