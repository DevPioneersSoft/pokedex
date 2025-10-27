import { isRouteErrorResponse, useRouteError } from "react-router-dom"

type DataWihtResponseInit<T = unknown> = {
    type: "DataWihtResponseInit",
    data: T,
    init: ResponseInit
}

function IsDataWithResponseInit<T = unknown>(err: unknown): err is DataWihtResponseInit<T>{
    return (
        typeof err === 'object' &&
        err !== null &&
        (err as any).type === "DataWihtResponseInit"
    )
}

export default function Error() {

    const error = useRouteError()

    if (isRouteErrorResponse(error)){
        switch(error.status){
            case 404:
                return <h1>404 - Pagina no encontrada</h1>
            default:
                return (
                    <div>
                        <h1>Error {error.status}</h1>
                        <p>{error.statusText}</p>
                    </div>
                )

        }
    }

    if (IsDataWithResponseInit<{ message: string }>(error)){
        return <h1>{error.init.status} - {error.data.message}</h1>
    }

    return (
        <div>
            <h1>Algo salio mal</h1>
        </div>
    )
}
