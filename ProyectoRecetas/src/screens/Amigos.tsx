import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import NavBarTop from '../components/NavBarTop'
import NavBarBottom from '../components/NavBarBottom'
import AmigoCard from '../components/AmigoCard'
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
	correo: string,
    amigos: Array<string>
}

const Amigos = ({navigation}: Props) => {
    const uri: string = "http://192.168.0.16:3000/usuarios";
    const [usuarios, setUsuarios] = useState<Array<Usuario>>([]);
    const [amigosId, setAmigosId] = useState<Array<string>>([]);

    useEffect(() => {
        async function getUsuarios() {
            const response = await axios.get(uri);
            const arrUsuarios: Array<Usuario> = response.data;
            let tuId = "1";

            for (let i = 0; i < arrUsuarios.length; i++) {
                if (arrUsuarios[i].id == "1") {
                    setAmigosId(arrUsuarios[i].amigos);
                }
            }

            setUsuarios(arrUsuarios);
        }

        getUsuarios();
    }, [])

    return (
        <View style={{display: 'flex', flex: 1, alignItems: 'center', backgroundColor: "#fff4ce"}}>
            <NavBarTop navigation={navigation}/>
            <View style={{marginTop: 40, marginBottom: 20}}>
                <TextInput style={{backgroundColor: "white", height: 30, width: 200, borderRadius: 100, paddingVertical: 5}}/>
            </View>
            <View style={{justifyContent: 'center', flex: 1, backgroundColor: "white", width: "80%"}}>
                <FlatList 
                    data={amigosId}
                    renderItem={({item}) => 
                        <AmigoCard idAmigo={item} navigation={navigation}/>
                    }
                    numColumns={1}
                />
            </View>
            <NavBarBottom navigation={navigation}/>
        </View>
    )
}

export default Amigos

const styles = StyleSheet.create({})