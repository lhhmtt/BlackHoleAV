import React, { useEffect, useState } from 'react';
import { SafeAreaView, NativeModules, Text, TouchableOpacity } from 'react-native';
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
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: "center", backgroundColor: "white"}}>
      <Text style={{fontSize: 25, marginBottom: 15, color: "#696969"}}>BlackHoleAV</Text>
      <TouchableOpacity
        onPress={() => {
          ProcessModule.startProcess(); 
          setClick(!click);
        }}
        disabled={!status}
        style={{display: "flex", justifyContent: "center", alignItems:"center", backgroundColor: status ? "#4986d6" : "#c0c0c4", width:"68%", height: 42, borderRadius: 20}}
      >
        <Text style={{color: "white", fontSize: 18}}>Start Service</Text>
      </TouchableOpacity>
      </SafeAreaView>
  );
};

export default Home;
