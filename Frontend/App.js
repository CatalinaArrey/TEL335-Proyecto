import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

function HomeScreen() {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Text>Esto quiero que lo vea una vez ingresan mail y contrasena</Text>
      <StatusBar style="auto" />
    </View>
  );
}

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const insets = useSafeAreaInsets();

  const handleLogin = () => {
    if (email && password) {
      // Lógica de autenticación
      Alert.alert('Inicio de sesión exitoso', `¡Bienvenido ${email}!`);
    } else {
      Alert.alert('Error', 'Por favor, ingresa tu correo electrónico y contraseña');
    }
  };

  return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <Text style={styles.label}>Correo Electrónico:</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Ingresa tu correo electrónico"
          keyboardType="email-address"
        />
        <Text style={styles.label}>Contraseña:</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Ingresa tu contraseña"
          secureTextEntry={true}
        />
        <Button title="Iniciar Sesión" onPress={handleLogin} />
      </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <LoginPage />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});
