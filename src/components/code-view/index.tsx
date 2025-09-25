import Prism from "prismjs";
import { useEffect } from "react";
import "prismjs/components/index";
import "./code-theme.css";

interface Props {
    code: string;
    lang: string;
}

export const CodeView = ({code, lang}: Props) => {
 useEffect(() => {
    Prism.highlightAll();
 },[code])

 return (
    <pre className="p-2 bg-transparent border-0 rounded-none m-0 text-xs">
     <code className={`language-${lang}`}>
      {code}
     </code>
    </pre>
 )
}