import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ChevronDown, LogOut, PlusCircle, UserPlus } from "lucide-react";
import { Server } from "@/types";
import InviteServer from "../modals/inviteServer";
import CreateChannel from "../modals/createChannel";

enum MemberRole {
  ADMIN = "ADMIN",
  MODERATOR = "MODERATOR",
  GUEST = "GUEST",
}

type Props = {
  server: Server;
  role: string;
};

const ChannelsSidebarHeader = ({ server, role }: Props) => {
  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = isAdmin || role === MemberRole.MODERATOR;
  const [inviteModal, setInviteModal] = useState<boolean>(false);
  const [createChannel, setCreateChannel] = useState<boolean>(false);

  return (
    <>
      <InviteServer
        open={inviteModal}
        setOpen={setInviteModal}
        code={server?.inviteCode}
      />
      <CreateChannel open={createChannel} setOpen={setCreateChannel} />

      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none" asChild>
          <button
            className="w-full text-md font-semibold px-3 flex items-center h-12 
        border-neutral-200 dark:border-neutral-800 bg-transparent border-b-2 hover:bg-zinc-700/10  transition"
          >
            {server?.name}
            <ChevronDown className="h-5 w-5 ml-auto" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px]">
          {isModerator && (
            <DropdownMenuItem
              onClick={() => setInviteModal(true)}
              className="text-indigo-600  px-3 py-2 text-sm cursor-pointer"
            >
              Invite People
              <UserPlus className="h-4 w-4 ml-auto" />
            </DropdownMenuItem>
          )}
          {isModerator && (
            <DropdownMenuItem
              onClick={() => setCreateChannel(true)}
              className="px-3 py-2 text-sm cursor-pointer"
            >
              Create Channel
              <PlusCircle className="h-4 w-4 ml-auto" />
            </DropdownMenuItem>
          )}

          <DropdownMenuItem className="text-rose-500 px-3 py-2 text-sm cursor-pointer">
            Leave Server
            <LogOut className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ChannelsSidebarHeader;
