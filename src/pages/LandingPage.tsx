import React from "react";
import { logo } from "../assets/DiscordLogo";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
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
      <div className=" min-h-screen">
        <div className="text-white max-w-7xl mx-auto p-10">{logo}</div>
        <div className="text-white text-center flex flex-col items-center px-3 justify-center h-[70vh]">
          <h2 className="font-bold text-4xl sm:text-6xl">IMAGINE A PLACE...</h2>
          <div className="mt-10 sm:text-xl font-semibold max-w-4xl mx-auto">
            <p>
              ..where you can belong to a school club , a gaming group , or a
              worldwide art community.
            </p>
            <p>
              Where just you and a handful of friends can spend time together .
              A place that makes it easy to talk every day and hang out more
              often.
            </p>
          </div>
          <div className="space-x-6 mt-10">
            <Link to="/sign-in">
              <Button
                className="bg-white text-black h-16 w-40 text-lg rounded-full 
                hover:bg-blue-50"
              >
                Login
              </Button>
            </Link>

            <Link to="/sign-up">
              <Button className=" h-16 w-40 text-lg rounded-full ">
                Register
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
