import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';

export default function ReceitaAleatoria() {
  const [receita, setReceita] = useState(null);
  const [loading, setLoading] = useState(true);

  const carregarReceita = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
      const data = await res.json();
      setReceita(data.meals[0]);
    } catch {
      setReceita(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    carregarReceita();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#D32F2F" />
        <Text style={{ marginTop: 10 }}>Carregando receita...</Text>
      </View>
    );
  }

  if (!receita) {
    return (
      <View style={styles.container}>
        <Text style={styles.erro}>Erro ao carregar receita. Tente novamente.</Text>
        <TouchableOpacity style={styles.botao} onPress={carregarReceita}>
          <Text style={styles.textoBotao}>Tentar de novo</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>{receita.strMeal}</Text>
      <Image
        source={{ uri: receita.strMealThumb }}
        style={styles.imagem}
      />

      <Text style={styles.subtitulo}>Categoria: {receita.strCategory}</Text>
      <Text style={styles.subtitulo}>Origem: {receita.strArea}</Text>

      <Text style={styles.section}>Instruções</Text>
      <Text style={styles.texto}>{receita.strInstructions}</Text>

      <TouchableOpacity style={styles.botao} onPress={carregarReceita}>
        <Text style={styles.textoBotao}>Nova Receita Aleatória</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFFDF5',
    alignItems: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#D32F2F',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 16,
    color: '#795548',
    marginTop: 5,
    textAlign: 'center',
  },
  section: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFA726',
    marginTop: 20,
    marginBottom: 10,
  },
  texto: {
    fontSize: 15,
    color: '#333',
    textAlign: 'justify',
  },
  imagem: {
    width: 250,
    height: 250,
    borderRadius: 12,
    marginVertical: 20,
  },
  botao: {
    backgroundColor: '#FFA726',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginTop: 20,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  erro: {
    color: 'red',
    fontSize: 16,
  },
});
