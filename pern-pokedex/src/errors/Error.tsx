import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import ErrorDisplay from "./components/ErrorDisplay";

type DataWhithResponseInit<T = unknown> = {
  data: T;
  type: "DataWhithResponseInit";
  init: ResponseInit;
}

function isDataWhithResponseInit<T = unknown>(err: unknown): err is DataWhithResponseInit<T> {
    return(
        typeof err === "object" &&
        err !== null &&
        (err as any).type === "DataWhithResponseInit"
    )
}

export default function ErrorExample() {
    const error = useRouteError();

    if (isRouteErrorResponse(error)) {
        switch (error.status) {
            case 404:
                return (
                    <ErrorDisplay
                        subtitle="Página no encontrada (404)"
                        message="Lo sentimos, la página que buscas no existe."
                    />
                );
            default:
                return (
                    <ErrorDisplay
                        subtitle={`Error ${error.status}`}
                        message={error.statusText || "Ha ocurrido un error inesperado"}
                    />
                );
        }
    }

    if (error instanceof Error) {
        return (
            <ErrorDisplay
                subtitle={`Error`}
                message={error.message || "Ha ocurrido un error inesperado"}
            />
        );
    }

    if (isDataWhithResponseInit<{message: string}>(error)) {
        return (
            <ErrorDisplay
                subtitle={`Error ${error.init.status || 'Desconocido'}`}
                message={error.init.statusText || "Ha ocurrido un error inesperado"}
            />
        );
    }

    // Fallback para errores no identificados
    return (
        <ErrorDisplay
            subtitle="Error Inesperado"
            message="Ha ocurrido un error que no pudimos identificar"
        />
    );
}