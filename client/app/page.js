"use client";

import Chat from "@/Components/Chat";
import Login from "@/Components/Login";
import { AppContext } from "@/Providers/AppProvider";
import { useContext } from "react";

export default function Home() {
  const { showChat } = useContext(AppContext);

  return <>{!showChat ? <Login /> : <Chat />}</>;
}
