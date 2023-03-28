import React from "react";

const Roomtile = ({ roomName, room, setRoom, roomDesc }) => {
  return (
    <div
      onClick={() => setRoom(roomName)}
      className="flex flex-col items-center border-2 border-black m-1 p-2 cursor-pointer"
      style={{
        border: room === roomName ? "5px solid green" : "",
        backgroundColor: room === roomName ? "lightgreen" : "",
      }}
    >
      <span>{roomName}</span>
      <span className="text-xs">({roomDesc})</span>
    </div>
  );
};

export default Roomtile;
