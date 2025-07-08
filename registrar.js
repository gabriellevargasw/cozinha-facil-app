import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';
import estilo from './estilo';

export default function Registrar({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [repetirSenha, setRepetirSenha] = useState('');

  const confirmar = () => {
    if (!email || !senha || !repetirSenha) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    if (senha !== repetirSenha) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    Alert.alert('Sucesso', 'Conta criada com sucesso!');
  };

  return (
    <View style={estilo.container}>
      <Text style={estilo.titulo}>Criar conta</Text>

      <TextInput
        style={estilo.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={estilo.input}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <TextInput
        style={estilo.input}
        placeholder="Repetir Senha"
        secureTextEntry
        value={repetirSenha}
        onChangeText={setRepetirSenha}
      />

      <TouchableOpacity style={estilo.botao} onPress={confirmar}>
        <Text style={estilo.textoBotao}>CONFIRMAR</Text>
      </TouchableOpacity>

      <TouchableOpacity style={estilo.botao1} onPress={() => navigation.navigate('Login')}>
        <Text style={estilo.textoBotao}>VOLTAR</Text>
      </TouchableOpacity>
    </View>
  );
}
