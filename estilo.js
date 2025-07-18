import { StyleSheet } from 'react-native';

export default StyleSheet.create({
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
    textAlign: 'center',
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
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    width: '60%',
    alignItems: 'center',
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
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
  imagemPequena: {
    width: 150,
    height: 150,
    borderRadius: 8,
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
  mensagem: {
    color: '#795548',
    fontSize: 16,
    marginTop: 30,
  },
  lista: {
    alignItems: 'center',
    paddingTop: 10,
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
  detalhes: {
    alignItems: 'center',
  },
  botaoVoltar: {
    marginTop: 20,
    backgroundColor: '#D32F2F',
    padding: 10,
    borderRadius: 8,
  },
});
