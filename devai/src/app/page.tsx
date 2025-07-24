import { getQueryClient,trpc } from "@/trpc/routers/server";
import { dehydrate,HydrationBoundary } from "@tanstack/react-query";
import { Client } from "./client";
import { Suspense } from "react";
const page = async () =>{
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.createAI.queryOptions({ text: "Harsh prefetch"}));
  return(
    <HydrationBoundary state={dehydrate(queryClient)}>
       <Suspense>
        <Client />
       </Suspense>
    </HydrationBoundary>
  ); 
}

export default page;