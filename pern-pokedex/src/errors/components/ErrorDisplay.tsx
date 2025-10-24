import { Link } from "react-router-dom";

interface ErrorDisplayProps {
  title?: string;
  subtitle: string;
  message: string;
  showBackButton?: boolean;
}

export default function ErrorDisplay({ 
  title = "¡Oops!", 
  subtitle, 
  message, 
  showBackButton = true 
}: ErrorDisplayProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500 mb-4">{title}</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          {subtitle}
        </h2>
        <p className="text-sm text-gray-500 mb-8">
          <i><p>{message}</p></i>
        </p>
        {showBackButton && (
          <Link 
            to="/" 
            className="inline-block bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
          >
            Volver al inicio
          </Link>
        )}
      </div>
    </div>
  );
}