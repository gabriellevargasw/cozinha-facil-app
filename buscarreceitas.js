import React, { useState } from 'react';
import {View,Text,TextInput,TouchableOpacity,Image,ScrollView,StyleSheet,Alert,ActivityIndicator} from 'react-native';

export default function BuscarReceitas() {
  const [query, setQuery] = useState('');
  const [resultados, setResultados] = useState([]);
  const [carregando, setCarregando] = useState(false);

  const buscar = async () => {
    if (!query.trim()) {
      Alert.alert('Por favor, digite o nome de uma receita!');
      return;
    }

    setCarregando(true);
    setResultados([]);

    try {
      const resposta = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query.trim().toLowerCase()}`
      );
      const dados = await resposta.json();

      if (dados.meals) {
        setResultados(dados.meals);
      } else {
        Alert.alert(`Nenhuma receita encontrada para "${query}".`);
        setResultados([]);
      }
    } catch (error) {
      Alert.alert('Erro ao buscar receita. Verifique sua conexão.');
      console.error(error);
    } finally {
      setCarregando(false);
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

      {carregando && <ActivityIndicator size="large" color="#FFA726" />}

      {resultados.map(item => (
        <View key={item.idMeal} style={styles.card}>
          <Image source={{ uri: item.strMealThumb }} style={styles.imagem} />
          <Text style={styles.nome}>{item.strMeal}</Text>
          <Text style={styles.categoria}>Categoria: {item.strCategory}</Text>
          <Text style={styles.area}>Área: {item.strArea}</Text>
        </View>
      ))}
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
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#D32F2F',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    width: '100%',
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  botao: {
    backgroundColor: '#FFA726',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
  },
  card: {
    marginBottom: 15,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    width: '100%',
  },
  imagem: {
    width: 200,
    height: 200,
    borderRadius: 8,
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  categoria: {
    fontSize: 14,
    color: '#555',
  },
  area: {
    fontSize: 14,
    color: '#777',
  },
});
