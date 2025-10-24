import { Loader } from "@mantine/core"
import { Color } from "../types/Color"

interface ButtonCustomProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    id?: string
    type?: "submit" | "reset" | "button"
    label?: string
    color?: Color
    isLoading?: boolean
}

const colors = {
    primary: {
        bg: "from-primary-500 to-primary-700",
        border: "border-primary-900",
        hover: "hover:from-primary-400 hover:to-primary-600",
        ringFocus: "focus:ring-primary-400 "
    },
    secondary: {
        bg: "from-secondary-500 to-secondary-700",
        border: "border-secondary-900",
        hover: "hover:from-secondary-400 hover:to-secondary-600",
        ringFocus: "focus:ring-secondary-400 "
    },
    danger: {
        bg: "from-danger-500 to-danger-700",
        border: "border-danger-900",
        hover: "hover:from-danger-400 hover:to-danger-600",
        ringFocus: "focus:ring-danger-400 "
    },
    warning: {
        bg: "from-warning-500 to-warning-700",
        border: "border-warning-900",
        hover: "hover:from-warning-400 hover:to-warning-600",
        ringFocus: "focus:ring-warning-400 "
    },
    default: {
        bg: "from-default-500 to-default-700",
        border: "border-default-900",
        hover: "hover:from-default-400 hover:to-default-600",
        ringFocus: "focus:ring-default-400 "
    },
}

export default function ButtonCustom({
    label,
    color = 'default',
    className,
    isLoading = false,
    disabled,
    ...props
}: ButtonCustomProps) {
    const variante = colors[color]
    return (
        <button
            className={`
                relative inline-flex items-center justify-center px-6 py-2 
                rounded-lg font-bold uppercase text-white 
                bg-gradient-to-b ${variante.bg} border-4 
                ${variante.border} shadow-lg transition-all duration-200 
                ${variante.hover} active:translate-y-0.5 
                active:shadow-md focus:outline-none focus:ring-2 ${variante.ringFocus}
                focus:ring-offset-2
                disabled:cursor-not-allowed
                ${className ?? ''} 
            `}
            disabled={disabled || isLoading}
            {...props}
        >
            {
                isLoading ? <Loader color="white" type="bars" size={'sm'} /> : label
            }
        </button>
    )
}
