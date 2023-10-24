import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useGetCurrentUserQuery } from "../redux/services/userService";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { setUser } from "../redux/features/userSlice";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";
import { Triangle } from "../components/LoadingSpinner";
import SideBar from "../components/navigation/SideBar";

const AuthLayout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.user);
  const { data, isLoading, error } = useGetCurrentUserQuery(
    {},
    { skip: !!user }
  ); //if user exists dont make the API call.

  //if user dont exists then make api call and dispatch user
  useEffect(() => {
    if (!user) {
      dispatch(setUser(data?.user));
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error("User cannot be found . Please login again");
      Cookies.remove("token");
      navigate("/");
    }
  }, [error]);

  return error && !user ? (
    <Navigate to="/sign-in" replace={true} />
  ) : isLoading ? (
    <div className="h-screen w-full flex items-center justify-center">
      <Triangle />
    </div>
  ) : (
    <div className="h-full">
      <div className="hidden md:flex h-full w-[72px] z-30 flex-col fixed inset-y-0">
        <SideBar />
      </div>
      <main className="md:pl-[72px] h-full">
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
