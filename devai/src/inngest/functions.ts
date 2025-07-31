import { Sandbox } from "@e2b/code-interpreter";
import { openai,gemini,createAgent } from "@inngest/agent-kit";
import { inngest } from "./client";
import { getSandbox } from "./utils";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event,step }) => {

    const sandboxId = await step.run("get-sandbox-id", async ()=>{
      const sandbox = await Sandbox.create("devai-nextjs-test-2");
      return sandbox.sandboxId;
    });

     const codeAgent = createAgent({
      name: "code-agent",
      system: "You are an expert next.js devloper.You write readble ,maintainable code .You write simple next.js and react snippet ",
      model: gemini({ model: "gemini-2.0-flash" }),
    });

    const {output}= await codeAgent.run(
      `write the fllowing snippet: ${event.data.value}`,
    );

    const sandboxUrl = await step.run("get-sandbox-url",async () => {
      const sandbox = await getSandbox(sandboxId);
      const host =  sandbox.getHost(3000);
      return `https://${host}`;
    })


    return { output, sandboxUrl };

  },
);