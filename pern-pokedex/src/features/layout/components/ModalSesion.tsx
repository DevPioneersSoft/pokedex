import React, { useState } from 'react'
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@mantine/core';
import { userCrearCuentaHook, useLoginHook } from '../../pokemonDetalles/hooks/useRegistroHook';
import ModalGenerica from './ModalGenerica';

const LOGIN  = z.object({
    username: z.string().min(1, 'El nombre de usuario es obligatorio'),
    contrasena: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

type formValues = z.infer<typeof LOGIN>;
interface ModalSesionProps {
  abierto: boolean;
  onClose: () => void;
}

export  function ModalSesion( {abierto, onClose } : ModalSesionProps ) {

    const [sesion, setSesion] = useState(false);

    const form = useForm<formValues>({
    resolver: zodResolver(LOGIN),
    defaultValues: {
        username: '',
        contrasena: '',
    }
});
const { mutate: mutateLogin } = useLoginHook();
const { mutate: mutateCrearCuenta } = userCrearCuentaHook();

    const onSubmit = (data : formValues) => {
        

        if(sesion){
            mutateCrearCuenta(data);
        } else {
            mutateLogin(data);
        }
        // Lógica para manejar el envío del formulario
    }

  return (
    <ModalGenerica opened={abierto} onClose={onClose} title="Iniciar Sesión">
        <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-4">
                        <label className="flex flex-col text-lg">
                            Usuario:
                        </label>
                        <Input type="text" className="border border-gray-300 p-2 rounded" {...form.register('username')} error={form.formState.errors.username?.message} />
                    </div>
                    <div className="flex flex-col gap-4 mt-4">
                        <label className="flex flex-col text-lg">
                            Contraseña:
                        </label>
                        <Input type="password" className="border border-gray-300 p-2 rounded" {...form.register('contrasena')} error={form.formState.errors.contrasena?.message} />
                    </div>
                    <div className="flex justify-end mt-6">
                        <button
                            type="submit"
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                            onClick={() => setSesion(false)} // para iniciar sesión
                            
                        >
                            Iniciar Sesión
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            onClick={() => setSesion(true)} // para crear cuenta
                        >
                            Crear Cuenta
                            
                        </button>
                    </div>
                </form>
    </ModalGenerica>
    
  )
}
