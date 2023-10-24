import { useGetServerQuery } from "../../../src/redux/services/serverService";
import React, { useState } from "react";
import ChannelsSidebarHeader from "./ChannelsSidebarHeader";
import { Server } from "@/types";
import { useAppSelector } from "../../../src/redux/store";
import { ScrollArea } from "../ui/scroll-area";
import { Volume1 } from "lucide-react";
import { useNavigate } from "react-router-dom";

type ChannelsSideBarProps = {
  serverId: string | undefined;
};

enum ChannelType {
  TEXT = "TEXT",
  AUDIO = "AUDIO",
  VIDEO = "VIDEO",
}

const ChannelsSideBar = ({ serverId }: ChannelsSideBarProps) => {
  const navigate = useNavigate();
  const [buttonHover, setButtonHover] = useState<string>("general");
  const { data } = useGetServerQuery(serverId);
  const user: any = useAppSelector((store) => store.user);
  const server: Server = data?.server;

  const role: any = server?.members?.find(
    (member) => member.profileId === user?.id
  )?.role;

  const textChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.TEXT
  );
  const audioChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.AUDIO
  );

  const handleRoute = (name: string, channelID: string) => {
    setButtonHover(name);
    navigate(`/servers/${server.id}/channels/${channelID}`);
  };

  return (
    <div className="hidden md:flex bg-[#F2F3F5] w-60 h-screen flex-col">
      <ChannelsSidebarHeader role={role} server={server} />
      <ScrollArea>
        {textChannels?.length > 0 && (
          <div className="p-2">
            <p className="text-xs  uppercase font-semibold text-zinc-500 dark:text-zinc-400">
              TEXT CHANNELS
            </p>
            {textChannels?.map(({ id, name }) => (
              <button
                onClick={() => handleRoute(name, id)}
                className={`flex items-center px-2 py-2 w-full rounded-md font-semibold transition-all 
                duration-200  ${
                  buttonHover === name
                    ? "text-black bg-gray-300"
                    : "text-gray-500 hover:text-white hover:bg-gray-400"
                }`}
                key={id}
              >
                <span className="text-xl">#&nbsp;</span>
                {name}
              </button>
            ))}
          </div>
        )}

        {audioChannels?.length > 0 && (
          <div className="p-2 mt-2">
            <p className="text-xs  uppercase font-semibold  text-zinc-500 dark:text-zinc-400">
              AUDIO CHANNELS
            </p>
            {audioChannels?.map(({ id, name }) => (
              <button
                onClick={() => handleRoute(name, id)}
                className={`flex items-center px-2 py-2 w-full rounded-md font-semibold transition-all 
                duration-200  ${
                  buttonHover === name
                    ? "text-black bg-gray-300"
                    : "text-gray-500 hover:text-white hover:bg-gray-400"
                }`}
                key={id}
              >
                <span className="text-xl">
                  <Volume1 />
                </span>
                {name}
              </button>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default ChannelsSideBar;
