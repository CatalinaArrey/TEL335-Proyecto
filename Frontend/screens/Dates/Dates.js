import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const Dates = ({ route, navigation }) => {
  const { cita } = route.params;

  const handleEditar = () => {
    // Implementa la lógica de navegación para la pantalla de edición
    // Puedes utilizar navigation.navigate para navegar a otra pantalla
    // donde el usuario pueda editar los detalles de la cita
    console.log('Implementa la lógica de edición aquí');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalles de la Cita</Text>
      <View style={styles.detailContainer}>
        <Text><Text style={styles.bold}>Fecha:</Text> {cita.date}</Text>
        <Text><Text style={styles.bold}>Hora:</Text> {cita.time}</Text>
        <Text><Text style={styles.bold}>Nota:</Text> {cita.desc}</Text>
      </View>
      <TouchableOpacity style={styles.editButton} onPress={handleEditar}>
        <Text style={styles.editButtonText}>Editar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Dates;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  detailContainer: {
    width: '80%',
    marginBottom: 20,
  },
  bold: {
    fontWeight: 'bold',
  },
  editButton: {
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
