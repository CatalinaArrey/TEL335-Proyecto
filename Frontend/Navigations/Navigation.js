import React from 'react';
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createDrawerNavigator } from '@react-navigation/drawer';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Calendario from '../screens/Calendars';
import Pets from "../screens/Pets";
import Profile from "../screens/Profile";
import TopBar from '../components/TopBar';
import PetStack from '../screens/PetStack';
import RegisterPet from '../screens/RegisterPet';
import Settings from '../screens/Settings';

const Tab = createMaterialBottomTabNavigator();
const Drawer = createDrawerNavigator();
const PetStackNavigator = createNativeStackNavigator();

function PetsStack() {
    return (
        <PetStackNavigator.Navigator initialRouteName="PetsStack" screenOptions={{ headerShown: false }}>
            <PetStackNavigator.Screen name="PetsStack" component={Pets} />
            <PetStackNavigator.Screen name="PetStack" component={PetStack} />
            <PetStackNavigator.Screen name="RegisterPet" component={RegisterPet} />
        </PetStackNavigator.Navigator>
    )
}

function TabNavigator() {
    return (
        <Tab.Navigator
            tabBarActivateBackgroundColor="#fff"
            activeColor="#000"
            inactiveColor="#95a5a6"
            style={{ flex: 1 }}
        >
            <Tab.Screen
                name="PetsTab"
                component={PetsStack}
                options={{
                    tabBarLabel: "Pets",
                    tabBarIcon: () => (
                        <MaterialCommunityIcons name="paw" color="#000" size={24} />
                    )
                }}
            />
            <Tab.Screen
                name="CalendarioTab"
                component={Calendario}
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

function NavigationDrawer() {
    return (
        <Drawer.Navigator initialRouteName="PetsDrawer" screenOptions={{ headerShown: false }}>
            <Drawer.Screen name="PetsDrawer" component={PetsStack} />
            <Drawer.Screen name="Profile" component={Profile} />
            <Drawer.Screen name="Ajustes" component={Settings} />
        </Drawer.Navigator>
    );
}

export default function Navigation() {
    const insets = useSafeAreaInsets();
    return (
        <React.Fragment>
            <TopBar />
            <TabNavigator contentContainerStyle={{ paddingTop: insets.top }} />
        </React.Fragment>
    );
}
