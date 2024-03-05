import React, { useState, useEffect } from "react";
import { db } from "./firebase-config.js";
import {
  collection,
  addDoc,
  where,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import ImageComponent from "../../../../assets/index.jsx";

export const Chat = ({room, user, className, onClose}) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesRef = collection(db, "messages");

  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where("room", "==", room),
      orderBy("createdAt")
    );
    const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });

    return () => unsuscribe();
  // eslint-disable-next-line
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newMessage === "") return;
    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: user.name,
      room,
    });

    setNewMessage("");
  };

  return (
  <div className="flex flex-col h-full pt-4">
  <div className="flex-grow overflow-auto p-4 gap-y-4">
    {messages.map((message) => (
      <div key={message.id} className="flex border rounded-lg p-2">
        <span className="text-sm font-bold text-gray-700">{message.user}:</span>
        <span className="ml-2 text-gray-500">{message.text}</span>
      </div>
    ))}
  </div>
  <form onSubmit={handleSubmit} className="flex items-center mt-4 p-4 bg-primary-50 rounded-lg">
    <input
      type="text"
      value={newMessage}
      onChange={(event) => setNewMessage(event.target.value)}
      className="flex-grow px-4 py-2 text-gray-700 rounded-lg focus:outline-none focus:ring focus:ring-gray-300"
      placeholder="Type your message here..."
    />
    <button type="submit" className="ml-2 px-4 py-2 text-white bg-blue-500 rounded-lg font-bold hover:bg-blue-600 active:bg-blue-700">
      Send
    </button>
  </form>
  <button className="absolute top-2 right-2 text-2xl" onClick={onClose}>
    <ImageComponent imageName="CloseImage" className="w-8 h-6" />
  </button>
</div>
  );
};
