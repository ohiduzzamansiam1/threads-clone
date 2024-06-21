import { Separator } from "@/components/ui/separator";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { Suspense } from "react";
import { prisma } from "../../../../../prisma/db";
import AddThreadForm from "./AddThreadForm";
import ThreadCard from "./ThreadCard";

export default function AddThread() {
  return (
    <div className="h-dvh md:pt-5">
      <div className="flex items-center justify-between py-2 pt-6 lg:py-0 px-4">
        <div></div>

        <Image
          src={"/images/logo.svg"}
          width={30}
          height={30}
          alt="Logo"
          className="m-auto"
        />

        <div className="md:hidden grid place-items-center">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>

      <AddThreadForm />

      <Separator className="my-2 mt-3 opacity-70" />

      <div className="pt-1">
        <Suspense
          fallback={
            <div className="text-center text-muted-foreground text-sm">
              Loading...
            </div>
          }
        >
          <ShowThreads />
        </Suspense>
      </div>
    </div>
  );
}

async function ShowThreads() {
  const threads = await prisma.thread.findMany({
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <>
      {threads.map((thread) => (
        <ThreadCard key={thread.id} thread={thread} />
      ))}
    </>
  );
}
