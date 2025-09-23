import Image from "next/image";
import { useState, useEffect } from "react";

const ShimmerMessages = () => {
    const messages = [
        "Thinking...",
        "Generating...",
        "Loading...",
        "Analyzing your request...",
        "Crafting components...",
        "Optimizing layout...",
        "Adding final touches...",
        "Almost ready...",
    ]

    const [currentMessageIdx, setCurrentMessageIdx] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
          setCurrentMessageIdx((prev) => (prev + 1) % messages.length);
        }, 2000);

        return () => clearInterval(interval);
    }, [messages.length])

    return (
        <div className="flex items-center gap-2">
         <span className="text-base text-muted-foreground animate-pulse">
           {messages[currentMessageIdx]} 
         </span>
        </div>
    )
}

export const MessageLoading = () => {
    return (
        <div className="flex flex-col group px-2 pb-4">
         <div className="flex items-center gap-2 pt-2 mb-2">
          <Image src="/logo2.svg" alt="ved.dev" width={18} height={18} className="shrink-0" />
          <span className="text-sm font-medium">Ved.Dev</span>
         </div> 
         <div className="pl-8.5 flex flex-col gap-y-4">
          <ShimmerMessages />
         </div>
        </div>
    )
}