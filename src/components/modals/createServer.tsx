import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useState } from "react";
import { X } from "lucide-react";
import { useCreateDiscordServerMutation } from "../../../src/redux/services/serverService";
import handleApiError from "../../../src/helpers/handleApiError";
import { toast } from "react-hot-toast";
import handleImageUpload from "../../helpers/handleImageUpload";

type Inputs = {
  name: string;
  imageUrl?: string;
};

interface ModalProps {
  label: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateServer = ({ open, setOpen, label }: ModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [handleImage, setHandleImage] = useState({
    url: "",
    formdata: "",
    preview: "",
  });

  const [createDiscordServer] = useCreateDiscordServerMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { formdata, url } = handleImage;

    if (formdata && data.name && url) {
      setIsLoading(true);
      await fetch(url, {
        method: "POST",
        body: formdata,
      })
        .then((res) => res.json())
        .then((res) => (data.imageUrl = res.secure_url));

      const response: any = await createDiscordServer(data);

      if ("data" in response) {
        toast.success("Successfull");
        setOpen(false);
      }
      handleApiError(response);
    } else {
      toast.error("Please pick an image and name");
    }
    setIsLoading(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Create your server
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            {label}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-8 px-6">
            <div className="flex items-center justify-center text-center">
              {handleImage.preview ? (
                <div className="relative">
                  <img
                    className="w-40 h-40 rounded-full object-cover"
                    src={handleImage.preview}
                    alt="server-logo"
                  />
                  <X
                    onClick={() =>
                      setHandleImage({
                        url: "",
                        formdata: "",
                        preview: "",
                      })
                    }
                    className="absolute top-0 right-0 cursor-pointer border-2 rounded-full"
                  />
                </div>
              ) : (
                <Input
                  onChange={(e) => handleImageUpload({ e, setHandleImage })}
                  id="fileUpload"
                  type="file"
                  accept="image/*"
                />
              )}
            </div>

            <div className="w-full flex flex-col items-start mt-5">
              <Label
                className="text-gray-400 p-1 my-1  font-semibold"
                htmlFor="name"
              >
                Server Name
              </Label>
              <Input
                {...register("name", {
                  required: true,
                  minLength: {
                    value: 3,
                    message: "Server name must be at least 3 characters",
                  },
                })}
                className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                type="text"
                id="name"
                placeholder="Enter server name"
              />
              {errors.name && (
                <p className="text-red-500 text-xs">{errors.name.message}</p>
              )}
            </div>
          </div>
          <DialogFooter className="bg-gray-100 px-6 py-4">
            <Button type="submit" disabled={isLoading} variant="default">
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateServer;
