import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import ButtonLogin from '../../components/Login/ButtonLogin'
import { useNavigation } from '@react-navigation/native';


export default function Login() {
    const navigation = useNavigation();
    
    const handleEnter =() =>{
        const response = { status: 'OK' }
        if (response.status === 'OK') {

            navigation.navigate('Navigation'); 
        } else {
            console.log('Credenciales incorrectas');
        }
    };

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const loginData = {
        username,
        password
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>¡Hola!</Text>
            <Text style={styles.subtitle}>Ingresa a tu cuenta</Text>
            <View style={styles.inputContainer}>
                <MaterialCommunityIcons name="account" color="#9A9A9A" size={24} style={styles.inputIcon} />
                <TextInput
                    placeholder="Username"
                    style={styles.textInput}
                    value={username}
                    onChangeText={text => setUsername(text)}
                />
            </View>
            <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="lock" color="#9A9A9A" size={24} style={styles.inputIcon}/>
            <TextInput
                placeholder="Contraseña"
                style={styles.textInput}
                secureTextEntry={true}
                value={password}
                onChangeText={text => setPassword(text)}
            />
            </View>
            <TouchableOpacity onPress={handleEnter}>
            <Text style={styles.links}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>
            <ButtonLogin data={loginData}/>
            <TouchableOpacity 
                onPress={()=>{
                    navigation.navigate('Signup'); 
                }}>
            <Text style={styles.footerText}>¿Aún no tienes cuenta? <Text style={styles.links}>Registrate</Text></Text>
            </TouchableOpacity>
    

            <StatusBar style="auto" />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FBFCFC',
        justifyContent: 'center',
    },
    inputContainer: {
        backgroundColor: '#fff',
        flexDirection: "row",
        borderRadius: 30,
        marginHorizontal: 40,
        elevation: 10,
        marginVertical: 10,
        alignItems: "center",
    },
    buttonContainer: {
        alignItems: "center",
    },
    title: {
        textAlign: 'center',
        fontSize: 60,
        fontWeight: 'bold',
        color: '#5DADE2 ',
    },
    subtitle: {
        fontSize: 20,
        textAlign: 'center',
        color: '#2C3E50',
        marginBottom: 20,

    },
    textInput: {
        padding: 10,
        paddingStart: 5,
        width: '80%',
    },
    inputIcon: {
        marginLeft: 15,
    },
    links: {
        fontSize: 15,
        textAlign: "right",
        color: '#A3E4D7',
        width: '90%',
        marginTop: 10,
        marginRight: 40,
    },
    footerText:{
        color: '#2C3E50',
        textAlign: 'center',
        fontSize: 15,
        marginTop: 60,
    },
});
