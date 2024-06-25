import React from 'react';
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createDrawerNavigator } from '@react-navigation/drawer';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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

function MyStack() {
    return (
        <PetStackNavigator.Navigator initialRouteName="PetsView" screenOptions={{ headerShown: false }}>
            <PetStackNavigator.Screen name="PetsView" component={Pets} />
            <PetStackNavigator.Screen name="PetStack" component={PetStack} />
            <PetStackNavigator.Screen name="RegisterPet" component={RegisterPet} />
        </PetStackNavigator.Navigator>
    )
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
                component={MyStack}
                options={{
                    tabBarLabel: "Mascotas",
                    tabBarIcon: () => (
                        <MaterialCommunityIcons name="paw" color="#000" size={24} />
                    )
                }}
            />
            <Tab.Screen
                name="Calendario"
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

export default function Navigation() {
    return (

        <Drawer.Navigator initialRouteName="PetsView" screenOptions={{ headerShown: false }}>
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Profile" component={Profile} />
            <Drawer.Screen name="Ajustes" component={Settings} />
        </Drawer.Navigator>

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