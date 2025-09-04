"use client";

import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { toast } from "sonner";
import { useState } from "react";

const Page = () => {
  const [value, setValue] = useState("");
  const trpc = useTRPC();
  const invoke = useMutation(trpc.invoke.mutationOptions({
    onSuccess: () => {
      toast.success("Background Job Started!!")
    }
  }))
 return (
  <div className="p-4 mx-auto">
    <input value={value} className="mt-4 border-2 rounded-2xl w-full" onChange={(e) => setValue(e.target.value)}/>
   <br />
   <Button disabled={invoke.isPending} onClick={() => invoke.mutate({value: value})}>
    Invoke Background Job
   </Button>
  </div>
 )
}

export default Page;