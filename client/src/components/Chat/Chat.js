import React, { useEffect, useState } from "react";
import { user } from "../Join/Join.js";
import socketIo from "socket.io-client"; // Corrected import statement
import "./Chat.css";
import Message from "../Message/Message.js";
import closeIcon from "../../images/closeIcon.png";
import ScrollToBottom from "react-scroll-to-bottom";
import "../../App.css";
const ENDPOINT = "http://localhost:4500/";
let socket;

const Chat = () => {
    const [id, setId] = useState("");
    const [messages, setMessages] = useState([]);
    const send = () => {
        const message = document.getElementById("chatInput").value;
        socket.emit("message", { message, id });
        document.getElementById("chatInput").value = "";
    };

    useEffect(() => {
        socket = socketIo(ENDPOINT, { transports: ["websocket"] });
        socket.on("connect", () => {
            alert("Connected");
            setId(socket.id);
        });
        console.log(socket);

        socket.emit("joined", { user });
        socket.on("welcome", (data) => {
            setMessages([...messages, data]);
            console.log(data.user, ":", data.message);
        });
        socket.on("userJoined", (data) => {
            setMessages([...messages, data]);
            console.log(data.user, ":", data.message);
        });

        socket.on("leave", (data) => {
            setMessages([...messages, data]);
            console.log(data.user, ":", data.message);
        });

        return () => {
            socket.disconnect();
            socket.off();
        };
    }, []);

    useEffect(() => {
        socket.on("sendMessage", (data) => {
            setMessages([...messages, data]);
            console.log(data.user, ":", data.message);
        });
        return () => {
            socket.off();
        };
    }, [messages]);

    return (
        <div className="chatPage">
            <div className="chatContainer">
                <div className="header">
                    <h2>Group CHAT</h2>
                    <a href="/">
                        <img src={closeIcon} alt="closeIcon" />
                    </a>
                </div>
                <ScrollToBottom className="chatBox">
                    {messages.map((item, i) => (
                        <Message
                            user={item.id === id ? "" : item.user}
                            message={item.message}
                            demo={item.id === id ? "right" : "left"}
                        />
                    ))}
                </ScrollToBottom>
                <div className="inputBox">
                    <input type="text" id="chatInput" />
                    <button onClick={send} className="sendBtn">
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chat;
