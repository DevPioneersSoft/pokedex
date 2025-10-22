import { Input, Modal } from "@mantine/core";
import ButtonCustom from "./ButtonCustom";
import { useState } from "react";
import z from 'zod'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCrearUsuario, useRegistro } from '../../pokemonDetalles/hooks/useRegistro'

const LOGIN = z.object({username : z.string().min(3, "Usuario incorrecto"), password : z.string().min(10, "Contraseña incorrecta") });
type formValues = z.infer<typeof LOGIN>

export default function ModalSesion({onOpened, onClose} : {onOpened: boolean, onClose : () => void}){
     const [sesion, setSesion] = useState<boolean>(false);

      const { mutate } = useRegistro();
      const { mutate: crearUsuario } = useCrearUsuario();

    const form = useForm<formValues>({
        resolver: zodResolver(LOGIN),
        defaultValues: {
            username: '',
            password: ''
        }
    })

  
    const onSubmit = (data: formValues) => {
        if (sesion) {
            crearUsuario(data)
        } else {
            mutate(data)
        }
    }


    return (
        <Modal onClose={onClose} opened={onOpened} title="Iniciar sesion">
             <form onSubmit={form.handleSubmit(onSubmit)}>

                <div className="flex flex-col">
                    <div className="mb-10">
                        <label className="font-bold">Usuario </label>
                        <Input type="text" className="bg-white"  {...form.register("username")} error={form.formState.errors.username?.message} />
                    </div>

                    <div className="mb-10">
                        <label className="font-bold">Contraseña </label>
                        <Input type="password" className="bg-white " {...form.register("password")} error={form.formState.errors.password?.message}/>
                    </div>

                    <div className="">
                        <ButtonCustom type="submit" label="Iniciar Sesion" className="bg-red-500"/>
                        <ButtonCustom onClick={async () => setSesion((prev) => !prev)} label={sesion ? 'Registrarse' : 'Iniciar Sesión'} className="bg-blue-600" />
                    </div>

                </div>


            </form>
        </Modal>
    )
}