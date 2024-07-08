import React from "react";
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from "axios";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ButtonLogin(props) {

    const navigation = useNavigation();

    const handleLogin = async () => {
        const data = props.data;

        if (!data) {
            console.error("No se recibieron datos para iniciar sesión");
            return;
        }

        try {
            const response = await axios.post("http://192.168.1.89:3000/auth/login", data);
            console.log("LOG ", props.data);
            console.log(response.data);

            // Verifica la respuesta del servidor
            if (response.data.status === 'OK') {
                // Almacenar los tokens
                await AsyncStorage.setItem('accessToken', response.data.accessToken);
                await AsyncStorage.setItem('refreshToken', response.data.refreshToken);
                
                // Navegar a la pantalla principal
                navigation.navigate('Navigation');
            } else {
                console.log("Inicio de sesión fallido: ", response.data.msg);
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
