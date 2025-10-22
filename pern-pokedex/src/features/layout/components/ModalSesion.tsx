import { useState } from "react"
import ButtonCustom from "./ButtonCustom"
import { Input, Modal } from "@mantine/core"
import {z} from "zod"
import {useForm} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js"
import { useCrearUsuario, useIniciarSesion } from "../../pokemonDetallado/hooks/useRegistro"

const LOGIN = z.object({
    username: z.string().min(6, "Caracteres insuficientes"),
    contrasena : z.string().min(6, "Mínimo 6 caracteres"),
})

type formsValues = z.infer<typeof LOGIN>

export default function ModalSesion({onOpened, onClose}: {onOpened: boolean, onClose: () => void}) {
    const [sesion, setSesion] = useState(false)

    const {mutate} = useIniciarSesion()
    const {mutate: crearUsuario} = useCrearUsuario()


    const form = useForm<formsValues>({
        resolver: zodResolver(LOGIN),
        defaultValues: {
            username: "",
            contrasena: ""
    }
    })

       const onSubmit = (data: formsValues) =>{
        if(sesion){
                crearUsuario(data)
        }
        else{
            mutate(data)

        }
        
    }
    return (
        <div>
            <Modal onClose={onClose} opened={onOpened}
                title={sesion ? "Registrate" : "Iniciar Sesión"}
                size={"70%"}
               

            >
                <form  onSubmit={form.handleSubmit(onSubmit)}>
                    <Input placeholder="Nombre de Usuario" {...form.register("username")} error={form.formState.errors.username?.message}/> 
                    <Input placeholder="Contraseña" type="password" {...form.register("contrasena")} error={form.formState.errors.contrasena?.message} />
                    <ButtonCustom type="submit" color="primary" label="Iniciar Sesión" />
                    <ButtonCustom type="button"color="secondary" onClick={() => setSesion((prev) => !prev)} label={sesion ? "Iniciar Sesión" : "Registrarse"} />
                </form>

            </Modal>
        </div>
    )
}
