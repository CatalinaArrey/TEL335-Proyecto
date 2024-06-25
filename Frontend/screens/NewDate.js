import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput,TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ButtonRegister from '../components/Register/ButtonRegister'


import Calendario from '../components/CalendarPicker';


const RegisterPet = () =>{
    const [nombre, setNombre] = useState('');
    const [especie, setEspecie] = useState('');
    const [raza, setRaza] = useState('');
    const [cumpleanos, setCumpleanos] = useState('');

    const [showDatePicker, setShowDatePicker] = useState(false);

    const showDatePickerHandler = () => {
        setShowDatePicker(true);
    };

    const hideDatePickerHandler = () => {
        setShowDatePicker(false);
    };

    const handleConfirmDate = (date) => {
        setCumpleanos(date); // Actualiza el estado de cumpleaños con la fecha seleccionada
        hideDatePickerHandler(); // Oculta el DatePicker después de seleccionar la fecha
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
                />
            </View>

            <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="dog" color="#9A9A9A" size={24} style={styles.inputIcon}/>
            <TextInput
                placeholder="Especie"
                style={styles.textInput}
            />
            </View>

            <View style={styles.inputContainer}>
                <MaterialCommunityIcons name="cat" color="#9A9A9A" size={24} style={styles.inputIcon} />
                <TextInput
                    placeholder="Raza"
                    style={styles.textInput}
                />
            </View>
            
            <TouchableOpacity style={styles.inputContainer} onPress={showDatePickerHandler}>
                <MaterialCommunityIcons name="cake-layered" color="#9A9A9A" size={24} style={styles.inputIcon} />
                <Text style={styles.textInput}>{cumpleanos || "Cumpleaños"}</Text>
            </TouchableOpacity>

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
