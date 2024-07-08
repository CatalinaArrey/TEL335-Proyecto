import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet, Image, ScrollView, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axiosInstance from "../AxiosInstance";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Pets = () => {
  const navigation = useNavigation();
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const userIdFromStorage = await AsyncStorage.getItem('userId');
        if (userIdFromStorage) {
          setUserId(userIdFromStorage);
        } else {
          console.error("No userId found in AsyncStorage");
          Alert.alert("Error", "User ID not found. Please login again.");
        }
      } catch (error) {
        console.error("Error fetching userId from AsyncStorage: ", error);
        Alert.alert("Error", "Failed to fetch user ID. Please try again later.");
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchPets();
    }
  }, [userId]);

  const fetchPets = async () => {
    try {
      const response = await axiosInstance.get(`/pets`);
      if (response.status === 200) {
        const { pets } = response.data;
        console.log("Mascotas obtenidas:", pets);
        setPets(pets);
      } else {
        console.error("Unexpected response: ", response);
        Alert.alert("Error", "Unexpected response from server. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching pets: ", error);
      if (error.response) {
        console.error("Server error response: ", error.response.data);
        Alert.alert("Error", "Failed to fetch pets. Server error. Please try again later.");
      } else if (error.request) {
        console.error("Request error: ", error.request);
        Alert.alert("Error", "Failed to fetch pets. No response from server. Please check your network connection.");
      } else {
        console.error("Request setup error: ", error.message);
        Alert.alert("Error", "Failed to fetch pets. Request setup error. Please try again.");
      }
    }
  };

  const handleRegisterPet = () => {
    navigation.navigate("RegisterPet");
  };

  const showPetDetails = (pet) => {
    setSelectedPet(pet);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const renderPetList = () => {
    return pets.map((pet) => (
      <TouchableOpacity key={pet.id} style={styles.petContainer} onPress={() => showPetDetails(pet)}>
        <Image source={{ uri: pet.image }} style={styles.petImage} />
        <Text style={styles.petName}>{pet.name}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis Mascotas</Text>
      <ScrollView style={styles.petList}>
        {renderPetList()}
      </ScrollView>
      <TouchableOpacity style={styles.addButton} onPress={handleRegisterPet}>
        <Text style={styles.addButtonIcon}>+</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedPet && (
              <>
                <Text>Nombre: {selectedPet.name}</Text>
                <Text>Raza: {selectedPet.breed}</Text>
              </>
            )}
            <TouchableOpacity onPress={closeModal}>
              <Text style={styles.closeButton}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Pets;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFCFC',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 50,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#5DADE2',
    marginBottom: 20,
  },
  petList: {
    width: '100%',
    paddingHorizontal: 20,
    flex: 1,
  },
  petContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F6F3',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  petImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  petName: {
    fontSize: 20,
    color: '#2C3E50',
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%"
  },
  closeButton: {
    marginTop: 10,
    textAlign: "center",
    color: "blue"
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
