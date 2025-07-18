import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';

export default function Sobre({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}> Cozinha Fácil</Text>

      <View style={styles.section}>
        <Text style={styles.subtitulo}>Sobre o App</Text>
        <Text style={styles.texto}>
          O Cozinha Fácil foi criado para facilitar sua vida na cozinha. Descubra receitas incríveis, explore sugestões aleatórias e salve suas favoritas para acessar quando quiser.
        </Text>
      </View>

      <View style={styles.divisor} />

      <View style={styles.section}>
        <Text style={styles.subtitulo}>Dados das Receitas</Text>
        <Text style={styles.texto}>
          Todas as informações e imagens das receitas são fornecidas pela API pública:
        </Text>

        <TouchableOpacity onPress={() => Linking.openURL('https://www.themealdb.com/')}>
          <Text style={styles.link}> www.themealdb.com</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.divisor} />

      <Text style={styles.versao}>Versão 1.0.1</Text>

      <TouchableOpacity style={styles.botao} onPress={() => navigation.goBack()}>
        <Text style={styles.textoBotao}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFDF5',
    padding: 20,
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#D32F2F',
    textAlign: 'center',
    marginBottom: 30,
  },
  section: {
    marginBottom: 20,
  },
  subtitulo: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFA726',
    marginBottom: 8,
  },
  texto: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
  link: {
    marginTop: 10,
    fontSize: 16,
    color: '#2196F3',
    textDecorationLine: 'underline',
  },
  divisor: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 15,
  },
  versao: {
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
  },
  botao: {
    backgroundColor: '#FFA726',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 30,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
