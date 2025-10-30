import { Avatar, Menu } from "@mantine/core";
import { useState } from "react";
import ModalSesion from "./ModalSesion";
import { useUserStore } from "../store/userStore";

export default function Sesion() {
  const [modal, setModal] = useState(false);
  const usuario = useUserStore((state) => state.usuario);

  return (
    <>
      <div className="mr-10">
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <Avatar
              size={50}
              name={usuario?.usuario?.username || "Invitado"}
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
              }}
            >
              {usuario?.usuario?.username || "Invitado"}
            </Menu.Label>
            <Menu.Item
              onClick={() => setModal(true)}
              styles={{
                item: {
                  backgroundColor: "var(--color-info-200)",
                },
              }}
            >
              Iniciar Sesión
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
      <ModalSesion onOpened={modal} onClose={() => setModal(false)} />
    </>
  );
}
