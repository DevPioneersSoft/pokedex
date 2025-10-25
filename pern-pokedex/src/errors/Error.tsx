import { isRouteErrorResponse, useRouteError } from "react-router-dom"
import VentanasError from "./VentanasError";

type DataWithResponseInit<T = unknown> = {
    type : 'DataWithResponseInit',
    data : T,
    init : ResponseInit
}

function isDataWithResponseInit<T = unknown>(err : unknown) : err is DataWithResponseInit<T>{
    return (
        typeof err === 'object' &&
        err != null &&
        (err as any).type === 'DataWithResponseInit'
    )
}

export default function Error() {

    const error = useRouteError();

    if(isRouteErrorResponse(error)){
        const status = error.status;
        return (
            <VentanasError
                status={status} 
                message={error.data?.message}
            />
        );
    }

    if(isDataWithResponseInit<{message : string}>(error)){
        return (
            <VentanasError
                status={error.init?.status ?? 500}
                message={error.data.message}
            />
        );
    }

  return (
        <VentanasError 
            status={0}
            message="Error inesperado de la aplicación."
        />
    )
}
