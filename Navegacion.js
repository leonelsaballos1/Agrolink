import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AntDesign, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';

import Home from './Screens/Home';
import ListarClientes from './Screens/ListarClientes';
import RegistrarCliente from './Screens/RegistrarCliente';
import Misdatos from './Screens/Misdatos';
import AgregarDatos from './Screens/AgregarDatos';
import TecnicoAgricolas from './Screens/TecnicoAgricolas';
import Mapa from './Screens/Mapa';
import ChatBot from './Screens/ChatBot';
import Capacitacion from './Screens/Capacitacion';
import AgricultoresAsociados from './Screens/AgricultoresAsociados';
import Publicidad from './Screens/Publicidad';



const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerInsideHome() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Inicio" component={Home} />
      <Drawer.Screen name="Técnicos Agrícolas" component={TecnicoAgricolas} />
      
      <Drawer.Screen name="Mapa" component={Mapa} />
      <Drawer.Screen name="ChatBot" component={ChatBot} />
      
          
    </Drawer.Navigator>
  );
}

function StackDetailHome() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DrawerHome" component={DrawerInsideHome} />
      <Stack.Screen name="Técnicos Agrícolas" component={TecnicoAgricolas} />
      <Stack.Screen name="Cultivos" component={ListarClientes} />
            <Drawer.Screen name="Publicidad" component={Publicidad} />
     <Drawer.Screen name="Capacitacion" component={Capacitacion} />
          <Drawer.Screen name="AgricultoresAsociados" component={AgricultoresAsociados} />
    </Stack.Navigator>
  );
}

function StackClientes() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ListarClientes" component={ListarClientes} />
      <Stack.Screen name="RegistrarCliente" component={RegistrarCliente} />
    </Stack.Navigator>
  );
}

function StackDatos() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Misdatos" component={Misdatos} />
      <Stack.Screen name="AgregarDatos" component={AgregarDatos} />
    </Stack.Navigator>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Inicio"
      screenOptions={{
        tabBarActiveTintColor: 'green',
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Inicio"
        component={StackDetailHome}
        options={{
          tabBarLabel: 'Inicio',
          tabBarIcon: ({ color }) => <AntDesign name="home" size={28} color={color} />,
        }}
      />
      <Tab.Screen
        name="Cultivos"
        component={StackClientes}
        options={{
          tabBarLabel: 'Cultivos',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="seed" size={28} color={color} />,
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={StackDatos}
        options={{
          tabBarLabel: 'Mi Perfil',
          tabBarIcon: ({ color }) => <FontAwesome name="user" size={28} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default function Navegacion() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
