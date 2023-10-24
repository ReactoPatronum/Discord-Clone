import React from "react";
import { Hash, Menu } from "lucide-react";

interface ChatHeaderProps {
  serverId: string;
  name: string;
  type: "channel";
  imageUrl?: string;
}

const ChatHeader = ({ serverId, name, type, imageUrl }: ChatHeaderProps) => {
  return (
    <div className="flex items-center p-3 h-12  justify-between w-full">
      <div className="flex items-center h-full">
        <Menu />
        {type === "channel" && <Hash className="w-5 h-5 text-zinc-500 mr-2" />}
        <p className="font-semibold text-md">{name}</p>
      </div>
    </div>
  );
};

export default ChatHeader;
