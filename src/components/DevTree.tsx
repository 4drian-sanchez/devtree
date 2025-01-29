import { Link, Outlet } from "react-router-dom";
import NavigationTabs from "./NavigationTabs";
import { Toaster } from "sonner";
import { User } from "../types";
import DevTreeLink from "./DevTreeLink";
export default function DevTree({ data }: { data: User }) {

    return (
        <>
            <header className="bg-slate-800 py-5">
                <div className="mx-auto max-w-5xl flex flex-col md:flex-row items-center md:justify-between">
                    <div className="w-full p-5 lg:p-0 md:w-1/3">
                        <img src="/logo.svg" className="w-full block" />
                    </div>
                    <div className="md:w-1/3 md:flex md:justify-end">
                        <button
                            className=" bg-lime-500 p-2 text-slate-800 uppercase font-black text-xs rounded-lg cursor-pointer"
                            onClick={() => { }}
                        >
                            Cerrar Sesión
                        </button>
                    </div>
                </div>
            </header>
            <div className="bg-gray-100  min-h-screen py-10">
                <main className="mx-auto max-w-5xl p-10 md:p-0">

                    <NavigationTabs />

                    <div className="flex justify-end">
                        <Link
                            className="font-bold text-right text-slate-800 text-2xl"
                            to={''}
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
                            <DevTreeLink links={data.links} />
                        </aside>

                    </div>
                </main>
            </div>
            <Toaster position="top-right" />
        </>
    );
};