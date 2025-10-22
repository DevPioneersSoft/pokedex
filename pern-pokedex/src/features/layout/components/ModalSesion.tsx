
import { zodResolver } from '@hookform/resolvers/zod'
import { Input, Modal } from '@mantine/core'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useCrearUsuario, useIniciarSesion } from '../../pokemonDetalles/hooks/useRegistro'
import ButtonCustom from './ButtonCustom'

const LOGIN = z.object({
    username: z.string().min(5, 'Usuario no valido'),
    contrasena: z.string().min(3, 'Contraseña no valida')
})

type formValues = z.infer<typeof LOGIN>

export default function ModalSesion({ onOpened, onClose }: { onOpened: boolean, onClose: () => void }) {
    const [sesion, setSesion] = useState(false)

    const { mutate } = useIniciarSesion();
    const { mutate: crearUsuario } = useCrearUsuario();

    const form = useForm<formValues>({
        resolver: zodResolver(LOGIN),
        defaultValues: {
            username: '',
            contrasena: ''
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
        <Modal onClose={onClose} opened={onOpened}
            title={sesion ? 'Registrarse' : 'Iniciar Sesión'}
        >
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Input placeholder="usuario" {...form.register('username')} error={form.formState.errors.username?.message} />
                <Input type="password" placeholder="contraseña" {...form.register('contrasena')} error={form.formState.errors.contrasena?.message} />
                <ButtonCustom type='submit' color="primary" label="Iniciar sesión" />
                <ButtonCustom type="button" color="secondary" onClick={() => setSesion((prev) => !prev)} label={sesion ? 'Iniciar Sesión' : 'Registrarse'} />
            </form>

        </Modal>
    )
}
