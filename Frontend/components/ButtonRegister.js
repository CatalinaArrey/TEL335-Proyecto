import React from "react";
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


export default function ButtonRegister() {
    return (
        <TouchableOpacity style={styles.container}>
            <LinearGradient
                colors={['#5DADE2', '#A3E4D7']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.button}
            >
                <Text style={styles.text}>Registrarse</Text>
            </LinearGradient>
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    container: {
        alignItems:'center',
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
    },
});