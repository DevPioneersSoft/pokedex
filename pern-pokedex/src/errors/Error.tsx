import { isRouteErrorResponse, useRouteError } from "react-router-dom"

type DataWithResponseInit<T = unknown> = {
    type: "DataWithResponseInit",
    data: T,
    init: ResponseInit
}

function isDataWithResponseInit<T = unknown>(err: unknown): err is DataWithResponseInit<T> {
    return (
        typeof err === 'object' &&
        err !== null &&
        (err as any).type === "DataWithResponseInit"
    )
}

export default function Error() {

    const error = useRouteError()

    if (isRouteErrorResponse(error)) {
        switch (error.status) {
            case 404:
                return <h1>404- Pagina no encontrada</h1>
            default:
                return (
                    <div>
                        <h1>Error {error.status}</h1>
                        <p>{error.statusText}</p>
                    </div>
                )
        }
    }

    if (isDataWithResponseInit<{ message: string }>(error)) {
        return <h1>{error.init.status} - {error.data.message}</h1>
    }


    return (
        <div>
            <h1>Algo salio mal</h1>
        </div>
    )
}
