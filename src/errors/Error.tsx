import { isRouteErrorResponse, useRouteError } from "react-router-dom";

type DataWithResponseInit<T = unknown> = { 
    type: 'DataWithResponseInit';
    data: T; 
    responseInit: ResponseInit 
};

function isDataWithResponseInit<T>(err: unknown): err is DataWithResponseInit<T> {
    return (
        typeof err === 'object' &&
        err !== null &&
        'type' in err &&
        err.type === 'DataWithResponseInit'
    );
}

export default function Error() {
    const error = useRouteError();

    if(isRouteErrorResponse(error)) {
        switch (error.status) {
            case 404:
                return (
                    <div>
                        <h1>Página no encontrada</h1>
                        <pre>{JSON.stringify(error.data, null, 2)}</pre>
                    </div>
                );

            default:
                return (
                    <div>
                        <h1>Error {error.status}</h1>
                        <pre>{JSON.stringify(error.data, null, 2)}</pre>
                    </div>
                );
        }
    }
}
