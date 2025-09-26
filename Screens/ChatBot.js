import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Voice from "@react-native-voice/voice";
import * as Speech from "expo-speech";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

export default function ChatbotVoice() {
 const [messages, setMessages] = useState([
  {
    id: "1",
    sender: "bot",
    text: "¡Bienvenido! Soy Agrolink, su asistente especializado en agricultura nicaragüense. Puede preguntarme sobre técnicas de siembra, control de plagas, fertilización y más.",
  },
]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const flatListRef = useRef();

  // 🔹 Cargar historial al inicio
  useEffect(() => {
    loadChatHistory();
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = (err) => {
      console.log("Error voz:", err);
      setIsRecording(false);
    };
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  // 🔹 Guardar historial cada vez que cambia
  useEffect(() => {
    saveChatHistory();
  }, [messages]);

  const onSpeechResults = (event) => {
    const text = event.value[0];
    setInput(text);
    setIsRecording(false);
  };

  const startRecording = async () => {
    try {
      setIsRecording(true);
      await Voice.start("es-NI");
    } catch (e) {
      console.error(e);
      setIsRecording(false);
    }
  };

  const stopRecording = async () => {
    try {
      await Voice.stop();
      setIsRecording(false);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage = { id: Date.now().toString(), sender: "user", text: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setLoading(true);

    try {
      const payload = {
        inputText: newMessage.text,
        geographicContext: "Nicaragua, zonas rurales",
        history: [],
      };

      const res = await fetch(
        "https://magicloops.dev/api/loop/ce14139b-b7b8-4bf5-929b-4b102759ec68/run",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const data = await res.json();

      const botText = data.responseText || "Lo siento, no obtuve respuesta.";
      const botMessage = { id: Date.now().toString(), sender: "bot", text: botText };

      setMessages((prev) => [...prev, botMessage]);
      Speech.speak(botText, { language: "es-NI", rate: 0 });
    } catch (error) {
      console.error(error);
      const errorMsg = "Error de conexión. Intente de nuevo.";
      setMessages((prev) => [...prev, { id: Date.now().toString(), sender: "bot", text: errorMsg }]);
      Speech.speak(errorMsg, { language: "es-NI" });
    } finally {
      setLoading(false);
    }
  };

  const saveChatHistory = async () => {
    try {
      await AsyncStorage.setItem("chatHistory", JSON.stringify(messages));
    } catch (error) {
      console.error("Error guardando historial:", error);
    }
  };

  const loadChatHistory = async () => {
    try {
      const history = await AsyncStorage.getItem("chatHistory");
      if (history) setMessages(JSON.parse(history));
    } catch (error) {
      console.error("Error cargando historial:", error);
    }
  };

  const clearHistory = async () => {
    Alert.alert("Confirmar", "¿Borrar todo el historial?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Borrar",
        style: "destructive",
        onPress: async () => {
          await AsyncStorage.removeItem("chatHistory");
          setMessages([
            {
              id: "1",
              sender: "bot",
              text: "¡Bienvenido! Soy Agrolink , su asistente especializado en agricultura nicaragüense. Puede preguntarme sobre técnicas de siembra, control de plagas, fertilización y más.",
            },
          ]);
        },
      },
    ]);
  };

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.message,
        item.sender === "user" ? styles.userMessage : styles.botMessage,
      ]}
    >
      <Text>{item.text}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0} // Ajusta si tienes header
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({ animated: true })
          }
          onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
          style={{ flex: 1 }}
        />

        {loading && (
          <ActivityIndicator size="large" color="#2F855A" style={{ margin: 10 }} />
        )}

        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Escriba su mensaje"
            value={input}
            onChangeText={setInput}
            multiline
          />

          <TouchableOpacity
            onPress={isRecording ? stopRecording : startRecording}
            style={[styles.button, isRecording && styles.recording]}
          >
            <FontAwesome
              name={isRecording ? "stop" : "microphone"}
              size={20}
              color="#fff"
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleSend} style={styles.button}>
            <Ionicons name="send" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={clearHistory} style={styles.clearButton}>
          <FontAwesome name="trash" size={14} color="red" />
          <Text style={{ color: "red", marginLeft: 5 }}>Limpiar historial</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F0F4F8" },
  message: {
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  userMessage: {
    backgroundColor: "#E8F5E9",
    alignSelf: "flex-end",
    borderLeftWidth: 4,
    borderLeftColor: "#2F855A",
  },
  botMessage: {
    backgroundColor: "#fff",
    alignSelf: "flex-start",
    borderLeftWidth: 4,
    borderLeftColor: "#8D6E63",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#2F855A",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 25,
    marginLeft: 5,
  },
  recording: {
    backgroundColor: "red",
  },
  clearButton: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
});
