import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { social } from "../data/social";
import DevTreeInputLink from "../components/DevTreeInputLink";
import { DevTreeLink, SocialNetwork, User } from "../types";
import { isValidUrl } from "../utils";
import { toast } from "sonner";
import { updateProfile } from "../api/DevTreeAPI";

export default function LinkTreePage() {

  const [devTreeLinks, setDevTreeLink] = useState(social);

  const queryClient = useQueryClient()
  const user : User = queryClient.getQueryData( ['user'] )!
  
  
  const { mutate } = useMutation({
    mutationFn: updateProfile,
    onError: error => toast.error(error.message),
    onSuccess: () => {
      toast.success('Links Actualizados')
    }
  })

  const handleInputUrl = (e : React.ChangeEvent<HTMLInputElement>) => {
    const updateUrlLink = devTreeLinks.map( treeLink => treeLink.name === e.target.name ? {...treeLink, url: e.target.value}  : treeLink )
    setDevTreeLink(updateUrlLink)
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

      /*** Este codigo agrega un id segun la longitud del arreglo links ***/  
      const links : SocialNetwork[] = JSON.parse(user.links)
      let updatedItems : SocialNetwork[] = []

      const selectSocialNetwork = updateEnabled.find( link => link.name === socialNetwork )
      if(selectSocialNetwork?.enabled) {
        //Obtiene solo los enlaces que tienen un id mayor a 0
        const id = links.filter(link => link.id).length + 1
        //Comprueba si ya existe el link
        //Si no existe agrega el link a updatedItems al final con un id mayor a los demas
        if( links.some( link => link.name === socialNetwork ) ) {
          updatedItems = links.map( link => {
            if(link.name === socialNetwork) {
              return {
                ...link,
                enabled: true,
                id
              }
            }else {
              return link
            }
          })
        }else {
          const newItem = {
            ...selectSocialNetwork,
            id
          }
          updatedItems = [...links, newItem]
        }
      }else {
        //Detectando el link seleccionado
        const indexLink = links.findIndex( link => link.name === socialNetwork )
         
        updatedItems = links.map( link => {
        //Detectando el link que estamos desactivando
          if(link.name === socialNetwork) {
            return {
              ...link,
              id: 0,
              enabled: false
            }
          //Comprueba si el id del link iterado es menor a id del link seleccionado
          }else if( link.id > indexLink ) {
            return {
              ...link,
              id: link.id - 1
            }
          }  else {
            return link
          }
        } )
        
      }
      console.log(updatedItems)


      //Almacenar en la base de datos
      queryClient.setQueryData( ['user'], (prevData : User) => {
        return {
          ...prevData,
          links: JSON.stringify(updatedItems)
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