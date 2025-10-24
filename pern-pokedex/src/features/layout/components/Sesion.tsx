import { Avatar, Button, Menu, Modal, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import ModalSesion from "./ModalSesion";
import { useUserStore } from '../store/userStore';

export default function Sesion() {

    const [opened, { open, close }] = useDisclosure(false);

    const usuario = useUserStore(state => state.usuario)
    const logout = useUserStore(state => state.logout)




    return (
        <>
            <div className="mr-10">
                <Menu shadow="md" width={200}>
                    <Menu.Target>
                        <Avatar
                            size={50}
                            name={usuario ? usuario.username : 'Invitado'}
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
                            {usuario ? usuario.username : 'Invitado'}
                        </Menu.Label>

                        {
                            !usuario ? (
                                <Menu.Item
                                    styles={{
                                        item: {
                                            backgroundColor: "var(--color-info-200)"
                                        }
                                    }}

                                    onClick={open}
                                >
                                    Iniciar Sesión
                                </Menu.Item>
                            ) : (
                                <Menu.Item
                                    styles={{
                                        item: {
                                            backgroundColor: "var(--color-info-200)"
                                        }
                                    }}

                                    onClick={logout}
                                >
                                    Cerrar Sesión
                                </Menu.Item>
                            )
                        }
                    </Menu.Dropdown>
                </Menu>
            </div>
            <ModalSesion opened={opened} close={close} />
        </>
    )
}
