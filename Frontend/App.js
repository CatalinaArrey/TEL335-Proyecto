import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './screens/Login&Register/Login';
import Navigation from './Navigations/Navigation';
import Signup from './screens/Login&Register/Signup'
import RegisterPet from './screens/RegisterPet';
import Profile from './screens/Profile';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Navigation" component={Navigation} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="RegisterPet" component={RegisterPet} />
        <Stack.Screen name="Profile" component={Profile}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}