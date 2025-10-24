import Session from "./Session";
import ButtonCustom from "./ButtonCustom";
import { useNavigate } from "react-router";
import { useUserStore } from "../store/userStore";
import { Avatar, Group } from "@mantine/core";

export default function Header() {
    const navigate = useNavigate();
    const equipoPokemon = useUserStore(state => state.equipoPokemon);
    
  return (
    <div className='mb-10'>
        <div className="grid grid-cols-2">
            <div className="flex justify-center">
                <img src="/pokedex-logo.png" alt="Pokedex Logo" className="w-70 h-auto"/>
            </div>
            <div className="flex shadow-2xl p-2 rounded-2xl border-b-1 border-white grow">
                <div className="grow">
                    <div className="flex space-x-10">
                        <div>
                            <ButtonCustom
                                label="Mi equipo"
                                color="warning"
                                className="ml-10"
                                isLoading={false}
                                onClick={ () => {navigate('/mi-equipo')} }  
                            />  
                        </div>
                        <div className="flex space-x-4 items-center">
                            {equipoPokemon.length > 0 && (
                                <Group gap="xs">
                                    {equipoPokemon.map((pokemon) => (
                                        <Avatar 
                                            key={pokemon.id}
                                            src={pokemon.imagen} 
                                            alt={pokemon.nombre}
                                            size="md"
                                            radius="sm"
                                        />
                                    ))}
                                </Group>
                            )}
                        </div>
                    </div>
                </div>
                <Session />
            </div>
        </div>
    </div>
  )
}
