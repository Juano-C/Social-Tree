import { Link, useLocation, useNavigate } from 'react-router-dom' // Evitar que la pantalla se recargue «parpadeando» al redireccionar
import { useForm } from 'react-hook-form' // Aplicar reglas de validación, mostrar errores, leer datos, etc.
import { isAxiosError } from 'axios' // Enviar la peticion http al backend
import { toast } from 'sonner' // Para manejar mensajes emergentes (registrar usuario)
import type { RegisterForm } from '../types'
import ErrorMessage from '../components/ErrorMessage' // Importa la funcion
import api from '../config/axios' // Importa el const para tener una base de url por default

export default function RegisterView() {

    // Para leer el handle disponible que quiere el usuario 'location.state.handle'
    const location = useLocation()

    const navigate = useNavigate()

    // Valores iniciales del formulario (para que el mensaje de error sepa que es un string)
    const initialValues: RegisterForm = {
        name: '',
        email: '',
        handle: location?.state?.handle || '',
        password: '',
        password_confirmation: ''
    }

    const { register, watch, reset, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

    const password = watch('password')

    // Enviar datos del usuario al backend para inicio de sesion
    const handleRegister = async (formData: RegisterForm) => {
        try { // Enviamos formulario al backend
            const { data } = await api.post(`/auth/register`, formData)
            toast.success(data)

            reset()

            navigate('/auth/login')
        } catch (error) { // Si hay error = muestro el error 
            if (isAxiosError(error) && error.response) {
                toast.error(error.response.data.error)
            }
        }
    }

    return (
        <>
            <h1 className='text-4xl text-white font-bold'>Registrar Cuenta</h1>
            {/* Formulario de registro */}
            <form
                onSubmit={handleSubmit(handleRegister)}

                className="bg-white px-5 py-20 rounded-lg space-y-10 mt-10">

                {/* --------------campo de Nombre-------------- */}
                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="name" className="text-2xl text-slate-500">Nombre</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Tu nombre"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register('name', {
                            required: "Nombre requerido"
                        })}
                    />

                    {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
                </div>

                {/* --------------campo de Email-------------- */}
                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="email" className="text-2xl text-slate-500">E-mail</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email de registro"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register('email', {
                            required: "Email requerido",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "E-mail no válido",
                            },
                        })}
                    />

                    {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                </div>

                {/* --------------campo de Handle-------------- */}
                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="handle" className="text-2xl text-slate-500">Handle</label>
                    <input
                        id="handle"
                        type="text"
                        placeholder="Nombre de usuario: sin espacios"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register('handle', {
                            required: "handle requerido"
                        })}
                    />

                    {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}
                </div>

                {/* --------------campo de Password-------------- */}
                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="password" className="text-2xl text-slate-500">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Registro de contraseña"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register('password', {
                            required: "password requerido",
                            minLength: {
                                value: 8,
                                message: "El password debe tener minimo 8 caracteres"
                            }
                        })}
                    />

                    {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
                </div>

                {/* --------------campo de Repetir Password-------------- */}
                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="password_confirmation" className="text-2xl text-slate-500">Repetir password</label>
                    <input
                        id="password_confirmation"
                        type="password"
                        placeholder="Repetir contraseña"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register('password_confirmation', {
                            required: "repetir password requerido",
                            validate: (value) => value === password || 'Los passwords no son iguales'
                        })}
                    />

                    {errors.password_confirmation && <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>}
                </div>

                <input
                    type="submit"
                    className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
                    value='Create Account'
                />
            </form>

            <nav className='mt-10'>
                <Link className='text-center text-white text-lg block' to="/auth/Login">
                    ¿Ya tiene una cuenta? Conéctese aquí
                </Link>
            </nav>
        </>
    )
}
