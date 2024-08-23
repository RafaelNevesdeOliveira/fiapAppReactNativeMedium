import React, { useState } from 'react';
import { styles } from './styles';
import { useAppDispatch, useAppSelector } from '../utils/hooks';
import { registerUserAsync } from '../features/users/userSlice';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import Footer from '../components/Footer';

export default function RegisterUser(){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.users);

  const handleRegister = async() =>{
    if (name === '' || email === '') {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }
    await dispatch(registerUserAsync({ name, email }));
    Alert.alert('Sucesso', 'Usuário registrado com sucesso');
    setName('');
    setEmail('');
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <Button title="Registrar" onPress={handleRegister} />
      {loading && <Text>Registrando...</Text>}
      {error && <Text>{error}</Text>}
      <Footer />
    </View>
  );
}