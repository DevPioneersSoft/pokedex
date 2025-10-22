import { Avatar, Menu } from "@mantine/core";
import { useState } from "react";
import ModalSesion from "./ModalSesion";

export default function Sesion() {
    const [inicioSesion, setInicioSesion] = useState(false);
    return (
        <div className="mr-10">
            <Menu shadow="md" width={200}>
                <Menu.Target>
                    <Avatar
                        size={50}
                        name="U"
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
                        onClick={() => setInicioSesion(true)}
                        styles={{
                            item: {
                                backgroundColor: "var(--color-info-200)"
                            }
                        }}>
                        Iniciar Sesión
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
            <ModalSesion onOpened={inicioSesion} onClose={() => setInicioSesion(false)} />
            { /*inicioSesion ? <div> </div> : <div></div> */}
        </div>
    )
}
