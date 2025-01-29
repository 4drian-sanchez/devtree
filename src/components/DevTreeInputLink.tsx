import { Switch } from "@headlessui/react";
import { DevTreeLink } from "../types";
import { classNames } from "../utils";

type DevTreeInputLinkProps = {
  devTreeLink: DevTreeLink
  handleInputUrl: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleLinkEnabled: ( socialNetwork : DevTreeLink['name'] ) => void
}

export default function DevTreeInputLink({ devTreeLink, handleInputUrl, handleLinkEnabled }: DevTreeInputLinkProps) {

  return (
    <div className="flex items-center gap-x-2 mb-4">
      <div className="w-12 h-12 bg-cover" style={{ backgroundImage: `url('./social/icon_${devTreeLink.name}.svg')` }}></div>

      <input
        name={devTreeLink.name} 
        type="text" 
        className="p-2 border border-gray-300 rounded outline-none flex-1"
        value={devTreeLink.url}
        onChange={handleInputUrl}
      />

      <Switch
        checked={devTreeLink.enabled}
        onChange={() => handleLinkEnabled(devTreeLink.name)}
        className={classNames(
          devTreeLink.enabled ? 'bg-blue-500' : 'bg-gray-200',
          'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
        )}
      >
        <span
          aria-hidden="true"
          className={classNames(
            devTreeLink.enabled ? 'translate-x-5' : 'translate-x-0',
            'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
          )}
        />
      </Switch>
    </div>
  );
};