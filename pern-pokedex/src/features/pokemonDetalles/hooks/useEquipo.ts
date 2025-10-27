import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../../../shered/utils/api";
import { useState } from "react";
import type { Pokemon } from "../../cuadricula/interfaces/Pokemon.interface";

export function useEquipo() {

const query = useQuery({
        queryKey: ["favoritos"],
        queryFn: async () => {
        await new Promise((resolve) => setTimeout(resolve, 300));
        const response = await api.get<Pokemon[]>("usuario/equipo");
        //setEquipo(response.data.map(({id})=>id))
        return response.data;
        },
    });

    const agregarEquipo =  useMutation({
        mutationFn: async () => {
            const response = await api.post('equipo', equipo.map(a=>({pokemonId:a})))
            console.log(response)
            return response.data;
        }
    })  


    const toggleTeam = (pokemon:Pokemon)=>{
        console.log(pokemon)
        if(equipo.some(a => a.id === pokemon.id)){
            setEquipo((a)=>[
                ...a, pokemon
            ])
        }else{
            setEquipo(a=>a.filter(pokie =>pokie.id !== pokemon.id))
        }

    }

    
    const [equipo, setEquipo] = useState<Pokemon[]>([])

   
    return {data: query.data, equipo, agregarEquipo, toggleTeam}

}