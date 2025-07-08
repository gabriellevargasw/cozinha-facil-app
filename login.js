import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './Firebase';
import estilo from './estilologin';

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
    <View style={estilo.container}>
      <Text style={estilo.titulo}>Login</Text>

      <TextInput
        style={estilo.input}
        placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none"/>

      <TextInput
        style={estilo.input}
        placeholder="Senha" secureTextEntry value={senha} onChangeText={setSenha}/>

      <TouchableOpacity onPress={() => navigation.navigate('Esqueceuasenha')}>
        <Text style={{ color: 'blue', fontWeight: 'bold' }}>Esqueceu a senha?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={estilo.botao} onPress={fazerLogin}>
        <Text style={estilo.textoBotao}>Entrar</Text>
      </TouchableOpacity>

      {mensagemErro !== '' && (
        <Text style={{ color: 'red', marginTop: 10 }}>{mensagemErro}</Text>
      )}

      <Text style={{ color: 'black', marginTop: 10 }}>Não possui conta?</Text>

      <TouchableOpacity onPress={() => navigation.navigate('Registrar')}>
        <Text style={{ color: 'blue', fontWeight: 'bold' }}>Registre-se agora</Text>
      </TouchableOpacity>
    </View>
  );
}
