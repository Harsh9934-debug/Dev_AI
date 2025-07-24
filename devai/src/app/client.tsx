"use client";

import { useTRPC } from "@/trpc/routers/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export const Client = () =>{
    const trpc  = useTRPC();
    const { data } = useSuspenseQuery(trpc.createAI.queryOptions({text :"Harsh prefetch"}));
    return(
        <div>
            {JSON.stringify(data)}
        </div>
    );
};
