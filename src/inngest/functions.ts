import { Sandbox } from "@e2b/code-interpreter";
import { openai, createAgent } from "@inngest/agent-kit";

import { inngest } from "./client";
import { getSandbox } from "./utils";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    // Create a new agent with a system prompt (you can add optional tools, too)
    const sandboxId = await step.run("get-sandbor-id", async () => {
      const sandbox = await Sandbox.create("lovable-test1");
      return sandbox.sandboxId;
    })
    
    const codeAgent = createAgent({
      name: "code-agent",
      system: "You are an expert Next.js developer. You write readable and maintainable code. You write simple next.js & react snippets.",
      model: openai({ model: "gpt-4o" }),
    });

    const { output } = await codeAgent.run(
      `Write the following code Snippet: ${event.data.value}`
    );

    const sandboxUrl = await step.run("get-sandbox-url", async () => {
      const sandbox = await getSandbox(sandboxId);
      const host = sandbox.getHost(3000);
      return `https://${host}`;
    }) 
    
    return { output, sandboxUrl }
  },
);
