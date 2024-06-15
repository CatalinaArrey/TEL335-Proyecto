import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import UserIntro from '../components/Profile/UserIntro';

const Profile = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Perfil</Text>

      {/* UserInfo */}
      <UserIntro/>
      
      {/* Menu Info */}


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:20,
  },
  header: {
    fontSize: 35,
    fontWeight: 'bold',
  },
});

export default Profile;