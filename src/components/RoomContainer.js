import React, { useEffect, useState } from "react";
import roomData from "../data/roomData";
import Roomtile from "./Roomtile";

const RoomContainer = ({ getRoom }) => {
  const [room, setRoom] = useState("");

  useEffect(() => {
    getRoom(room);
  }, [getRoom, room]);

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-2 border-b-2 border-slate-400">
        <h1 className="text-xl text-center">Rooms</h1>
      </div>
      <div className="grid grid-cols-3 mt-1">
        {roomData.map((tile) => (
          <Roomtile
            room={room}
            setRoom={setRoom}
            key={tile.roomDesc}
            roomId={tile.roomId}
            roomName={tile.roomName}
            roomDesc={tile.roomDesc}
          />
        ))}
      </div>
    </div>
  );
};

export default RoomContainer;
