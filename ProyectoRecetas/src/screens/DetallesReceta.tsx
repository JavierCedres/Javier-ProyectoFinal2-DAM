import { FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import NavBarTop from '../components/NavBarTop';
import NavBarBottom from '../components/NavBarBottom';
import axios from 'axios';

type RootStackParamList = {
	Inicio: undefined,
	Register: undefined,
	Login: undefined,
	Main: undefined,
	DetallesReceta: {id: string},
	AgregarReceta: undefined,
	Perfil: undefined,
	Favoritos: undefined,
    Chat: {user: Usuario}
};

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

type Props = NativeStackScreenProps<RootStackParamList, "DetallesReceta">;

const DetallesReceta = ({navigation, route}: Props) => {
    //const uri: string = "http://192.168.0.17:8080/api/v1/recetas/" + route.params.id;
    const uri: string = "http://172.16.141.33:8080/api/v1/recetas/" + route.params.id;
    //const uri: string = "http://192.168.0.20:8080/api/v1/recetas/" + route.params.id;
    const [receta, setReceta] = useState<RecetaPreview>();
    const uriImagen =  "http://172.16.141.33:8080/api/v1/files/recetas/" + receta?.imagen;
    //const uriImagen =  "http://192.168.0.20:8080/api/v1/files/recetas/" + receta?.imagen;

    useEffect(() => {
        async function getRecetas() {
            const response = await axios.get(uri);
            const rece = response.data;
            
            setReceta(rece);
        }

        getRecetas();
    }, [])

    return (
        <View style={{display: 'flex', flex: 1, alignItems: 'center', backgroundColor: "#fff4ce"}}>
            <NavBarTop navigation={navigation}/>
            <View style={{flex: 1, backgroundColor: "white", width: 300, margin: 50}}>
                <View style={{flexDirection: 'row', alignItems: 'center', margin: 20}}>
                    <Image 
                        source={{uri: uriImagen}}
                        style={{width: 100, height: 100}}
                    />
                    <View style={{flexDirection: 'column', marginLeft: 20, width: 150}}>
                        <Text style={{color: "black"}}>Título: {receta?.nombre}</Text>
                        <Text></Text>
                        <Text style={{color: "black"}}>Autor: {receta?.usuario.nick}</Text>
                    </View>
                </View>
                <View style={{margin: 20, flexDirection: 'row', flex: 1}}>
                    <View style={{borderWidth: 1, marginRight: 20, padding: 5, width: 120}}>
                        <ScrollView>
                            <Text style={{color: "black"}}>Descripción:</Text>
                            <Text style={{color: "black"}}>{receta?.descripcion}</Text>
                        </ScrollView>
                    </View>
                    <View style={{borderWidth: 1, padding: 5, width: 120}}>
                        <ScrollView>
                            <Text style={{color: "black"}}>Receta:</Text>
                            <Text style={{color: "black"}}>{receta?.receta}</Text>
                        </ScrollView>
                    </View>
                </View>
                <View style={{margin: 20, flexDirection: 'row', flex: 1}}>
                    <View style={{borderWidth: 1, padding: 5, width: 260, overflow: 'hidden'}}>
                        <Text style={{color: "black"}}>Comentarios:</Text>
                        {/*
                        <FlatList
                            data={receta?.comentarios}
                            renderItem={({item}) => 
                                <Text style={{color: "black"}}>{item}</Text>
                            }
                        />
                        */}
                    </View>
                </View>
            </View>
            <NavBarBottom navigation={navigation}/>
        </View>
    )
}

export default DetallesReceta

const styles = StyleSheet.create({})