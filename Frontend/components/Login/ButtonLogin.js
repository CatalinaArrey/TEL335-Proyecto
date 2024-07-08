import React from "react";
import { StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from "../AxiosInstance";

export default function ButtonLogin(props) {

    const navigation = useNavigation();

    const handleLogin = async () => {
        const data = props.data;

        if (!data) {
            Alert.alert("No se recibieron datos para iniciar sesión");
            return;
        }

        console.log("Datos enviados para login:", data);

        try {
            const response = await axiosInstance.post("/auth/login", data);
            console.log("Respuesta del servidor:", response.data);

            if (response.data.status === 'OK') {
                await AsyncStorage.setItem('accessToken', response.data.accessToken);
                await AsyncStorage.setItem('refreshToken', response.data.refreshToken);

                navigation.navigate('Navigation');
            } else {
                Alert.alert("Inicio de sesión fallido", response.data.msg);
                console.log("Inicio de sesión fallido: ", response.data.msg);
            }
        } catch (error) {
            if (error.response) {
                console.error("ERROR ", error.response.data);
                Alert.alert("Error", error.response.data.msg || "Error en el inicio de sesión");
            } else {
                console.error("Error de red o de servidor: ", error.message);
                Alert.alert("Error", "Error de red o de servidor: " + error.message);
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
