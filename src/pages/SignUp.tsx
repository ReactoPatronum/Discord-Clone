import { useForm, SubmitHandler } from "react-hook-form";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { useCreateUserMutation } from "../redux/services/userService";
import { toast } from "react-hot-toast";
import handleApiError from "../helpers/handleApiError";
import { useNavigate } from "react-router-dom";

type Inputs = {
  email: string;
  username: string;
  password: string;
};

const SignUp = () => {
  const navigate = useNavigate();
  const [createUser, { isLoading }] = useCreateUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const response: any = await createUser(data);
    if ("data" in response) {
      toast.success(response.data.message);
      setTimeout(() => {
        navigate(`/sign-in`);
      }, 3000);
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
          <h2 className="text-white text-lg font-semibold">
            Create an Account
          </h2>
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
        </div>
        <div className="w-full flex flex-col items-start mt-5">
          <Label
            className="text-gray-400 p-1 my-1  font-semibold"
            htmlFor="username"
          >
            Username
          </Label>
          <Input
            {...register("username", {
              required: true,
              minLength: {
                value: 3,
                message: "Username must be at least 3 characters",
              },
            })}
            className="bg-[#151618] text-white border-none flex-1 w-full p-3"
            type="username"
            id="username"
          />
          {errors.username && (
            <p className="text-red-500 text-xs">{errors.username.message}</p>
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
            {...register("password", {
              required: true,
              minLength: {
                value: 3,
                message: "Password must be at least 3 characters",
              },
            })}
            className="bg-[#151618] text-white border-none flex-1 w-full p-3"
            type="password"
            id="password"
          />
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password.message}</p>
          )}
        </div>
        <Button
          disabled={isLoading}
          type="submit"
          className="bg-[#4752C4] hover:bg-[#39419b] mt-7 w-full text-white font-semibold"
        >
          Register
        </Button>
        <div className="flex items-start mt-4 text-xs text-gray-400">
          <Link className="ml-2 text-blue-500 font-semibold" to="/sign-in">
            Already have an account?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
