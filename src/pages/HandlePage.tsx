import { useQuery } from "@tanstack/react-query";
import { getUserByHandle } from "../api/DevTreeAPI";
import { Navigate, useParams } from "react-router-dom";
import { SocialNetwork } from "../types";

export default function HandlePage() {

    const params = useParams()
    const handle = params.handle!

    const { data, isLoading, isError } = useQuery({
        queryKey: ['handle', handle],
        queryFn: () => getUserByHandle(handle),
        retry: 1
    })

    if(isLoading) return <p className="text-center mt-10 text-white font-bold">Cargando...</p>
    if(isError) return <Navigate to={'/404'}/>
    if (data) return (
        <>
            <div className="mt-10 space-y-5">
                <h1 className="text-white text-4xl font-black text-center">{data.handle}</h1>
                {data.image && (
                    <img 
                        src={data.image} 
                        alt={`Imagen de ${data.name}`}
                        className="w-30 mx-auto rounded-md"
                />)}
                <p className="text-white text-center font-semibold text-lg mb-20">{data.description}</p>
                <nav className="flex flex-col gap-6 max-w-lg mx-auto">
                    {
                        JSON.parse(data.links)
                            .filter( (link : SocialNetwork)=> link.enabled )
                            .map( (link : SocialNetwork) => (
                                <a 
                                key={link.name} 
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white p-5 rounded-md font-black flex items-center gap-x-5"
                                >
                                    <img 
                                        src={`/social/icon_${link.name}.svg`} 
                                        alt=""
                                        className="w-12" 
                                    />    
                                    Visita mi {link.name}
                                </a>
                            ) )
                    }

                </nav>
            </div>
        </>
    );
};