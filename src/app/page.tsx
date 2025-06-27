"use client";

import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { toast } from "sonner";

const Page = () => {
  const trpc = useTRPC();
  const invoke = useMutation(trpc.invoke.mutationOptions({
    onSuccess: () => {
      toast.success("Background Job Started!!")
    }
  }))
 return (
  <div className="p-4 max-w-8xl mx-auto">
   <Button disabled={invoke.isPending} onClick={() => invoke.mutate({text: "Vedant"})}>
    Invoke Background Job
   </Button>
  </div>
 )
}

export default Page;