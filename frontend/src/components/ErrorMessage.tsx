type ErrorMessageProps = {
    children: React.ReactNode
}

// Maneja los mensajes de error para cada campo del formulario
export default function ErrorMessage({ children } : ErrorMessageProps) {
    return (
        <p className="bg-red-50 text-red-600 p-3 uppercase text-sm fontbold text-center ">{children}</p>
    )
}