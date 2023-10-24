import React, { useState } from "react";
import { Input } from "../ui/input";
import { Plus } from "lucide-react";
import EmojiPicker from "../EmojiPicker";
import { useCreateMessageMutation } from "../../../src/redux/services/messageService";
import handleApiError from "../../../src/helpers/handleApiError";

type InputProps = {
  channelId: string;
  serverId: string;
};

const ChatInput = ({ channelId, serverId }: InputProps) => {
  const [message, setMessage] = useState<string>("");

  const [createMessage] = useCreateMessageMutation();

  const handleEmojiClick = (emoji: string) => {
    setMessage((prevMessage) => prevMessage + emoji);
  };

  const sendMessage = async (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (message.trim() === "") {
        return false;
      }
      console.log(typeof message);
      const response: any = await createMessage({
        message,
        channelId,
        serverId,
      });

      if ("data" in response) {
        setMessage("");
      }
      handleApiError(response);
    }
  };

  return (
    <div className="relative p-4 pb-6">
      {/* <button
        type="button"
        className="absolute top-7 left-8 h-[24px] w-[24px] bg-zinc-500 dark:bg-zinc-400 hover:bg-zinc-600 dark:hover:bg-zinc-300 transition rounded-full p-1 flex items-center justify-center"
      >
        <Plus className="text-white dark:text-[#313338]" />
      </button> */}
      <Input
        onKeyDown={sendMessage}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Write Something"
        className="px-4 py-6 bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0 
      focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200"
      />
      <div className="absolute top-7 right-8 cursor-pointer">
        <EmojiPicker onChange={handleEmojiClick} />
      </div>
    </div>
  );
};

export default ChatInput;
