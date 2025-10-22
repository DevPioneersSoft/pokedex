import { useState } from 'react'
import ButtonCustom from './ButtonCustom';
import { Modal, Input } from '@mantine/core';
import {z} from 'zod';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import { useCrearUsuario, useIniciarSesion } from '../../pokemonDetalles/hooks/useRegistro';

const LOGIN = z.object({
    username: z.string().min(5, 'El usuario debe contener al menos 5 caracteres'),
    contrasena: z.string().min(6, 'La contraseña debe contener al menos 6 caracteres')
});

type authFormValues = z.infer<typeof LOGIN>;



function ModalSesion({onOpened, onClose}: {onOpened: boolean, onClose: () => void }) {

    const [ sesion, setSesion ] = useState(false);

    const { mutate } = useIniciarSesion(); 
    const { mutate: crearUsuario } = useCrearUsuario(); 

    const form = useForm<authFormValues>({
			resolver: zodResolver(LOGIN),
			defaultValues: {
				username: "",
				contrasena: "",
			},
		});
    
    const onSubmit = ( data: authFormValues ) => {
        if(sesion){
            crearUsuario(data);
            
        } else {
            mutate(data)
        }
        console.log(data)
    };
    
    return (
			<>
				<Modal title="Iniciar Sesión" onClose={onClose} opened={onOpened}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<Input
							placeholder="Usuario"
							type="text"
							{...form.register("username")}
							error={form.formState.errors.username?.message}
						/>
						<Input
							placeholder="contraseña"
							type="password"
							{...form.register("contrasena")}
							error={form.formState.errors.contrasena?.message}
						/>
						<ButtonCustom
							type="submit"
							color="primary"
							label="Iniciar Sesión"
						/>
						<ButtonCustom
							type="button"
							color="secondary"
							onClick={() => setSesion((prev) => !prev)}
							label={sesion ? "Iniciar Sesión" : "Registrarse"}
						/>
					</form>
				</Modal>
			</>
		);
}

export default ModalSesion