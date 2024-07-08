import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const TopBar = ({ navigation, title }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={styles.iconButton}>
        <MaterialCommunityIcons name="menu" color="#000" size={24} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.iconButton}>
        <MaterialCommunityIcons name="account" color="#000" size={24} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  iconButton: {
    padding: 10,
  },
});

export default TopBar;
