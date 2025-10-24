import { Button } from "@mantine/core";
import Session from "./Session";
import { useNavigate } from "react-router-dom";

export default function Header() {

    const navigate = useNavigate();

    return (
        <div className='mb-10 bg-blue-900 py-6'>
            <div className="grid grid-cols-2 items-center">
                <div className="flex justify-center">
                    <img 
                        src="/pokedex-logo.png" 
                        alt="Pokedex Logo" 
                        className="w-70 h-auto cursor-pointer" 
                        onClick={() => navigate('/')} 
                    />
                </div>
                <div className="flex p-2 rounded-2xl grow">
                    <div className="grow">
                        <div className="flex space-x-10">
                            <div>
                                <Button color="yellow"
                                    onClick={() => navigate('/favoritos')}
                                >
                                    Mis favoritos
                                </Button>
                            </div>
                            <div>
                                <Button color="yellow"
                                    onClick={() => navigate('/equipo')}
                                >
                                    Mi equipo
                                </Button>
                            </div>
                            <div className="flex space-x-4">
                            </div>
                        </div>
                    </div>
                    <Session />
                </div>
            </div>
        </div>
    )
}
