import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import NavBarTop from '../components/NavBarTop'
import NavBarBottom from '../components/NavBarBottom'
import axios from 'axios'

type Props = {
    navigation: any
}

type RecetaPreview = {
    id: string,
    imagen: string,
    autor: string,
    nombre: string,
    likes: number,
    descripcion: string,
    receta: string,
    comentarios: Array<string>
}

const AgregarReceta = ({navigation}: Props) => {
    const uri: string = "http://192.168.0.17:8080/api/v1/recetas";
    const [recetas, setRecetas] = useState<Array<RecetaPreview>>([]);
	const [ultimoId, setUltimoId] = useState<string>("0");
	const [formData, setFormData] = useState<RecetaPreview>({} as RecetaPreview);

    useEffect(() => {
        async function getUsuarios() {
            const response = await axios.get(uri);
            const arrRecetas: Array<RecetaPreview> = response.data;
			let ultimoId = "0";

			for (let i = 0; i < arrRecetas.length; i++) {
				ultimoId = arrRecetas[i].id;
			}

			let idNuevo: number = Number(ultimoId) + 1;
            
			setUltimoId(String(idNuevo));
            setRecetas(arrRecetas);
        }

        getUsuarios();
    }, [])

    function fillFormData(value: boolean | number | string, field: keyof RecetaPreview) {
        setFormData(
            {
                ...formData,
                [field]: value
            }
        );
    }

    function agregarReceta() {
        if (formData.nombre != "" && formData.descripcion != "" && formData.receta != "") {

            const receta: RecetaPreview = {
                id: ultimoId,
                imagen: "https://yhoyquecomemos.com/wp-content/uploads/2016/07/quesillo-receta-1.jpg",
                autor: "Yo",
                nombre: formData.nombre,
                likes: 0,
                descripcion: formData.descripcion,
                receta: formData.receta,
                comentarios: []
            }

            const axiosPost = async (rutaPalPost: string) => {
                try {
                    const response = await axios.post(rutaPalPost, receta);
                    console.log(response.data);
                    navigation.navigate("DetallesReceta", {id: ultimoId});
                } catch (error) {
                    console.log(error);
                }
            }

            axiosPost(uri);
        }
    }

    return (
        <View style={{display: 'flex', flex: 1, alignItems: 'center', backgroundColor: "#fff4ce"}}>
            <NavBarTop navigation={navigation}/>
            <ScrollView>
                <View style={{backgroundColor: "white", width: 300, height: 501, margin: 50}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', margin: 20}}>
                        <Image 
                            source={{uri: "https://yhoyquecomemos.com/wp-content/uploads/2016/07/quesillo-receta-1.jpg"}}
                            style={{width: 100, height: 100}}
                        />
                        <View style={{flexDirection: 'column', marginLeft: 20, width: 150}}>
                            <Text style={{color: "black"}}>Título:</Text>
                            <TextInput style={{backgroundColor: "white", height: 30, paddingVertical: 5, marginTop: 5, borderWidth: 1, width: 140}} onChangeText={(texto) => fillFormData(texto, "nombre")}/>
                        </View>
                    </View>
                    <View style={{margin: 20, flex: 1}}>
                        <Text style={{color: "black"}}>Descripción:</Text>
                        <TextInput style={{backgroundColor: "white", height: 100, minWidth: 260, paddingVertical: 5, marginTop: 5, borderWidth: 1, width: 140}} onChangeText={(texto) => fillFormData(texto, "descripcion")}/>                
                    </View>
                    <View style={{margin: 20, flex: 1}}>
                        <Text style={{color: "black"}}>Receta:</Text>
                        <TextInput style={{backgroundColor: "white", height: 100, minWidth: 260, paddingVertical: 5, marginTop: 5, borderWidth: 1, width: 140}} onChangeText={(texto) => fillFormData(texto, "receta")}/>
                    </View>
                    <View style={{alignItems: 'center', marginBottom: 15}}>
                        <TouchableOpacity onPress={() => agregarReceta()}><Text style={{color: "black", backgroundColor: "#ffa492", padding: 5}}>Crear</Text></TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            <NavBarBottom navigation={navigation}/>
        </View>
    )
}

export default AgregarReceta

const styles = StyleSheet.create({})