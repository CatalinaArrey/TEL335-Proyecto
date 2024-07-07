import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const UserIntro = ({ avatarText, profileName, profileEmail }) => {
  // Función para generar un color aleatorio en formato hexadecimal
  const randomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      backgroundColor: '#f0f0f0',
    },
    profileHeader: {
      alignItems: 'center',
      marginVertical: 40,
    },
    avatar: {
      backgroundColor: randomColor(),
      width: 80,
      height: 80,
      borderRadius: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },
    avatarText: {
      color: '#fff',
      fontSize: 40,
    },
    profileName: {
      marginTop: 10,
      fontSize: 24,
      fontWeight: 'bold',
    },
    profileEmail: {
      fontSize: 16,
      color: '#777',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <View style={[styles.avatar, { backgroundColor: randomColor() }]}>
          <Text style={styles.avatarText}>{avatarText}</Text>
        </View>
        <Text style={styles.profileName}>{profileName}</Text>
        <Text style={styles.profileEmail}>{profileEmail}</Text>
      </View>
    </View>
  );
};

export default UserIntro;
