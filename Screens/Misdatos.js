import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SectionList,
  StyleSheet,
  Alert,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { getDatabase, ref, onValue, remove } from 'firebase/database';
import { app } from '../BasedeDatos/Firebase';
import { Ionicons } from '@expo/vector-icons';

const Misdatos = ({ navigation }) => {
  const [secciones, setSecciones] = useState([]);
  const [searchText, setSearchText] = useState('');
  const db = getDatabase(app);

  useEffect(() => {
    const refs = {
      estadistica: ref(db, 'Estadistica'),
      cultivos: ref(db, 'cultivos'),
      usuarios: ref(db, 'usuarios'),
    };

    const listeners = Object.entries(refs).map(([type, dbRef]) =>
      onValue(dbRef, snapshot => {
        const data = snapshot.val() || {};
        const items = Object.entries(data).map(([id, value]) => ({ id, ...value }));
        updateSection(type, getTitle(type), items);
      })
    );

    return () => listeners.forEach(unsub => unsub());
  }, []);

  const getTitle = (type) =>
    type === 'estadistica'
      ? '📊 Estadística'
      : type === 'cultivos'
      ? '🌾 Cultivos'
      : '👤 Usuarios';

  const updateSection = (type, title, items) => {
    setSecciones((prev) => {
      const others = prev.filter((sec) => sec.type !== type);
      return [...others, { title, type, data: items }];
    });
  };

  const handleDelete = (type, id) => {
    const path = type === 'estadistica' ? 'Estadistica' : type;
    Alert.alert('Confirmar eliminación', '¿Eliminar este registro?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Eliminar', style: 'destructive', onPress: () => remove(ref(db, `${path}/${id}`)) },
    ]);
  };

  const handleEdit = (type, item) => {
    navigation.navigate('AgregarDatos', { tipo: type, item });
  };

  const handleAddNew = () => {
    navigation.navigate('AgregarDatos');
  };

  const camposPorTipo = {
    estadistica: ['agricultor', 'grano', 'cantidad', 'personas', 'manzanas'],
    cultivos: ['agricultor', 'planta', 'fechaSiembra', 'fechaCorte', 'recomendaciones'],
    usuarios: ['nombre', 'email', 'empresa', 'telefono', 'descripcion'],
  };

  // Función para filtrar datos con el texto de búsqueda
  const filtrarSecciones = () => {
    if (!searchText.trim()) return secciones;
    const texto = searchText.toLowerCase();

    return secciones
      .map((sec) => {
        const datosFiltrados = sec.data.filter((item) =>
          camposPorTipo[sec.type].some((campo) =>
            (item[campo] ?? '').toString().toLowerCase().includes(texto)
          )
        );
        return { ...sec, data: datosFiltrados };
      })
      .filter((sec) => sec.data.length > 0);
  };

  const renderItem = ({ item, section }) => (
    <View style={styles.card}>
      {camposPorTipo[section.type].map((f) => (
        <Text key={f} style={styles.item}>
          <Text style={styles.label}>{f}: </Text>
          {item[f] ?? 'No registrado'}
        </Text>
      ))}
      <View style={styles.buttonRow}>
        <TouchableOpacity onPress={() => handleEdit(section.type, item)} style={styles.editBtn}>
          <Ionicons name="create-outline" size={22} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(section.type, item.id)} style={styles.deleteBtn}>
          <Ionicons name="trash-outline" size={22} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.addBtn} onPress={handleAddNew}>
        <Ionicons name="add-circle-outline" size={24} color="white" />
        <Text style={styles.addBtnText}>Agregar nuevo</Text>
      </TouchableOpacity>

      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#4caf50" />
        <TextInput
          placeholder="Buscar registros..."
          style={styles.inputBuscar}
          value={searchText}
          onChangeText={setSearchText}
          clearButtonMode="always"
        />
      </View>

      <SectionList
        sections={filtrarSecciones()}
        keyExtractor={(item) => item.id}
        renderSectionHeader={({ section }) => <Text style={styles.header}>{section.title}</Text>}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.empty}>No hay datos disponibles.</Text>}
      />
    </SafeAreaView>
  );
};

export default Misdatos;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#d0e8f2', padding: 20 },
  header: { fontSize: 24, fontWeight: '700', marginVertical: 12, color: '#00796b' },
  addBtn: {
    backgroundColor: '#4caf50',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 50,
    marginBottom: 15,
    justifyContent: 'center',
    elevation: 6,
  },
  addBtnText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
    marginLeft: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#4caf50',
    marginBottom: 15,
    alignItems: 'center',
  },
  inputBuscar: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
    color: '#333',
    marginLeft: 8,
  },
  card: {
    backgroundColor: '#e0f7fa',
    borderRadius: 16,
    marginBottom: 15,
    padding: 20,
    elevation: 6,
  },
  item: { fontSize: 16, marginBottom: 6, color: '#333', fontWeight: '600' },
  label: { fontWeight: '700', color: '#00796b' },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 10,
  },
 editBtn: {
    backgroundColor: '#42a5f5',
    padding: 10,
    borderRadius: 30,
  },
  deleteBtn: {
    backgroundColor: '#ef5350',
    padding: 10,
    borderRadius: 30,
  },
  empty: {
    fontStyle: 'italic',
    color: '#999',
    textAlign: 'center',
    marginTop: 30,
  },
});
