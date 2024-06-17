import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Navigation from './Navigations/Navigation';
import Login from './screens/Login';

export default function App() {

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Navigation/>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}