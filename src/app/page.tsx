"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { toast } from "sonner";
import { useState } from "react";

const Page = () => {
  const [value, setValue] = useState("");
  const trpc = useTRPC();
  const { data: messages } = useQuery(trpc.messages.getMany.queryOptions());
  const createMessage = useMutation(trpc.messages.create.mutationOptions({
    onSuccess: () => {
      toast.success("Message created")
    }
  }))
 return (
  <div className="p-4 mx-auto">
    <input value={value} className="mt-4 border-2 rounded-2xl w-full p-2" onChange={(e) => setValue(e.target.value)}/>
   <br />
   <Button disabled={createMessage.isPending} onClick={() => createMessage.mutate({value: value})}>
    Invoke Background Job
   </Button>
   <br />
   {JSON.stringify(messages, null, 2)}
  </div>
 )
}

export default Page;