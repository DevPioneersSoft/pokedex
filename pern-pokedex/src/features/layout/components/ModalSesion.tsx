import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Modal, TextInput, type ModalProps } from '@mantine/core';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod'
import { useRegistro } from '../../login/hooks/useRegistro';
import { useLogin } from '../../login/hooks/useLogin';

const login = z.object({
    username: z.string().min(8, { message: 'Ususario no valido' }),
    contrasena: z.string().min(9, { message: 'La contraseña debe de tener minimo 9 caracteres' })
})

export type formValue = z.infer<typeof login>


type ModalSesionProps = {
    opened: boolean, close: () => void
}


export default function ModalSesion({ opened, close }: ModalSesionProps) {
    const [sesion, setSesion] = useState(false);

    const { register, handleSubmit, formState } = useForm<formValue>({
        resolver: zodResolver(login),
        defaultValues: {
            username: '',
            contrasena: ''
        }
    });

    const { mutate } = useRegistro();
    const { mutate: mutateLogin } = useLogin();

    const onSubmit = (data: formValue) => {
        if (sesion) {
            mutateLogin(data)
        } else {
            mutate(data)

        }
    }
    return (
        <>
            <Modal opened={opened} onClose={close} title={sesion ? 'Iniciar sesión' : 'Registrase'}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextInput  {...register("username")} error={formState.errors.username?.message} label="Username" placeholder="Username" />

                    <TextInput  {...register("contrasena")} mt="md" label="Pasaword" placeholder="Pasaword" error={formState.errors.contrasena?.message} />

                    <div className='flex gap-1.5 '>
                        <Button type='submit' mt="md">
                            {sesion ? 'Iniciar Sesión' : 'Registrase'}
                        </Button>
                        <Button type='button' onClick={() => setSesion(prev => !prev)} mt="md">
                            {sesion ? 'Registrase' : 'Iniciar sesión'}
                        </Button>
                    </div>
                </form>
            </Modal>
        </>
    )
}
