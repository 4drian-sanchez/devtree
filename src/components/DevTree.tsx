import { Link, Outlet } from "react-router-dom";
import NavigationTabs from "./NavigationTabs";
import { Toaster } from "sonner";
import { SocialNetwork, User } from "../types";
import DevTreeLinks from "./DevTreeLinks";
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import Header from "./Header";

export default function DevTree({ data }: { data: User }) {
    
    const queryClient = useQueryClient()
    const [enabledLinks, setEnabledLinks] = useState<SocialNetwork[]>(JSON.parse(data.links).filter((link: SocialNetwork) => link.enabled));

    useEffect(() => {
        setEnabledLinks(JSON.parse(data.links).filter((link: SocialNetwork) => link.enabled))
    }, [data]);

    const handleDragEnd = (e: DragEndEvent) => {
        const {over, active} = e
        if(over && over.id) {
            const prevIndex = enabledLinks.findIndex( link => link.id === active.id )
            const newIndex = enabledLinks.findIndex( link => link.id === over.id )

            const order = arrayMove(enabledLinks, prevIndex, newIndex)
            setEnabledLinks(order)

            const disabledLinks = JSON.parse(data.links).filter((link: SocialNetwork) => !link.enabled)
            const links = enabledLinks.concat(disabledLinks)
            queryClient.setQueryData( ['user'], (prevData : User) => {
                return {
                    ...prevData,
                    links: JSON.stringify(links)
                }
            } )
        }
    }

    return (
        <>
            <Header/>
            <div className="bg-gray-100  min-h-screen py-10">
                <main className="mx-auto max-w-5xl p-10 md:p-0">

                    <NavigationTabs />

                    <div className="flex justify-end">
                        <Link
                            className="font-bold text-right text-slate-800 text-2xl"
                            to={`/${data.handle}`}
                            target="_blank"
                            rel="noreferrer noopener"
                        >Visitar Mi Perfil: {data.handle}</Link>
                    </div>

                    <div className="flex flex-col md:flex-row gap-10 mt-10">
                        <div className="flex-1 ">
                            <Outlet />
                        </div>

                        {/* Recuadro gris donde se muestra el handle, image, description y los links  */}
                        <aside className="w-full md:w-96 bg-slate-800 px-5 py-10 space-y-6">
                            {/* handle */}
                            <h2 className="text-4xl font-bold text-white text-center">{data.handle}</h2>
                            {/* Imagen */}
                            {data.image && (
                                <img
                                    className="mx-auto rounded-md max-w-[250px]"
                                    src={data.image}
                                    alt={data.name}
                                />
                            )}
                            {/* Descripcion */}
                            <p className="text-white font-bold text-center">
                                {data.description}
                            </p>

                            {/* Links */}
                            <DndContext
                                collisionDetection={closestCenter}
                                onDragEnd={handleDragEnd}
                            >
                                <DevTreeLinks
                                    enabledLinks={enabledLinks}
                                />
                            </DndContext>
                        </aside>

                    </div>
                </main>
            </div>
            <Toaster position="top-right" />
        </>
    );
};