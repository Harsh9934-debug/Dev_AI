import { openai,gemini,createAgent } from "@inngest/agent-kit";
import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event }) => {
     const codeAgent = createAgent({
      name: "code-agent",
      system: "You are an expert next.js devloper.You write readble ,maintainable code .You write simple next.js and react snippet ",
      model: gemini({ model: "gemini-2.0-flash" }),
    });

    const {output}= await codeAgent.run(
      `write the fllowing snippet: ${event.data.value}`,
    );

    return { output };

  },
);