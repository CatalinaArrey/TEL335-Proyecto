import React from "react";
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from "axios";


export default function ButtonLogin(props) {

    const handleLogin = () => {
        const data = props.data
        console.log(data)
        axios.post("http://10.112.1.45:3000/login", data)
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.error("Error sending data: ", error);
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