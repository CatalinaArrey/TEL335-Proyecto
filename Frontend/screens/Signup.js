import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import ButtonRegister from '../components/ButtonRegister'
import { useNavigation } from '@react-navigation/native';



export default function Register() {
    const navigation = useNavigation();
    const handleLogin =() =>{
        navigation.navigate("Login")
    };

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const newUser = {
        username,
        password,
        email,
        phone
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Crea tu cuenta</Text>

            <View style={styles.inputContainer}>
                <MaterialCommunityIcons name="account" color="#9A9A9A" size={24} style={styles.inputIcon} />
                <TextInput
                    placeholder="Username"
                    style={styles.textInput}
                    value={username}
                    onChange={e => setUsername(e.nativeEvent.text)}
                />
            </View>

            <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="lock" color="#9A9A9A" size={24} style={styles.inputIcon}/>
            <TextInput
                placeholder="Contraseña"
                style={styles.textInput}
                secureTextEntry={true}
                value={password}
                onChange={e => setPassword(e.nativeEvent.text)}
            />
            </View>

            <View style={styles.inputContainer}>
                <MaterialCommunityIcons name="email" color="#9A9A9A" size={24} style={styles.inputIcon} />
                <TextInput
                    placeholder="Correo Electrónico"
                    style={styles.textInput}
                    value={email}
                    onChange={e => setEmail(e.nativeEvent.text)}
                />
            </View>
            
            <View style={styles.inputContainer}>
                <MaterialCommunityIcons name="phone" color="#9A9A9A" size={24} style={styles.inputIcon} />
                <TextInput
                    placeholder="Teléfono"
                    style={styles.textInput}
                    value={phone}
                    onChange={e => setPhone(e.nativeEvent.text)}
                />
            </View>

            <ButtonRegister data = {newUser}/>
            <Text style={styles.subtitle}>O crea tu cuenta con </Text>
            <TouchableOpacity onPress={handleLogin}>
            <Text style={styles.login}>¿Ya tienes cuenta? Ingresa</Text>
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
        alignItems: 'center'
    },
    inputContainer: {
        backgroundColor: '#fff',
        borderRadius: 30,
        marginHorizontal: 40,
        flexDirection: "row",
        elevation: 10,
        marginVertical: 10,
        alignItems: "center",
        height: 50,
    },
    title: {
        fontSize: 40,
        color: '#2C3E50',
        fontWeight: 'bold',
        marginBottom: 20,
    },
    subtitle: {
        marginTop: 20,
        fontSize: 15,
        color: '#2C3E50',
    },
    text: {
        fontSize: 20,
        color: '#566573',
    },
    textInput: {
        padding: 10,
        paddingStart: 5,
        width: '80%',
    },
    inputIcon: {
        marginLeft: 15,
    },
    login: {
        fontSize: 14,
        color: '#A3E4D7',
        marginTop: 20,
    }
});
