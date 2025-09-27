"use client";

import { Navbar } from "@/modules/home/ui/components/navbar";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <main className="flex flex-col min-h-screen max-h-full relative">
      <div className="absolute inset-0 -z-10 h-full w-full 
     bg-[linear-gradient(to_right,#d1d5db_1px,transparent_1px),linear-gradient(to_bottom,#d1d5db_1px,transparent_1px)] 
     dark:bg-[linear-gradient(to_right,#374151_1px,transparent_1px),linear-gradient(to_bottom,#374151_1px,transparent_1px)] 
     [background-size:40px_40px]" />
      {/* Page Content */}
      <Navbar />
      <div className="flex-1 flex flex-col px-4 pb-4 relative z-10">
        {children}
      </div>
    </main>
  );
};

export default Layout;
