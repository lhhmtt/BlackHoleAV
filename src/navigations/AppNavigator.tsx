import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NavigatorMap from './NavigatorMap';
import Home from '../screens/Home';
import About from '../screens/About';


const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name={NavigatorMap.Home} component={Home} />
        <Tab.Screen name={NavigatorMap.About} component={About} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}