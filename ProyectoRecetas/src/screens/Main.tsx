import { FlatList, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import NavBarTop from '../components/NavBarTop'
import RecetaCard from '../components/RecetaCard'
import NavBarBottom from '../components/NavBarBottom'
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native'

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

const Main = ({navigation}: Props) => {
    const uri: string = "http://192.168.0.16:3000/recetas";
    const [recetas, setRecetas] = useState<Array<RecetaPreview>>();

    useFocusEffect(() => {
        async function getRecetas() {
            const response = await axios.get(uri);
            const arrRecetas = response.data;
            
            setRecetas(arrRecetas);
        }

        getRecetas();
    })

    return (
        <View style={{display: 'flex', flex: 1, alignItems: 'center', backgroundColor: "#fff4ce"}}>
            <NavBarTop navigation={navigation}/>
            <View style={{marginTop: 40, marginBottom: 20}}>
                <TextInput style={{backgroundColor: "white", height: 30, width: 200, borderRadius: 100, paddingVertical: 5}}/>
            </View>
            <View style={{justifyContent: 'center', flex: 1}}>
                <FlatList 
                    data={recetas}
                    renderItem={({item}) => 
                        <TouchableOpacity onPress={() => navigation.navigate("DetallesReceta", {id: item.id})}><RecetaCard recetaPreview={item} /></TouchableOpacity>
                    }
                    numColumns={2}
                />
            </View>
            <NavBarBottom navigation={navigation}/>
        </View>
    )
}

export default Main

const styles = StyleSheet.create({})