import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { getDatabase, ref, push, update } from 'firebase/database';
import { app } from '../BasedeDatos/Firebase';
import { Picker } from '@react-native-picker/picker';
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
  Feather,
  AntDesign,
} from '@expo/vector-icons';

const AgregarDatos = ({ navigation, route }) => {
  const [tipo, setTipo] = useState(route.params?.tipo || 'estadistica');
  const [formData, setFormData] = useState(route.params?.item || {});
  const [modoEdicion, setModoEdicion] = useState(!!route.params?.item);
  const db = getDatabase(app);

  const camposPorTipo = {
    estadistica: ['agricultor', 'grano', 'cantidad', 'personas', 'manzanas'],
    cultivos: ['agricultor', 'planta', 'fechaSiembra', 'fechaCorte', 'recomendaciones'],
    usuarios: ['nombre', 'email', 'empresa', 'telefono', 'descripcion'],
  };

  useEffect(() => {
    if (route.params?.item) {
      setFormData(route.params.item);
      setTipo(route.params.tipo);
      setModoEdicion(true);
    }
  }, [route.params]);

  const handleInputChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleGuardar = () => {
    const path =
      tipo === 'estadistica'
        ? 'Estadistica'
        : tipo === 'cultivos'
        ? 'cultivos'
        : 'usuarios';

    const datos = camposPorTipo[tipo].reduce((acc, campo) => {
      acc[campo] = formData[campo] || '';
      return acc;
    }, {});

    if (modoEdicion) {
      update(ref(db, `${path}/${formData.id}`), datos)
        .then(() => {
          Alert.alert('✅ Actualizado', 'Datos actualizados correctamente', [
            { text: 'OK', onPress: () => navigation.navigate('Misdatos') },
          ]);
        })
        .catch((err) => {
          Alert.alert('❌ Error', 'No se pudo actualizar');
          console.error(err);
        });
    } else {
      push(ref(db, path), datos)
        .then(() => {
          Alert.alert('✅ Guardado', 'Datos guardados correctamente', [
            { text: 'OK', onPress: () => navigation.navigate('Misdatos') },
          ]);
          setFormData({});
        })
        .catch((err) => {
          Alert.alert('❌ Error', 'No se pudieron guardar los datos');
          console.error(err);
        });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.header}>
        <MaterialCommunityIcons name="leaf" size={40} color="#00796b" />
        <Text style={styles.titulo}>{modoEdicion ? 'Editar Registro' : 'Agregar Nuevo Registro'}</Text>
        <FontAwesome5 name="seedling" size={36} color="#00796b" />
      </View>

      {!modoEdicion && (
        <>
          <Text style={styles.label}>
            <AntDesign name="form" size={20} color="#4caf50" /> Seleccionar Tipo:
          </Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={tipo}
              onValueChange={setTipo}
              dropdownIconColor="#4caf50"
              style={styles.picker}
            >
              <Picker.Item label="📊 Estadística" value="estadistica" />
              <Picker.Item label="🌾 Cultivos" value="cultivos" />
              <Picker.Item label="👤 Usuarios" value="usuarios" />
            </Picker>
          </View>
        </>
      )}

      {camposPorTipo[tipo].map((campo) => (
        <View key={campo} style={styles.inputGroup}>
          <Feather name="edit-2" size={20} color="#00796b" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder={`Ingrese ${campo}`}
            placeholderTextColor="#4caf50"
            value={formData[campo] || ''}
            onChangeText={(text) => handleInputChange(campo, text)}
          />
        </View>
      ))}

      <TouchableOpacity style={styles.botonGuardar} onPress={handleGuardar}>
        <Ionicons name="save-outline" size={24} color="white" style={{ marginRight: 8 }} />
        <Text style={styles.botonTexto}>{modoEdicion ? 'Actualizar' : 'Guardar'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#d0e8f2',
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#b2dfdb',
    padding: 15,
    borderRadius: 20,
    elevation: 6,
  },
  titulo: {
    fontSize: 24,
    fontWeight: '700',
    color: '#00796b',
    textAlign: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    color: '#4caf50',
    fontWeight: '700',
  },
  pickerWrapper: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    marginBottom: 20,
    borderColor: '#4caf50',
    borderWidth: 1,
    overflow: 'hidden',
  },
  picker: {
    color: '#00796b',
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderColor: '#4caf50',
    borderWidth: 1,
    borderRadius: 15,
    marginBottom: 15,
    paddingHorizontal: 10,
    elevation: 3,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: '#333',
  },
  botonGuardar: {
    backgroundColor: '#4caf50',
    marginTop: 20,
    paddingVertical: 14,
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },
  botonTexto: {
    fontSize: 18,
    color: 'white',
    fontWeight: '700',
  },
});

export default AgregarDatos;
