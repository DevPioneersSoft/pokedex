import { Input, Modal } from "@mantine/core";
import { useState } from "react";
import ButtonCustom from "./ButtonCustom";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import { useCrearUsuario, useIniciarSesion } from "../../pokemonDetalles/hooks/useRegistro";

const LOGIN = z.object({
    username: z.string().min(5,"Usuario no válido"),
    contrasena: z.string().min(8,"Contraseña no válida")
});

type formValue = z.infer<typeof LOGIN>;

export default function ModalSesion({onOpened,onClose} : {onOpened : boolean, onClose: () =>void}) {
    
    const [sesion, setSesion] = useState(false);

    const {mutate} = useIniciarSesion();
    const {mutate: crearUsuario} = useCrearUsuario();

    const form = useForm<formValue>({
        resolver:zodResolver(LOGIN),
        defaultValues:{
            username:'',
            contrasena:''
        }
    });
    
    const onSubmit = (data:formValue)=>{
        if(sesion){
            crearUsuario(data);
        }else{
            mutate(data);
        }
    }
    
    return (  

        <Modal onClose={onClose} opened={onOpened} 
        title={sesion ? 'Registrarse' : 'Iniciar sesión'} >

            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Input placeholder="usuario" {...form.register('username')} error={form.formState.errors.username?.message}></Input>
                <Input type="password" placeholder="contraseña" {...form.register('contrasena')} error={form.formState.errors.contrasena?.message}></Input>
                <ButtonCustom type="submit" color="primary" label="Iniciar sesión"></ButtonCustom>
                <ButtonCustom type="button" color="secondary" onClick={()=>setSesion((prev) => !prev)} label={sesion ? 'Iniciar Sesión' : 'Registrarse'}></ButtonCustom>
            </form>
        </Modal>
    );
}
