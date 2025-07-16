import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { auth, db } from '../Firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

export default function Favoritos() {
  const [favoritos, setFavoritos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const navigation = useNavigation();

  const escutarFavoritos = () => {
    const user = auth.currentUser;

    if (!user) {
      setFavoritos([]);
      setLoading(false);
      return;
    }

    try {
      const userFavoritosRef = collection(db, 'favoritos', user.uid, 'comidas');

      const unsubscribe = onSnapshot(
        userFavoritosRef,
        (snapshot) => {
          const lista = snapshot.docs.map(doc => ({
            id: doc.id,
            thumb: doc.data().strMealThumb || 'https://via.placeholder.com/150',
            nome: doc.data().strMeal || 'Nome Desconhecido',
            categoria: doc.data().strCategory || 'Sem categoria',
            origem: doc.data().strArea || 'Sem origem',
          }));
          setFavoritos(lista);
          setLoading(false);
        },
        (err) => {
          console.error('Erro ao escutar favoritos', err);
          setErro('Erro ao carregar favoritos.');
          setLoading(false);
        }
      );

      return unsubscribe;
    } catch (error) {
      console.error('Erro ao configurar escuta', error);
      setErro('Erro ao carregar favoritos.');
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    const unsubscribe = escutarFavoritos();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#D32F2F" />
        <Text>Carregando favoritos...</Text>
      </View>
    );
  }

  if (erro) {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>{erro}</Text>
        <TouchableOpacity onPress={() => {
          setErro(null);
          setLoading(true);
          escutarFavoritos();
        }}>
          <Text style={{ color: '#D32F2F', marginTop: 10 }}>Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Meus Favoritos</Text>

      {favoritos.length === 0 ? (
        <Text style={styles.titulo}>Nenhum favorito salvo.</Text>
      ) : (
        favoritos.map((item) => (
          <View key={item.id} style={styles.card}>
            <Image source={{ uri: item.thumb }} style={styles.imagem} />
            <Text style={styles.nome}>{item.nome}</Text>
            <Text style={styles.info}>Categoria: {item.categoria}</Text>
            <Text style={styles.info}>Origem: {item.origem}</Text>
          </View>
        ))
      )}

      {/* BOTÃO DE VOLTAR */}
      <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Inicio')}>
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Voltar para Início</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#FFFDF5',
    flexGrow: 1,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#D32F2F',
    textAlign: 'center',
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
    width: 150,
    height: 150,
    borderRadius: 8,
  },
  nome: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 5,
  },
  info: {
    fontSize: 14,
    color: '#795548',
  },
  botao: {
    backgroundColor: '#FFA726',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginTop: 20,
    alignItems: 'center',
  },
});
