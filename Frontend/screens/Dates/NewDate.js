import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const NewDate = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [place, setPlace] = useState('');
  const [desc, setDesc] = useState('');

  const handleSaveAppointment = () => {
    // Validar que todos los campos estén llenos antes de guardar
    if (title && date && place && desc) {
      // Aquí puedes llamar a la función para programar la cita
      const newAppointment = scheduleAppointment({ title, date, place, desc }, petId);
      
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
        <MaterialCommunityIcons name="calendar-clock" color="#9A9A9A" size={24} style={styles.inputIcon} />
        <TextInput
          placeholder="Título"
          style={styles.textInput}
          value={title}
          onChangeText={setTitle}
        />
      </View>

      <View style={styles.inputContainer}>
        <MaterialCommunityIcons name="calendar" color="#9A9A9A" size={24} style={styles.inputIcon} />
        <TextInput
          placeholder="Fecha (YYYY-MM-DD)"
          style={styles.textInput}
          value={date}
          onChangeText={setDate}
        />
      </View>

      <View style={styles.inputContainer}>
        <MaterialCommunityIcons name="map-marker" color="#9A9A9A" size={24} style={styles.inputIcon} />
        <TextInput
          placeholder="Lugar"
          style={styles.textInput}
          value={place}
          onChangeText={setPlace}
        />
      </View>

      <View style={styles.inputContainer}>
        <MaterialCommunityIcons name="note-text" color="#9A9A9A" size={24} style={styles.inputIcon} />
        <TextInput
          placeholder="Descripción"
          style={styles.textInput}
          value={desc}
          onChangeText={setDesc}
        />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSaveAppointment}>
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
