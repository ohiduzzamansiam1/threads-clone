import { SignIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function page() {
  const { userId } = auth();
  if (userId) redirect("/threads");
  return (
    <div className="h-dvh flex flex-col items-center justify-center">
      <h1 className="text-7xl font-extrabold text-neutral-800">Threads</h1>
      <p className="text-xs font-medium text-neutral-600 mb-10">
        Share your thoughts, with freedom.
      </p>
      <SignIn forceRedirectUrl={"/api/create/user"} />
    </div>
  );
}
