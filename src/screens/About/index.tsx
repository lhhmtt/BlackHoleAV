import React from 'react';
import { Text, SafeAreaView, Image } from 'react-native';
import { NavigationScreenProp, NavigationState } from 'react-navigation';

interface AboutProps {
  navigation: NavigationScreenProp<NavigationState>;
}

const About: React.FC<AboutProps> = (props: AboutProps) => {

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "white" }}>
      <Image
        source={{ uri: "https://reactnative.dev/docs/assets/p_cat1.png" }}
        style={{ width: 200, height: 200 }}
      />
      <Text style={{fontSize: 20, textAlign: 'center', padding: 5, color:"#696969"}}>The application is developed based on analysis of apk behavior through algorithms for detecting malicious apk</Text>
    </SafeAreaView>
  );
};

export default About;
