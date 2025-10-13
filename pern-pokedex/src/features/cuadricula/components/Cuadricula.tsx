export default function Saludo(props: {
  children?: React.ReactNode;
  nombre: React.ReactNode;
  apellido?: string;
}) {
  return (
    <>
      <h1>
        Hola, {props.nombre}
        {props.children && <span>"Texto validado "{props.children}</span>}!
      </h1>
    </>
  );
}
