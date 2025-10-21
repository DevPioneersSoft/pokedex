import { Avatar, Button, Menu, Modal, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import ModalSesion from "./ModalSesion";

export default function Sesion() {

    const [opened, { open, close }] = useDisclosure(false);

    


    return (
        <>
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

                            onClick={open}
                        >
                            Iniciar Sesión
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </div>
            <ModalSesion opened={opened} close={close}/>
        </>
    )
}
