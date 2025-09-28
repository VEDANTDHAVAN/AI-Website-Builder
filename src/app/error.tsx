"use client";
import { Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const ErrorPage = () => {
  const router = useRouter(); 
    
  return (
   <main className="min-h-screen bg-black flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md rounded-lg shadow-lg bg-gray-900 border border-gray-700 p-6 relative">
        <div className="flex items-center gap-2 mb-6">
          <span className="bg-green-500 rounded-full w-3 h-3 inline-block" />
          <span className="bg-yellow-400 rounded-full w-3 h-3 inline-block" />
          <span className="bg-red-500 rounded-full w-3 h-3 inline-block" />
          <Terminal className="ml-auto text-green-400" size={20} />
        </div>
        <div className="font-mono text-green-400 text-lg md:text-xl text-center select-none">
          <span className="block animate-pulse">$ Oops!! Something went wrong</span>
        </div>
        <div className="mt-8 flex justify-center">
          <Button variant="outline" onClick={() => router.push("/")}
            className="border-green-400 text-green-400 hover:bg-green-900 hover:text-white">
            Return Home
          </Button>
        </div>
      </div>
    </main> 
  )
} 

export default ErrorPage;