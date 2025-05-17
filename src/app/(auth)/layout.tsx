"use client";
import { useAuthStore } from "@/store/Auth";
import { useRouter } from "next/navigation";
import React from "react";
import { BackgroundBeams } from "@/components/ui/background-beams";

//all the subfolder inside the auth will be containerized inside of layout
export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    
    const {session} = useAuthStore();
    const router = useRouter();
    React.useEffect(() => {
        if (session){
            router.push('/questions')
        }
    }, [session, router])
    if (session){
        return null;
    }
    return (
      <div className="relative flex min-h-screen flex-col items-center justify-center py-12">
      <BackgroundBeams />
      <div className="relative">{children}</div>
    </div>
    );
  }