import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../BasedeDatos/Firebase";
import { doc, setDoc } from "firebase/firestore";

export default function RegisterScreen({ navigation }) {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const registerUser = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "usuarios", user.uid), {
        nombre: nombre,
        email: email,
        fechaRegistro: new Date(),
      });

      Alert.alert("✅ Registro exitoso", "Tu cuenta ha sido creada");
      navigation.navigate("Login");
    } catch (error) {
      Alert.alert("❌ Error", error.message);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          {/* Imagen/logo */}
          <Image source={require("../assets/logi/2.png")} style={styles.logo} />

          <Text style={styles.title}>Agrolink</Text>
          <Text style={styles.subtitle}>Regístrate aquí</Text>

          <TextInput
            style={styles.input}
            placeholder="Nombre completo"
            value={nombre}
            onChangeText={setNombre}
          />

          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          {/* Campo contraseña con mostrar/ocultar */}
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Contraseña"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons name={showPassword ? "eye-off" : "eye"} size={24} color="#5c8f56" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.button} onPress={registerUser}>
            <Text style={styles.buttonText}>Crear Cuenta</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.link}>¿Ya tienes cuenta? Inicia sesión</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { flexGrow: 1 },
  container: {
    flex: 1,
    backgroundColor: "#a3d9a5",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 30,
  },
  logo: { width: 120, height: 120, marginBottom: 20, borderRadius: 60 },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 10, color: "#1d2570" },
  subtitle: { fontSize: 18, marginBottom: 30 },
  input: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#71b26c",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#71b26c",
    paddingHorizontal: 10,
  },
  passwordInput: { flex: 1, padding: 12 },
  button: {
    backgroundColor: "#5c8f56",
    padding: 15,
    borderRadius: 20,
    width: "80%",
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
  link: { color: "#1d2570", textDecorationLine: "underline" },
});