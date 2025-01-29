import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/DevTreeAPI";
import DevTree from "../components/DevTree";
import { User } from "../types";

export default function AppLayout() {

    const {data, isError, isLoading} = useQuery<User>({
        queryFn: getUser,
        queryKey: ['user'],
        refetchOnWindowFocus: false,
        retry: false
    })

    if(isLoading) return 'Cargando...'
    if(isError) return <Navigate to='/auth/login' />
    if(data) return <DevTree data={data}/>
}