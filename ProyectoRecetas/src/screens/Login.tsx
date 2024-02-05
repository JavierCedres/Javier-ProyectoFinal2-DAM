import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

type Props = {
    navigation: any
}

type Usuario = {
	id: string,
	imagen: string,
	nombre: string,
	apellidos: string,
	password: string,
	nick: string,
	correo: string
}

const Login = ({navigation}: Props) => {
	const uri: string = "http://192.168.0.16:3000/usuarios";
    const [usuarios, setUsuarios] = useState<Array<Usuario>>([]);
	const [formData, setFormData] = useState<Usuario>({} as Usuario);

    useEffect(() => {
        async function getUsuarios() {
            const response = await axios.get(uri);
            const arrUsuarios: Array<Usuario> = response.data;

            setUsuarios(arrUsuarios);
        }

        getUsuarios();
    }, [])

	function fillFormData(value: boolean | number | string, field: keyof Usuario) {
        setFormData(
            {
                ...formData,
                [field]: value
            }
        );
    }

	function logearse() {
		for (let i = 0; i < usuarios.length; i++) {
			if (usuarios[i].nick == formData.nick && usuarios[i].password == formData.password) {
				navigation.navigate("Main");
			}
		}
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
						<TextInput style={{ backgroundColor: 'white', height: 30, flex: 1, paddingVertical: 5}} onChangeText={(texto) => fillFormData(texto, "password")}/>
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