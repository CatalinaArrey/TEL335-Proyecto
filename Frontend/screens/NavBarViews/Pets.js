import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from '../../components/AxiosInstance';
import { usePets } from '../../components/Pets/PetsContext';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const speciesIcons = {
    perro: 'dog',
    gato: 'cat',
    conejo: 'rabbit',
    reptil: 'snake',
    otro: 'help-circle',
};

const Pets = () => {
    const navigation = useNavigation();
    const [pets, setPets] = useState([]);
    const [selectedPet, setSelectedPet] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const { shouldUpdate } = usePets();

    useEffect(() => {
        const fetchPets = async () => {
            try {
                const accessToken = await AsyncStorage.getItem("accessToken");
                const response = await axiosInstance.get('/pets', {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });

                if (response.status === 200) {
                    const { pets } = response.data;
                    console.log("Mascotas obtenidas:", pets);
                    setPets(pets);
                } else {
                    console.error("Respuesta inesperada: ", response);
                }
            } catch (error) {
                console.error("Error al obtener mascotas: ", error);
            }
        };

        fetchPets();
    }, [shouldUpdate]);

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
                <MaterialCommunityIcons 
                    name={speciesIcons[pet.species] || 'help-circle'} 
                    size={50} 
                    color="#5DADE2" 
                    style={styles.petIcon} 
                />
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
    petIcon: {
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
