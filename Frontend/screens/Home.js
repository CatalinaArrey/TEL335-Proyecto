import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { StyleSheet } from "react-native";


import Calendar from "./Calendars";
import Pets from "./Pets";



const Tab = createMaterialBottomTabNavigator();

const Home = () => {

    return (
        <Tab.Navigator
                    tabBarActivateBackgroundColor="#fff"
                    activeColor="#000"
                    inactiveColor="#95a5a6"
                    barStyle={styles.navBar}
                >
                    <Tab.Screen
                        name="Mascotas"
                        component={Pets}
                        options={
                            {
                                tabBarLabel: "Mascotas",
                                tabBarIcon: () => (
                                    <MaterialCommunityIcons name="paw" color="#000" size={24}/>
                            )}
                        }   
                    />
        
                    <Tab.Screen
                        name="Calendario"
                        component={Calendar}
                        options={
                            {
                                tabBarLabel: "Calendario",
                                tabBarIcon: () => (
                                    <MaterialCommunityIcons name="calendar-check" color="#000" size={24}/>
                                )
                            }
                        }   
                    />
                </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    navBar: {
        backgroundColor: '#fff',
    }
})

export default Home;