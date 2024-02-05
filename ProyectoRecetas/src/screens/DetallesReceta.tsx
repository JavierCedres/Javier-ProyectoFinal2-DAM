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
	id: string,
	imagen: string,
	nombre: string,
	apellidos: string,
	password: string,
	nick: string,
	correo: string,
    amigos: Array<string>
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

type Props = NativeStackScreenProps<RootStackParamList, "DetallesReceta">;

const DetallesReceta = ({navigation, route}: Props) => {
    const uri: string = "http://192.168.0.16:3000/recetas";
    const [receta, setReceta] = useState<RecetaPreview>();

    useEffect(() => {
        async function getRecetas() {
            const response = await axios.get(uri);
            const arrRecetas = response.data;

            for (let i = 0; i < arrRecetas.length; i++) {
                if (arrRecetas[i].id == route.params.id) {
                    setReceta(arrRecetas[i]);
                }
            }
        }

        getRecetas();
    }, [])

    return (
        <View style={{display: 'flex', flex: 1, alignItems: 'center', backgroundColor: "#fff4ce"}}>
            <NavBarTop navigation={navigation}/>
            <View style={{flex: 1, backgroundColor: "white", width: 300, margin: 50}}>
                <View style={{flexDirection: 'row', alignItems: 'center', margin: 20}}>
                    <Image 
                        source={{uri: receta?.imagen}}
                        style={{width: 100, height: 100}}
                    />
                    <View style={{flexDirection: 'column', marginLeft: 20, width: 150}}>
                        <Text style={{color: "black"}}>Título: {receta?.nombre}</Text>
                        <Text></Text>
                        <Text style={{color: "black"}}>Autor: {receta?.autor}</Text>
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
                        <FlatList
                            data={receta?.comentarios}
                            renderItem={({item}) => 
                                <Text style={{color: "black"}}>{item}</Text>
                            }
                        />
                    </View>
                </View>
            </View>
            <NavBarBottom navigation={navigation}/>
        </View>
    )
}

export default DetallesReceta

const styles = StyleSheet.create({})