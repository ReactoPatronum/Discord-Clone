import { useForm, SubmitHandler } from "react-hook-form";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { useLoginMutation } from "../redux/services/userService";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import handleApiError from "../helpers/handleApiError";
import Cookies from "js-cookie";
type Inputs = {
  email: string;
  password: string;
};

const SignIn = () => {
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const response: any = await login(data);
    if ("data" in response) {
      Cookies.set("token", response.data.token);
      toast.success(response.data.message);
      setTimeout(() => {
        navigate(`/servers`);
      }, 1000);
    }
    handleApiError(response);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-lg w-[500px] bg-[#313338] text-center p-8"
      >
        <div>
          <h2 className="text-white text-lg font-semibold">Welcome again!</h2>
          <p className="text-gray-400 text-sm">
            We are so glad to see you again!
          </p>
        </div>
        <div className="w-full flex flex-col items-start mt-5">
          <Label
            className="text-gray-400 p-1 my-1  font-semibold"
            htmlFor="eposta"
          >
            E-Mail
          </Label>
          <Input
            {...register("email", {
              required: true,
            })}
            className="bg-[#151618] text-white border-none flex-1 w-full p-3"
            type="email"
            id="email"
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email.message}</p>
          )}
        </div>
        <div className="w-full flex flex-col items-start mt-5">
          <Label
            className="text-gray-400 p-1 my-1  font-semibold"
            htmlFor="password"
          >
            Password
          </Label>
          <Input
            {...register("password", { required: true })}
            className="bg-[#151618] text-white border-none flex-1 w-full p-3"
            type="password"
            id="password"
          />
        </div>
        <Button
          disabled={isLoading}
          type="submit"
          className="bg-[#4752C4] hover:bg-[#39419b] mt-7 w-full text-white font-semibold"
        >
          Login
        </Button>
        <div className="flex items-start mt-4 text-xs text-gray-400">
          <p>Do you need an account?</p>
          <Link className="ml-2 text-blue-500 font-semibold" to="/sign-up">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
