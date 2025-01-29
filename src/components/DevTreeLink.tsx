import { useEffect, useState } from "react";
import { DevTreeLink as DevTreeLinkType } from "../types";

type DevTreeLinkProps = {
  links: string
}

export default function DevTreeLink(links : DevTreeLinkProps) {
  
  const [enabledLinks, setEnabledLinks] = useState(JSON.parse(links.links).filter( (link : DevTreeLinkType )=> link.enabled ));
  
  useEffect(() => {
    setEnabledLinks(JSON.parse(links.links).filter( (link : DevTreeLinkType )=> link.enabled ))
  }, [links]);
  
  return (
    <>
      {
        enabledLinks.map( (link : DevTreeLinkType) => (
          <div key={link.name} className="bg-white p-2 rounded-md flex  items-center gap-5">
            <img className="w-8 h-8" src={`/social/icon_${link.name}.svg`} alt="imagen de la red social" />
            <p className="font-bold text-gray-500">Visita mi perfil de <span className="text-gray-800 capitalize">{link.name}</span></p>
          </div>
        ) )
      }
    </>
  );
};