import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';

const MenuInfo = ({ onEditProfile, navigation }) => {
    const handleLogout = async () => {
        try {
          const response = await axios.post(`${baseURL}/logout`);
          if (response.status === 200) {
            navigation.navigate('Login'); 
          } else {
            throw new Error('Error al cerrar sesión');
          }
        } catch (error) {
          console.error('Error al cerrar sesión:', error);
          Alert.alert('Error', 'Ocurrió un error al intentar cerrar sesión. Inténtalo de nuevo.');
        }
      };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, styles.editButton]}
        onPress={onEditProfile}
      >
        <Text style={[styles.buttonText, styles.editButtonText]}>Editar Perfil</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Añadir Mascotas</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Mis Mascotas</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={handleLogout}>
        <Text style={[styles.buttonText, styles.logoutButtonText]}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingVertical: 20,
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  editButton: {
    backgroundColor: '#5DADE2',
  },
  logoutButton: {
    backgroundColor: '#F1948A',
  },
  buttonText: {
    fontSize: 18,
  },
  editButtonText: {
    color: '#fff',
  },
  logoutButtonText: {
    color: '#fff',
  },
});

export default MenuInfo;
