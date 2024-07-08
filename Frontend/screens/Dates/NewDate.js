import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axiosInstance from '../../components/AxiosInstance';
import { Alert } from 'react-native';


const NewDate = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [place, setPlace] = useState('');
  const [desc, setDesc] = useState('');
  const [petName, setPetName] = useState("");

  const handleSaveAppointment = async () => {
    // Validar que todos los campos estén llenos antes de guardar
    if (title && date && petName) {
      try {
        // Aquí puedes llamar a la función para programar la cita
        const newAppointment ={ title, date, place, description: desc, petName };
        console.log(newAppointment)
        const response = await axiosInstance.post(
          "/appointment",
          newAppointment
        );
        if (response.status === 201) {
          Alert.alert("Cita registrada exitosamente");
          navigation.goBack();
        } else {
          console.error("Unexpected response:", response);
          Alert.alert(
            "Error",
            "Unexpected response from server. Please try again."
          );
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

      
      // Lógica adicional después de guardar, como navegar a otra pantalla o mostrar un mensaje de éxito
    } else {
      // Manejar el caso donde no se han llenado todos los campos
      alert('Por favor, complete todos los campos antes de guardar la cita.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nueva Cita</Text>

      <View style={styles.inputContainer}>
        <MaterialCommunityIcons
          name="calendar-clock"
          color="#9A9A9A"
          size={24}
          style={styles.inputIcon}
        />
        <TextInput
          placeholder="Título"
          style={styles.textInput}
          value={title}
          onChangeText={setTitle}
        />
      </View>

      <View style={styles.inputContainer}>
        <MaterialCommunityIcons
          name="calendar"
          color="#9A9A9A"
          size={24}
          style={styles.inputIcon}
        />
        <TextInput
          placeholder="Fecha (YYYY-MM-DD)"
          style={styles.textInput}
          value={date}
          onChangeText={setDate}
        />
      </View>

      <View style={styles.inputContainer}>
        <MaterialCommunityIcons
          name="map-marker"
          color="#9A9A9A"
          size={24}
          style={styles.inputIcon}
        />
        <TextInput
          placeholder="Lugar"
          style={styles.textInput}
          value={place}
          onChangeText={setPlace}
        />
      </View>

      <View style={styles.inputContainer}>
        <MaterialCommunityIcons
          name="note-text"
          color="#9A9A9A"
          size={24}
          style={styles.inputIcon}
        />
        <TextInput
          placeholder="Descripción"
          style={styles.textInput}
          value={desc}
          onChangeText={setDesc}
        />
      </View>

      <View style={styles.inputContainer}>
        <MaterialCommunityIcons
          name="cat"
          color="#9A9A9A"
          size={24}
          style={styles.inputIcon}
        />
        <TextInput
          placeholder="Mascota"
          style={styles.textInput}
          value={petName}
          onChangeText={setPetName}
        />
      </View>

      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleSaveAppointment}
      >
        <Text style={styles.buttonText}>Guardar Cita</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFCFC',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#5DADE2',
    marginBottom: 20,
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
  textInput: {
    padding: 10,
    paddingStart: 5,
    width: '80%',
    color: '#566573',
  },
  inputIcon: {
    marginLeft: 15,
  },
  saveButton: {
    backgroundColor: '#5DADE2',
    borderRadius: 30,
    marginHorizontal: 40,
    marginVertical: 20,
    paddingVertical: 15,
    paddingHorizontal: 30,
    elevation: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
});

export default NewDate;
