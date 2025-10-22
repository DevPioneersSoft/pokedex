import { Avatar, Input, Menu, useModalsStack } from "@mantine/core";
import ModalSesion from "./ModalSesion";
import { IconAt } from '@tabler/icons-react';

export default function Sesion() {

    const stack = useModalsStack(["iniciarSesion"]);

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
                            onClick={() => stack.open("iniciarSesion")}
                        >
                            Iniciar Sesión
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </div>
            <ModalSesion
                title="Iniciar Sesión"
                {...stack.register("iniciarSesion")}
            >
            </ModalSesion>
        </>
    )
}
