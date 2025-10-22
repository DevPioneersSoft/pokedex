import { zodResolver } from '@hookform/resolvers/zod'
import { Input, Modal, Stack, Title, Text } from '@mantine/core'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import ButtonCustom from './ButtonCustom'
import { useCrearUsuario, useIniciarSesion } from '../../pokemonDetalles/hooks/useRegistro'

const LOGIN = z.object({
  username: z.string().min(5, 'Usuario no válido'),
  contrasena: z.string().min(8, 'Contraseña no válida'),
})

type FormValues = z.infer<typeof LOGIN>

export default function ModalSesion({
  onOpened,
  onClose,
}: {
  onOpened: boolean
  onClose: () => void
}) {
  const [sesion, setSesion] = useState(false)

  const { mutate } = useIniciarSesion()
  const { mutate: crearUsuario } = useCrearUsuario()

  const form = useForm<FormValues>({
    resolver: zodResolver(LOGIN),
    defaultValues: {
      username: '',
      contrasena: '',
    },
  })

  const onSubmit = (data: FormValues) => {
    if (sesion) crearUsuario(data)
    else mutate(data)
  }

  return (
    <Modal
      opened={onOpened}
      onClose={onClose}
      centered
      overlayProps={{ backgroundOpacity: 0.55, blur: 4 }}
      radius="lg"
      size="sm"
      title={
        <Title order={3} c="var(--color-primary-500)" ta="center">
          {sesion ? 'Crear cuenta nueva' : 'Iniciar sesión'}
        </Title>
      }
    >
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Stack gap="sm">
          <Input.Wrapper
            label="Usuario"
            error={form.formState.errors.username?.message}
          >
            <Input
              placeholder="Ingresa tu usuario"
              size="md"
              radius="md"
              {...form.register('username')}
            />
          </Input.Wrapper>

          <Input.Wrapper
            label="Contraseña"
            error={form.formState.errors.contrasena?.message}
          >
            <Input
              type="password"
              placeholder="Ingresa tu contraseña"
              size="md"
              radius="md"
              {...form.register('contrasena')}
            />
          </Input.Wrapper>

          <ButtonCustom
            type="submit"
            color="primary"
            label={sesion ? 'Registrarse' : 'Iniciar sesión'}
          />

          <Text ta="center" fz="sm" c="dimmed">
            {sesion ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}
            <Text
              span
              c="var(--color-primary-500)"
              fw={600}
              className="cursor-pointer hover:underline ml-1"
              onClick={() => setSesion((prev) => !prev)}
            >
              {sesion ? 'Inicia sesión' : 'Regístrate'}
            </Text>
          </Text>
        </Stack>
      </form>
    </Modal>
  )
}
