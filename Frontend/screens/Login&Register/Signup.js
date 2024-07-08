import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import ButtonRegister from '../../components/Register/ButtonRegister';


export default function Register() {
    const navigation = useNavigation();
    const handleLogin = () => {
        navigation.navigate("Login")
    };

    const [username, setUsername] = useState("");
    const [usernameVerify, setUsernameVerify] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordVerify, setPasswordVerify] = useState(false);
    const [email, setEmail] = useState("");
    const [emailVerify, setEmailVerify] = useState(false);
    const [phone, setPhone] = useState("");
    const [phoneVerify, setPhoneVerify] = useState(false);
    const [showPass, setShowPass] = useState(false);

    const onSuccess = async() => {
        Alert.alert("Success", "User created successfully!");
        await AsyncStorage.setItem('token', response.data.token);
        await AsyncStorage.setItem('username', username);
        navigation.navigate("RegisterPet");
    };

    const handleRegisterUser = async () => {
        try {
            const userData = {
                username,
                password,
                email,
                phone,
            }
        
            const response = await axios.post("http://192.168.1.89:3000/user", userData);

            if (response.status === 201) {
                console.log("Pet registration successful:", response.data);
                onSuccess(); 
            } else {
                console.error("Unexpected response: ", response);
                Alert.alert("Error", "Unexpected response from server. Please try again.");
            }
        } catch (error) {
            console.error("Error sending data: ", error);
            if (error.response) {
                console.error("Error response data: ", error.response.data);
                Alert.alert("Error", `Server responded with status code ${error.response.status}: ${error.response.data.message || 'Unknown error'}`);
            } else if (error.request) {
                console.error("Error request: ", error.request);
                Alert.alert("Error", "No response from server. Please check your network connection.");
            } else {
                console.error("Error message: ", error.message);
                Alert.alert("Error", `Error in request setup: ${error.message}`);
            }
        }
    };


    function handleName(e) {
        const nameVar = e.nativeEvent.text;
        setUsername(nameVar);
        setUsernameVerify(false);

        if (nameVar.length > 1) {
            setUsernameVerify(true);
        }

    }

    function handleEmail(e) {
        const emailVar = e.nativeEvent.text;
        setEmail(emailVar);
        setEmailVerify(false);
        if (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(emailVar)) {
            setEmail(emailVar);
            setEmailVerify(true);
        }
    }

    function handlePhone(e) {
        const phoneVar = e.nativeEvent.text;
        setPhone(phoneVar);
        setPhoneVerify(false);
        if (/[6-9]{1}[0-9]{8}/.test(phoneVar)) {
            setPhone(phoneVar);
            setPhoneVerify(true);
        }

    }

    function handlePassword(e) {
        const passVar = e.nativeEvent.text;
        setPassword(passVar);
        setPasswordVerify(false);
        if (/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(passVar)) {
            setPassword(passVar);
            setPasswordVerify(true);
        }
    }


    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="always"
        >
            <View style={styles.container}>
                <Text style={styles.title}>Crea tu cuenta</Text>

                <View style={styles.inputContainer}>
                    <MaterialCommunityIcons name="account" color="#9A9A9A" size={24} style={styles.inputIcon} />
                    <TextInput
                        placeholder="Username"
                        style={styles.textInput}
                        value={username}
                        onChange={e => handleName(e)}
                    />
                    {username.length < 1 ? null : usernameVerify ?
                        (<MaterialCommunityIcons name="check-circle-outline" color="green" size={24} />)
                        : (<MaterialCommunityIcons name="alert-circle-outline" color="red" size={24} />)
                    }
                </View>
                {username.length < 1 ? null : usernameVerify ? null :
                    <Text style={{ color: 'red' }}>
                        El usuario debe tener más de un carácter
                    </Text>
                }

                <View style={styles.inputContainer}>
                    <MaterialCommunityIcons name="lock" color="#9A9A9A" size={24} style={styles.inputIcon} />
                    <TextInput
                        placeholder="Contraseña"
                        style={styles.textInput}
                        secureTextEntry={showPass}
                        value={password}
                        onChange={e => handlePassword(e)}
                    />
                    <TouchableOpacity onPress={() => setShowPass(!showPass)}>
                        {password.length < 1 ? null : !showPass ? (
                            <MaterialCommunityIcons name="eye-off" color="#9A9A9A" size={24} />
                        )
                            : (
                                <MaterialCommunityIcons name="eye" color="#9A9A9A" size={24} />
                            )}
                    </TouchableOpacity>
                </View>
                {password.length < 1 ? null : passwordVerify ? null :
                    <Text style={{ color: 'red', paddingLeft: 30, paddingRight: 30 }}>
                        La contraseña debe tener mayúscula, minúscula, número y 6 o más carácteres.
                    </Text>
                }

                <View style={styles.inputContainer}>
                    <MaterialCommunityIcons name="email" color="#9A9A9A" size={24} style={styles.inputIcon} />
                    <TextInput
                        placeholder="Correo Electrónico"
                        style={styles.textInput}
                        value={email}
                        onChange={e => handleEmail(e)}
                    />
                    {email.length < 1 ? null : emailVerify ?
                        (<MaterialCommunityIcons name="check-circle-outline" color="green" size={24} />)
                        : (<MaterialCommunityIcons name="alert-circle-outline" color="red" size={24} />)
                    }
                </View>
                {email.length < 1 ? null : emailVerify ? null :
                    <Text style={{ color: 'red' }}>
                        Ingrese un email existente
                    </Text>
                }

                <View style={styles.inputContainer}>
                    <MaterialCommunityIcons name="phone" color="#9A9A9A" size={24} style={styles.inputIcon} />
                    <TextInput
                        placeholder="Teléfono"
                        style={styles.textInput}
                        value={phone}
                        onChange={e => handlePhone(e)}
                        maxLength={9}
                    />
                    {phone.length < 1 ? null : phoneVerify ?
                        (<MaterialCommunityIcons name="check-circle-outline" color="green" size={24} />)
                        : (<MaterialCommunityIcons name="alert-circle-outline" color="red" size={24} />)
                    }
                </View>
                {phone.length < 1 ? null : phoneVerify ? null :
                    <Text style={{ color: 'red' }}>
                        El número no es válido
                    </Text>
                }

                <ButtonRegister type="user" onPress={handleRegisterUser} />
                <Text style={styles.subtitle}>O crea tu cuenta con </Text>
                <TouchableOpacity onPress={handleLogin}>
                    <Text style={styles.login}>¿Ya tienes cuenta? Ingresa</Text>
                </TouchableOpacity>

                <StatusBar style="auto" />
            </View>
        </ScrollView>
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
        width: '80%',
        paddingHorizontal: 15,
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
        marginLeft: 5,
    },
    login: {
        fontSize: 14,
        color: '#A3E4D7',
        marginTop: 20,
    }
});
