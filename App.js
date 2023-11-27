import { NavigationContainer } from '@react-navigation/native';
import { StripeProvider } from '@stripe/stripe-react-native';
import React from 'react';
import BottomTabNavigator from './components/BottomTabNavigatgor';
import { STRIPE_PUBLISHABLE_KEY } from './utils/constants';

export default function App() {
  return (
    <>
      <StripeProvider publishableKey={STRIPE_PUBLISHABLE_KEY}>
        <NavigationContainer>
          <BottomTabNavigator />
        </NavigationContainer>
      </StripeProvider>
    </>
  );
}
