import { Avatar, Menu, Modal } from "@mantine/core";
import { useState } from "react";
import ModalGenerica from "./ModalGenerica";
import { ModalSesion } from "./ModalSesion";



export default function Sesion() {

const [modalAbierto, setModalAbierto] = useState(false);
const abrirModalSesion = () => setModalAbierto(true);
const cerrarModalSesion = () => setModalAbierto(false); 
   
  return (
        <div className="mr-10">
            <Menu shadow="md" width={200}>
                <Menu.Target>
                    <Avatar
                        size={50}
                        name="Usuario"
                        color="initials"
                        className="cursor-pointer"
                        allowedInitialsColors={["var(--color-secondary-600)"]}
                        styles={{
                            placeholder: {
                                backgroundColor: "white"
                            }
                        }}
                    />
                </Menu.Target>
                <Menu.Dropdown>
                    <Menu.Label
                        style={{
                            color: "var(--color-primary-500)",
                            fontSize: 14
                        }}
                    >
                        Invitado
                    </Menu.Label>
                    <Menu.Item
                        styles={{
                            item: {
                                backgroundColor: "var(--color-info-200)"
                            }
                        }}

                        onClick={abrirModalSesion}
                    >
                        Iniciar Sesión
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>

                <ModalSesion abierto={modalAbierto} onClose={cerrarModalSesion} />
        </div>
    )
}
