import React, { useEffect, useState } from 'react';
import { SafeAreaView, NativeModules, Button } from 'react-native';
import { NavigationScreenProp, NavigationState } from 'react-navigation';

const { ProcessModule } = NativeModules;
interface HomeProps {
  navigation: NavigationScreenProp<NavigationState>;
}

const Home: React.FC<HomeProps> = (props: HomeProps) => {
  const [click, setClick] = useState(false);
  const [status, setStatus] = useState();

  useEffect(() => {
    setStatus(ProcessModule.checkStatus());
  }, [click]);

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: "center"}}>
      <Button
        onPress={() => {
          ProcessModule.startProcess(); 
          setClick(!click);
        }}
        title="Start Service"
        disabled={!status}
      />
      </SafeAreaView>
  );
};

export default Home;
