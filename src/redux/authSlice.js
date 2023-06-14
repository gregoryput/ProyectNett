import { createSlice } from "@reduxjs/toolkit"


const initialState = {
     usuario:"",
     rolUsuario:"",
     token: null
}

export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setCredentials: (state, action) => {
            const {usuario, credencial , rol} = action.payload
            state.usuario = usuario
            state.rolUsuario = rol
            state.token =  credencial
        },
        logOut: (state) => {
            state.usuario = null
            state.token = null
            state.rolUsuario = null

        },
    }
})

export const {setCredentials, logOut} = authSlice.actions

export default authSlice.reducer
