import React from "react";
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from "axios";


export default function ButtonRegister({ data, onSuccess }) {
    const handleRegister = async () => {
        try {
            const response = await axios.post("http://192.168.1.89:3000/user", data);
            if (response.status === 200) {
                console.log(response.data);
                onSuccess();
            } else {
                console.error("Unexpected response: ", response);
                Alert.alert("Error", "Unexpected response from server. Please try again.");
            }
        } catch (error) {
            console.error("Error sending data: ", error);
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error("Error response data: ", error.response.data);
                Alert.alert("Error", `Server responded with status code ${error.response.status}: ${error.response.data.message || 'Unknown error'}`);
            } else if (error.request) {
                // The request was made but no response was received
                console.error("Error request: ", error.request);
                Alert.alert("Error", "No response from server. Please check your network connection.");
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error("Error message: ", error.message);
                Alert.alert("Error", `Error in request setup: ${error.message}`);
            }
        }
    }

    return (
        <TouchableOpacity style={styles.container} onPress={handleRegister}>
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