import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Modal } from "react-native";
import DatePicker from 'react-native-modern-datepicker';

const Calendario = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.input} onPress={showDatePicker}>
        <Text>{selectedDate || "Selecciona una fecha"}</Text>
      </TouchableOpacity>

      <Modal
        transparent={true}
        animationType="slide"
        visible={isDatePickerVisible}
        onRequestClose={hideDatePicker}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <DatePicker
              mode="calendar"
              onSelectedChange={handleConfirm}
            />
            <TouchableOpacity onPress={hideDatePicker} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
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