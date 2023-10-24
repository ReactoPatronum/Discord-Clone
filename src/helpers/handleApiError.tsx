import { toast } from "react-hot-toast";

type Response = {
  data?: {};
  error?: {
    data: {
      isSuccess: boolean;
      message: string;
    };
    status: number;
  };
};

export default function handleApiError(response: Response) {
  console.log(response);
  if ("data" in response) {
  } else if ("error" in response) {
    console.log("ERROR:", response);
    const errorMessage = response?.error?.data?.message;
    console.log(response);
    toast.error(errorMessage ?? "Server Error.");
  } else {
    toast.error("An error occurred.");
  }
}
