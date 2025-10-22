import { Button } from "@mantine/core";
import Sesion from "./Sesion";
import ButtonCustom from "./ButtonCustom";


export default function Header() {
    return (
        <div className="mb-10">
            <div className="grid grid-cols-2">
                <div className="flex justify-center">
                    <img src="/pokedex-logo.png" className="w-70 h-20"></img>
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

                                />
                            </div>
                            <div className="flex space-x-4">
                                
                            </div>
                            
                        </div>
                        
                    </div>
                    <Sesion></Sesion>
                </div>
            </div>
        </div>
    );
}