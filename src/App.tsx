import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AuthLayout from "./layouts/AuthLayout";
import UserLayout from "./layouts/UserLayout";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Servers from "./pages/Servers";
import Server from "./pages/Server";
import Invite from "./pages/Invite";
import Channels from "./pages/Channels";

function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Route>

      <Route element={<UserLayout />}>
        <Route path="/servers" element={<Servers />} />

        <Route path="/servers/:serverId" element={<Server />} />
        <Route
          path="/servers/:serverId/channels/:channelId"
          element={<Channels />}
        />
      </Route>

      <Route path="/invite/:id" element={<Invite />} />

      <Route path="*" element={<div>404</div>} />
    </Routes>
  );
}

export default App;
