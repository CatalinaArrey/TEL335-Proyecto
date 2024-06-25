import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

const petData = [
  { id: 1, name: "Firulais", breed: "Labrador", age: 3, image: "https://ca-times.brightspotcdn.com/dims4/default/796e6c9/2147483647/strip/true/crop/1970x1108+39+0/resize/1200x675!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F12%2Fa5%2F79e097ccf62312d18a025f22ce48%2Fhoyla-recuento-11-cosas-aman-gatos-top-001" },
  { id: 2, name: "Mishi", breed: "Siamés", age: 2, image: "https://img2.rtve.es/i/?w=1600&i=1618587961630.jpg" },
  { id: 3, name: "Rex", breed: "Pastor Alemán", age: 4, image: "https://okdiario.com/img/2020/07/25/curiosidades-sobre-la-inteligencia-de-los-gatos-635x358.jpg" }
];

const Pets = () => {
  const navigation = useNavigation();

  const handleRegisterPet = () => {
    navigation.navigate("RegisterPet");
  };

  const [selectedPet, setSelectedPet] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const showPetDetails = (pet) => {
    setSelectedPet(pet);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const renderPetList = () => {
    return petData.map((pet) => (
      <TouchableOpacity key={pet.id} style={styles.petContainer} onPress={() => showPetDetails(pet)}>
        <Image source={{ uri: pet.image }} style={styles.petImage} />
        <Text style={styles.petName}>{pet.name}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis Mascotas</Text>
      <View style={styles.petList}>
        {renderPetList()}
      </View>
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
                <Text>Edad: {selectedPet.age}</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFCFC',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#5DADE2',
    marginBottom: 20
  },
  petList: {
    width: '100%',
    paddingHorizontal: 20,
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

export default Pets;
