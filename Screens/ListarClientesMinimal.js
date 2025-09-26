// Screens/ListarClientesMinimal.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { collection, onSnapshot, getFirestore } from 'firebase/firestore';
import appFirebase from '../BasedeDatos/Firebase';

const db = getFirestore(appFirebase);

export default function ListarClientesMinimal() {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const refClientes = collection(db, 'clientes');
    const unsubscribe = onSnapshot(refClientes, (snapshot) => {
      const lista = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      }));
      lista.sort((a, b) => b.fechaRegistro?.toDate?.() - a.fechaRegistro?.toDate?.());
      setClientes(lista);
    });

    return () => unsubscribe();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.text}><Text style={styles.label}>Nombre:</Text> {item.agricultor}</Text>
      <Text style={styles.text}><Text style={styles.label}>Planta:</Text> {item.planta}</Text>
      <Text style={styles.text}><Text style={styles.label}>Variedad:</Text> {item.variedad}</Text>
      <Text style={styles.text}><Text style={styles.label}>Día de Corte:</Text> {item.diaCorte}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={clientes}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 50 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#d0e8f2', padding: 20 },
  item: { backgroundColor: '#e0f7fa', borderRadius: 12, padding: 15, marginBottom: 12 },
  text: { fontSize: 16, color: '#333', marginBottom: 5 },
  label: { fontWeight: '700', color: '#00796b' },
});
