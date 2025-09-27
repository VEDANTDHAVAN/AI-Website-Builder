"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextAreaAutosize from "react-textarea-autosize";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { toast } from "sonner";
import { ArrowUpIcon, LucideLoader2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { PROJECT_TEMPLATES } from "../../constants";

const formSchema = z.object({
    value: z.string()
        .min(1, { message: "Value is required!"})
        .max(10000, { message: "Value is Too Long!!" }),
})

export const ProjectForm = () => {
  
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        value: "",

    },
  });

  const createProject = useMutation(trpc.projects.create.mutationOptions({
    onSuccess: (data) => {
      queryClient.invalidateQueries(
        trpc.projects.getMany.queryOptions(),
      );
      router.push(`/projects/${data.id}`)
      // Invalidate usage Status
    },
    onError: (error) => {
      // TODO: Redirect to pricing page if specific error
      toast.error(error.message);
    }
  }));

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await createProject.mutateAsync({
      value: values.value,
    });
  };

  const onSelect = (value: string) => {
   form.setValue("value", value, {
    shouldDirty: true, shouldTouch: true, shouldValidate: true
   })
  }

  const isPending = createProject.isPending;
  const isButtonDisabled = isPending || !form.formState.isValid;
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Form {...form}>
     <section className="space-y-6">
     <form onSubmit={form.handleSubmit(onSubmit)}
      className={cn(
      "relative border p-4 pt-1 rounded-2xl transition-all",
      "bg-gradient-to-r from-green-200 via-green-300 to-green-400 dark:from-gray-800 dark:via-gray-900 dark:to-black",
      isFocused && "shadow-xs",
      )}
     >
      <FormField control={form.control} name="value" 
       render={({field}) => (
        <TextAreaAutosize {...field} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)}
         minRows={2} maxRows={8} className="pt-4 resize-none border-0 w-full outline-none bg-transparent"
         placeholder="What would you like to build?" onKeyDown={(e) => {
            if(e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                e.preventDefault();
                form.handleSubmit(onSubmit)(e);
            }
         }} disabled={isPending}/>
       )} />     
       <div className="flex gap-x-2 items-end justify-between pt-2">
        <div className="text-[10px] text-muted-foreground font-mono">
         <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
          <span>&#8984;</span>Enter  
         </kbd>
         &nbsp;to Submit
        </div>
        <Button disabled={isButtonDisabled} className={cn("size-8 rounded-full", 
          isButtonDisabled && "bg-muted-foreground border"
        )}>
          {isPending ? (
            <LucideLoader2 className="size-4 animate-spin" />
          ) : (
            <ArrowUpIcon /> 
          )}  
        </Button>
       </div>
     </form>
     <div className="flex-wrap justify-center gap-2 hidden md:flex max-w-3xl">
      {PROJECT_TEMPLATES.map((template) => (
        <Button key={template.title} variant="secondary" size="sm" 
        className="bg-green-200 cursor-pointer hover:text-black text-gray-800 dark:bg-sidebar"
         onClick={() => onSelect(template.prompt)}
        >
         {template.emoji} {template.title}
        </Button>
      ))}
     </div>
     </section> 
    </Form>
  )
}