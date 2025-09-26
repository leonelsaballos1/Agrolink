// BaseDeDatos/Firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import {
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// ⚡ Configuración de tu Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCgRip-vOzkAVB9l4w-hoIZcm_zr3mAGaw",
  authDomain: "agriges-432cb.firebaseapp.com",
  databaseURL: "https://agriges-432cb-default-rtdb.firebaseio.com",
  projectId: "agriges-432cb",
  storageBucket: "agriges-432cb.appspot.com",
  messagingSenderId: "397829479377",
  appId: "1:397829479377:web:7a0b3181be45b603fb9ef0",
  measurementId: "G-XQ5BDMQ5GG",
};

// Inicializa Firebase
const appFirebase = initializeApp(firebaseConfig);

// ✅ Inicializa Auth con persistencia en AsyncStorage
const auth = initializeAuth(appFirebase, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// Firestore y Storage
const db = getFirestore(appFirebase);
const storage = getStorage(appFirebase);

export { db, auth, storage };
