import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import NavBarTop from '../components/NavBarTop'
import NavBarBottom from '../components/NavBarBottom'
import RecetaCard from '../components/RecetaCard'
import axios from 'axios'

type Props = {
    navigation: any
}

type RecetaPreview = {
    id: string,
    imagen: string,
    autor: string,
    nombre: string,
    likes: number
}

type Favoritos = {
    id: string,
    favoritos: Array<string>
}

const Favoritos = ({navigation}: Props) => {
    const uriFavoritos: string = "http://192.168.0.16:3000/favoritos";
    const uriRecetas: string = "http://192.168.0.16:3000/recetas";
    const [recetas, setRecetas] = useState<Array<RecetaPreview>>([]);
    const [idFavoritos, setIdFavoritos] = useState<Array<string>>([]);
    const [recetasAMostrar, setRecetasAMostrar] = useState<Array<RecetaPreview>>([]);
    
    useEffect(() => {
        async function getRecetas() {
            const response = await axios.get(uriRecetas);
            const arrRecetas = response.data;
            
            setRecetas(arrRecetas);
        }
        getRecetas();

        async function getFavoritos() {
            const response = await axios.get(uriFavoritos);
            const arrFavoritos: Array<Favoritos> = response.data;
            
            for (let i = 0; i < arrFavoritos.length; i++) {
                if (arrFavoritos[i].id == "1") {
                    setIdFavoritos(arrFavoritos[i].favoritos);
                }
            }
        }
        getFavoritos();

        let arrAMostrar = [];
        for (let i = 0; i < recetas.length; i++) {
            if (idFavoritos.includes(recetas[i].id)) {
                arrAMostrar.push(recetas[i]);
            }
        }
        
        setRecetasAMostrar(arrAMostrar);
    }, [])               

    return (
        <View style={{ display: 'flex', flex: 1, alignItems: 'center', backgroundColor: "#fff4ce" }}>
            <NavBarTop navigation={navigation} />
            <View style={{ marginTop: 40, marginBottom: 20 }}>
                <Text style={{textAlign: 'center', marginBottom: 10, fontSize: 20, color: "black"}}>Recetas Favoritas</Text>
                <TextInput style={{ backgroundColor: "white", height: 30, width: 200, borderRadius: 100, paddingVertical: 5 }} />
            </View>
            <View style={{ justifyContent: 'center', flex: 1 }}>
                <FlatList
                    data={recetasAMostrar}
                    renderItem={({ item }) =>
                    <TouchableOpacity onPress={() => navigation.navigate("DetallesReceta", {id: item.id})}><RecetaCard recetaPreview={item} /></TouchableOpacity>
                }
                    numColumns={2}
                />
            </View>
            <NavBarBottom navigation={navigation} />
        </View>
    )
}

export default Favoritos

const styles = StyleSheet.create({})