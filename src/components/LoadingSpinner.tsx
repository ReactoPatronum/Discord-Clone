import {
  MutatingDots,
  RotatingLines,
  TailSpin,
  Triangle,
} from "react-loader-spinner";

<Triangle
  height="80"
  width="80"
  color="#4fa94d"
  ariaLabel="triangle-loading"
  wrapperStyle={{}}
  visible={true}
/>;

<MutatingDots
  height="100"
  width="100"
  color="#4fa94d"
  secondaryColor="#4fa94d"
  radius="12.5"
  ariaLabel="mutating-dots-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
/>;

<RotatingLines
  strokeColor="grey"
  strokeWidth="5"
  animationDuration="0.75"
  width="20"
  visible={true}
/>;

export { Triangle, MutatingDots, TailSpin, RotatingLines };
