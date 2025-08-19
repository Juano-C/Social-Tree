/*
------ El router consiste en registrar que componente se va a mostrar cuando un usuario visite una URL
 BrowserRouter: Prepara todo para poder usar 'react-router-dom
 Routes nos permite agrupar todas las rutas
 Route componente para ir definiendo la URL y el componente que se va a mostrar
*/
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginView from './views/LoginViews'
import RegisterView from './views/RegisterView'
import AuthLayout from './layouts/AuthLayouts'
import AppLayout from './layouts/AppLayout'
import SocialTreeView from './views/SocialTreeView'
import ProfileView from './views/ProfileView'
import HandleView from './views/HandleView'
import NotFoundView from './views/NotFoundView'
import HomeView from './views/HomeView'

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AuthLayout />}> // El grupo de rutas que utiliza los diseños
                    <Route path='/auth/login' element={<LoginView />} />
                    <Route path='/auth/register' element={<RegisterView />} />
                </Route>

                <Route path='/admin' element={<AppLayout />}> // Propios enlaces /admin padre
                    <Route index={true} element={<SocialTreeView />} />
                    <Route path='profile' element={<ProfileView />} /> // Hereda /admin + /profile
                </Route>

                <Route path='/:handle' element={<AuthLayout />}>
                    <Route element={<HandleView />} index={true} />
                </Route>

                <Route path='/' element= {<HomeView />} />

                <Route path='/404' element={<AuthLayout />} >
                    <Route element={<NotFoundView />} index={true} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
