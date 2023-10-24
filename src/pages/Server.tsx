import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ChannelsSideBar from "../components/navigation/ChannelsSideBar";
import { useGetInitialChannelQuery } from "../redux/services/channelService";
import { useNavigate } from "react-router-dom";

const Server = () => {
  const navigate = useNavigate();
  const { serverId } = useParams();
  const { data, isLoading } = useGetInitialChannelQuery({ serverId });

  useEffect(() => {
    if (data) {
      navigate(`/servers/${serverId}/channels/${data.channelId}`);
    }
  }, [data]);

  return (
    <div className="flex">
      <ChannelsSideBar serverId={serverId} />
      {isLoading && "Loading"}
    </div>
  );
};

export default Server;
