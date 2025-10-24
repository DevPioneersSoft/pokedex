import { Avatar, Menu } from "@mantine/core";
import { useState } from "react";
import { flushSync } from "react-dom";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/userStore";
import ModalSesion from "./ModalSesion";

export default function Sesion() {
    const usuario = useUserStore(state => state.usuario)
    const logout = useUserStore(state => state.logout)
    const [modal, setModal] = useState(false)
    const navigate = useNavigate()

    const handleLogout = () => {
        flushSync(() => logout());
        navigate('/');
    };

    return (
        <>
            <div className="mr-10">
                <Menu shadow="md" width={200}>
                    <Menu.Target>
                        <Avatar
                            size={50}
                            name={usuario?.username || ""}
                            color={usuario ? `initials` : "var(--color-secondary-600)"}
                            allowedInitialsColors={["var(--color-secondary-600)"]}
                            className="cursor-pointer"
                            styles={{
                                placeholder: {
                                    backgroundColor: "white",
                                },
                            }}
                        />
                    </Menu.Target>
                    <Menu.Dropdown>
                        <Menu.Label
                            style={{
                                color: "var(--color-primary-500)",
                                fontSize: 14,
                            }}
                        >
                            {usuario?.username || "Invitado"}
                        </Menu.Label>
                        {usuario ? (
                            <Menu.Item
                                styles={{
                                    item: {
                                        backgroundColor: "var(--color-danger-200)",
                                    },
                                }}
                                onClick={handleLogout}
                            >
                                Cerrar Sesión
                            </Menu.Item>
                        ) : (
                            <Menu.Item
                                styles={{
                                    item: {
                                        backgroundColor: "var(--color-info-200)",
                                    },
                                }}
                                onClick={() => setModal(true)}
                            >
                                Iniciar Sesión
                            </Menu.Item>
                        )}
                    </Menu.Dropdown>
                </Menu>
            </div>
            <ModalSesion onOpened={modal} onClose={() => setModal(false)} />
        </>
    )
}