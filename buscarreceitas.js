import React, { useState } from 'react';
import { View,Text,TextInput,TouchableOpacity,Image,ScrollView,StyleSheet,Alert,} from 'react-native';

export default function BuscarReceitas() {
  const [query, setQuery] = useState('');
  const [resultados, setResultados] = useState([]);
  const [selecionada, setSelecionada] = useState(null);

  const buscar = async () => {
    try {
      const resposta = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
      const dados = await resposta.json();
      if (dados.meals) {
        setResultados(dados.meals);
        setSelecionada(null);
      } else {
        Alert.alert('Nenhuma receita encontrada.');
        setResultados([]);
        setSelecionada(null);
      }
    } catch {
      Alert.alert('Erro ao buscar receita.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Buscar Receitas</Text>

      <TextInput
        placeholder="Digite o nome da receita"
        style={styles.input}
        value={query}
        onChangeText={setQuery}
      />

      <TouchableOpacity style={styles.botao} onPress={buscar}>
        <Text style={styles.textoBotao}>Buscar</Text>
      </TouchableOpacity>

      {selecionada ? (
        <View style={styles.detalhes}>
          <Text style={styles.titulo}>{selecionada.strMeal}</Text>
          <Image source={{ uri: selecionada.strMealThumb }} style={styles.imagem} />
          <Text>{selecionada.strInstructions}</Text>

          <TouchableOpacity
            style={styles.botaoVoltar}
            onPress={() => setSelecionada(null)}
          >
            <Text style={styles.textoBotao}>Voltar para lista</Text>
          </TouchableOpacity>
        </View>
      ) : (
        resultados.map(item => (
          <TouchableOpacity
            key={item.idMeal}
            style={styles.card}
            onPress={() => setSelecionada(item)}
          >
            <Image source={{ uri: item.strMealThumb }} style={styles.imagemPequena} />
            <Text>{item.strMeal}</Text>
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#FFFDF5',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    width: '100%',
    marginBottom: 10,
    borderRadius: 8,
  },
  botao: {
    backgroundColor: '#FFA726',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
  },
  card: {
    marginBottom: 10,
    alignItems: 'center',
  },
  imagemPequena: {
    width: 150,
    height: 150,
    borderRadius: 8,
  },
  detalhes: {
    alignItems: 'center',
  },
  imagem: {
    width: 250,
    height: 250,
    borderRadius: 8,
    marginVertical: 10,
  },
  botaoVoltar: {
    marginTop: 20,
    backgroundColor: '#D32F2F',
    padding: 10,
    borderRadius: 8,
  },
});
