import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NavigatorMap from './NavigatorMap';
import Home from '../screens/Home';
import About from '../screens/About';


const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === NavigatorMap.Home) {
              iconName = focused
                ? 'ios-home'
                : 'ios-home-outline';
            } else if (route.name === 'About') {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#0063B2FF',
          inactiveTintColor: 'gray',
        }}>
        <Tab.Screen name={NavigatorMap.Home} component={Home} />
        <Tab.Screen name={NavigatorMap.About} component={About} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}