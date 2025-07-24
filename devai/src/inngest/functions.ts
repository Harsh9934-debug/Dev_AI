import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    // imagine this is a download starter
    await step.sleep("wait-a-moment", "30s");
    // imagin this is a transcript step
    await step.sleep("wait-a-moment", "10s");
    // imagin this is a summery 
    await step.sleep("wait-a-moment", "5s");
    return { message: `Hello ${event.data.email}!` };


  },
);