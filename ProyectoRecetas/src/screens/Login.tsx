import { StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { AppContext } from '../context/AppContextProvider'

type Props = {
    navigation: any
}

type Usuario = {
	password: string,
	nick: string
}

const Login = ({navigation}: Props) => {
	//const uri: string = "http://192.168.0.17:8080/api/v1/usuarios";
	//const uri: string = "http://172.16.141.33:8080/api/v1/usuarios";
	const uri: string = "http://192.168.0.20:8080/api/v1/usuarios";
	const [formData, setFormData] = useState<Usuario>({} as Usuario);
	const {setIdUsuario, setNickUsuario} = useContext(AppContext);

	function fillFormData(value: boolean | number | string, field: keyof Usuario) {
        setFormData(
            {
                ...formData,
                [field]: value
            }
        );
    }

	function logearse() {
		const user: Usuario = {
			nick: formData.nick,
			password: formData.password
		}

		async function login() {
			try {
				const response = await axios.post(uri + "/login", user);
				const responseGet = await axios.get(uri + "/nombre/" + formData.nick);

				setNickUsuario(formData.nick);
				setIdUsuario(responseGet.data.id)
				console.log(responseGet.data.id);

				navigation.navigate("Main");
				console.log(response.data);
			} catch (error) {
				ToastAndroid.show('Usuario erroneo', ToastAndroid.SHORT);
				console.log(error);
			}
		}

		login();
	}

    return (
        <View style={{ flex: 1, alignItems: 'center', backgroundColor: "#fff4ce"}}>
			<View>
				<Text style={{ color: 'black', fontSize: 25, marginBottom: 20, marginTop: "50%" }}>LOGIN</Text>
			</View>
			<View style={{ backgroundColor: '#ffa492', padding: 20, borderRadius: 10, width: 300 }}>
				<View style={{ marginBottom: 10 }}>
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<Text style={{ color: 'black', width: 80 }}>Nick: </Text>
						<TextInput style={{ backgroundColor: 'white', height: 30, flex: 1, paddingVertical: 5}} onChangeText={(texto) => fillFormData(texto, "nick")}/>
					</View>
					<Text></Text>
					<Text></Text>
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<Text style={{ color: 'black', width: 80 }}>Contraseña: </Text>
						<TextInput secureTextEntry={true} style={{ backgroundColor: 'white', height: 30, flex: 1, paddingVertical: 5}} onChangeText={(texto) => fillFormData(texto, "password")}/>
					</View>
				</View>
				<TouchableOpacity onPress={() => navigation.navigate("Register")}><Text style={{textAlign: 'right', color: "black", marginTop: 10, textDecorationLine: 'underline'}}>Register</Text></TouchableOpacity>
			</View>
			<View style={{marginTop: 30}}>
				<TouchableOpacity onPress={() => logearse()} style={{backgroundColor: "#ffa492", padding: 10, borderRadius: 10}}><Text style={{ color: 'black'}}>Logearse</Text></TouchableOpacity>
			</View>
		</View>
    )
}

export default Login

const styles = StyleSheet.create({})