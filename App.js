import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import BottomTabNavigator from './components/BottomTabNavigatgor'; // Your home page component
import LoginPage from './pages/AuthScreen/LoginPage';
import SignupPage from './pages/AuthScreen/SignupPage';
import { STRIPE_PUBLISHABLE_KEY } from './utils/constants';
import { StripeProvider } from '@stripe/stripe-react-native';

const Stack = createStackNavigator();

const App = () => {
  return (
    <StripeProvider publishableKey={STRIPE_PUBLISHABLE_KEY}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='LoginPage'>
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
    </StripeProvider>
  );
};

export default App;
