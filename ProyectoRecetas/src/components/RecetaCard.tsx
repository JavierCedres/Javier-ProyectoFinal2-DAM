import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

type Props = {
    recetaPreview: RecetaPreview
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

const RecetaCard = (props: Props) => {
    const recetaPreview = props.recetaPreview;

    return (
        <View style={{backgroundColor: "white", margin: 20, borderWidth: 2, height: 280, width: 144.5}}>
            <Image 
                source={{uri: "http://192.168.0.17:8080/api/v1/files/recetas/" + recetaPreview.imagen}}
                style={{width: 140, height: 140}}
            />
            <View style={{padding: 5}}>
                <Text style={{color: "black", width: 138}}>{recetaPreview.nombre}</Text>
                <Text></Text>
                <View style={{flexDirection: 'row', flexWrap:'wrap', justifyContent: 'space-between'}}>
                    <Text style={{color: "black", width: 70}}>Autor: {recetaPreview.usuario.nick}</Text>
                    <Text style={{color: "black"}}>Likes: {recetaPreview.likes}</Text>
                </View>
            </View>
        </View>
    )
}

export default RecetaCard

const styles = StyleSheet.create({})