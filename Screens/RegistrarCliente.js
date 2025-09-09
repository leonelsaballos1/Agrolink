import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ScrollView, KeyboardAvoidingView, Platform,
} from 'react-native';
import { Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function RegistrarCliente({ route }) {
  const { guardarNuevo, clienteExistente, idCliente } = route.params;
  const [agricultor, setAgricultor] = useState('');
  const [planta, setPlanta] = useState('');
  const [diaSombra, setDiaSombra] = useState('');
  const [variedad, setVariedad] = useState('');
  const [diaCorte, setDiaCorte] = useState('');
  const [recomendaciones, setRecomendaciones] = useState('');
  const [modoEdicion, setModoEdicion] = useState(false);
  const [variedadesAbiertas, setVariedadesAbiertas] = useState(false);
  const navigation = useNavigation();

  const diasParaCortePorVariedad = {
    'Rojo de Seda': 90,
    'Rojo Chinandega': 95,
    'INTA Rojo': 85,
    'Negro Precoz': 80,
    'Negro Jamapa': 100,
    'Blanco Michigan': 90,
    'Blanco Nilo': 95,
    'Frijol bayo': 90,
    'Frijol azufrado': 85,
    'INTA Amarillo': 120,
    'Amarillo Duro': 115,
    'INTA Blanco': 110,
    'Blanco Chalateco': 105,
    'Morado o negro': 130,
    'Maíz dulce': 100,
    'Sorgo blanco': 90,
    'Sorgo INTA RCV': 100,
    'Sorgo rojo': 95,
    'Sorgo Sudanense': 105,
  };

  const variedadesPorPlanta = {
    'Frijol': [
      { nombre: 'Rojo de Seda', descripcion: 'Muy apreciado por su sabor y textura.' },
      { nombre: 'Rojo Chinandega', descripcion: 'Resistente a sequías.' },
      { nombre: 'INTA Rojo', descripcion: 'Variedad liberada por el INTA con buena producción.' },
      { nombre: 'Negro Precoz', descripcion: 'Ciclo corto, buena adaptación a zonas húmedas.' },
      { nombre: 'Negro Jamapa', descripcion: 'Muy usado en zonas de México y Centroamérica.' },
      { nombre: 'Blanco Michigan', descripcion: 'Grano pequeño y rápido de cocción.' },
      { nombre: 'Blanco Nilo', descripcion: 'Resistente a ciertas enfermedades.' },
      { nombre: 'Frijol bayo', descripcion: 'De color café claro.' },
      { nombre: 'Frijol azufrado', descripcion: 'Color amarillento.' },
    ],
    'Maíz': [
      { nombre: 'INTA Amarillo', descripcion: 'Resistente y con buena calidad de grano.' },
      { nombre: 'Amarillo Duro', descripcion: 'Para alimento humano y forraje.' },
      { nombre: 'INTA Blanco', descripcion: 'Ideal para tortillas y consumo local.' },
      { nombre: 'Blanco Chalateco', descripcion: 'Buen rendimiento en tierras altas.' },
      { nombre: 'Morado o negro', descripcion: 'Usado en bebidas tradicionales como el pinolillo o atole.' },
      { nombre: 'Maíz dulce', descripcion: 'De consumo fresco, más usado en horticultura.' },
    ],
    'Sorgo': [
      { nombre: 'Sorgo blanco', descripcion: 'Ideal para harina y consumo humano.' },
      { nombre: 'Sorgo INTA RCV', descripcion: 'Resistente a plagas y sequía.' },
      { nombre: 'Sorgo rojo', descripcion: 'Más resistente al ataque de pájaros.' },
      { nombre: 'Sorgo Sudanense', descripcion: 'Híbrido usado para pasto y forraje.' },
    ],
  };

  const recomendacionesBase = {
    'Frijol': {
      'Rojo de Seda': 'Regar cada 3 días, evitar exceso de humedad.',
      'Rojo Chinandega': 'Regar cada 4 días, buena ventilación.',
      'INTA Rojo': 'Regar cada 3 días, proteger de plagas.',
      'Negro Precoz': 'Riego moderado cada 3 días.',
      'Negro Jamapa': 'Riego cada 4 días, controlar malezas.',
      'Blanco Michigan': 'Riego frecuente cada 3 días.',
      'Blanco Nilo': 'Regar cada 4 días, evitar encharcamientos.',
      'Frijol bayo': 'Riego cada 3 días, fertilizar cada 15 días.',
      'Frijol azufrado': 'Regar cada 3 días, buen drenaje.',
    },
    'Maíz': {
      'INTA Amarillo': 'Regar cada 5 días, controlar malezas.',
      'Amarillo Duro': 'Riego moderado cada 5 días.',
      'INTA Blanco': 'Regar cada 4-5 días, buena exposición solar.',
      'Blanco Chalateco': 'Riego cada 5 días, protección contra plagas.',
      'Morado o negro': 'Riego cada 6 días, control de insectos.',
      'Maíz dulce': 'Regar cada 3 días, suelo bien drenado.',
    },
    'Sorgo': {
      'Sorgo blanco': 'Regar cada 6 días, evitar encharcamientos.',
      'Sorgo INTA RCV': 'Riego moderado cada 6 días.',
      'Sorgo rojo': 'Regar cada 5 días, protección contra aves.',
      'Sorgo Sudanense': 'Riego cada 6 días, buen drenaje.',
    },
  };

  useEffect(() => {
    if (clienteExistente) {
      setModoEdicion(true);
      setAgricultor(clienteExistente.agricultor || '');
      setPlanta(clienteExistente.planta || '');
      setDiaSombra(clienteExistente.diaSombra || '');
      setVariedad(clienteExistente.variedad || '');
      setDiaCorte(clienteExistente.diaCorte || '');
      setRecomendaciones(clienteExistente.recomendaciones || '');
    }
  }, [clienteExistente]);

  const sumarDiasFecha = (fechaStr, dias) => {
    if (!fechaStr) return '';
    const partes = fechaStr.split('-');
    if (partes.length !== 3) return '';
    const fecha = new Date(Number(partes[0]), Number(partes[1]) - 1, Number(partes[2]));
    fecha.setDate(fecha.getDate() + dias);
    const yyyy = fecha.getFullYear();
    const mm = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const dd = fecha.getDate().toString().padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  useEffect(() => {
    if (diaSombra && variedad && diasParaCortePorVariedad[variedad]) {
      const diasParaCorte = diasParaCortePorVariedad[variedad];
      const fechaCorteCalculada = sumarDiasFecha(diaSombra, diasParaCorte);
      setDiaCorte(fechaCorteCalculada);
    }
  }, [diaSombra, variedad]);

  useEffect(() => {
    if (planta && variedad && recomendacionesBase[planta] && recomendacionesBase[planta][variedad]) {
      setRecomendaciones(recomendacionesBase[planta][variedad]);
    }
  }, [planta, variedad]);

  const Guardar = () => {
    if (!agricultor || !planta) {
      Alert.alert('Faltan datos', 'Por favor, complete el nombre del agricultor y la planta');
      return;
    }

    const nuevoCliente = {
      agricultor,
      planta,
      diaSombra,
      variedad,
      diaCorte,
      recomendaciones,
    };

    guardarNuevo(nuevoCliente, modoEdicion ? idCliente : null);

    Alert.alert(
      modoEdicion ? 'Datos actualizados' : 'Registro guardado',
      '',
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ],
      { cancelable: false }
    );
  };

  const formatearFecha = (texto) => {
    let soloNumeros = texto.replace(/[^0-9]/g, '');
    if (soloNumeros.length > 4 && soloNumeros.length <= 6) {
      soloNumeros = soloNumeros.slice(0, 4) + '-' + soloNumeros.slice(4);
    }
    if (soloNumeros.length > 6) {
      soloNumeros = soloNumeros.slice(0, 4) + '-' + soloNumeros.slice(4, 6) + '-' + soloNumeros.slice(6, 8);
    }
    return soloNumeros.slice(0, 10);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <Text style={styles.title}>{modoEdicion ? 'Editar Registro' : 'Registrar Agricultor'}</Text>

          <Text style={styles.label}>Nombre del agricultor:</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="person" size={20} color="green" />
            <TextInput
              style={styles.input}
              value={agricultor}
              placeholder="Ej: Juan Pérez"
              onChangeText={setAgricultor}
            />
          </View>

          <Text style={styles.label}>Nombre de planta:</Text>
          <View style={styles.genderContainer}>
            {['Maíz', 'Frijol', 'Sorgo'].map((plantaTipo) => (
              <TouchableOpacity
                key={plantaTipo}
                style={[styles.genderButton, planta === plantaTipo && styles.genderSelected]}
                onPress={() => {
                  setPlanta(plantaTipo);
                  setVariedad('');
                  setVariedadesAbiertas(false);
                  setDiaCorte('');
                }}
              >
                <Text style={[styles.genderText, planta === plantaTipo && styles.genderTextSelected]}>
                  {plantaTipo}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Día de sombra:</Text>
          <View style={styles.inputContainer}>
            <MaterialIcons name="calendar-today" size={20} color="green" />
            <TextInput
              style={styles.input}
              placeholder="YYYY-MM-DD"
              value={diaSombra}
              onChangeText={(texto) => setDiaSombra(formatearFecha(texto))}
              keyboardType="numeric"
            />
          </View>

          <Text style={styles.label}>Tipo de variedad:</Text>
          {planta ? (
            <View>
              <TouchableOpacity
                style={[styles.genderButton, variedadesAbiertas && styles.genderSelected]}
                onPress={() => setVariedadesAbiertas(!variedadesAbiertas)}
              >
                <Text style={[styles.genderText, variedadesAbiertas && styles.genderTextSelected]}>
                  {variedad || 'Selecciona una variedad'}
                </Text>
                <Ionicons
                  name={variedadesAbiertas ? 'chevron-up' : 'chevron-down'}
                  size={20}
                  color={variedadesAbiertas ? '#fff' : '#4caf50'}
                  style={{ marginLeft: 8 }}
                />
              </TouchableOpacity>

              {variedadesAbiertas && (
                <ScrollView style={{ maxHeight: 150, marginTop: 10 }}>
                  {variedadesPorPlanta[planta].map(({ nombre }) => (
                    <TouchableOpacity
                      key={nombre}
                      style={[styles.genderButton, variedad === nombre && styles.genderSelected]}
                      onPress={() => {
                        setVariedad(nombre);
                        setVariedadesAbiertas(false);
                      }}
                    >
                      <Text style={[styles.genderText, variedad === nombre && styles.genderTextSelected]}>
                        {nombre}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              )}

              {variedad ? (
                <View style={{ paddingHorizontal: 15, marginBottom: 10 }}>
                  <Text style={{ fontStyle: 'italic', color: '#555' }}>
                    {variedadesPorPlanta[planta].find(v => v.nombre === variedad)?.descripcion}
                  </Text>
                </View>
              ) : null}
            </View>
          ) : (
            <Text style={{ color: 'red', marginTop: 5 }}>Selecciona primero el nombre de planta</Text>
          )}

          <Text style={styles.label}>Día de corte:</Text>
          <View style={styles.inputContainer}>
            <MaterialIcons name="calendar-today" size={20} color="green" />
            <TextInput
              style={styles.input}
              placeholder="YYYY-MM-DD"
              value={diaCorte}
              editable={false}
            />
          </View>

          <Text style={styles.label}>Recomendaciones:</Text>
          <View style={[styles.inputContainer, { minHeight: 80 }]}>
            <FontAwesome name="pencil" size={20} color="green" />
            <TextInput
              style={[styles.input, { height: 80, textAlignVertical: 'top' }]}
              multiline
              value={recomendaciones}
              onChangeText={setRecomendaciones}
              placeholder="Recomendaciones para el cultivo..."
            />
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={Guardar}>
            <Text style={styles.saveButtonText}>{modoEdicion ? 'Actualizar' : 'Guardar'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#d0e8f2' },
  scrollContainer: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 20, textAlign: 'center' },
  label: { fontSize: 16, fontWeight: '600', marginTop: 10 },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0f7fa',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  input: { flex: 1, height: 40, marginLeft: 10 },
  genderContainer: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 15, flexWrap: 'wrap' },
  genderButton: {
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: '#4caf50',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    margin: 4,
    alignItems: 'center',
  },
  genderSelected: { backgroundColor: '#4caf50' },
  genderText: { marginLeft: 5, fontWeight: '600', color: '#4caf50' },
  genderTextSelected: { color: '#fff' },
  saveButton: {
    flexDirection: 'row',
    backgroundColor: '#4caf50',
    padding: 14,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  saveButtonText: { color: '#fff', fontWeight: '700', fontSize: 18, marginLeft: 10 },
});
