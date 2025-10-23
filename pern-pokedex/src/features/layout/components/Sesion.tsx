import { Avatar, Menu, useModalsStack } from "@mantine/core";
import ModalSesion from "./ModalSesion";
import { useUserStore } from "../store/userStore";

export default function Sesion() {

    const stack = useModalsStack(["iniciarSesion"]);
    const {usuario, logout} = useUserStore();

    return (
        <>
            <div className="mr-10">
                <Menu shadow="md" width={200}>
                    <Menu.Target>
                        <Avatar
                            size={50}
                            name= {usuario?.username}
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
                            {usuario?.username}
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
                        <Menu.Item
                            styles={{
                                item: {
                                    backgroundColor: "var(--color-info-300)"
                                }
                            }}
                            onClick={() => logout}
                        >
                            Cerrar Sesión
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
