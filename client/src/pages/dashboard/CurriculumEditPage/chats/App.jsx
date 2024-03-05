import React from "react";
import {Chat} from "./Chat.jsx";
// import Cookies from "universal-cookie";
import { useUserContext } from "../../../../context/UserContext.jsx";

// const cookies = new Cookies();
function ChatApp({room, ...props}) {
    const {user} = useUserContext()

    return <Chat room={room} user={user} {...props} />
}

export default ChatApp;
