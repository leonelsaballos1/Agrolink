import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';

export default function ChatBot() {
  const [messages, setMessages] = useState([
    { id: '1', text: 'Hola 👋 Soy tu asistente agrícola virtual.', fromBot: true },
  ]);
  const [input, setInput] = useState('');
  const flatListRef = useRef();

  const respuestasBot = (msg) => {
    msg = msg.toLowerCase();
    if (msg.includes('maíz')) return '🌽 El maíz se siembra en época lluviosa. Usa INTA Nutrader.';
    if (msg.includes('frijol')) return '🌱 El frijol prefiere suelos bien drenados. Recomendado: INTA Rojo.';
    if (msg.includes('sorgo')) return '🌾 El sorgo es resistente a sequía. Ideal en Chontales.';
    return '🤖 No entiendo tu mensaje. Intenta mencionar una planta como "maíz", "frijol" o "sorgo".';
  };

  const enviarMensaje = () => {
    if (input.trim() === '') return;
    const nuevoMensaje = { id: Date.now().toString(), text: input, fromBot: false };
    const respuesta = { id: (Date.now() + 1).toString(), text: respuestasBot(input), fromBot: true };
    setMessages((prev) => [...prev, nuevoMensaje, respuesta]);
    setInput('');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={80}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Text style={styles.header}>🌾 Agrolink - ChatBot </Text>

            <FlatList
              ref={flatListRef}
              style={styles.chat}
              data={messages}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View
                  style={[
                    styles.messageBubble,
                    item.fromBot ? styles.bot : styles.user,
                  ]}
                >
                  <Text style={styles.messageText}>{item.text}</Text>
                </View>
              )}
              onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
              onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
              keyboardShouldPersistTaps="handled"
            />

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Escribe algo..."
                value={input}
                onChangeText={setInput}
                onSubmitEditing={enviarMensaje}
                returnKeyType="send"
              />
              <TouchableOpacity onPress={enviarMensaje} style={styles.sendButton}>
                <Text style={styles.sendText}>Enviar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef6f9',
    paddingHorizontal: 10,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 15,
    textAlign: 'center',
    color: '#2b2b2b',
  },
  chat: {
    flex: 1,
  },
  messageBubble: {
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
    maxWidth: '80%',
  },
  user: {
    backgroundColor: '#d1e7dd',
    alignSelf: 'flex-end',
  },
  bot: {
    backgroundColor: '#f8d7da',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderColor: '#aaa',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 45,
    backgroundColor: '#fff',
  },
  sendButton: {
    backgroundColor: '#6c5ce7',
    marginLeft: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
  },
  sendText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
