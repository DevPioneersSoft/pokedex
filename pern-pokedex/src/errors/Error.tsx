import { isRouteErrorResponse, useRouteError } from "react-router-dom";

type DataWithResponseInit< T = unknown > = {
    type:"DataWithResponseInit"
    data: T;
    init: ResponseInit
};

function isDataWithResponseInit< T = unknown >( err: unknown ): err is DataWithResponseInit<T> {
    return (
        typeof err === "object" &&
        err !== null &&
       (err as any).type === "DataWithResponseInit"
    );
}

export default function Error() {

    const error = useRouteError();

    if(isRouteErrorResponse(error)){
        switch (error.status) {
            case 404:
                return <h1 className="text-center text-3xl font-bold mt-20">Página no encontrada (404)</h1>;
            case 500:
                return <h1 className="text-center text-3xl font-bold mt-20">Error del servidor (500)</h1>;
            default:
                return <h1 className="text-center text-3xl font-bold mt-20">Error desconocido ({error.status})</h1>;
        }
    }

    if(isDataWithResponseInit<{message:string}>(error)){
        return <h1 className="text-center text-3xl font-bold mt-20"> {error.init.status}  - {error.data.message}</h1>;
    }

  return (
    <div>
        <h1>Algo salió mal</h1>
    </div>
  )
}
