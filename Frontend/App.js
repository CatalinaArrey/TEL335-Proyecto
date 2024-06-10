import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Home from './screens/Home';
import Login from './screens/Login';
import Signup from './screens/Signup';
import RegisterPet from './screens/RegisterPet';
import Calendario from './screens/Calendars';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Register Pet" component={RegisterPet} />
          <Stack.Screen name="Calendar" component={Calendario} />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: "Mis Mascotas",
              headerTitleAlign: "center",
              headerStyle: {
                backgroundColor: "#fff",
              },
              headerTintColor: "#000",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
