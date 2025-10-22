import { Avatar, Menu } from "@mantine/core";


let user = "Abraham";


export default function Sesion() {
    return (
   <div className="mr-10">
    <Menu shadow="md" width={200}>
            <Menu.Target>
                <Avatar size={50} color="initials"  allowedInitialsColors={["var(--color-secondary-600)"]} name={user} className="cursor-pointer" styles={{placeholder:{
                    backgroundColor: "white"
                }}}>

                </Avatar>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Label style={{color: "var(--color-primary-500)", fontSize: 14}}>
                    "Invitado"
                </Menu.Label>
                <Menu.Item styles={{
                    item:{
                        backgroundColor:"var(--color-info-200)"
                    }
                }}>
                    Iniciar Sesión
                </Menu.Item>
            </Menu.Dropdown>

    </Menu>
   </div>
    );
}