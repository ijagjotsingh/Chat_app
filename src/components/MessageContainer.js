import React from "react";
import Chat from "./Chat";

const MessageContainer = ({room}) => {
  return (
    <div className="flex-[2_1_0%] overflow-y-auto">
      <div className="p-2 border-b-2 text-center border-slate-400">
        <span className="text-xl mr-2 ">Messages</span>
        <span className="text-xs">{room === "" ? "(No Room selected)" : `(In ${room})`}</span>
      </div>
      <Chat room={room} />
    </div>
  );
};

export default MessageContainer;
