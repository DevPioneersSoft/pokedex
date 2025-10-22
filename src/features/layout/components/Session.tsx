import { Avatar, Menu } from "@mantine/core";
import { useState } from "react";
import useRegistroUsuario from "../../ejemploHooks/hooks/useRegistroUsuario";
import useLoginUsuario from "../../ejemploHooks/hooks/useLogin";
import ModalGenerico from "./ModalGenerico";
import FormularioLogin from "./FormularioLogin";
import FormularioRegistro from "./FormularioRegistro";


export default function Session() {
  const [modalLoginAbierto, setModalLoginAbierto] = useState(false);
  const [modalRegistroAbierto, setModalRegistroAbierto] = useState(false);
  const [usuarioLogueado, setUsuarioLogueado] = useState<string | null>(null);
  const [estaLogueado, setEstaLogueado] = useState(false);

  const handleIniciarSesion = () => setModalLoginAbierto(true);
  const handleCerrarModal = () => setModalLoginAbierto(false);
  const handleAbrirRegistro = () => setModalRegistroAbierto(true);
  const handleCerrarRegistro = () => setModalRegistroAbierto(false);

  const handleLogin = (username: string, contrasena: string) => {
    loginMutation.mutate(
      { username, contrasena },
      {
        onSuccess: (data: any) => {
          setUsuarioLogueado(username);
          setEstaLogueado(true);
          setModalLoginAbierto(false);
          console.log("Login exitoso", data);
        },
        onError: (error: any) => {
          console.error("Error al iniciar sesión", error);
        },
      }
    );
  };

  const handleCerrarSesion = () => {
    setUsuarioLogueado(null);
    setEstaLogueado(false);
  };

  const registroMutation = useRegistroUsuario();
  const loginMutation = useLoginUsuario();

  return (
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
            {estaLogueado ? usuarioLogueado : "Invitado"}
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