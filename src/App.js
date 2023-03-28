import { useState } from "react";
import MessageContainer from "./components/MessageContainer";
import RoomContainer from "./components/RoomContainer";

function App() {
  const [roomInApp, setRoomInApp] = useState("");
  const getRoom = (room) => {
    setRoomInApp(room);
  };

  return (
    <div className="App h-screen border-2 border-black">
      <div className="box-border h-full w-full flex flex-col md:flex-row max-md:divide-y-2 divide-black md:divide-x-2">
        <RoomContainer getRoom={getRoom} />
        <MessageContainer room={roomInApp}/>
      </div>
    </div>
  );
}

export default App;
