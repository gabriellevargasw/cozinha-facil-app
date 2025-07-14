import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from './Firebase';

export default function Esqueceuasenha({ navigation }) {
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');

  const recuperarSenha = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setMensagem('E-mail de recuperação enviado!');
      })
      .catch(() => {
        setMensagem('Erro ao enviar e-mail de recuperação.');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cozinha Fácil</Text>
      <Text style={styles.subtitulo}>Recuperar senha</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite seu email" value={email}  onChangeText={setEmail}  autoCapitalize="none" keyboardType="email-address"/>

      <TouchableOpacity style={styles.botao} onPress={recuperarSenha}>
        <Text style={styles.textoBotao}>Enviar e-mail</Text>
      </TouchableOpacity>

      {mensagem !== '' && (
        <Text style={styles.mensagem}>{mensagem}</Text>
      )}

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Voltar ao login</Text>
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
  mensagem: {
    color: 'green',
    marginTop: 10,
    textAlign: 'center',
  },
  link: {
    color: '#1976D2',
    fontWeight: 'bold',
    marginTop: 15,
  },
});
