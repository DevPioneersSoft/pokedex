import { useState } from "react";
import ButtonCustom from "./ButtonCustom";
import { Input, Modal } from "@mantine/core";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCrearUsuario, useIniciarSesion } from "../hooks/useRegistro";

const LOGIN = z.object({
  username: z.string().min(1, "El nombre de usuario es obligatorio"),
  contrasena: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
});

type formValues = z.infer<typeof LOGIN>;

export default function ModalSesion({
  onOpened,
  onClosed,
}: {
  onOpened: boolean;
  onClosed: () => void;
}) {

  const [sesion, setSesion] = useState(false);

  const { mutate } = useIniciarSesion();
  const { mutate: crearUsuario } = useCrearUsuario();

  const form = useForm<formValues>({
    resolver: zodResolver(LOGIN),
    defaultValues: {
      username: "",
      contrasena: "",
    },
  });

    const onSubmit = (data : formValues) => {
      if(sesion) {
        crearUsuario(data);
      }else{
        mutate(data);
      }
    };

  return (
    <Modal opened={onOpened} onClose={onClosed} title="Iniciar Sesión">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Input placeholder="Usuario" {...form.register('username')} error={form.formState.errors.username?.message}/>
        <Input type="password" placeholder="Contraseña" {...form.register('contrasena')} error={form.formState.errors.contrasena?.message}/>
        <ButtonCustom color="primary" label="Iniciar Sesión" />
        <ButtonCustom
          color="secondary"
          onClick={() => setSesion((prev) => !prev)}
          label={sesion ? "Iniciar Sesión" : "Registrarse"}
        />
      </form>
    </Modal>
  );
}
