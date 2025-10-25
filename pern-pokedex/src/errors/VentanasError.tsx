
import { Alert, Title, Text } from '@mantine/core';
import { 
    IconAlertCircle, 
    IconLock, 
    IconMoodSad, 
    IconZoomQuestion 
} from '@tabler/icons-react';
import Header from '../features/layout/components/Header';

interface VentanasErrorProps {
    status: number;
    message?: string;
    statusText?: string;
}

const getErrorDetails = (status: number) => {
    switch (status) {
        case 401:
            return {
                title: 'Acceso Denegado (401)',
                defaultMessage: 'No tienes permiso para ver este recurso.',
                color: 'red',
                icon: IconLock,
            };
        case 404:
            return {
                title: 'Página No Encontrada (404)',
                defaultMessage: 'La ruta que buscas no existe.',
                color: 'yellow',
                icon: IconZoomQuestion,
            };
        case 500:
        case 503:
            return {
                title: `Error del Servidor (${status})`,
                defaultMessage: 'Ocurrió un error interno del servidor. Inténtalo más tarde.',
                color: 'orange',
                icon: IconAlertCircle,
            };
        default:
            return {
                title: `Error Desconocido (${status})`,
                defaultMessage: 'Algo inesperado sucedió.',
                color: 'gray',
                icon: IconMoodSad,
            };
    }
};

export default function VentanasError({ status, message, statusText }: VentanasErrorProps) {
    const details = getErrorDetails(status);
    const IconComponent = details.icon;
    const finalMessage = message || statusText || details.defaultMessage;

    return (
        <div className="min-h-screen min-w-screen bg-linear-to-br from-secondary-400 to-secondary-900 pb-10">
                <Header />
                <div className="flex justify-center p-10 ">
                    <Alert 
                        variant="outline"
                        color={details.color} 
                        title={details.title} 
                        icon={<IconComponent size={24} />}
                        className="w-full max-w-lg"
                    >
                        <Title order={1} c={details.color}>
                            {status}
                        </Title>
                        <Text size="md" mt="sm">
                            {finalMessage}
                        </Text>
                    </Alert>
                </div>
        </div>
    );
}