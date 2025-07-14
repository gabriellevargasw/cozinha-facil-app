import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './Firebase';

export default function Registrar({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagemErro, setMensagemErro] = useState('');

  const registrar = () => {
    createUserWithEmailAndPassword(auth, email, senha)
      .then(() => {
        navigation.navigate('Login');
      })
      .catch(erro => {
        setMensagemErro('Erro ao registrar: ' + erro.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cozinha Fácil</Text>
      <Text style={styles.subtitulo}>Crie sua conta</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"  value={email}  onChangeText={setEmail} autoCapitalize="none"  keyboardType="email-address"/>

      <TextInput
        style={styles.input}
        placeholder="Senha" secureTextEntry value={senha} onChangeText={setSenha}/>

      <TouchableOpacity style={styles.botao} onPress={registrar}>
        <Text style={styles.textoBotao}> Registrar</Text>
      </TouchableOpacity>

      {mensagemErro !== '' && (
        <Text style={styles.erro}>{mensagemErro}</Text>
      )}

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Já tem conta? Faça login</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFDF5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#D32F2F',
    marginBottom: 5,
  },
  subtitulo: {
    fontSize: 16,
    color: '#795548',
    marginBottom: 30,
  },
  input: {
    width: '85%',
    borderWidth: 1,
    borderColor: '#D7CCC8',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
  },
  botao: {
    backgroundColor: '#FFA726',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginTop: 20,
    width: '85%',
    alignItems: 'center',
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  erro: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
  link: {
    color: '#1976D2',
    fontWeight: 'bold',
    marginTop: 15,
  },
});
