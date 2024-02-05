import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from '../screens/Register';
import Login from '../screens/Login';
import Main from '../screens/Main';
import DetallesReceta from '../screens/DetallesReceta';
import AgregarReceta from '../screens/AgregarReceta';
import Perfil from '../screens/Perfil';
import Inicio from '../screens/Inicio';
import Favoritos from '../screens/Favoritos';
import EleccionAgregar from '../screens/EleccionAgregar';
import Amigos from '../screens/Amigos';
import Chat from '../screens/Chat';
import AgregarRecetaConDatos from '../screens/AgregarRecetaConDatos';
import AgregarMedianteIA from '../screens/AgregarMedianteIA';
import Ajustes from '../screens/Ajustes';

type Props = {}

type RootStackParamList = {
	Inicio: undefined,
	Register: undefined,
	Login: undefined,
	Main: undefined,
	DetallesReceta: {id: string},
	AgregarReceta: undefined,
	Perfil: undefined,
	Favoritos: undefined,
	EleccionAgregar: undefined,
	Amigos: undefined,
	Chat: {user: Usuario},
	AgregarRecetaConDatos: undefined,
	AgregarMedianteIA: undefined,
	Ajustes: undefined
};

type Usuario = {
	id: string,
	imagen: string,
	nombre: string,
	apellidos: string,
	password: string,
	nick: string,
	correo: string,
    amigos: Array<string>
}

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigation = (props: Props) => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Inicio" component={Inicio} />
			<Stack.Screen name="Register" component={Register} />
			<Stack.Screen name="Login" component={Login} />
			<Stack.Screen name="Main" component={Main} />
			<Stack.Screen name="DetallesReceta" component={DetallesReceta} />
			<Stack.Screen name="AgregarReceta" component={AgregarReceta} />
			<Stack.Screen name="Perfil" component={Perfil} />
			<Stack.Screen name="Favoritos" component={Favoritos} />
			<Stack.Screen name="EleccionAgregar" component={EleccionAgregar} />
			<Stack.Screen name="Amigos" component={Amigos} />
			<Stack.Screen name="Chat" component={Chat} />
			<Stack.Screen name="AgregarRecetaConDatos" component={AgregarRecetaConDatos} />
			<Stack.Screen name="AgregarMedianteIA" component={AgregarMedianteIA} />
			<Stack.Screen name="Ajustes" component={Ajustes} />
		</Stack.Navigator>
	)
}

export default StackNavigation

const styles = StyleSheet.create({})