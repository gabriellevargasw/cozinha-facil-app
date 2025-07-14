import React from 'react';
import { View,Text,Image,ScrollView,TouchableOpacity,StyleSheet,Alert,} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DetalhesReceita({ route }) {
  const receita = route.params.receita;

  const salvarFavorito = async () => {
    try {
      const json = await AsyncStorage.getItem('@favoritos');
      const favoritos = json != null ? JSON.parse(json) : [];
      if (favoritos.some(r => r.idMeal === receita.idMeal)) {
        Alert.alert('Essa receita já está nos favoritos!');
        return;
      }
      favoritos.push(receita);
      await AsyncStorage.setItem('@favoritos', JSON.stringify(favoritos));
      Alert.alert('Receita salva nos favoritos!');
    } catch {
      Alert.alert('Erro ao salvar favorito.');
    }
  };

  const ingredientes = [];
  for (let i = 1; i <= 20; i++) {
    const ingrediente = receita[`strIngredient${i}`];
    const medida = receita[`strMeasure${i}`];
    if (ingrediente && ingrediente.trim()) {
      ingredientes.push(`${medida?.trim()} ${ingrediente.trim()}`);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>{receita.strMeal}</Text>

      <Image source={{ uri: receita.strMealThumb }} style={styles.imagem} />

      <Text style={styles.info}>Categoria: {receita.strCategory}</Text>
      <Text style={styles.info}>Origem: {receita.strArea}</Text>

      <Text style={styles.section}>Ingredientes</Text>
      {ingredientes.map((item, index) => (
        <Text key={index} style={styles.texto}>{item}</Text>
      ))}

      <Text style={styles.section}>Instruções</Text>
      <Text style={styles.texto}>{receita.strInstructions}</Text>

      <TouchableOpacity style={styles.botao} onPress={salvarFavorito}>
        <Text style={styles.textoBotao}>Salvar nos Favoritos</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FFFDF5',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#D32F2F',
    textAlign: 'center',
    marginBottom: 10,
  },
  imagem: {
    width: 250,
    height: 250,
    borderRadius: 12,
    marginVertical: 10,
  },
  info: {
    fontSize: 16,
    color: '#795548',
    marginVertical: 2,
  },
  section: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFA726',
    marginTop: 15,
    marginBottom: 5,
  },
  texto: {
    fontSize: 15,
    color: '#333',
    textAlign: 'left',
    marginBottom: 2,
  },
  botao: {
    backgroundColor: '#FFA726',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginTop: 20,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
