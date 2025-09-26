import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { FontAwesome5, Entypo, Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function AgricultoresAsociados() {
  const agricultores = [
    {
      nombre: 'José Martínez López',
      edad: 48,
      dni: '001-230548-0001L',
      sexo: 'Masculino',
      provincia: 'Boaco',
      localidad: 'Camoapa',
      direccion: 'Comarca El Tamarindo, Km 10 carretera a San Lorenzo',
      zona: 'Rural',
      telefono: '+505 87541236',
      email: 'jose.martinez@agronica.com.ni',
      whatsapp: 'Sí ✓',
      tipoAgricultor: 'Pequeño productor',
      cultivos: 'Maíz blanco, Frijol rojo',
      sistemaRiego: 'Tradicional y goteo',
      certificaciones: 'Buenas Prácticas Agrícolas (BPA)'
    },
    {
      nombre: 'María González Cruz',
      edad: 38,
      dni: '002-140692-0002P',
      sexo: 'Femenino',
      provincia: 'Matagalpa',
      localidad: 'San Ramón',
      direccion: 'Barrio El Progreso, contiguo a la iglesia católica',
      zona: 'Urbana',
      telefono: '+505 89453322',
      email: 'maria.gonzalez@agronica.com.ni',
      whatsapp: 'Sí ✓',
      tipoAgricultor: 'Mediana productora',
      cultivos: 'Café, Maíz amarillo',
      sistemaRiego: 'Por aspersión',
      certificaciones: 'Certificación Orgánica'
    },
    {
      nombre: 'Luis Alberto Gutiérrez',
      edad: 56,
      dni: '003-101068-0003J',
      sexo: 'Masculino',
      provincia: 'Chontales',
      localidad: 'Juigalpa',
      direccion: 'Reparto Los Laureles, casa #34',
      zona: 'Semiurbana',
      telefono: '+505 84226600',
      email: 'luis.gutierrez@agronica.com.ni',
      whatsapp: 'Sí ✓',
      tipoAgricultor: 'Productor cooperativo',
      cultivos: 'Sorgo, Arroz',
      sistemaRiego: 'Acequia',
      certificaciones: 'BPA y Comercio Justo'
    }
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.header}>🌾 Agricultores Asociados</Text>

      {agricultores.map((agricultor, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.sectionHeader}>
            <FontAwesome5 name="user" size={16} color="#4CAF50" /> Datos Personales
          </Text>
          <Text>👤 Nombre: {agricultor.nombre}</Text>
          <Text>🎂 Edad: {agricultor.edad} años</Text>
          <Text>🆔 Cédula: {agricultor.dni}</Text>
          <Text>🚻 Sexo: {agricultor.sexo}</Text>

          <Text style={styles.sectionHeader}>
            <Entypo name="location-pin" size={16} color="#E91E63" /> Ubicación
          </Text>
          <Text>🗺️ Departamento: {agricultor.provincia}</Text>
          <Text>🏘️ Municipio: {agricultor.localidad}</Text>
          <Text>🏠 Dirección: {agricultor.direccion}</Text>
          <Text>🌄 Zona: {agricultor.zona}</Text>

          <Text style={styles.sectionHeader}>
            <MaterialIcons name="contacts" size={16} color="#2196F3" /> Contacto
          </Text>
          <Text>📞 Teléfono: {agricultor.telefono}</Text>
          <Text>📧 Correo: {agricultor.email}</Text>
          <Text>💬 WhatsApp: {agricultor.whatsapp}</Text>

          <Text style={styles.sectionHeader}>
            <MaterialCommunityIcons name="tractor-variant" size={16} color="#FF9800" /> Producción
          </Text>
          <Text>🏡 Tipo: {agricultor.tipoAgricultor}</Text>
          <Text>🌽 Cultivos: {agricultor.cultivos}</Text>
          <Text>💧 Riego: {agricultor.sistemaRiego}</Text>
          <Text>✅ Certificaciones: {agricultor.certificaciones}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0FFF0',
  },
  scrollContainer: {
    padding: 16,
    paddingTop: 60,
    paddingBottom: 100,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#388E3C'
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    marginBottom: 18,
    borderRadius: 15,
    borderLeftWidth: 6,
    borderLeftColor: '#4CAF50',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4
  },
  sectionHeader: {
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 6,
    fontSize: 16,
    color: '#333'
  }
});
