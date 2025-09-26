// CapacitacionesEnLinea.js
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  TextInput,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function CapacitacionesEnLinea() {
  const navigation = useNavigation();

  const [capacitaciones, setCapacitaciones] = useState([
    {
      id: 1,
      nombreCapacitador: "Laura Fernández",
      correo: "laura.fernandez@consult.com",
      telefono: "+505 57321478",
      fecha: "Lunes 3 de junio, 10:00 AM",
      duracion: "2 horas",
      plataforma: "Zoom",
      enlace: "https://zoom.us/j/1234567890",
      idReunion: "123 4567 890",
      codigoAcceso: "PROY2025",
    },
    {
      id: 2,
      nombreCapacitador: "Juan Granado",
      correo: "juan.granado@.com",
      telefono: "+505 55642199",
      fecha: "Lunes 30 de junio, 11:00 AM",
      duracion: "2 horas",
      plataforma: "Zoom",
      enlace: "https://zoom.us/j/1251234670",
      idReunion: "125 1234 670",
      codigoAcceso: "WERD2025",
    },
  ]);

  const [busqueda, setBusqueda] = useState("");

  // 🔹 Videos
  const videos = [
    {
      titulo: "Cultivo de frijoles en Nicaragua",
      url: "https://www.youtube.com/watch?v=qmnq5XVSxDY",
    },
    {
      titulo: "Siembra de frijol en el ciclo de primera",
      url: "https://www.youtube.com/watch?v=xKJ_IJ3DX2M",
    },
    {
      titulo: "Producción del cultivo de maíz en época de primera",
      url: "https://www.youtube.com/watch?v=3SoHBbmjaD4",
    },
    {
      titulo: "Cultivo de maíz amarillo duro megahíbrido",
      url: "https://www.youtube.com/watch?v=eF91WTKdMzw",
    },
    {
      titulo: "Productores cuentan experiencias en cultivar sorgo",
      url: "https://www.youtube.com/watch?v=e2DJxK83yG4",
    },
    {
      titulo: "Manejo de semilla y establecimiento del cultivo de sorgo",
      url: "https://www.youtube.com/watch?v=PuXUcNt_YHY",
    },
  ];

  // 🔹 Documentos
  const documentos = [
    {
      titulo: "Guía técnica para el cultivo de frijoles en Nicaragua",
      url: "https://inta.gob.ni/documentos/guia_tecnica_frijoles.pdf",
    },
    {
      titulo: "Manual de buenas prácticas agrícolas para maíz",
      url: "https://inta.gob.ni/documentos/manual_bpa_maiz.pdf",
    },
    {
      titulo: "Recomendaciones para el cultivo de sorgo en Nicaragua",
      url: "https://inta.gob.ni/documentos/recomendaciones_sorgo.pdf",
    },
  ];

  // Función para borrar
  const handleBorrar = (id) => {
    Alert.alert("⚠️ Confirmar", "¿Deseas eliminar esta capacitación?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: () =>
          setCapacitaciones(capacitaciones.filter((c) => c.id !== id)),
      },
    ]);
  };

  // Filtrar por búsqueda
  const capacitacionesFiltradas = capacitaciones.filter((c) =>
    c.nombreCapacitador.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      {/* Cabecera */}
      <Text style={styles.header}>👨‍🌾 Capacitaciones en línea</Text>

      {/* Buscar */}
      <TextInput
        style={styles.searchInput}
        placeholder="🔍 Buscar por capacitador..."
        value={busqueda}
        onChangeText={setBusqueda}
      />

      {/* Botón agregar */}
      <TouchableOpacity
        style={[styles.linkButton, { backgroundColor: "#2196F3", marginBottom: 20 }]}
        onPress={() =>
          navigation.navigate("AgregarCapacitacion", {
            onGuardar: (nueva) =>
              setCapacitaciones([...capacitaciones, { ...nueva, id: Date.now() }]),
          })
        }
      >
        <Ionicons name="add-circle" size={20} color="#fff" />
        <Text style={styles.linkText}>Agregar Capacitación</Text>
      </TouchableOpacity>

      {/* Lista */}
      {capacitacionesFiltradas.map((item) => (
        <View key={item.id} style={styles.card}>
          <Text style={styles.sectionHeader}>🧑‍🏫 {item.nombreCapacitador}</Text>
          <Text>• Correo: {item.correo}</Text>
          <Text>• Teléfono: {item.telefono}</Text>
          <Text>• Fecha: {item.fecha}</Text>
          <Text>• Duración: {item.duracion}</Text>
          <Text>• Plataforma: {item.plataforma}</Text>

          <TouchableOpacity onPress={() => Linking.openURL(item.enlace)}>
            <Text style={styles.linkInline}>🔗 Abrir enlace</Text>
          </TouchableOpacity>
          <Text>• ID: {item.idReunion}</Text>
          <Text>• Código: {item.codigoAcceso}</Text>

          {/* Botones de acción */}
          <View style={styles.actions}>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: "#FFA000" }]}
              onPress={() =>
                navigation.navigate("AgregarCapacitacion", {
                  capacitacion: item,
                  onActualizar: (actualizada) =>
                    setCapacitaciones(
                      capacitaciones.map((c) =>
                        c.id === item.id ? { ...actualizada, id: item.id } : c
                      )
                    ),
                })
              }
            >
              <Ionicons name="create" size={18} color="#fff" />
              <Text style={styles.actionText}>Editar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: "#D32F2F" }]}
              onPress={() => handleBorrar(item.id)}
            >
              <Ionicons name="trash" size={18} color="#fff" />
              <Text style={styles.actionText}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      {/* Videos */}
      <View style={styles.card}>
        <Text style={styles.sectionHeader}>🎥 Videos en Español</Text>
        {videos.map((video, index) => (
          <TouchableOpacity
            key={index}
            style={styles.linkButton}
            onPress={() => Linking.openURL(video.url)}
          >
            <Ionicons name="logo-youtube" size={20} color="#fff" />
            <Text style={styles.linkText}>{video.titulo}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Documentos */}
      <View style={styles.card}>
        <Text style={styles.sectionHeader}>📄 Documentos en Español</Text>
        {documentos.map((doc, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.linkButton, { backgroundColor: "#4CAF50" }]}
            onPress={() => Linking.openURL(doc.url)}
          >
            <Ionicons name="document-text" size={20} color="#fff" />
            <Text style={styles.linkText}>{doc.titulo}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: { padding: 16, paddingTop: 60, backgroundColor: "#E8F5E9" },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 16, textAlign: "center", color: "#2E7D32" },
  card: { backgroundColor: "#fff", padding: 16, marginBottom: 16, borderRadius: 12, elevation: 3 },
  sectionHeader: { fontWeight: "bold", marginBottom: 4, fontSize: 16, color: "#388E3C" },
  linkButton: { flexDirection: "row", alignItems: "center", backgroundColor: "#2196F3", padding: 12, borderRadius: 8, marginTop: 10 },
  linkText: { color: "#fff", marginLeft: 8, fontWeight: "bold", flexShrink: 1 },
  linkInline: { color: "#1976D2", marginTop: 4, fontWeight: "bold" },
  searchInput: { backgroundColor: "#fff", borderRadius: 8, padding: 10, marginBottom: 20, borderWidth: 1, borderColor: "#ccc" },
  actions: { flexDirection: "row", justifyContent: "space-between", marginTop: 12 },
  actionButton: { flexDirection: "row", alignItems: "center", padding: 10, borderRadius: 8 },
  actionText: { color: "#fff", marginLeft: 6, fontWeight: "bold" },
});
