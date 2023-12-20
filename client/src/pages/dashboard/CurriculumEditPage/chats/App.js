import React from "react";
import {Chat} from "./Chat.js";
import Cookies from "universal-cookie";

const cookies = new Cookies();
function ChatApp({room, ...props}) {
    const userr = {
      name : "user",
    }

    return <Chat room={room} userr={userr} {...props} />
}

export default ChatApp;
