import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Modal } from "react-native";
import DatePicker from 'react-native-modern-datepicker';

const Calendario = ({ visible, onConfirm, onClose }) => {
  const [selectedDate, setSelectedDate] = useState('');

  const handleConfirm = (date) => {
    setSelectedDate(date);
    onConfirm(date); 
  };

  const hideDatePicker = () => {
    onClose(); 
  };

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
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
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  modalContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#DDDDDD',
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 16,
    color: '#333',
  },
});

export default Calendario;