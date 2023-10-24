import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useCreateDiscordChannelMutation } from "../../../src/redux/services/channelService";
import handleApiError from "../../../src/helpers/handleApiError";

interface ModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

type ChannelProperties = {
  channelName: string;
  channelType: string;
  serverId: string | undefined;
};

enum ChannelType {
  TEXT,
  AUDIO,
  VIDEO,
}

const CreateChannel = ({ open, setOpen }: ModalProps) => {
  const params = useParams();
  const [channelType, setChannelType] = useState("");
  const [createChannel, { isLoading }] = useCreateDiscordChannelMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChannelProperties>();

  const onSubmit: SubmitHandler<ChannelProperties> = async (data) => {
    data.channelType = channelType;
    data.serverId = params.id;
    if (!channelType || !data.serverId || !data.channelName) {
      toast.error("Fill in the required fields");
      return;
    }
    const response: any = await createChannel(data);

    if ("data" in response) {
      toast.success("Successfull");
      setOpen(false);
    }
    handleApiError(response);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Create Channel
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6">
            <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
              Channel Name
            </Label>
            <div className="flex flex-col  mt-2 gap-x-2">
              <Input
                required
                {...register("channelName", {
                  minLength: {
                    value: 3,
                    message: "Channel name must be at least 3 characters",
                  },
                  validate: (value) => {
                    if (value.toLowerCase() === "general") {
                      return "Channel name cannot be 'general'";
                    }
                    return true;
                  },
                })}
                className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
              />
              {errors.channelName && (
                <p className="text-red-500 text-xs">
                  {errors.channelName.message}
                </p>
              )}
            </div>
          </div>
          <div className="px-6">
            <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
              Select a channel type
            </Label>
            <Select
              required
              value={channelType}
              onValueChange={(data) => {
                if (data !== "") {
                  setChannelType(data);
                }
              }}
            >
              <SelectTrigger className="bg-zinc-300/50 border-0 focus:ring-0 text-black ring-offset-0 focus:ring-offset-0 capitalize outline-none">
                <SelectValue placeholder="Select a channel type" />
              </SelectTrigger>

              <SelectContent>
                {Object.keys(ChannelType)
                  .slice(-3)
                  .map((channel) => (
                    <SelectItem key={channel} value={channel}>
                      {channel.toUpperCase()}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter className="p-4">
            <Button disabled={isLoading} type="submit" variant="default">
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateChannel;
