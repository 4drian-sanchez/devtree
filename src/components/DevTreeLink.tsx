import { SocialNetwork } from "../types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function DevTreeLink( {link} : {link : SocialNetwork} ) {
    const { attributes, listeners, setNodeRef, transform, transition} = useSortable({
        id: link.id
    })

    const style = {
        transform: CSS.Transform.toString(transform), 
        transition
    }
  return (
    <>
        <li
            ref={setNodeRef}
            className="bg-white p-2 rounded-md flex  items-center gap-5"
            style={style}
            {...attributes}
            {...listeners}
        >
            <img className="w-8 h-8" src={`/social/icon_${link.name}.svg`} alt="imagen de la red social" />
            <p className="font-bold text-gray-500">Visita mi perfil de <span className="text-gray-800 capitalize">{link.name}</span></p>
        </li>
    </>
  );
};