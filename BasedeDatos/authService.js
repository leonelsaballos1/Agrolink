// BaseDeDatos/authService.js
import { auth, db } from "./Firebase";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

// Registrar con correo y contraseña
export const registrarConCorreo = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Guardar usuario en Firestore
    await setDoc(doc(db, "usuarios", user.uid), {
      email: user.email,
      tipo: "Correo/Contraseña",
      creado: new Date(),
    });

    return user;
  } catch (error) {
    console.error("Error registrando con correo:", error);
    throw error;
  }
};

// Registrar / login con Google
export const registrarConGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Guardar usuario en Firestore
    await setDoc(doc(db, "usuarios", user.uid), {
      email: user.email,
      tipo: "Google",
      creado: new Date(),
    });

    return user;
  } catch (error) {
    console.error("Error registrando con Google:", error);
    throw error;
  }
};
