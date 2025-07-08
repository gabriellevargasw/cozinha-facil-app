import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';
import estilo from './estilo';

export default function Esqueceuasenha({ navigation }) {
  const [email, setEmail] = useState('');

  const recuperarSenha = () => {
    if (!email) {
      Alert.alert('Erro', 'Por favor, preencha seu e-mail.');
      return;
    }

    
    Alert.alert('Sucesso', `Um link foi enviado para ${email}`);
  };

  return (
    <View style={estilo.container}>
      <Text style={estilo.titulo}>Recuperar Senha</Text>

      <TextInput
        style={estilo.input}
        placeholder="Digite seu e-mail"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="#a1887f"
      />

      <TouchableOpacity style={estilo.botao} onPress={recuperarSenha}>
        <Text style={estilo.textoBotao}>Enviar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[estilo.botao1, { marginTop: 10 }]}
        onPress={() => navigation.goBack()}
      >
        <Text style={estilo.textoBotao}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}
