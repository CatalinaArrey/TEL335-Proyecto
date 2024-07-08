

import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';

const EditDate = ({ route, navigation }) => {
  const { citaId } = route.params; // Obtén el ID de la cita desde los parámetros de navegación

  // Aquí puedes inicializar el estado con los detalles de la cita actual
  const [titulo, setTitulo] = useState('');
  const [lugar, setLugar] = useState('');
  const [descripcion, setDescripcion] = useState('');

  // Simula obtener los detalles de la cita actual según el ID recibido
  useEffect(() => {
    // Lógica para obtener los detalles de la cita según citaId
    const citaActual = obtenerCitaPorId(citaId); // Implementa esta función según tu lógica
    if (citaActual) {
      setTitulo(citaActual.title);
      setLugar(citaActual.place);
      setDescripcion(citaActual.desc);
    }
  }, [citaId]);

  // Función para guardar los cambios y actualizar la cita
  const guardarCambios = () => {
    // Aquí puedes implementar la lógica para guardar los cambios en la cita
    // Por ejemplo, puedes actualizar el estado global de citas o hacer una llamada a API
    // Una vez guardados los cambios, puedes navegar de vuelta a la pantalla anterior (Calendarios)
    navigation.goBack(); // Navega de vuelta a la pantalla anterior
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título:</Text>
      <TextInput
        style={styles.input}
        value={titulo}
        onChangeText={setTitulo}
      />
      <Text style={styles.label}>Lugar:</Text>
      <TextInput
        style={styles.input}
        value={lugar}
        onChangeText={setLugar}
      />
      <Text style={styles.label}>Descripción:</Text>
      <TextInput
        style={styles.input}
        value={descripcion}
        onChangeText={setDescripcion}
        multiline
        numberOfLines={4}
      />
      <Button title="Guardar Cambios" onPress={guardarCambios} />
    </View>
  );
};

export default EditDate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
});
