import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Divider, Input, Modal, Text } from '@mantine/core'
import { useState } from 'react'
import { flushSync } from 'react-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useLogin } from '../../cuadricula/hooks/useLogin'
import { useRegistro } from '../../cuadricula/hooks/useRegistro'
import { useUserStore } from '../store/userStore'

const LOGIN = z.object({
    username: z.string().min(5, 'Usuario no valido'),
    contrasena: z.string().min(8, 'Contraseña no valida')
})

type formValues = z.infer<typeof LOGIN>

export default function ModalSesion({ onOpened, onClose }: { onOpened: boolean, onClose: () => void }) {
    const [sesion, setSesion] = useState(false)

    const { mutate: loginUsuario } = useLogin()
    const { mutate: crearUsuario } = useRegistro()

    const setUser = useUserStore(state => state.setUser)
    const logout = useUserStore(state => state.logout)

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
            loginUsuario(data, {
                onSuccess: data => {
                    flushSync(() => logout())
                    setUser(data)
                    form.reset()
                }
            })
        }
    }
    return (
        <Modal
            opened={onOpened} onClose={onClose} centered radius="lg"
            title={<Text size="xl" fw={700} ta="center"> {sesion ? "Registrarse" : "Iniciar Sesión"} </Text>}
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
        >
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 p-2">
                <div>
                    <Input.Wrapper label="Usuario" error={form.formState.errors.username?.message} >
                        <Input placeholder="Ingresa tu usuario" {...form.register("username")} radius="md" />
                    </Input.Wrapper>
                </div>

                <div>
                    <Input.Wrapper label="Contraseña" error={form.formState.errors.contrasena?.message}>
                        <Input type="password" placeholder="••••••••" {...form.register("contrasena")} radius="md" />
                    </Input.Wrapper>
                </div>

                <Button type="submit" radius="md" fullWidth className="mt-2 font-semibold">
                    {sesion ? "Registrarse" : "Iniciar Sesión"}
                </Button>

                <Divider my="sm" label="o" labelPosition="center" />

                <Text size="sm" c="blue" ta="center" className="cursor-pointer hover:underline" onClick={() => setSesion((prev) => !prev)} >
                    {sesion ? "¿Ya tienes cuenta? Inicia sesión" : "¿No tienes cuenta? Regístrate"}
                </Text>
            </form>
        </Modal>
    )
}
