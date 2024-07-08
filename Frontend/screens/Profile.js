import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import UserIntro from '../components/Profile/UserIntro';
import MenuInfo from '../components/Profile/MenuInfo';

const Profile = () => {
  const handleEditProfile = () => {
       Alert.alert('Editar Perfil', 'Implementa la funcionalidad de edición aquí.');
  };

  return (
    <View style={styles.container}>
      {/* UserInfo */}
      <UserIntro/>
      
      {/* Menu Info */}
      <MenuInfo onEditProfile={handleEditProfile} />
      
      <Text style={styles.footerText}>Desarrollado por PetSociety © 2024</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 40,
  },
  footerText: {
    marginTop: 20,
    fontSize: 14,
    color: '#999',
    textAlign: 'center'
  },
});

export default Profile;