import ModalGenerica from "./ModalGenerica";
import {useForm} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from "zod";
import useLogin from "../hooks/useLogin";
import useRegister from "../hooks/useRegister";

const LOGIN =  z.object({
    username: z.string().min(3, "El usuario es obligatorio"),
    contrasena: z.string().min(6, "La contraseña debe tener al menos 6 caracteres")
})

type formValues = z.infer<typeof LOGIN>;

const ModalSesion = ({ modal, setModal }: { modal: string | null; setModal: (modal: string | null) => void }) => {
    const {mutate: login} = useLogin();
    const {mutate: register} = useRegister();
    const _form =  useForm<formValues>({
        resolver: zodResolver(LOGIN),
        defaultValues: {
            username: '',
            contrasena: ''
        }
    });

    const handlerSubmit = (data: formValues) => {
        if(modal === 'login'){
            login({username: data.username, contrasena: data.contrasena});
        }   else if(modal === 'register'){
            register({username: data.username, contrasena: data.contrasena});
        }
    }

    return (
        <ModalGenerica title={modal === "login" ? "Iniciar Sesión" : "Registro"} opened={modal != null} onClose={() => setModal(null)}>
            <form className="flex flex-col space-y-4 mt-4" onSubmit={_form.handleSubmit(handlerSubmit)}>
                <input placeholder="Usuario" className="border p-2 rounded border-black"  {..._form.register("username")} />
                { _form.formState.errors.username && <span className="text-red-500">{_form.formState.errors.username.message}</span> }
                <input placeholder="Contraseña" className="border p-2 rounded border-black"  {..._form.register("contrasena")} />
                { _form.formState.errors.contrasena && <span className="text-red-500">{_form.formState.errors.contrasena.message}</span> }
                <button className="bg-green-500 border border-green-800"  type="submit">{modal === "login" ? "Iniciar Sesión" : "Registrarse"}</button>
                <button onClick={()=>setModal(modal === 'login' ? 'register' :  'login')} className="underline" type="button">{modal === "login" ? "¿No tienes cuenta?, registrate." : "¿Ya tienes cuenta?, inicia sesión."}</button>
            </form>                        
        </ModalGenerica>
    )
}

export default ModalSesion; 