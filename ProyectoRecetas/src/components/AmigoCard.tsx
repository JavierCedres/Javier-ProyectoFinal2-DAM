import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Image } from 'react-native'
import axios from 'axios'

type Props = {
    idAmigo: string,
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

const AmigoCard = (props: Props) => {
    const uriUsuario: string = "http://192.168.0.16:3000/usuarios";
    const uriMensajes: string = "http://192.168.0.16:3000/mensajes";
    const [usuario, setUsuario] = useState<Usuario>({} as Usuario);
    const [conversacion, setConversacion] = useState<Conversacion>({} as Conversacion);
    const [ultimoId, setUltimoId] = useState("");
    const [existe, setExiste] = useState(true);
    const tuId = "1";

    useEffect(() => {
        async function getUsuarios() {
            const response = await axios.get(uriUsuario);
            const arrUsuarios: Array<Usuario> = response.data;
            let id = props.idAmigo;

            for (let i = 0; i < arrUsuarios.length; i++) {
                if (arrUsuarios[i].id == id) {
                    setUsuario(arrUsuarios[i]);
                }
            }
        }

        getUsuarios();
    }, [])

    async function getMensajes() {
        const response = await axios.get(uriMensajes);
        const arrMensajes: Array<Conversacion> = response.data;
        let id = props.idAmigo;
        let lastId = "";

        let encontrado = false;
        for (let i = 0; i < arrMensajes.length; i++) {
            console.log(conversacion);
            if (arrMensajes[i].id1 == tuId && arrMensajes[i].id2 == props.idAmigo && encontrado == false) {
                encontrado = true;
                setConversacion(arrMensajes[i]);
                setExiste(false)
            } else {
                let a: Conversacion = {
                    id: "",
                    id1: "",
                    id2: "",
                    arrayMensajes: []
                };
                setConversacion(a);
            }
            lastId = arrMensajes[i].id;
        }

        let idNuevo: number = Number(lastId) + 1;
        
        setUltimoId(String(idNuevo));
    }

    function chatear() {
        getMensajes();

        if (existe == true) {
            console.log("false");
            
            const conv: Conversacion = {
                id: ultimoId,
                id1: tuId,
                id2: props.idAmigo,
                arrayMensajes: []
            }
            console.log(conv);
            
            setConversacion(conv);

            console.log("106" + conversacion);
            
    
            const axiosPost = async (rutaPalPost: string) => {
                try {
                    const response = await axios.post(rutaPalPost, conv);
                    console.log("Dentro de ti" + response.data);
                    props.navigation.navigate("Chat", {user: usuario});
                } catch (error) {
                    console.log(error);
                }
            }
            
            axiosPost(uriMensajes);
        } else {
            console.log("true");
            props.navigation.navigate("Chat", {user: usuario})
        }
    }

    return (
        <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', margin: 15}}>
            <Image 
                    source={{uri: usuario.imagen}}
                    style={{width: 40, height: 40, borderRadius: 100}}
                />
            <View style={{justifyContent: 'center'}}>
                <Text style={{color: "black", width: 60}}>{usuario.nombre}</Text>
            </View>
            <TouchableOpacity style={{backgroundColor: "#ffa492", justifyContent: 'center', paddingHorizontal: 10}}  onPress={() => chatear()}><Text style={{color: "black"}}>Chatear</Text></TouchableOpacity>
        </View>
    )
}

export default AmigoCard

const styles = StyleSheet.create({})