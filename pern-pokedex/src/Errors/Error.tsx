import { isRouteErrorResponse, useRouteError } from "react-router-dom"

type DataWithResponseInit< T = unknown> = {
    type: "DataWithResponseInit", 
    data: T, 
    init: ResponseInit
}

function isDataWithReponseInit<T = unknown>(err: unknown): err is DataWithResponseInit<T> {

    return (
        typeof err === "object" &&
        err !== null &&
        (err as any).type === "DataWithResponseInit"
        
    )

}

export default function Error() {

    const error = useRouteError();

    if(isRouteErrorResponse(error)){
        switch(error.status){
            case 404: 
                return <h1>404 - pagina no encontrada</h1>
            default: 
                return (
                    <>
                    <h1>Error {error.status}</h1>
                    <p>{error.statusText}</p>
                    </>
                )
        }
    }

    if(isDataWithReponseInit<{message: string}>(error)){
        return <h1>{error.init.status} - {error.data.message}</h1>
    }

  return (
    <div>Ocurrio un error inesperado...</div>
  )
}