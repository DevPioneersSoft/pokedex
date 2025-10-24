import React from 'react'
import { useUserStore } from '../store/userStore'
import { data } from 'react-router-dom';

interface RouteProtegidaProps {
    children: React.ReactNode
}

export default function RutaProtegida({children} : RouteProtegidaProps) {
    const usuario = useUserStore(state =>state.usuario);
    if(!usuario) {
        throw data({message: 'no autorizado'},{ status: 401})
    }
  return (
    <>{children}</>
  )
}
