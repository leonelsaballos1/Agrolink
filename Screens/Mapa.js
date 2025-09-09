import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';

export default function Mapa() {
  const [busqueda, setBusqueda] = useState('');


  const datosZonas = [
    {
      nombre: 'León',
      cultivo: 'Maíz',
      coordenadas: { latitude: 12.4372, longitude: -86.8786 },
      info: '🌽 Maíz\nVariedades: NB-6, INTA-Nutrader\nRiego opcional',
      color: 'yellow'
    },
    {
      nombre: 'Madriz',
      cultivo: 'Frijoles',
      coordenadas: { latitude: 13.4708, longitude: -86.4596 },
      info: '🌱 Frijoles\nVariedades: INTA Rojo, Sequía\nRiego estacional',
      color: 'red'
    },
    {
      nombre: 'Chontales',
      cultivo: 'Sorgo',
      coordenadas: { latitude: 11.8604, longitude: -85.1234 },
      info: '🌾 Sorgo\nVariedades: INTA RCV, Tortillero\nResistente a sequía',
      color: 'orange'
    },
  ];

  // Filtrado por búsqueda
  const zonasFiltradas = datosZonas.filter((zona) =>
    `${zona.nombre} ${zona.cultivo} ${zona.info}`.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🗺️ Zonas de Cultivo en Nicaragua</Text>

      {/* Buscador */}
      <View style={styles.buscador}>
        <Ionicons name="search" size={20} color="gray" style={styles.icono} />
        <TextInput
          placeholder="Buscar: maíz, frijoles, sorgo..."
          style={styles.input}
          value={busqueda}
          onChangeText={setBusqueda}
        />
      </View>

      {/* Mapa */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 12.8654,
          longitude: -85.2072,
          latitudeDelta: 4,
          longitudeDelta: 4,
        }}
      >
        {zonasFiltradas.map((zona, index) => (
          <Marker
            key={index}
            coordinate={zona.coordenadas}
            pinColor={zona.color} // Color del marcador según el cultivo
          >
            <Callout>
              <View style={styles.callout}>
                <Text style={styles.calloutTitle}>
                  📍 {zona.nombre} ({zona.cultivo})
                </Text>
                <Text>{zona.info}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      {/* Mensaje si no hay resultados */}
      {zonasFiltradas.length === 0 && (
        <Text style={styles.noResult}>❌ No se encontraron coincidencias.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#fff',
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  buscador: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  icono: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
  },
  map: {
    flex: 1,
    borderRadius: 8,
  },
  callout: {
    width: 200,
  },
  calloutTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  noResult: {
    textAlign: 'center',
    color: 'gray',
    marginTop: 10,
  },
});
