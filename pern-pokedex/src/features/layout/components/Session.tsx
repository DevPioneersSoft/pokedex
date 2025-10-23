import { Avatar, Menu } from "@mantine/core";
import { useState } from "react";
import ModalSesion from "./ModalSesion";
import { useUserStore } from "../store/userStore";

export default function Session() {
  const [opened, setOpened] = useState(false);
  const { usuario, logout } = useUserStore();

  return (
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
                backgroundColor: "white",
              },
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
            usuario: {usuario ? usuario.username : 'Invitado'}
          </Menu.Label>
          {!usuario ? (
            <Menu.Item
              onClick={() => setOpened(true)}
              styles={{
                item: {
                  backgroundColor: "var(--color-info-200)",
                  fontSize: 14
                }
              }}
            >
              Iniciar sesión
            </Menu.Item>
          ) : (
            <Menu.Item
              onClick={() => {
                logout();
                localStorage.removeItem('usuario');
              }}
              styles={{
                item: {
                  backgroundColor: "var(--color-error-200)",
                  fontSize: 14
                }
              }}
            >
              Cerrar sesión
            </Menu.Item>
          )}
        </Menu.Dropdown>
      </Menu>

      <ModalSesion onOpened={opened} onClose={() => setOpened(false)} />
    </div>
  );
}