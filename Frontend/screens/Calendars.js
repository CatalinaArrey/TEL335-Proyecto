import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Calendar } from 'react-native-calendars';

const Calendario = () => {
  return (
    <View style={styles.container}>
      <Text>PROBANDO WASHO</Text>
      <Calendar/>
    </View>
  )
}

export default Calendario;

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#FBFCFC',
      justifyContent: 'center',
      alignItems: 'center'
  },
});