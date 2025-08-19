import { useQuery } from '@tanstack/react-query'
import { Navigate } from "react-router-dom";
import { getUser } from "../api/SocialTreeAPI";
import SocialTree from '../components/SocialTree';

export default function AppLayout() {

    // Que funcion va a hacer la consulta a nuestra api (Fetch API o AXIOS)
    const { data, isLoading, isError } = useQuery({
        queryFn: getUser,
        queryKey: ['user'],
        retry: 2,
        refetchOnWindowFocus: false
    })

    if(isLoading) return 'Cargando...'
    if(isError) return <Navigate to ={`/auth/login`} />
    if (data) return <SocialTree data ={data} />
}
