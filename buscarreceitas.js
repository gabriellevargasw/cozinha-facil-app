import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';

export default function BuscarReceitas() {
  const [busca, setBusca] = useState('');
  const [resultados, setResultados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState('');

  const buscarReceitas = async () => {
    if (!busca.trim()) {
      setMensagem('Digite o nome de uma receita.');
      setResultados([]);
      return;
    }

    setLoading(true);
    setMensagem('');
    setResultados([]);
    try {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(busca)}`);
      const data = await res.json();
      if (data.meals) {
        setResultados(data.meals);
      } else {
        setMensagem('Nenhuma receita encontrada.');
      }
    } catch {
      setMensagem('Erro ao buscar receitas.');
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Buscar Receitas</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite o nome da receita"
        value={busca}
        onChangeText={setBusca}
      />

      <TouchableOpacity style={styles.botao} onPress={buscarReceitas}>
        <Text style={styles.textoBotao}>Buscar</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#D32F2F" style={{ marginTop: 20 }} />}

      {mensagem !== '' && <Text style={styles.mensagem}>{mensagem}</Text>}

      <ScrollView contentContainerStyle={styles.resultados}>
        {resultados.map((item) => (
          <View key={item.idMeal} style={styles.card}>
            <Image source={{ uri: item.strMealThumb }} style={styles.imagem} />
            <Text style={styles.nome}>{item.strMeal}</Text>
          </View>
        ))}
      </ScrollView>
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
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#D7CCC8',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  botao: {
    backgroundColor: '#FFA726',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginBottom: 20,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  mensagem: {
    marginTop: 10,
    color: '#D32F2F',
    fontSize: 14,
  },
  resultados: {
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
});
 