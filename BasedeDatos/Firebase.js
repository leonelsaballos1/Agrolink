// BaseDeDatos/Firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Configuración de tu proyecto Firebase
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

// Exporta Firestore y Auth para usarlos en tu app
const db = getFirestore(appFirebase);
const auth = getAuth(appFirebase);

export { db, auth };
