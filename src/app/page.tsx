import { Suspense } from "react";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Client } from "./client";

const Page = async () => {
  //pre fetching
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.hello.queryOptions({text: "Vedant PRE Fetched"}));
 return (
  <HydrationBoundary state={dehydrate(queryClient)}>
    <Suspense fallback={<p>Loading...</p>}>
     <Client />
    </Suspense>
  </HydrationBoundary>
 )
}

export default Page;