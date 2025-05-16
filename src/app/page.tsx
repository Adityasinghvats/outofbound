"use client"
import Link from "next/link";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { useAuthStore } from "@/store/Auth";
import slugify from "@/utils/slugify";
import { BorderBeam } from "@/components/magicui/border-beam";
import React from "react";

export default function Home() {
  const {user} = useAuthStore()
  const ref = React.useRef<HTMLDivElement>(null);
  const [height, setHeight] = React.useState(0);
  
  React.useEffect(() => {
          if (ref.current) {
              setHeight(ref.current.clientHeight);
          }
          
      }, [ref]);
  return (
    <div className="bg-black text-white min-h-screen py-20 mt-20">
      <header className="container mx-auto px-4 text-center items-center mb-12">
    <h1 className="text-5xl text-center font-bold">
      <span className="relative">
        <span className="absolute inset-0 bg-gray-800 rounded-md -ml-2 -mr-2 -mt-1 -mb-1 z-0"></span>
        <span className="relative z-1 text-blue-500">Outofbound</span>
      </span>
    </h1>
  </header>

      <section className="container mx-auto px-4 text-center mb-24">
        <h1 className="text-3xl font-bold mb-6">
          Unlock the Power of Community Knowledge
        </h1>
        <p className="text-lg text-gray-400 mb-8">
          Outofbound is the platform for sharing and discovering solutions to
          your coding challenges. Join our community and level up your skills.
        </p>
        
        <div className="mb-10 flex items-center justify-center">
        <Link href={user ?`/users/${user.$id}/${slugify(user.name)}`: "/register"}>
            <ShimmerButton className="shadow-2xl">
              <span className="whitespace-pre-wrap text-center text-sm font-bold py-3 px-6 leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
              Get Started for Free
              </span>
            </ShimmerButton>
        </Link>
        </div>
      </section>

      <section className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
        <div ref={ref}
            className="relative gap-4 overflow-hidden rounded-xl border border-white/20 bg-white/5 p-4 duration-200 hover:bg-white/10 sm:flex-row">
          <BorderBeam size={height} duration={12} delay={9}/>
          <h2 className="text-xl font-bold mb-4">Ask Questions</h2>
          <p className="text-gray-400">
            Get help from experienced developers in our community.
          </p>
        </div>
        <div ref={ref}
            className="relative gap-4 overflow-hidden rounded-xl border border-white/20 bg-white/5 p-4 duration-200 hover:bg-white/10 sm:flex-row">
          <BorderBeam size={height} duration={12} delay={9}/>
          <h2 className="text-xl font-bold mb-4">Share Answers</h2>
          <p className="text-gray-400">
            Showcase your expertise and help others solve their problems.
          </p>
        </div>
        <div ref={ref}
            className="relative gap-4 overflow-hidden rounded-xl border border-white/20 bg-white/5 p-4 duration-200 hover:bg-white/10 sm:flex-row">
          <BorderBeam size={height} duration={12} delay={9}/>
          <h2 className="text-xl font-bold mb-4">Level Up</h2>
          <p className="text-gray-400">
            Improve your coding skills and build your reputation.
          </p>
        </div>
      </section>

      <footer className="container mx-auto px-4 text-center text-gray-500">
        <p>&copy; 2025 Outofbound. All rights reserved.</p>
      </footer>
    </div>
  );
}
