import React from "react";

interface ChatMessagesProps {
  name: string;
  member: string;
  chatId: string;
  socketQuery: {
    channelId: string | undefined;
    serverId: string | undefined;
  };
}

const ChatMessages = ({
  name,
  member,
  chatId,
  socketQuery,
}: ChatMessagesProps) => {
  return <div className="flex-grow">ChatMessages</div>;
};

export default ChatMessages;
