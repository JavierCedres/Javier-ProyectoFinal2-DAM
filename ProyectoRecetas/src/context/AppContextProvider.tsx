import React, { Dispatch, SetStateAction, createContext, useContext, useState } from 'react';

export interface AppContextType {
    nickUsuario: string,
    setNickUsuario: Dispatch<SetStateAction<string>>,
    idUsuario: number,
    setIdUsuario: Dispatch<SetStateAction<number>>;
}

export const AppContext = createContext<AppContextType>({} as AppContextType);

export const AppContextProvider = (props: any) => {
    const [nickUsuario, setNickUsuario] = useState("");
    const [idUsuario, setIdUsuario] = useState(0);
    
    const contextValues: AppContextType = {
        nickUsuario: nickUsuario,
        setNickUsuario: setNickUsuario,
        idUsuario: idUsuario,
        setIdUsuario: setIdUsuario
    };

    return (
        <AppContext.Provider value={contextValues}>
            {props.children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext);
}

export default AppContextProvider;