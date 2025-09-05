"use client";

import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const [value, setValue] = useState("");
  const trpc = useTRPC();
  const createProjects = useMutation(trpc.projects.create.mutationOptions({
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      router.push(`/projects/${data.id}`);
    }
  }))
 return (
  <div className="h-screen w-screen flex items-center justify-center">
    <div className="max-w-7xl mx-auto flex items-center flex-col gap-y-4 justify-center">
     <input value={value} className="mt-4 border-2 rounded-2xl w-full p-2" onChange={(e) => setValue(e.target.value)}/>
     <br />
     <Button disabled={createProjects.isPending} onClick={() => createProjects.mutate({value: value})}>
     Generate
     </Button>
    </div>
  </div>
 )
}

export default Page;