import { useLocation, Link } from "react-router-dom";
import Logo from "./Logo";
import { useQueryClient } from "@tanstack/react-query";

export default function Header() {

    const queryClient = useQueryClient()
    const location = useLocation()

    const logout = () => {
        localStorage.removeItem('devTree')
        queryClient.invalidateQueries({queryKey: ['user']})
    }

    return (

        <header className="bg-slate-800 py-5">
            <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center md:justify-between">

                <Logo/>

                <div className="md:w-1/3 md:flex md:justify-end">
                    {location.pathname === '/'
                        ? (
                            <nav className="flex gap-x-2">
                                <Link
                                    className="  py-2 px-5 text-white uppercase font-black text-xs rounded-lg cursor-pointer"
                                    to='/auth/login'
                                >
                                    Iniciar sesión
                                </Link>
                                <Link
                                    className=" bg-lime-500 py-2 px-5 text-slate-800 uppercase font-black text-xs rounded-lg cursor-pointer"
                                    to='/auth/register'
                                >
                                    Registrate
                                </Link>

                            </nav>
                        )
                        : (
                            <button
                                className=" bg-lime-500 p-2 text-slate-800 uppercase font-black text-xs rounded-lg cursor-pointer"
                                onClick={() => logout()}
                            >
                                Cerrar Sesión
                            </button>
                        )}
                </div>
            </div>
        </header>

    );
};