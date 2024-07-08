import React, { useState } from 'react';
import { StyleSheet, View, Text, Alert, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { format } from 'date-fns';
import esLocale from 'date-fns/locale/es';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

const Calendarios = () => {
  const navigation = useNavigation();

  const [citasMascotas, setCitasMascotas] = useState([
    { id: 1, date: '2024-07-10', color: '#3498db', title: 'Cita Azul', place: 'Lugar Azul', desc: 'Descripción Azul', petId: 1 },
    { id: 2, date: '2024-07-15', color: '#2ecc71', title: 'Cita Verde', place: 'Lugar Verde', desc: 'Descripción Verde', petId: 2 },
    { id: 3, date: '2024-07-20', color: '#e74c3c', title: 'Cita Roja', place: 'Lugar Rojo', desc: 'Descripción Roja', petId: 3 },
  ]);

  const [filtroMascota, setFiltroMascota] = useState('todas');
  const [selectedDate, setSelectedDate] = useState(null);

  const handleNewDate = () => {
    navigation.navigate("NewDate");
  };
  const handleDayPress = (day) => {
    const cita = citasMascotas.find(cita => cita.date === day.dateString);

    if (cita) {
      setSelectedDate(day.dateString);
      mostrarAlerta(cita);
    } else {
      Alert.alert(
        `No hay cita para ${day.dateString}`,
        'Selecciona otra fecha para ver la cita correspondiente.'
      );
    }
  };

  const mostrarAlerta = (cita) => {
    const formattedDate = format(new Date(cita.date), "EEEE d 'de' MMMM", { locale: esLocale });

    Alert.alert(
      `Cita para ${formattedDate}`,
      `Título: ${cita.title}\nLugar: ${cita.place}\nDescripción: ${cita.desc}`,
      [
        {
          text: 'Ok',
          style: 'ok',
        },
        {
          text: 'Editar',
          onPress: () => {

            navigation.navigate('EditDate', { citaId: cita.id });
          },
        },
      ]
    );
  };

  const handleFiltroChange = (mascotaId) => {
    setFiltroMascota(mascotaId);
    setSelectedDate(null);
  };

  const obtenerCitasFiltradas = () => {
    if (filtroMascota === 'todas') {
      return citasMascotas;
    } else {
      return citasMascotas.filter(cita => cita.petId === parseInt(filtroMascota));
    }
  };

  const markedDates = obtenerCitasFiltradas().reduce((dates, cita) => {
    dates[cita.date] = { selected: true, selectedColor: cita.color };
    return dates;
  }, {});

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis Calendarios</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={filtroMascota}
          style={styles.picker}
          onValueChange={handleFiltroChange}
        >
          <Picker.Item label="Todas las mascotas" value="todas" />
          <Picker.Item label="Mascota 1" value="1" />
          <Picker.Item label="Mascota 2" value="2" />
          <Picker.Item label="Mascota 3" value="3" />
        </Picker>
      </View>
      <View style={styles.calendarContainer}>
        <Calendar
          markedDates={markedDates}
          onDayPress={handleDayPress}
          style={styles.calendar}
          theme={{
            calendarBackground: '#ffffff',
            textSectionTitleColor: '#333333',
            selectedDayBackgroundColor: '#3498db',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#3498db',
            dayTextColor: '#333333',
            textDisabledColor: '#d9e1e8',
            dotColor: '#3498db',
            selectedDotColor: '#ffffff',
            arrowColor: '#3498db',
            monthTextColor: '#333333',
            indicatorColor: '#3498db',
            textDayFontFamily: 'Roboto',
            textMonthFontFamily: 'Roboto',
            textDayHeaderFontFamily: 'Roboto',
          }}
        />
      </View>
      <TouchableOpacity style={styles.addButton} onPress={handleNewDate}>
        <Text style={styles.addButtonIcon}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Calendarios;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#5DADE2',
    marginBottom: 20,
  },
  pickerContainer: {
    width: '80%',
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
  },
  picker: {
    color: '#333',
  },
  calendarContainer: {
    width: '80%',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  calendar: {
    width: '100%',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#5DADE2',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },
  addButtonIcon: {
    fontSize: 30,
    color: '#fff',
  },
});
