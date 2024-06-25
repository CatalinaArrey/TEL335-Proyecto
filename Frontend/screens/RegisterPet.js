import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';

import ButtonRegister from '../components/Register/ButtonRegister'
import Calendario from '../components/CalendarPicker';

const speciesOptions = [
    { label: 'Perro', value: 'perro', icon: 'dog', razas: ['Labrador', 'Poodle', 'Bulldog', 'Pastor Alemán', 'Akita', 'Quiltro'] },
    { label: 'Gato', value: 'gato', icon: 'cat', razas: ['Siamés', 'Persa', 'Bengala', 'De Calle'] },
    { label: 'Conejo', value: 'conejo', icon: 'rabbit', razas: ['Holandés', 'Belier', 'Angora'] },
    { label: 'Reptil', value: 'tortuga', icon: 'snake', razas: ['Serpiente', 'Tortuga', 'Iguana'] },
    { label: 'Otro', value: 'Otro', icon: 'help-circle', razas: [] },
];

const RegisterPet = () => {
    const [petName, setPetName] = useState('');
    const [petNameVerify, setpetNameVerify] = useState(false);
    const [especie, setEspecie] = useState('');
    const [raza, setRaza] = useState('');
    const [cumpleanos, setCumpleanos] = useState('');
    const [image, setImage] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);


    function handleName(e) {
        const petnameVar = e.nativeEvent.text;
        setPetName(petnameVar);
        setpetNameVerify(false);

        if (petnameVar.length > 1) {
            setpetNameVerify(true);
        }

    }

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
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);
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
                    onChange={e => handleName(e)}
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
                    }
                    }
                ><Picker.Item label="Selecciona especie" value="" />
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
                {especie === 'otro' ? (
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
            <View style={styles.inputContainer}>
                <MaterialCommunityIcons name="camera" color="#9A9A9A" size={24} style={styles.inputIcon} />
                <TouchableOpacity onPress={pickImage} style={styles.textInput}>
                    <Text>{image ? "Imagen seleccionada" : "Selecciona una imagen"}</Text>
                </TouchableOpacity>
            </View>

            {image && <Image source={{ uri: image }} style={styles.image} />}

            <ButtonRegister />
            <Calendario
                visible={showDatePicker}
                onConfirm={handleConfirmDate}
                onClose={hideDatePickerHandler}
            />
            <StatusBar style="auto" />
        </View>
    );

}

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
    text: {
        fontSize: 20,
        color: '#566573',
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
    login: {
        fontSize: 14,
        color: '#A3E4D7',
        marginTop: 20,
    }
});
