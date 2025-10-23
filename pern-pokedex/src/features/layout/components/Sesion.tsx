import { Avatar, Menu, MenuItem } from "@mantine/core";
import { useState } from "react";
import ModalSesion from "./ModalSesion";
import { useUserStore } from "../store/userStore";

export default function Sesion() {
    const [modal, setModal] = useState(false)
    const {usuario,logout} = useUserStore();

    return (
        <>
            <div className="mr-10">
                <Menu shadow="md" width={200}>
                    <Menu.Target>
                        <Avatar
                            size={50}
                            name={usuario?.username}
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
                                color: "var(--color-primary-500)"
                            }}
                        >
                           { usuario?.username? usuario.username:'invitado' }
                        </Menu.Label>
                     
                        <MenuItem onClick={logout}>Logout</MenuItem>
                        <Menu.Item onClick={() => setModal(true)}
                            styles={{
                                item: {
                                    backgroundColor: "var(--color-info-200)"
                                }
                            }}
                        >
                            Iniciar Sesión
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </div>
            <ModalSesion onOpened={modal} onClose={() => setModal(false)} />
        </>
    )
}