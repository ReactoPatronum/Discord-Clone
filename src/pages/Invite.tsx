import React, { useEffect } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { useInviteQuery } from "../redux/services/serverService";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";

const Invite = () => {
  const token = Cookies.get("token");
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useInviteQuery(id);
  console.log(data);
  useEffect(() => {
    if (data) {
      if (!data?.isSuccess) {
        navigate(`/servers/${data.server.id}`);
        toast.error(data?.message);
      }

      if (data?.isSuccess) {
        navigate(`/servers/${data.server.id}`);
        toast.success(data?.message);
      }
    }
  }, [data]);

  return !token ? (
    <Navigate to="/sign-in" replace={true} />
  ) : (
    <div>Redirecting...</div>
  );
};

export default Invite;
