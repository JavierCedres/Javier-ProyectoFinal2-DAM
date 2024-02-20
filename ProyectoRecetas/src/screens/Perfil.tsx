import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import NavBarTop from '../components/NavBarTop'
import NavBarBottom from '../components/NavBarBottom'
import RecetaCard from '../components/RecetaCard'
import axios from 'axios'
import { AppContext } from '../context/AppContextProvider'

type Props = {
    navigation: any
}

type Usuario = {
    nick: string
}

type RecetaPreview = {
    id: number,
    descripcion: string,
    fechadecreacion: string,
    imagen: string,
    likes: number,
    nombre: string,
    receta: string,
    usuario: Usuario
}

const Perfil = ({navigation}: Props) => {
	const { idUsuario } = useContext(AppContext);
	const uri: string = "http://172.16.141.33:8080/api/v1/recetas/usuarios/" + idUsuario;
    //const uri: string = "http://192.168.0.20:8080/api/v1/recetas/usuarios/" + idUsuario;
	const [recetas, setRecetas] = useState<Array<RecetaPreview>>();

    useEffect(() => {
        async function getRecetas() {
            const response = await axios.get(uri);
            const arrRecetas: Array<RecetaPreview> = response.data;
            
            setRecetas(arrRecetas);
        }

        getRecetas();
    }, [])

	return (
		<View style={{display: 'flex', flex: 1, backgroundColor: "#fff4ce"}}>
			<NavBarTop navigation={navigation}/>
			<View style={{flex: 1, alignItems: 'center', marginTop: 50}}>
				<View style={{backgroundColor: "white", width: "80%", height: "23%"}}>
					<Text style={{margin: 10, color: "black", fontSize: 16}}>Datos: </Text>
					<Text></Text>
					<View style={{flexDirection: "row", justifyContent: 'flex-end'}}>
						<Text style={{margin: 10, color: "black", fontSize: 16}}>Seguidos</Text>
						<Text style={{margin: 10, color: "black", fontSize: 16}}>Seguidores: 10000</Text>
					</View>
				</View>
				<Text style={{marginTop: 20, color: "black", fontSize: 20}}>Tus Posts</Text>
				<View style={{justifyContent: 'center', flex: 1}}>
					<FlatList 
						data={recetas}
						renderItem={({item}) => 
							<TouchableOpacity onPress={() => navigation.navigate("DetallesReceta", {id: item.id})}><RecetaCard recetaPreview={item} /></TouchableOpacity>
						}
						numColumns={2}
					/>
				</View>
			</View>
			<NavBarBottom navigation={navigation}/>
		</View>
	)
}

export default Perfil

const styles = StyleSheet.create({})