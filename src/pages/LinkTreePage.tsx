import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { social } from "../data/social";
import DevTreeInputLink from "../components/DevTreeInputLink";
import { DevTreeLink, User } from "../types";
import { isValidUrl } from "../utils";
import { toast } from "sonner";
import { updateProfile } from "../api/DevTreeAPI";

export default function LinkTreePage() {

  const [devTreeLinks, setDevTreeLink] = useState(social);

  const queryClient = useQueryClient()
  const user : User = queryClient.getQueryData( ['user'] )!
  
  //Mutation para actualizar el perfil
  const { mutate } = useMutation({
    mutationFn: updateProfile,
    onError: error => toast.error(error.message),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['user']})
      toast.success('Actualizado')
    }
    
  })

  const handleInputUrl = (e : React.ChangeEvent<HTMLInputElement>) => {
    const updateUrlLink = devTreeLinks.map( treeLink => treeLink.name === e.target.name ? {...treeLink, url: e.target.value}  : treeLink )
    setDevTreeLink(updateUrlLink)
    queryClient.setQueryData( ['user'], (prevData : User) => {
      return {
        ...prevData,
        links: JSON.stringify(updateUrlLink)
      }
    } )
  }

  const handleLinkEnabled = (socialNetwork : DevTreeLink['name']) => {
      const updateEnabled = devTreeLinks.map( devTreeLink => {
        if(devTreeLink.name === socialNetwork) {
          if(isValidUrl(devTreeLink.url)) {
            return {
              ...devTreeLink,
              enabled: !devTreeLink.enabled
            }
          }else {
            toast.error('URL no válida')
          }
        }
        return devTreeLink
      })
      setDevTreeLink(updateEnabled)
      queryClient.setQueryData( ['user'], (prevData : User) => {
        return {
          ...prevData,
          links: JSON.stringify(updateEnabled)
        }
      } )
  }

  useEffect(() => {
    const updateDta = devTreeLinks.map( item => {
      const userLink = JSON.parse(user.links).find((link : DevTreeLink)=> link.name === item.name)
      if(userLink) {
        return {
          ...item, url: userLink.url, enabled: userLink.enabled
        }
      }
      return item
    })
    setDevTreeLink(updateDta)
  }, []);
  
  return (
    <>
      {
        devTreeLinks.map( devTreeLink => (

          <DevTreeInputLink 
            key={devTreeLink.name} 
            devTreeLink={devTreeLink} 
            handleInputUrl={handleInputUrl}
            handleLinkEnabled={handleLinkEnabled}
            />
        ) )
      }
      <button
        type="button"
        className="bg-cyan-400 p-2 w-full rounded-md mt-10 font-bold text-gray-700 uppercase"
        onClick={ () => mutate(user) }
      >Guardar cambios</button>
    </>
  );
};