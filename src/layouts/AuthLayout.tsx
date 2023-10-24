import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  let token = Cookies.get("token");

  return !token ? (
    <div
      style={{
        backgroundImage:
          "url('https://images.alphacoders.com/129/1291249.png')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Outlet />
    </div>
  ) : (
    <Navigate to="/servers" replace={true} />
  );
};

export default AuthLayout;
