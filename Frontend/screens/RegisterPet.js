import React, { useState } from 'react';
import { StatusBar, Alert } from 'react-native';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import axios from "axios";
import { useNavigation } from '@react-navigation/native';

import ButtonRegister from '../components/Register/ButtonRegister';
import Calendario from '../components/CalendarPicker';

const speciesOptions = [
    { label: 'Perro', value: 'perro', icon: 'dog', razas: ['Labrador', 'Poodle', 'Bulldog', 'Pastor Alemán', 'Akita', 'Quiltro'] },
    { label: 'Gato', value: 'gato', icon: 'cat', razas: ['Siamés', 'Persa', 'Bengala', 'De Calle'] },
    { label: 'Conejo', value: 'conejo', icon: 'rabbit', razas: ['Holandés', 'Belier', 'Angora'] },
    { label: 'Reptil', value: 'tortuga', icon: 'snake', razas: ['Serpiente', 'Tortuga', 'Iguana'] },
    { label: 'Otro', value: 'Otro', icon: 'help-circle', razas: [] },
];

const RegisterPet = ({ userId }) => {
    const navigation = useNavigation();
    const [petName, setPetName] = useState('');
    const [petNameVerify, setPetNameVerify] = useState(false);
    const [especie, setEspecie] = useState('');
    const [raza, setRaza] = useState('');
    const [cumpleanos, setCumpleanos] = useState('');
    const [image, setImage] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleName = (text) => {
        setPetName(text);
        setPetNameVerify(text.length > 1);
    };

    const showDatePickerHandler = () => {
        setShowDatePicker(true);
    };

    const hideDatePickerHandler = () => {
        setShowDatePicker(false);
    };

    const handleConfirmDate = (date) => {
        setCumpleanos(date);
        hideDatePickerHandler();
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.assets[0].uri);
        }
    };

    const onSuccess = () => {
        Alert.alert("Success", "Pet created successfully!");
        navigation.navigate("Navigation");
    };

    const handleRegisterPet = async () => {
        try {
            const petData = {
                name: petName,
                species: especie,
                breed: raza,
                birthday: cumpleanos,
                image: image, // Pasar Imagen, por ahora no está guardada
            };
            console.log("petdata:",petData,userId);
            const response = await axios.post("http://192.168.1.89:3000/pets/${userId}", petData);

            if (response.status === 200) {
                console.log("Pet registration successful:", response.data);
                onSuccess(); // Llama a la función onSuccess después de un registro exitoso
            } else {
                console.error("Unexpected response:", response);
                Alert.alert("Error", "Unexpected response from server. Please try again.");
            }
        } catch (error) {
            console.error("Error sending data:", error);
            if (error.response) {
                console.error("Error response data:", error.response.data);
                Alert.alert("Error", `Server responded with status code ${error.response.status}: ${error.response.data.error_msg || 'Unknown error'}`);
            } else if (error.request) {
                console.error("Error request:", error.request);
                Alert.alert("Error", "No response from server. Please check your network connection.");
            } else {
                console.error("Error message:", error.message);
                Alert.alert("Error", `Error in request setup: ${error.message}`);
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>¡Ingresa a tu mascota!</Text>
            <Text style={styles.subtitle}> Más adelante podrás ingresar más</Text>
            <View style={styles.inputContainer}>
                <MaterialCommunityIcons name="account" color="#9A9A9A" size={24} style={styles.inputIcon} />
                <TextInput
                    placeholder="Nombre"
                    style={styles.textInput}
                    value={petName}
                    onChangeText={handleName}
                />
                {petName.length < 1 ? null : petNameVerify ?
                    (<MaterialCommunityIcons name="check-circle-outline" color="green" size={24} />)
                    : (<MaterialCommunityIcons name="alert-circle-outline" color="red" size={24} />)
                }
            </View>
            {petName.length < 1 ? null : petNameVerify ? null :
                <Text style={{ color: 'red' }}>
                    El nombre debe tener más de un carácter
                </Text>
            }

            <View style={styles.inputContainer}>
                <MaterialCommunityIcons name={speciesOptions.find(option => option.value === especie)?.icon || 'paw'} color="#9A9A9A" size={24} style={styles.inputIcon} />
                <Picker
                    selectedValue={especie}
                    style={styles.textInput}
                    onValueChange={(itemValue, itemIndex) => {
                        setEspecie(itemValue);
                        setRaza("");
                    }}
                >
                    <Picker.Item label="Selecciona especie" value="" />
                    {speciesOptions.map((option) => (
                        <Picker.Item
                            key={option.value}
                            label={option.label}
                            value={option.value}
                        />
                    ))}
                </Picker>
            </View>


            <View style={styles.inputContainer}>
                <MaterialCommunityIcons name={speciesOptions.find(option => option.value === especie)?.icon || 'paw'} color="#9A9A9A" size={24} style={styles.inputIcon} />
                {especie === 'Otro' ? (
                    <TextInput
                        placeholder="Escribe el tipo de animal"
                        style={styles.textInput}
                        value={raza}
                        onChangeText={text => setRaza(text)}
                    />
                ) : (
                    <Picker
                        selectedValue={raza}
                        style={styles.textInput}
                        onValueChange={(itemValue, itemIndex) => setRaza(itemValue)}
                    >
                        <Picker.Item label="Selecciona raza" value="" />
                        {speciesOptions.find(option => option.value === especie)?.razas.map((raza) => (
                            <Picker.Item key={raza} label={raza} value={raza} />
                        ))}
                    </Picker>
                )}
            </View>

            <TouchableOpacity style={styles.inputContainer} onPress={showDatePickerHandler}>
                <MaterialCommunityIcons name="cake-layered" color="#9A9A9A" size={24} style={styles.inputIcon} />
                <Text style={styles.textInput}>{cumpleanos || "Cumpleaños"}</Text>
            </TouchableOpacity>

            <ButtonRegister type="pet" onPress={handleRegisterPet} />
            <Calendario
                visible={showDatePicker}
                onConfirm={handleConfirmDate}
                onClose={hideDatePickerHandler}
            />
            <StatusBar style="auto" />
        </View>
    );
};

export default RegisterPet;

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
        fontSize: 30,
        color: '#2C3E50',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        marginBottom: 30,
        fontSize: 15,
        color: '#2C3E50',
    },
    textInput: {
        padding: 10,
        paddingStart: 5,
        width: '80%',
        color: '#566573',
    },
    inputIcon: {
        marginLeft: 15,
    },
});
