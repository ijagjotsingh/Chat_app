import React from "react";

const MessageBubble = ({ message, time, room, currentUser, username }) => {
  const requiredTime = new Date(time).toString().split(" ")[4].slice(0, -3);

  return (
    <div
      className="flex justify-end m-4 relative"
      style={{
        justifyContent: currentUser === username && currentUser !== "" ? "flex-end" : "flex-start",
      }}
    >
      <div
        className="p-2 rounded-xl bg-gray-200"
        style={{
          backgroundColor:
            currentUser === username && currentUser !== "" ? "lightblue" : "bg-gray-200",
        }}
      >
        <span className="text-gray-900 text-lg">{message}</span>
        <span className="text-gray-600 ml-3 text-xs ">{requiredTime}</span>
      </div>
      {currentUser === username && currentUser !== "" && <span className="text-gray-600 ml-3 text-xs absolute right-1 -bottom-3">{currentUser}</span>}
    </div>
  );
};

export default MessageBubble;
