import { useState } from "react"
import ButtonCustom from "./ButtonCustom"
import { Input, Modal } from "@mantine/core"


export default function ModalSesion({onOpened, onClose}: {onOpened: boolean, onClose: () => void}) {
    const [sesion, setSesion] = useState(false)

       const onSubmit = (data) =>{
        console.log(data)
         }
    return (
        <div>
            <Modal onClose={onClose} opened={onOpened}
                title={sesion ? "Registrate" : "Iniciar Sesión"}
                size={"70%"}
               

            >
                <form>
                    <Input placeholder="Nombre de Usuario"> </Input>
                    <Input placeholder="Contraseña" type="password"> </Input>
                    <ButtonCustom type="submit" color="primary" label="Iniciar Sesión" />
                    <ButtonCustom type="button"color="secondary" onClick={() => setSesion((prev) => !prev)} label={sesion ? "Registrarse" : "Iniciar Sesión"} />
                </form>

            </Modal>
        </div>
    )
}
