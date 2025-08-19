// 1. Librerías externas
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// 2. Tipos
import { SocialNetwork, User } from "../types";

// 3. API / Servicios
import { updateProfile } from "../api/SocialTreeAPI";

// 4. Utils
import { isValidUrl } from "../utils";

// 5. Datos locales
import { social } from "../data/social";

// 6. Componentes internos
import SocialTreeInput from "../components/SocialTreeInput";

export default function SocialTreeView() {
    const [socialTreeLinks, setSocialTreeLinks] = useState(social)

    const queryClient = useQueryClient()
    const user: User = queryClient.getQueryData(['user'])!

    const { mutate } = useMutation({
        mutationFn: updateProfile,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            toast.success('Actualizado Correctamente')
        }
    })

    useEffect(() => {
        const updatedData = socialTreeLinks.map(item => {
            const userLinks = JSON.parse(user.links).find((link: SocialNetwork) => link.name === item.name)
            if (userLinks) {
                return { ...item, url: userLinks.url, enabled: userLinks.enabled }
            }
            return item
        })
        setSocialTreeLinks(updatedData)
    }, [])

    // Permite cambiar la url del perfil
    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Si se cumple la condicion de escribir sobre la url deseada, cambia el objeto, si no, se mantiene como esta
        const updatedLinks = socialTreeLinks.map(link => link.name === e.target.name ? { ...link, url: e.target.value } : link)
        setSocialTreeLinks(updatedLinks)
    }

    // Arreglo en la base de datos
    const links: SocialNetwork[] = JSON.parse(user.links)

    //Permite habilitar o deshabilitar cada enlace del perfil
    const handleEnableLinks = (socialNetwork: string) => {
        const updatedLinks = socialTreeLinks.map(link => {
            if (link.name === socialNetwork) {
                if (isValidUrl(link.url)) {
                    return { ...link, enabled: !link.enabled }
                } else {
                    toast.error('URL no válida');
                }
            }
            return link
        })

        setSocialTreeLinks(updatedLinks)

        // Se encarga de filtrar las redes habilitadas
        let updatedItems: SocialNetwork[] = []
        const selectedSocialNetwork = updatedLinks.find(link => link.name === socialNetwork)
        if (selectedSocialNetwork?.enabled) {
            const id = links.filter(link => link.id).length + 1
            if (links.some(link => link.name === socialNetwork)) {
                updatedItems = links.map(link => {
                    if (link.name === socialNetwork) {
                        return {
                            ...link,
                            enabled: true,
                            id
                        }
                    } else {
                        return link
                    }
                })
            } else {
                const newItem = {
                    ...selectedSocialNetwork,
                    id
                }
                updatedItems = [...links, newItem]
            }
        } else {
            const indexToUpdate = links.findIndex(link => link.name === socialNetwork)
            updatedItems = links.map(link => {
                if (link.name === socialNetwork) {
                    return {
                        ...link,
                        id: 0,
                        enabled: false
                    }
                } else if (link.id > indexToUpdate && (indexToUpdate !== 0 && link.id == 1)) {
                    return {
                        ...link,
                        id: link.id - 1
                    }
                } else {
                    return link
                }
            })
        }

        // Guardar datos de react query del usuario para los links en forma de string. (almacena en la DB)
        queryClient.setQueryData(['user'], (prevData: User) => {
            return {
                ...prevData,
                links: JSON.stringify(updatedItems)
            }
        })
    }

    return (
        <>
            <div className="space-y-5">
                {socialTreeLinks.map(item => (
                    <SocialTreeInput
                        key={item.name}
                        item={item}
                        handleUrlChange={handleUrlChange}
                        handleEnableLinks={handleEnableLinks}
                    />
                ))}
                <button
                    className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded font-bold"
                    onClick={() => mutate(queryClient.getQueryData(['user'])!)}
                >Guardar cambios</button>
            </div>
        </>
    )
}
