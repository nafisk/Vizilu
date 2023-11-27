import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import BottomTabNavigator from './components/BottomTabNavigatgor'; // Your home page component
import LoginPage from './pages/AuthScreen/LoginPage';
import SignupPage from './pages/AuthScreen/SignupPage';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Signup'>
        <Stack.Screen
          name='SignupPage'
          component={SignupPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='LoginPage'
          component={LoginPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='BottomTabNavigator'
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
