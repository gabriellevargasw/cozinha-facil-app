import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Configuração do seu projeto Firebase:
const firebaseConfig = {
  apiKey: "AIzaSyBNWSjqm2yvCm59umrJT7iR85hiGQcZeQw",
  authDomain: "projetogabi3.firebaseapp.com",
  projectId: "projetogabi3",
  storageBucket: "projetogabi3.appspot.com",
  messagingSenderId: "862739591497",
  appId: "1:862739591497:web:fc5744371ec2f53a84ea98"
};

// Inicializa o app Firebase
const app = initializeApp(firebaseConfig);

// Inicializa o auth com persistência em AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Inicializa o Firestore
const db = getFirestore(app);

// Exporta para usar no resto do app
export { auth, db };
