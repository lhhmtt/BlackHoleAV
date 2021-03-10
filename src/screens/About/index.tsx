import React from 'react';
import { Text, SafeAreaView } from 'react-native';
import { NavigationScreenProp, NavigationState } from 'react-navigation';

interface AboutProps {
  navigation: NavigationScreenProp<NavigationState>;
}

const About: React.FC<AboutProps> = (props: AboutProps) => {

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}> 
        <Text>About Project</Text>
    </SafeAreaView>
  );
};

export default About;
