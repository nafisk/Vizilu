import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Ionicons } from 'react-native-vector-icons'; // Import Ionicons or any other icon set you prefer

import FrameScreen from '../pages/FrameScreen';
import HomeScreen from '../pages/HomeScreen';
import SettingsScreen from '../pages/SettingsScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'ios-home' : 'ios-home-outline';
          } else if (route.name === 'Vizilu') {
            iconName = focused ? 'ios-images' : 'ios-images-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'ios-settings' : 'ios-settings-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name='Home' component={HomeScreen} />
      <Tab.Screen name='Vizilu' component={FrameScreen} />
      <Tab.Screen name='Settings' component={SettingsScreen} />
    </Tab.Navigator>
  );
}
