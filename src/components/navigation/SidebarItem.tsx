import React from "react";
import { ActionTooltip } from "../Tooltip";
import { useNavigate } from "react-router-dom";

type SidebarProps = {
  id: string;
  imageUrl: string;
  name: string;
};

const SidebarItem = ({ id, imageUrl, name }: SidebarProps) => {
  const navigate = useNavigate();
  return (
    <div key={id}>
      <ActionTooltip side="right" align="center" label={name}>
        <button onClick={() => navigate(`/servers/${id}`)}>
          <div className="p-2">
            <img
              className="rounded-full w-12 h-12 object-cover"
              src={imageUrl}
              alt="channel-img"
            />
          </div>
        </button>
      </ActionTooltip>
    </div>
  );
};

export default SidebarItem;
