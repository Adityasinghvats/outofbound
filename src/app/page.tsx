"use client";
import { useAuthStore } from "@/store/Auth";
import React from "react";
import Landing from "./components/Landing";
import HomePage from "./components/HomePage";

export default function Home() {
  const {user} = useAuthStore();
  
  return user ? <HomePage/> : <Landing/>;
}
