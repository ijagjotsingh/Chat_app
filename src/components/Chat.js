import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import MessageBubble from "./MessageBubble";

const supabaseUrl = process.env.REACT_APP_SUPABASEURL;
const supabaseKey = process.env.REACT_APP_SUPABASEKEY
const supabase = createClient(supabaseUrl, supabaseKey);

function Chat({ room }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [username, setUsername] = useState(null);
  const [flag, setFlag] = useState(false);

  const checkUsername = async () => {
    const { data } = await supabase
      .from("messages")
      .select()
      .eq("username", username);
    if (flag === false) {
      if (data.length !== 0) return true;
      else return false;
    } else return false;
  };


  useEffect(() => {
    const fetchMessages = async () => {
      if (room === "") {
        const { data } = await supabase
          .from("messages")
          .select()
          .is("room_name", null);
        setMessages(data);
      }

      if (room !== "") {
        const { data } = await supabase
          .from("messages")
          .select()
          .eq("room_name", room);
        setMessages(data);
      }
      const element = await document.querySelector(".messageContainer")
        .lastElementChild;
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    };

    fetchMessages();

    const messagesTable = supabase
      .channel("table-db-changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },
        (payload) => {
          setMessages((currentMessages) => [...currentMessages, payload.new]);
        }
      )
      .subscribe();

    return () => {
      messagesTable.unsubscribe();
    };
  }, [room]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    if (await checkUsername()) {
      alert(
        "Username already exists. Please try again and enter an unique username"
      );
      // setUsername("");
      // setNewMessage("");
    } else {
      await supabase.from("messages").insert({
        message: newMessage,
        created_at: new Date().toISOString(),
        username: username || null,
        room_name: room || null,
      });
      if (room !== "") {
        setFlag(true);
      }
      // setUsername(username);
      setNewMessage("");
    }
  };

  return (
    <div className="flex flex-col justify-between mainChat">
      <div className="messageContainer overflow-y-auto">
        {messages?.map((msg) => (
          <MessageBubble
            messages={messages}
            flag = {flag}
            room={room}
            currentUser={username}
            username={msg.username}
            key={msg.created_at}
            message={msg.message}
            time={msg.created_at}
          />
        ))}
      </div>
      <form
        className="flex justify-center p-4 border-t-2 border-slate-400"
        onSubmit={handleSubmit}
      >
        {room !== "" && flag === false ? (
          <input
            type="text"
            className="w-6/12 rounded-full py-2 px-4 mr-1 border border-black"
            placeholder="Type username"
            autoFocus
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        ) : (
          ""
        )}
        <input
          type="text"
          required
          className="w-6/12 rounded-full py-2 px-4 border border-black"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          className="border-2 border-black bg-neutral-300 ml-2 rounded-full px-2"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Chat;
