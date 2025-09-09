import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, FlatList, StyleSheet, Alert,
  TouchableOpacity, Animated, TextInput,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  collection, doc, setDoc, deleteDoc,
  onSnapshot, addDoc, getFirestore
} from 'firebase/firestore';
import appFirebase from '../BasedeDatos/Firebase';

const db = getFirestore(appFirebase);

export default function ListarClientes({ navigation }) {
  const [clientes, setClientes] = useState([]);
  const [busquedaTexto, setBusquedaTexto] = useState('');
  const [mostrarBuscador, setMostrarBuscador] = useState(false);
  const searchHeight = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;

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

  const toggleBuscador = () => {
    setMostrarBuscador((prev) => {
      const nextState = !prev;
      Animated.timing(searchHeight, {
        toValue: nextState ? 60 : 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
      return nextState;
    });
  };

  const guardarNuevo = async (cliente, idExistente = null) => {
    try {
      if (idExistente) {
        await setDoc(doc(db, 'clientes', idExistente), cliente);
      } else {
        await addDoc(collection(db, 'clientes'), {
          ...cliente,
          fechaRegistro: new Date(),
        });
      }
    } catch (error) {
      console.error('Error al guardar cliente:', error);
    }
  };

  const eliminarCliente = (id) => {
    Alert.alert('Confirmar', '¿Desea eliminar este agricultor?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        onPress: async () => {
          await deleteDoc(doc(db, 'clientes', id));
        },
        style: 'destructive',
      },
    ]);
  };

  const texto = busquedaTexto.toLowerCase();
  const clientesFiltrados = clientes.filter((item) =>
    item.agricultor?.toLowerCase().includes(texto)
  );

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={{ flex: 1 }}>
        <Text style={styles.text}><Text style={styles.label}>Nombre:</Text> {item.agricultor}</Text>
        <Text style={styles.text}><Text style={styles.label}>Planta:</Text> {item.planta}</Text>
        <Text style={styles.text}><Text style={styles.label}>Día sombra:</Text> {item.diaSombra}</Text>
        <Text style={styles.text}><Text style={styles.label}>Variedad:</Text> {item.variedad}</Text>
        <Text style={styles.text}><Text style={styles.label}>Día corte:</Text> {item.diaCorte}</Text>
        <Text style={styles.text}><Text style={styles.label}>Recomendación:</Text> {item.recomendaciones}</Text>
      </View>

      <View style={styles.botones}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('RegistrarCliente', {
              guardarNuevo,
              clienteExistente: item,
              idCliente: item.id,
            })
          }
          style={styles.botonEditar}
        >
          <MaterialCommunityIcons name="square-edit-outline" size={30} color="#1976d2" />
        </TouchableOpacity>

        <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
          <TouchableOpacity
            onPress={() => eliminarCliente(item.id)}
            style={styles.botonEliminar}
            onPressIn={() => Animated.spring(scaleValue, { toValue: 0.85, useNativeDriver: true }).start()}
            onPressOut={() => Animated.spring(scaleValue, { toValue: 1, useNativeDriver: true }).start()}
          >
            <MaterialCommunityIcons name="trash-can-outline" size={30} color="#e53935" />
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Agricultores</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <TouchableOpacity onPress={toggleBuscador} style={styles.botonAgregar}>
            <MaterialCommunityIcons name="magnify" size={28} color="#4caf50" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('RegistrarCliente', { guardarNuevo })
            }
            style={styles.botonAgregar}
          >
            <MaterialCommunityIcons name="account-plus-outline" size={32} color="#4caf50" />
          </TouchableOpacity>
        </View>
      </View>

      <Animated.View style={[styles.searchContainer, { height: searchHeight }]}>
        <TextInput
          placeholder="Buscar agricultor por nombre..."
          style={styles.inputBuscar}
          value={busquedaTexto}
          onChangeText={setBusquedaTexto}
        />
      </Animated.View>

      <FlatList
        data={clientesFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 50 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#d0e8f2', padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  title: { fontSize: 26, fontWeight: '700' },
  botonAgregar: { backgroundColor: '#d0e8f2', padding: 10, borderRadius: 50, elevation: 8 },
  searchContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#4caf50',
    marginBottom: 15,
    justifyContent: 'center',
  },
  inputBuscar: {
    fontSize: 16,
    paddingVertical: 8,
    color: '#333',
  },
  item: {
    backgroundColor: '#e0f7fa',
    borderRadius: 16,
    marginBottom: 15,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 6,
  },
  text: { fontSize: 16, marginBottom: 6, color: '#333', fontWeight: '600' },
  label: { fontWeight: '700', color: '#00796b' },
  botones: { justifyContent: 'center', alignItems: 'center', gap: 10 },
  botonEditar: { backgroundColor: '#bbdefb', padding: 8, borderRadius: 30 },
  botonEliminar: { backgroundColor: '#ffcdd2', padding: 8, borderRadius: 30 },
});
