import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Modal } from "@mantine/core";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { flushSync } from "react-dom";

import ButtonCustom from "./ButtonCustom";
import { useUserStore } from "../store/userStore";
import useLogin from "../hooks/useLogin";
import useRegister from "../hooks/useRegister";

const LOGIN = z.object({
  username: z.string().min(5, "Usuario no valido"),
  contrasena: z.string().min(8, "Contraseña no valida"),
});

type formValues = z.infer<typeof LOGIN>;

export default function ModalSesion({
  onOpened,
  onClose,
}: {
  onOpened: boolean;
  onClose: () => void;
}) {
  const [sesion, setSesion] = useState(false);
  const setUser = useUserStore((state) => state.setUser);
  const logout = useUserStore((state) => state.logout);

  const { mutate } = useLogin();
  const { mutate: crearUsuario } = useRegister();

  const form = useForm<formValues>({
    resolver: zodResolver(LOGIN),
    defaultValues: {
      username: "",
      contrasena: "",
    },
  });

  const onSubmit = (data: formValues) => {
    if (sesion) {
      crearUsuario(data);
    } else {
      mutate(data, {
        onSuccess: (data) => {
          flushSync(() => logout());
          setUser(data);
          form.reset();
        },
      });
    }
  };
  return (
    <Modal
      onClose={onClose}
      opened={onOpened}
      title={sesion ? "Registrarse" : "Iniciar Sesión"}
    >
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Input
          placeholder="usuario"
          {...form.register("username")}
          error={form.formState.errors.username?.message}
        />
        <Input
          type="password"
          placeholder="contraseña"
          {...form.register("contrasena")}
          error={form.formState.errors.contrasena?.message}
        />
        <ButtonCustom type="submit" color="primary" label="Iniciar sesión" />
        <ButtonCustom
          type="button"
          color="secondary"
          onClick={() => setSesion((prev) => !prev)}
          label={sesion ? "Iniciar Sesión" : "Registrarse"}
        />
      </form>
    </Modal>
  );
}