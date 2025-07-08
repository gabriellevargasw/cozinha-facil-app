import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import estilo from './estilo';

export default function BuscarReceitas({ navigation }) {
  const [termo, setTermo] = useState('');
  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState('');

  const buscarReceita = async () => {
    if (!termo) {
      setErro('Digite um nome para buscar.');
      setResultado(null);
      return;
    }

    setErro('');
    setResultado(null);

    try {
      const resp = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(termo)}`);
      const data = await resp.json();

      if (data.meals) {
        setResultado(data.meals[0]);
      } else {
        setErro('Nenhuma receita encontrada.');
      }
    } catch {
      setErro('Erro ao buscar receita.');
    }
  };

  return (
    <ScrollView contentContainerStyle={estilo.container}>
      <Text style={estilo.titulo}>Buscar Receitas</Text>

      <TextInput
        style={estilo.input}
        placeholder="Digite o nome da receita"
        value={termo}
        onChangeText={setTermo}
      />

      <TouchableOpacity style={estilo.botao} onPress={buscarReceita}>
        <Text style={estilo.textoBotao}>Buscar</Text>
      </TouchableOpacity>

      {erro ? <Text style={{ color: 'red', marginTop: 10 }}>{erro}</Text> : null}

      {resultado && (
        <View style={{ marginTop: 20, alignItems: 'center' }}>
          <Text style={estilo.titulo}>{resultado.strMeal}</Text>
          <Image
            source={{ uri: resultado.strMealThumb }}
            style={{ width: 200, height: 200, borderRadius: 10, marginVertical: 10 }}
          />
          <TouchableOpacity
            style={estilo.botao}
            onPress={() => navigation.navigate('Detalhes', { receita: resultado })}
          >
            <Text style={estilo.textoBotao}>Ver Detalhes</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}
