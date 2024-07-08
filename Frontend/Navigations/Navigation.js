import React from 'react';
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Calendarios from '../screens/NavBarViews/Calendars';
import Pets from "../screens/NavBarViews/Pets";
import Profile from "../screens/Profile";
import TopBar from '../components/TopBar';
import PetStack from '../components/Pets/PetStack';
import RegisterPet from '../screens/RegisterPet';
import Settings from '../screens/Settings';
import EditDate from '../screens/Dates/EditDate';
import NewDate from '../screens/Dates/NewDate';

const Tab = createMaterialBottomTabNavigator();
const Drawer = createDrawerNavigator();
const PetStackNavigator = createNativeStackNavigator();
const DateStackNavigator = createNativeStackNavigator();

function MyStackPet() {
  return (
    <PetStackNavigator.Navigator initialRouteName="PetsView" screenOptions={{ headerShown: false }}>
      <PetStackNavigator.Screen name="PetsView" component={Pets} />
      <PetStackNavigator.Screen name="PetStack" component={PetStack} />
      <PetStackNavigator.Screen name="RegisterPet" component={RegisterPet} />
    </PetStackNavigator.Navigator>
  );
}

function MyStackDate() {
  return (
    <DateStackNavigator.Navigator initialRouteName="Calendarios" screenOptions={{ headerShown: false }}>
      <DateStackNavigator.Screen name="Calendarios" component={Calendarios} />
      <DateStackNavigator.Screen name="EditDate" component={EditDate} />
      <DateStackNavigator.Screen name="NewDate" component={NewDate} />
    </DateStackNavigator.Navigator>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator
      tabBarActivateBackgroundColor="#fff"
      activeColor="#000"
      inactiveColor="#95a5a6"
      style={{ flex: 1 }}
    >
      <Tab.Screen
        name="Mascotas"
        component={MyStackPet}
        options={{
          tabBarLabel: "Mascotas",
          tabBarIcon: () => (
            <MaterialCommunityIcons name="paw" color="#000" size={24} />
          )
        }}
      />
      <Tab.Screen
        name="Calendario"
        component={MyStackDate}
        options={{
          tabBarLabel: "Calendario",
          tabBarIcon: () => (
            <MaterialCommunityIcons name="calendar-check" color="#000" size={24} />
          )
        }}
      />
    </Tab.Navigator>
  );
}

function HomeScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  return (
    <React.Fragment>
      <TopBar navigation={navigation} />
      <MyTabs contentContainerStyle={{ paddingTop: insets.top }} />
    </React.Fragment>
  );
}

export default function Navigation() {
  return (
    <Drawer.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Ajustes" component={Settings} />
    </Drawer.Navigator>
  );
}
