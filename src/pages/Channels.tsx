import React from "react";
import { useParams } from "react-router-dom";
import ChannelsSideBar from "../components/navigation/ChannelsSideBar";
import { useGetChannelQuery } from "../redux/services/channelService";
import ChatHeader from "../components/chat/ChatHeader";
import ChatInput from "../components/chat/ChatInput";
import ChatMessages from "../components/chat/ChatMessages";

interface RouteParams {
  [key: string]: string | undefined;
}

const Channel = () => {
  const { serverId, channelId } = useParams<RouteParams>();
  const { data } = useGetChannelQuery({ serverId, channelId });
  console.log(data);
  return (
    data && (
      <div className="flex">
        <ChannelsSideBar serverId={serverId} />
        <div className="h-screen w-full flex flex-col">
          <ChatHeader
            name={data?.channel.name}
            serverId={data?.channel.serverId}
            type="channel"
            imageUrl=""
          />
          <ChatMessages
            chatId={data.channel.id}
            member={data.member}
            name={data.channel.name}
            socketQuery={{
              channelId,
              serverId,
            }}
          />
          <ChatInput channelId={channelId ?? ""} serverId={serverId ?? ""} />
        </div>
      </div>
    )
  );
};

export default Channel;
