import { SocialNetwork } from "../types";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import DevTreeLink from "./DevTreeLink";


export default function DevTreeLinks({ enabledLinks }: { enabledLinks: SocialNetwork[] }) {

  return (
    <>
      <SortableContext
        items={enabledLinks}
        strategy={verticalListSortingStrategy}
      >

        {
          enabledLinks.map((link: SocialNetwork) => (

            <ul key={link.name} className="">
              <DevTreeLink link={link}/>
              
            </ul>

          ))
        }

      </SortableContext>
    </>
  );
};