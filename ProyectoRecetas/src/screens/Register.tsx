import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import axios from 'axios'
import { AppContext } from '../context/AppContextProvider'

type Props = {
	navigation: any
}

type Usuario = {
	imagen: string,
	user: string,
	apellidos: string,
	password: string,
	nick: string,
	email: string
}

const Register = ({navigation}: Props) => {
	const uri: string = "http://192.168.0.17:8080/api/v1/usuarios";
    const [usuarios, setUsuarios] = useState<Array<Usuario>>([]);
	const [formData, setFormData] = useState<Usuario>({} as Usuario);
	const {setNickUsuario, setIdUsuario} = useContext(AppContext);

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

	function registrarse() {
		if (formData.apellidos != "" && formData.email != "" && formData.nick != "" && formData.user != "" && formData.password != "") {
			let existe: boolean = false;

			const user: Usuario = {
				imagen: "",
				user: formData.user,
				apellidos: formData.apellidos,
				nick: formData.nick,
				email: formData.email,
				password: formData.password
			}
			
			for (let i = 0; i < usuarios.length; i++) {
				if (usuarios[i].nick == user.nick) {
					existe = true;
				}
			}

			const axiosPost = async (rutaPalPost: string) => {
				try {
					const response = await axios.post(rutaPalPost, user);
					console.log(response.data);

					const responseGet = await axios.get(rutaPalPost + "/" + formData.nick);

					setNickUsuario(formData.nick);
					setIdUsuario(responseGet.data.id)
					console.log(responseGet.data.id);
					
					navigation.navigate("Main");
				} catch (error) {
					console.log(error);
					setNickUsuario(formData.nick);
					navigation.navigate("Main");
				}
			}

			if (!existe) {
				axiosPost(uri + "/register");
			}
		}
	}

	return (
		<View style={{ flex: 1, alignItems: 'center', backgroundColor: "#fff4ce"}}>
			<ScrollView>
				<View>
					<Text style={{ color: 'black', fontSize: 25, marginBottom: 20, marginTop: "40%", textAlign: 'center' }}>REGISTER</Text>
				</View>
				<View style={{ backgroundColor: '#ffa492', padding: 20, borderRadius: 10, width: 300 }}>
					<View style={{ marginBottom: 10 }}>
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<Text style={{ color: 'black', width: 80 }}>Nombre: </Text>
							<TextInput style={{ backgroundColor: 'white', height: 30, flex: 1, paddingVertical: 5}} onChangeText={(texto) => fillFormData(texto, "user")}/>
						</View>
						<Text></Text>
						<Text></Text>
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<Text style={{ color: 'black', width: 80 }}>Apellidos: </Text>
							<TextInput style={{ backgroundColor: 'white', height: 30, flex: 1, paddingVertical: 5}} onChangeText={(texto) => fillFormData(texto, "apellidos")}/>
						</View>
						<Text></Text>
						<Text></Text>
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<Text style={{ color: 'black', width: 80 }}>Nick: </Text>
							<TextInput style={{ backgroundColor: 'white', height: 30, flex: 1, paddingVertical: 5}} onChangeText={(texto) => fillFormData(texto, "nick")}/>
						</View>
						<Text></Text>
						<Text></Text>
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<Text style={{ color: 'black', width: 80 }}>Correo: </Text>
							<TextInput style={{ backgroundColor: 'white', height: 30, flex: 1, paddingVertical: 5}} onChangeText={(texto) => fillFormData(texto, "email")}/>
						</View>
						<Text></Text>
						<Text></Text>
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<Text style={{ color: 'black', width: 80 }}>Contraseña: </Text>
							<TextInput secureTextEntry={true} style={{ backgroundColor: 'white', height: 30, flex: 1, paddingVertical: 5}} onChangeText={(texto) => fillFormData(texto, "password")}/>
						</View>
					</View>
					<TouchableOpacity onPress={() => navigation.navigate("Login")}><Text style={{textAlign: 'right', color: "black", marginTop: 10, textDecorationLine: 'underline'}}>Login</Text></TouchableOpacity>
				</View>
				<View style={{marginTop: 30, alignItems: 'center'}}>
					<TouchableOpacity onPress={() => registrarse()} style={{backgroundColor: "#ffa492", padding: 10, borderRadius: 10, width: 100}}><Text style={{ color: 'black', textAlign: 'center'}}>Registrarse</Text></TouchableOpacity>
				</View>
			</ScrollView>
		</View>
	)
}

export default Register

const styles = StyleSheet.create({})