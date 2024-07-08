import React from "react";
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axiosInstance from "../../screens/AxiosInstance"; 
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ButtonLogin(props) {
    const navigation = useNavigation();

    const handleLogin = async () => {
        const { identifier, password } = props.data;

        if (!identifier || !password) {
            console.error("Datos incompletos para iniciar sesión");
            return;
        }

        try {
            const response = await axiosInstance.post("/auth/login", { identifier, password });
            console.log("Datos enviados para iniciar sesión:", props.data);
            console.log(response.data);

            if (response.data.status === 'OK') {
                await AsyncStorage.setItem('accessToken', response.data.accessToken);
                await AsyncStorage.setItem('refreshToken', response.data.refreshToken);
                const userId = response.data.userId; // Asumiendo que el servidor envía userId
                if (userId) {
                    await AsyncStorage.setItem('userId', userId);
                }
                navigation.navigate('Navigation');
            } else {
                console.log("Inicio de sesión fallido: ", response.data.error_msg);
            }
        } catch (error) {
            if (error.response) {
                console.error("ERROR ", error.response.data);
            } else {
                console.error("Error de red o de servidor: ", error.message);
            }
        }
    };

    return (
        <TouchableOpacity style={styles.container} onPress={handleLogin}>
            <LinearGradient
                colors={['#5DADE2', '#A3E4D7']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.button}
            >
                <Text style={styles.text}>Ingresar</Text>
            </LinearGradient>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: 250,
        marginTop: 60,
    },
    text: {
        fontSize: 14,
        color: '#fff',
        fontWeight: 'bold',
    },
    button: {
        width: '80%',
        height: 50,
        borderRadius: 25,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: '50%',
    },
});
