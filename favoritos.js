import React, { useState, useEffect } from 'react';
import {View,Text,Image,TouchableOpacity,ScrollView,StyleSheet,Alert,} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Favoritos() {
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    carregarFavoritos();
  }, []);

  async function carregarFavoritos() {
    try {
      const json = await AsyncStorage.getItem('@favoritos');
      if (json != null) {
        setFavoritos(JSON.parse(json));
      } else {
        setFavoritos([]);
      }
    } catch {
      Alert.alert('Erro ao carregar favoritos.');
    }
  }

  const removerFavorito = async (idMeal) => {
    const novaLista = favoritos.filter(item => item.idMeal !== idMeal);
    setFavoritos(novaLista);
    await AsyncStorage.setItem('@favoritos', JSON.stringify(novaLista));
    Alert.alert('Removido dos favoritos!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Receitas Favoritas</Text>

      {favoritos.length === 0 ? (
        <Text style={styles.mensagem}>Nenhuma receita favorita ainda.</Text>
      ) : (
        <ScrollView contentContainerStyle={styles.lista}>
          {favoritos.map(item => (
            <View key={item.idMeal} style={styles.card}>
              <Image source={{ uri: item.strMealThumb }} style={styles.imagem} />
              <Text style={styles.nome}>{item.strMeal}</Text>
              <TouchableOpacity
                style={styles.botaoRemover}
                onPress={() => removerFavorito(item.idMeal)}
              >
                <Text style={styles.textoRemover}>Remover</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFDF5',
    padding: 20,
    alignItems: 'center',
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#D32F2F',
    marginBottom: 20,
  },
  mensagem: {
    color: '#795548',
    fontSize: 16,
    marginTop: 30,
  },
  lista: {
    alignItems: 'center',
    paddingTop: 10,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    alignItems: 'center',
    width: 250,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  imagem: {
    width: 200,
    height: 200,
    borderRadius: 8,
  },
  nome: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
    color: '#5D4037',
    textAlign: 'center',
  },
  botaoRemover: {
    marginTop: 10,
    backgroundColor: '#D32F2F',
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  textoRemover: {
    color: '#fff',
    fontWeight: '600',
  },
});
