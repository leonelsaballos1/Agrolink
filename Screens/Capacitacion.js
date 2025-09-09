import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function CapacitacionesEnLinea() {
  const capacitaciones = [
    {
      nombreCapacitador: 'Laura Fernández',
      correo: 'laura.fernandez@consult.com',
      telefono: '+505 57321478',
      fecha: 'Lunes 3 de junio, 10:00 AM',
      duracion: '2 horas',
      plataforma: 'Zoom',
      enlace: 'Unirse a la capacitación',
      idReunion: '123 4567 890',
      codigoAcceso: 'PROY2025'
    },
    {
      nombreCapacitador: 'Juan Granado',
      correo: 'juan.granado@.com',
      telefono: '+505 55642199',
      fecha: 'Lunes 30 de junio, 11:00 AM',
      duracion: '2 horas',
      plataforma: 'Zoom',
      enlace: 'Unirse a la capacitación',
      idReunion: '125 1234 670',
      codigoAcceso: 'WERD2025'
    },
    {
      nombreCapacitador: 'Ana Gómez',
      correo: 'ana.gomez@capacitacion.com',
      telefono: '+505 78945612',
      fecha: 'Martes 10 de julio, 9:00 AM',
      duracion: '3 horas',
      plataforma: 'Google Meet',
      enlace: 'Unirse a la capacitación',
      idReunion: '999 1111 222',
      codigoAcceso: 'GOMEET2025'
    },
    {
      nombreCapacitador: 'Carlos Méndez',
      correo: 'carlos.mendez@agricultura.com',
      telefono: '+505 12345678',
      fecha: 'Viernes 14 de julio, 2:00 PM',
      duracion: '1.5 horas',
      plataforma: 'Microsoft Teams',
      enlace: 'Unirse a la capacitación',
      idReunion: '456 7890 123',
      codigoAcceso: 'TEAMS2025'
    },
    {
      nombreCapacitador: 'María López',
      correo: 'maria.lopez@tecnicos.com',
      telefono: '+505 65498732',
      fecha: 'Lunes 17 de julio, 10:00 AM',
      duracion: '2 horas',
      plataforma: 'Zoom',
      enlace: 'Unirse a la capacitación',
      idReunion: '789 1234 567',
      codigoAcceso: 'ZOOM2025'
    },
    {
      nombreCapacitador: 'Pedro Ruiz',
      correo: 'pedro.ruiz@capacitacion.com',
      telefono: '+505 32165498',
      fecha: 'Miércoles 20 de julio, 4:00 PM',
      duracion: '2 horas',
      plataforma: 'Zoom',
      enlace: 'Unirse a la capacitación',
      idReunion: '321 6547 890',
      codigoAcceso: 'RUZ2025'
    }
  ];

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <Text style={styles.header}>👨‍🌾 Capacitaciones en línea </Text>
      {capacitaciones.map((item, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.sectionHeader}>🧑‍🏫 Capacitador</Text>
          <Text>• Nombre: {item.nombreCapacitador}</Text>
          <Text>• Correo electrónico: {item.correo}</Text>
          <Text>• Teléfono de contacto: {item.telefono}</Text>

          <Text style={styles.sectionHeader}>📅 Fecha y Hora</Text>
          <Text>• Inicio: {item.fecha}</Text>
          <Text>• Duración: {item.duracion}</Text>

          <Text style={styles.sectionHeader}>💻 Acceso a la sesión</Text>
          <Text>• Plataforma: {item.plataforma}</Text>
          <Text>• Enlace: {item.enlace}</Text>
          <Text>• ID de reunión: {item.idReunion}</Text>
          <Text>• Código de acceso: {item.codigoAcceso}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: 16,
    paddingTop: 60,
    backgroundColor: '#E8F5E9'  
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#2E7D32'  
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 5,
    borderLeftColor: '#66BB6A'
  },
  sectionHeader: {
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 4,
    fontSize: 16,
    color: '#388E3C'  
  }
});
