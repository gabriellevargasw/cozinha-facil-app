import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import estilo from './estilo';

export default function Login({ navigation }) {
  return (
    <View style={estilo.container}>
      <Text style={estilo.titulo}>LOGIN</Text>

      <TextInput
        style={estilo.input} placeholder="Email"/>

      <TextInput
        style={estilo.input} placeholder="Senha"/>

      <TouchableOpacity onPress={() => navigation.navigate('Entrar')}>
          <Text style={{ color: 'blue', fontWeight: 'bold' }}>Esqueceu a senha?</Text>
        </TouchableOpacity>

      <TouchableOpacity
        style={estilo.botao} onPress={() => navigation.navigate('Bemvindo')}>
        <Text style={estilo.textoBotao}>Login</Text>
      </TouchableOpacity>

        <Text style={{ color: 'black' }}>Não possui conta? </Text>

        <TouchableOpacity onPress={() => navigation.navigate('Registrar')}>
          <Text style={{ color: 'blue', fontWeight: 'bold' }}>Registre-se agora</Text>
        </TouchableOpacity>
    </View>
  );
}
