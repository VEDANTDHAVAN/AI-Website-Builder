"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function ApiKeyForm() {
    const { user } = useUser();
    const [apiKey, setApiKey] = useState("");
    const [loading, setLoading] = useState(false);
    const [showKey, setShowKey] = useState(false);

    useEffect(() => {
       if (!user) return;
       
       const fetchKey = async () => {
         const res = await fetch("/api/user/save-api-key");
         const data = await res.json();
         if(data.openaiApiKey) setApiKey(data.openaiApiKey);
       };
       fetchKey();
    }, [user]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(!apiKey) return toast.error("Please enter a valid API Key");
        setLoading(true);
        const res = await fetch("/api/user/save-api-key", {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ openaiApiKey: apiKey }),
        });

        if(res.ok) {
            toast.success("OPENAI API Key saved successfully!!");
        } else {
            toast.error("Failed to save the API Key");
        }
        setLoading(false);
    };

    if(!user) return null;

    return (
       <div className="fixed bottom-5 right-5 bg-gradient-to-br from-gray-600 via-gray-400 to-gray-200 text-white p-4 rounded-xl shadow-lg border border-gray-800 w-[300px]">
        <h3 className="text-sm font-semibold mb-2 text-gray-200">🔑 Your OpenAI API Key</h3>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
         <div className="relative">
          <Input type={showKey ? "text":"password"}
           placeholder="sk-xxxxxxxxxxxx" value={apiKey} 
           onChange={(e) => setApiKey(e.target.value)} 
           className="px-10 bg-gray-100 text-black"/>  
          <button type="button" onClick={() => setShowKey(!showKey)}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-500">
           {showKey ? "Hide":"Show"}
          </button>
         </div>
         <Button type="submit" size="sm" disabled={loading}>
          {loading ? "Saving...":"Save Key"}
         </Button>
        </form>
       </div> 
    )
}