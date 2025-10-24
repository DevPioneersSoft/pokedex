import { TextInput, Modal } from '@mantine/core';
import { useState } from 'react';
import ButtonCustom from './ButtonCustom';
import {z} from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useRegistro from '../../pokemonDetalle/componentes/hooks/useRegistro';
import useAutenticacion from '../../pokemonDetalle/componentes/hooks/useAutenticacion';
import { Alert } from '@mantine/core';

const LOGIN = z.object({
  username: z.string()
    .min(2, "Mínimo 2 caracteres")
    .max(10, "Máximo 10 caracteres")
    .regex(/^[a-zA-Z0-9_]+$/, "Solo letras, números y guiones bajos")
    .trim(),
  contrasena: z.string()
    .min(6, "Mínimo 6 caracteres")
    .max(8, "Máximo 8 caracteres")
    .regex(/[A-Z]/, "Debe contener al menos una mayúscula")
    .regex(/[0-9]/, "Debe contener al menos un número"),
});

type FormData = z.infer<typeof LOGIN>;

export default function ModalSesion({ onOpened, onClose } : { onOpened: boolean, onClose: () => void }) {
  const [sesion, setSesion] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const registro = useRegistro();
  const autenticacion = useAutenticacion();
  
  const formulario = useForm<FormData>({
    resolver: zodResolver(LOGIN),
    defaultValues: {
      username: '',
      contrasena: '',
    },
  }); 

  const onSubmit = (data: FormData) => {
    console.log('Formulario enviado con datos:', data);
    setErrorMessage(null); // Limpiar errores anteriores
    
    if (sesion) {
      registro.mutate(data, {
        onSuccess: () => {
          console.log('Usuario registrado exitosamente');
          formulario.reset();
          onClose();
        },
        onError: (error) => {
          setErrorMessage(error.message || 'Error al registrar usuario');
          console.error('Error al registrar:', error);
        }
      });
    } else {
      autenticacion.mutate(data, {
        onSuccess: (response) => {
          console.log('Sesión iniciada:', response);
          formulario.reset();
          onClose();
        },
        onError: (error) => {
          setErrorMessage(error.message || 'Error al autenticar usuario');
          console.error('Error al autenticar:', error);
        }
      });
    }
  }

  return (
    <Modal onClose={onClose} opened={onOpened}
      title={sesion ? 'Registrarse' : 'Iniciar Sesión'}
    >
      <form onSubmit={formulario.handleSubmit(onSubmit)}>
        
        {errorMessage && (
          <Alert 
            withCloseButton 
            closeButtonLabel="Cerrar" 
            title={sesion ? "Error al registrar" : "Error al iniciar sesión"} 
            color="red"
            onClose={() => setErrorMessage(null)}
            mb="md"
          >
            {errorMessage}
          </Alert>
        )}

        <div style={{ marginBottom: '1rem' }}>
          <TextInput 
            placeholder="usuario" 
            {...formulario.register('username')} 
            error={formulario.formState.errors.username?.message}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <TextInput 
            type="password" 
            placeholder="contraseña" 
            {...formulario.register('contrasena')} 
            error={formulario.formState.errors.contrasena?.message}
          />
        </div>
        
        <ButtonCustom type="submit" color="primary" label={sesion ? 'Registrarse' : 'Iniciar sesión'} />
        <ButtonCustom type="button" color="secondary" onClick={() => setSesion(prev => !prev)} label={sesion ? 'Iniciar Sesión' : 'Registrarse'} />
      </form>
    </Modal>
  )
}