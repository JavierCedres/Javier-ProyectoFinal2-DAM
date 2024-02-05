import { Button, FlatList, Image, ScrollView, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import NavBarTop from '../components/NavBarTop'
import NavBarBottom from '../components/NavBarBottom'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import axios from 'axios';

type RootStackParamList = {
    Inicio: undefined,
    Register: undefined,
    Login: undefined,
    Main: undefined,
    DetallesReceta: { id: string },
    AgregarReceta: undefined,
    Perfil: undefined,
    Favoritos: undefined,
    Chat: { user: Usuario }
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

type Conversacion = {
    id: string,
    id1: string,
    id2: string,
    arrayMensajes: Array<Mensaje>
}

type Mensaje = {
    id: string,
    idUsuario: string,
    mensaje: string
}

type Props = NativeStackScreenProps<RootStackParamList, "Chat">;

const Chat = ({ navigation, route }: Props) => {
    let usuario = route.params.user;
    const uri: string = "http://192.168.0.16:3000/mensajes";
    const [mensajes, setMensajes] = useState<Array<Mensaje>>([]);
    const [conversacion, setConversacion] = useState<Conversacion>();
    const [formData, setFormData] = useState<Mensaje>({} as Mensaje);
    const [ultimoId, setUltimoId] = useState("");
    const tuId = "1";

    useEffect(() => {
        async function getUsuarios() {
            const response = await axios.get(uri);
            const arrConversaciones: Array<Conversacion> = response.data;
            let hayDi = "";

            for (let i = 0; i < arrConversaciones.length; i++) {
                if (arrConversaciones[i].id1 == tuId && arrConversaciones[i].id2 == usuario.id) {
                    setConversacion(arrConversaciones[i]);
                    setMensajes(arrConversaciones[i].arrayMensajes);
                    for (let j = 0; j < arrConversaciones[i].arrayMensajes.length; j++) {
                        hayDi = arrConversaciones[i].arrayMensajes[j].id;
                    }
                    let idNuevo: number = Number(hayDi) + 1;
            
			        setUltimoId(String(idNuevo));
                }
            }
        }

        getUsuarios();
    }, [])

    function enviar() {
        if (formData.mensaje != "") {

            const mensaje: Mensaje = {
                id: ultimoId,
                idUsuario: tuId,
                mensaje: formData.mensaje
            }

            let conv = conversacion;
            conv?.arrayMensajes.push(mensaje);

            setConversacion(conv);

            const axiosPut = async (rutaPalPut: string) => {
                try {
                    const response = await axios.put(rutaPalPut, conversacion)
                    .then(response => {
                        console.log('Datos actualizados:', response.data);
                    })
                    .catch(error => {
                        console.error('Error al actualizar datos:', error);
                    });
                } catch (error) {
                    console.log(error);
                }
            }

            if (conversacion != undefined) {
                axiosPut(uri + "/" + conversacion.id);
            }
            
        }
    }

    function fillFormData(value: boolean | number | string, field: keyof Mensaje) {
        setFormData(
            {
                ...formData,
                [field]: value
            }
        );
    }

    return (
        <View style={{ display: 'flex', flex: 1, alignItems: 'center', backgroundColor: "#fff4ce" }}>
            <NavBarTop navigation={navigation} />
            <View style={{ flex: 1, backgroundColor: "white", width: "80%", marginTop: 40, marginBottom: 40, borderWidth: 2 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: "center", width: "100%", backgroundColor: "#d0deb8", height: 50 }}>
                    <Image
                        source={{ uri: usuario.imagen }}
                        style={{ width: 40, height: 40, borderRadius: 100, marginLeft: 5 }}
                    />
                    <Text style={{ color: "black", marginRight: 40 }}>{usuario.nombre}</Text>
                    <Text></Text>
                </View>
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={mensajes}
                        renderItem={({item}) => 
                            (item.idUsuario == tuId)?
                                <View style={{alignItems: "flex-end", margin: 10}}>
                                    <Text style={{color: "black", backgroundColor: "#d0deb8", padding: 10, borderRadius: 100}}>{item.mensaje}</Text>
                                </View>
                                :
                                <View style={{alignItems: "flex-start", margin: 10}}>
                                    <Text style={{color: "black", backgroundColor: "#d0deb8", padding: 10, borderRadius: 100}}>{item.mensaje}</Text>
                                </View>
                        }
                    />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: "center", width: "100%", backgroundColor: "#d0deb8", height: 50 }}>
                    <TextInput style={{ backgroundColor: "white", width: "70%", margin: 10, borderRadius: 100, paddingVertical: 0 }} onChangeText={(texto) => fillFormData(texto, "mensaje")}/>
                    <TouchableOpacity style={{ backgroundColor: "#ffa492", marginRight: 15, padding: 5 }} onPress={() => enviar()}><Text style={{ color: "black" }}>Enviar</Text></TouchableOpacity>
                </View>
            </View>
            <NavBarBottom navigation={navigation} />
        </View>
    )
}

export default Chat

const styles = StyleSheet.create({})