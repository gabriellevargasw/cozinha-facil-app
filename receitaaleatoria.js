import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Alert
} from 'react-native';
import { db } from './Firebase';
import { collection, addDoc, getDocs, query, where, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export default function ReceitaAleatoria({ navigation, route }) {
  const [receita, setReceita] = useState(null);
  const [loading, setLoading] = useState(true);
  const [jaSalvo, setJaSalvo] = useState(false);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) {
      Alert.alert('Usuário não autenticado. Faça login.');
      navigation.navigate('Login');
      return;
    }
    carregarReceita();
  }, [user, navigation]);

  const carregarReceita = async () => {
    if (!user) {
      Alert.alert('Aguarde a autenticação ou faça login.');
      return;
    }
    setLoading(true);
    setJaSalvo(false);
    try {
      const res = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
      const data = await res.json();
      setReceita(data.meals[0]);
      verificarSeJaEstaSalvo(data.meals[0].idMeal);
    } catch (error) {
      console.error('Erro ao carregar receita:', error);
      setReceita(null);
    }
    setLoading(false);
  };

  const verificarSeJaEstaSalvo = async (idMeal) => {
    if (!user) return;
    try {
      const comidasRef = collection(db, 'favoritos', user.uid, 'comidas');
      const q = query(comidasRef, where('idMeal', '==', idMeal));
      const querySnapshot = await getDocs(q);
      setJaSalvo(!querySnapshot.empty);
    } catch (error) {
      console.error('Erro ao verificar favorito:', error);
      setJaSalvo(false);
    }
  };

  const salvarFavorito = async (receita) => {
    if (!user) {
      Alert.alert('Usuário não autenticado. Faça login.');
      return;
    }
    try {
      const comidasRef = collection(db, 'favoritos', user.uid, 'comidas');
      const q = query(comidasRef, where('idMeal', '==', receita.idMeal));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        Alert.alert('Essa receita já está nos favoritos!');
        setJaSalvo(true);
        return;
      }

      // Limite de favoritos (implementado no código)
      const favoritosQuery = query(comidasRef);
      const favoritosSnapshot = await getDocs(favoritosQuery);
      if (favoritosSnapshot.size >= 10) {
        Alert.alert('Limite de 10 favoritos atingido!');
        return;
      }

      await addDoc(comidasRef, {
        idMeal: receita.idMeal,
        strMeal: receita.strMeal,
        strMealThumb: receita.strMealThumb,
        strCategory: receita.strCategory,
        strArea: receita.strArea,
        strInstructions: receita.strInstructions,
      });
      Alert.alert('Receita salva em favoritos!');
      setJaSalvo(true);
    } catch (error) {
      console.error('Erro ao salvar favorito:', error);
      Alert.alert('Erro ao salvar favorito: ' + error.message);
    }
  };

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
      <Image source={{ uri: receita.strMealThumb }} style={styles.imagem} />
      <Text style={styles.subtitulo}>Categoria: {receita.strCategory}</Text>
      <Text style={styles.subtitulo}>Origem: {receita.strArea}</Text>
      <Text style={styles.section}>Instruções</Text>
      <Text style={styles.texto}>{receita.strInstructions}</Text>
      <TouchableOpacity style={styles.botao} onPress={carregarReceita}>
        <Text style={styles.textoBotao}>Nova Receita Aleatória</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.botao, { backgroundColor: jaSalvo ? '#4CAF50' : '#FFA726' }]}
        onPress={() => salvarFavorito(receita)}
      >
        <Text style={styles.textoBotao}>{jaSalvo ? 'Salvo!' : 'Salvar em Favoritos'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: '#FFFDF5', alignItems: 'center', padding: 20 },
  titulo: { fontSize: 26, fontWeight: 'bold', color: '#D32F2F', marginBottom: 10, textAlign: 'center' },
  subtitulo: { fontSize: 16, color: '#795548', marginTop: 5, textAlign: 'center' },
  section: { fontSize: 18, fontWeight: '600', color: '#FFA726', marginTop: 20, marginBottom: 10 },
  texto: { fontSize: 15, color: '#333', textAlign: 'justify' },
  imagem: { width: 250, height: 250, borderRadius: 12, marginVertical: 20 },
  botao: { backgroundColor: '#FFA726', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 12, marginTop: 20, alignItems: 'center' },
  textoBotao: { color: '#fff', fontSize: 16, fontWeight: '600' },
  erro: { color: 'red', fontSize: 16 },
});