import { useGetUserServersQuery } from "../../redux/services/serverService";
import CreateServer from "../modals/createServer";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import SidebarAction from "./SidebarAction";
import { Server } from "../../../types";
import SidebarItem from "./SidebarItem";
import { RotatingLines } from "../../components/LoadingSpinner";
import { useState } from "react";

const SideBar = () => {
  const { data, isLoading } = useGetUserServersQuery({});
  const [open, setOpen] = useState(true);

  return (
    <div
      className="space-y-4 flex flex-col items-center h-full text-primary w-full 
    dark:bg-[#1E1F22] bg-[#E3E5E8] py-3"
    >
      <SidebarAction />
      <Separator className="h-[2px] bg-gray-400 w-10 mx-auto" />

      <ScrollArea className="flex-1">
        {isLoading ? (
          <RotatingLines width="50" strokeColor="gray" />
        ) : data?.servers?.length > 0 ? (
          data.servers.map((server: Server) => (
            <div key={server.id}>
              <SidebarItem
                id={server.id}
                name={server.name}
                imageUrl={server.imageUrl}
              />
            </div>
          ))
        ) : (
          <CreateServer
            label="Oh no ! You don't have any servers. Please create one to proceed"
            setOpen={setOpen}
            open={open}
          />
        )}
      </ScrollArea>
    </div>
  );
};

export default SideBar;
