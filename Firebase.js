import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBNWSjqm2yvCm59umrJT7iR85hiGQcZeQw",
  authDomain: "projetogabi3.firebaseapp.com",
  projectId: "projetogabi3",
  storageBucket: "projetogabi3.firebasestorage.app",
  messagingSenderId: "862739591497",
  appId: "1:862739591497:web:fc5744371ec2f53a84ea98"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const db = getFirestore(app);

export { auth, db};