import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './Firebase';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagemErro, setMensagemErro] = useState('');

  const fazerLogin = () => {
    signInWithEmailAndPassword(auth, email, senha)
      .then(credenciaisUsuario => {
        navigation.navigate('Inicio', { nome: credenciaisUsuario.user.email });
      })
      .catch(erro => {
        setMensagemErro('Erro ao fazer login: ' + erro.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cozinha Fácil</Text>
      <Text style={styles.subtitulo}>Faça login para continuar</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"  value={email} onChangeText={setEmail}  autoCapitalize="none"  keyboardType="email-address"/>

      <TextInput
        style={styles.input}
        placeholder="Senha" secureTextEntry  value={senha} onChangeText={setSenha}/>

      <TouchableOpacity onPress={() => navigation.navigate('Esqueceuasenha')}>
        <Text style={styles.link}>Esqueceu a senha?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botao} onPress={fazerLogin}>
        <Text style={styles.textoBotao}> Entrar</Text>
      </TouchableOpacity>

      {mensagemErro !== '' && (
        <Text style={styles.erro}>{mensagemErro}</Text>
      )}

      <Text style={styles.textoNormal}>Não possui conta?</Text>

      <TouchableOpacity onPress={() => navigation.navigate('Registrar')}>
        <Text style={styles.link}>Registre-se agora</Text>
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
  textoNormal: {
    color: '#333',
    marginTop: 20,
  },
  link: {
    color: '#1976D2',
    fontWeight: 'bold',
    marginTop: 5,
  },
});