import React from "react";
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from "axios";
import { useNavigation } from '@react-navigation/native';

export default function ButtonLogin(props) {

    const navigation = useNavigation();
    const handleLogin = () => {
        const data = props.data;
        if (!data) {
            console.error("No se recibieron datos para iniciar sesión");
            return;
        }
        axios.post("http://192.168.1.89:3000/login", data)
          .then((response) => {
            console.log("LOG ", props.data);
            console.log(response.data);
            
            // Verifica la respuesta del servidor
            if (response.data.status === 'OK') {
                navigation.navigate('Navigation');
            } else {
                console.log("Inicio de sesión fallido: ", response.data.msg);
            }
          })
          .catch((error) => {
            console.error("ERROR ", error.response.data);
          });
    }

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