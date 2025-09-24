import { useState } from "react";
import { ExternalLinkIcon, RefreshCcwIcon } from "lucide-react";
import { Fragment } from "@/app/generated/prisma";
import { Button } from "@/components/ui/button";
import { Hint } from "@/components/hint";

interface Props {
    data: Fragment;
}

export function FragmentWeb({data}:Props ) {
  const [fragmentKey, setFragmentKey] = useState(0);  
  const [copied, setCopied] = useState(false);
  const onRefresh = () => {
    setFragmentKey((prev) => prev + 1);
  }
  const handleCopy = () => {
    navigator.clipboard.writeText(data.sandBoxUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }
  
  return (
    <div className="flex flex-col w-full h-full">
     <div className="p-2 border-b bg-sidebar flex items-center gap-x-2">
      <Hint text="Refresh Page" side="bottom" align="start">
       <Button size="sm" variant="outline" onClick={onRefresh}>
        <RefreshCcwIcon />
       </Button>
      </Hint>
      <Hint text="Click to Copy Url" side="bottom" align="center">
       <Button size="sm" variant="outline" onClick={handleCopy} disabled={!data.sandBoxUrl || copied}
        className="flex-1 justify-start text-start font-semibold">
        <span className="truncate">{data.sandBoxUrl}</span>
       </Button>
      </Hint>
      <Hint text="Open in a new Tab" side="bottom" align="start">
       <Button size="sm" disabled={!data.sandBoxUrl} variant="outline" 
        onClick={() => {
        if(!data.sandBoxUrl) return;
        window.open(data.sandBoxUrl, "_blank");
        }}>
        <ExternalLinkIcon />
       </Button>
      </Hint>
     </div>   
     <iframe key={fragmentKey} 
        className="h-full w-full" sandbox="allow-forms allow-scripts allow-same-origin"
        loading="lazy" src={data.sandBoxUrl}
     />
    </div>
    )
}