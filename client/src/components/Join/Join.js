import React, { useState } from "react";
import "./Join.css";
import { Link } from "react-router-dom";

let user;
const sendUser = () => {
    user = document.getElementById("joinInput").value;
    document.getElementById("joinInput").value = "";
};
const Join = () => {
    const [name, setName] = useState("");
    return (
        <div className="joinPage">
            <div className="joinContainer">
                <h1>Group Chat</h1>
                <input
                    onChange={(e) => {
                        setName(e.target.value);
                        console.log(name);
                    }}
                    placeholder="Enter your name"
                    type="text"
                    id="joinInput"
                />
                <Link
                    onClick={(e) => {
                        // eslint-disable-next-line no-unused-expressions
                        !name ? e.preventDefault() : null;
                    }}
                    to="/chat"
                >
                    <button className="joinbtn" onClick={sendUser}>
                        Enter
                    </button>
                </Link>
            </div>
        </div>
    );
};

export { user };

export default Join;
