import { Button } from "@mantine/core";
import { IconMessageCircle } from "@tabler/icons-react";
import React, { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import "./styles.css";

const ENDPOINT =
  window.location.host.indexOf("localhost") >= 0
    ? "http://127.0.0.1:5000"
    : window.location.host;

export default function ChatBox(props) {
  const { userInfo } = props;
  const [socket, setSocket] = useState(null);
  const uiMessagesRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [messageBody, setMessageBody] = useState("");
  const [messages, setMessages] = useState([
    {
      name: "Admin",
      body: "Hello there, I'm the system admin. What can i help you?",
    },
  ]);

  useEffect(() => {
    if (uiMessagesRef.current) {
      uiMessagesRef.current.scrollBy({
        top: uiMessagesRef.current.clientHeight,
        left: 0,
        behavior: "smooth",
      });
    }
    if (socket) {
      socket.emit("onLogin", {
        _id: userInfo._id,
        name: userInfo.firstName,
        isAdmin: userInfo.role === "Admin",
      });
      socket.on("message", (data) => {
        setMessages([...messages, { body: data.body, name: data.name }]);
      });
    }
  }, [messages, isOpen, socket]);

  const supportHandler = () => {
    setIsOpen(true);
    console.log(ENDPOINT);
    const sk = socketIOClient(ENDPOINT);
    setSocket(sk);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (!messageBody.trim()) {
      alert("Error. Please type message.");
    } else {
      setMessages([
        ...messages,
        { body: messageBody, name: userInfo.firstName },
      ]);
      setMessageBody("");
      setTimeout(() => {
        socket.emit("onMessage", {
          body: messageBody,
          name: userInfo.firstName,
          isAdmin: userInfo.role === "Admin",
          _id: userInfo._id,
        });
      }, 1000);
    }
  };
  const closeHandler = () => {
    setIsOpen(false);
  };
  return (
    <div className="chatbox">
      {!isOpen ? (
        <button type="button" onClick={supportHandler}>
          <IconMessageCircle size={40} />
        </button>
      ) : (
        <div className="card card-body">
          <div className="row">
            <strong>Support </strong>
            <Button size={20} color="red" type="button" onClick={closeHandler}>
              <i className="fa fa-close" />
            </Button>
          </div>
          <ul ref={uiMessagesRef}>
            {messages.map((msg, index) => (
              <li key={index}>
                <strong style={{ color: "green" }}>{`${msg.name}: `}</strong>{" "}
                {msg.body}
              </li>
            ))}
          </ul>
          <div>
            <form onSubmit={submitHandler} className="row">
              <input
                value={messageBody}
                onChange={(e) => setMessageBody(e.target.value)}
                type="text"
                placeholder="type message"
              />
              <Button style={{ marginTop: 10 }} color="green" type="submit">
                Send
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
