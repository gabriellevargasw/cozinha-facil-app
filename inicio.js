import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Inicio({ navigation, route }) {
  const nome = route.params?.nome;

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}> Cozinha Fácil</Text>
      <Text style={styles.boasVindas}>Bem-vindo(a), {nome}!</Text>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.navigate('Buscarreceitas')}
      >
        <Text style={styles.textoBotao}> Buscar Receita</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.navigate('Receitaaleatoria')}
      >
        <Text style={styles.textoBotao}> Receita Aleatória</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botaoFavorito}
        onPress={() => navigation.navigate('Favoritos')}
      >
        <Text style={styles.textoBotaoFavorito}> Favoritos</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFDF5', // creme
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#D32F2F', // vermelho tomate
    marginBottom: 5,
  },
  boasVindas: {
    fontSize: 16,
    color: '#795548', // marrom suave
    marginBottom: 40,
  },
  botao: {
    backgroundColor: '#FFA726', // laranja pastel
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  botaoFavorito: {
    backgroundColor: '#FFA726', // amarelo suave
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  textoBotaoFavorito: {
    color: '#fff', // marrom escuro
    fontSize: 16,
    fontWeight: '600',
  },
});
