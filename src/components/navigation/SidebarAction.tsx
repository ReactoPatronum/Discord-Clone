import { Plus } from "lucide-react";
import { ActionTooltip } from "../Tooltip";
import CreateServer from "../modals/createServer";
import { useState } from "react";

const SidebarAction = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <CreateServer
        setOpen={setOpen}
        open={open}
        label="Give your server a name and an image."
      />
      <div>
        <ActionTooltip label="Create Server" side="left">
          <button onClick={() => setOpen(true)} className="group">
            <div
              className="flex mx-3 h-[48px] rounded-full  transition-all 
        overflow-hidden items-center justify-center bg-background group-hover:bg-emerald-700"
            >
              <Plus className="group-hover:text-white transition text-emerald-500 w-12" />
            </div>
          </button>
        </ActionTooltip>
      </div>
    </>
  );
};

export default SidebarAction;
