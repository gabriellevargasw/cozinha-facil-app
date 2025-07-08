import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import estilo from './estilo';

export default function Inicio({ navigation, route }) {
  const nome = route.params?.nome || 'Usuário';

  return (
    <View style={estilo.container}>
      <Text style={estilo.titulo}>Bem-vindo, {nome}</Text>

      <TouchableOpacity style={estilo.botao} onPress={() => navigation.navigate('Buscarreceitas')}>
        <Text style={estilo.textoBotao}>Buscar Receita</Text>
      </TouchableOpacity>

      <TouchableOpacity style={estilo.botao} onPress={() => navigation.navigate('Receitaaleatoria')}>
        <Text style={estilo.textoBotao}>Receita Aleatória</Text>
      </TouchableOpacity>

      <TouchableOpacity style={estilo.botao} onPress={() => navigation.navigate('Favoritos')}>
        <Text style={estilo.textoBotao}>Favoritos</Text>
      </TouchableOpacity>
    </View>
  );
}
