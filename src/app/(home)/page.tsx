"use client";

import { ProjectForm } from "@/modules/home/ui/components/project-form";
import { ProjectsList } from "@/modules/home/ui/components/projects-list";
import Image from "next/image";

const Page = () => {
  return (
   <div className="flex flex-col max-w-5xl mx-auto w-full">
    <section className="space-y-6 py-[16vh] 2xl:py-48">
     <div className="flex flex-col items-center">
      <Image src="/logo2.svg" alt="Ved.Dev" width={50} height={50} className="hidden md:block" />
     </div>
     <h1 className="text-2xl md:text-5xl font-bold text-center">
      Build anything with ved.dev
     </h1>
     <p className="text-lg text-muted-foreground md:text-xl text-center">
      Create websites and apps by simply prompting to AI
     </p>
     <div className="max-w-3xl mx-auto w-full">
      <ProjectForm />
     </div>
    </section>
    <ProjectsList />
   </div>
  )
};

export default Page;