
import { Avatar, Menu } from "@mantine/core";
import { useState } from "react";
import useRegistroUsuario from "../../ejemploHooks/hooks/useRegistroUsuario";
import useLoginUsuario from "../../ejemploHooks/hooks/useLogin";
import ModalGenerico from "./ModalGenerico";
import FormularioLogin from "./FormularioLogin";
import FormularioRegistro from "./FormularioRegistro";
import { useUserStore } from "../store/userStore";



export default function Session() {
  const [modalLoginAbierto, setModalLoginAbierto] = useState(false);
  const [modalRegistroAbierto, setModalRegistroAbierto] = useState(false);
  const registroMutation = useRegistroUsuario();
  const loginMutation = useLoginUsuario();

  // sacar la info del usuario del store
  const usuario = useUserStore((state: any) => state.usuario);
  const setUser = useUserStore((state: any) => state.setUser);
  const logOut = useUserStore((state: any) => state.logOut);

  const handleIniciarSesion = () => setModalLoginAbierto(true);
  const handleCerrarModal = () => setModalLoginAbierto(false);
  const handleAbrirRegistro = () => setModalRegistroAbierto(true);
  const handleCerrarRegistro = () => setModalRegistroAbierto(false);

  const handleLogin = (username: string, contrasena: string) => {
    loginMutation.mutate(
      { username, contrasena },
      {
        onSuccess: (data: any) => {
          if (data && data.usuario) {
            setUser({
              id: data.usuario.id,
              username: data.usuario.username
            });
          }
          setModalLoginAbierto(false);
        },
        onError: (error: any) => {
          console.error("Error al iniciar sesión", error);
        },
      }
    );
  };

  const handleCerrarSesion = () => {
    logOut();
  };

  // Obtener iniciales del usuario
  const obtenerIniciales = (username: string) => {
    if (!username) return "?";
    const parts = username.split(" ");
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return parts.map((p) => p[0]).join("").slice(0, 2).toUpperCase();
  };

  const estaLogueado = !!usuario;
  const username = usuario?.username || "Invitado";
  const avatarInitials = estaLogueado ? obtenerIniciales(username) : "?";

  return (
    <div className="mr-10">
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <Avatar
            size={50}
            color="blue"
            className="cursor-pointer"
            radius="xl"
            styles={{
              placeholder: {
                backgroundColor: "white",
              },
            }}
          >
            {avatarInitials}
          </Avatar>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label
            style={{
              color: "var(--color-primary-500)",
              fontSize: 14
            }}
          >
            {username}
          </Menu.Label>
          {!estaLogueado ? (
            <>
              <Menu.Item onClick={handleIniciarSesion}>
                Iniciar Sesión
              </Menu.Item>
              <Menu.Item onClick={handleAbrirRegistro}>
                Registrar usuario
              </Menu.Item>
            </>
          ) : (
            <Menu.Item onClick={handleCerrarSesion}>
              Cerrar Sesión
            </Menu.Item>
          )}
        </Menu.Dropdown>
      </Menu>

      <ModalGenerico
        opened={modalLoginAbierto}
        onClose={handleCerrarModal}
        title="Iniciar Sesión"
      >
        <FormularioLogin
          onSubmit={handleLogin}
          onCancel={handleCerrarModal}
        />
      </ModalGenerico>

      <ModalGenerico
        opened={modalRegistroAbierto}
        onClose={handleCerrarRegistro}
        title="Registrar usuario"
      >
        {modalRegistroAbierto && (
          <FormularioRegistro
            onSubmit={(username: string, contrasena: string) => {
              setModalRegistroAbierto(false);
              registroMutation.mutate({ username, contrasena });
              console.log('Registro:', { username, contrasena });
            }}
            onCancel={handleCerrarRegistro}
          />
        )}
      </ModalGenerico>
    </div>
  );
}