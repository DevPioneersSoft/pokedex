import { Group, Input, Modal, PasswordInput, type ModalProps } from '@mantine/core'
import { useState, type ReactNode } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDisclosure } from '@mantine/hooks';
import ButtonCustom from './ButtonCustom';
import { IconAt } from '@tabler/icons-react';
import { useForm } from 'react-hook-form';
import { useCrearUsuario, useIniciarSesion } from '../hooks/useUsuario';

const LOGIN = z.object({
	username: z.email().nonempty(),
	contrasena: z.string().min(6, "Ingresa una contraseña con mas caracteres")
})

type formValues = z.infer<typeof LOGIN>;

interface ModalSesionProps extends ModalProps {
	children?: ReactNode;
	footerLeftContent?: ReactNode;
	footerCenterContent?: ReactNode;
	footerRightContent?: ReactNode;
}

export default function ModalSesion({
	withCloseButton = true,
	size = "md",
	children,
	footerCenterContent,
	footerLeftContent,
	footerRightContent,
	...props
}: ModalSesionProps) {


	const [esRegistro, setEsRegistro] = useState(true);
	const [visible, { toggle }] = useDisclosure(false);

	const {mutate : crearUsuario} = useCrearUsuario();
	const {mutate } = useIniciarSesion();

	const formRegistro = useForm<formValues>({
		resolver: zodResolver(LOGIN),
		defaultValues: {
			username: '',
			contrasena: ''
		}
	});

	const onSubmit = (formData : formValues) => {
		if(!esRegistro){
			crearUsuario(formData);
		} else {
			mutate(formData);
		}
	}

	return (
		<div>
			<Modal
				closeOnEscape={false}
				closeOnClickOutside={false}
				withCloseButton={withCloseButton}
				autoFocus={false}
				size={size}
				transitionProps={{ transition: "scale" }}
				styles={{
					header: {
						borderColor: "var(--color-slate-200)",
						borderBottomWidth: 1,
						borderBottomStyle: "solid",
						alignItems: 'center',
						background: "linear-gradient(180deg, var(--color-primary-500) 0%, var(--color-primary-700) 100%)",
					},
					title: {
						fontSize: "30px",
						fontWeight: 'bold',
						flex: 1,
						textAlign: 'center',
						color: 'white'
					},
					body: {
						padding: 0,
					},
					content: {
						border: "3px solid var(--color-warning-600)",
						borderRadius: "12px",
					},
					close: {
						color: 'white',
						backgroundColor: '(--color-primary-500)'
					}
				}}
				{...props}>
					<div className='px-5 py-5'>
						<form onSubmit={formRegistro.handleSubmit(onSubmit)}>
							<Input.Wrapper withAsterisk className='font-normal' label="Correo:" >
								<Input 
									placeholder="ejemplo@email.com" 
									leftSection={ 
											<IconAt size={16}/>
										} 
									mt="md" 
									{...formRegistro.register('username')}
									error={formRegistro.formState.errors.username?.message}/>
							</Input.Wrapper>

							<PasswordInput
								mt="md"
								className='font-normal'
								withAsterisk
								label="Contraseña:"
								defaultValue=""
								visible={visible}
								onVisibilityChange={toggle}
								{...formRegistro.register('contrasena')}
								error={formRegistro.formState.errors.contrasena?.message}
							/>

							<Group justify="flex-end" mt="md">
								{esRegistro ? 

									<ButtonCustom onClick={() => setEsRegistro(false)}
									label="Registrar"
									color="secondary"
									type="submit"/> 
									: 
									<ButtonCustom onClick={() => setEsRegistro(true)}
									label="Iniciar Sesión"
									color="secondary"
									type="submit"/>
								}

							</Group>
						</form>
					</div>
			</Modal>

		</div>
	)
}
