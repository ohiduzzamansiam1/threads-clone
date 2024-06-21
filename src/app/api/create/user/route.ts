import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/db";

export async function GET(request: Request) {
  const user = await currentUser();

  try {
    const dbUser = await prisma.user.findUnique({
      where: {
        id: user?.id,
      },
    });

    if (!dbUser) {
      await prisma.user.create({
        data: {
          id: user?.id ?? "",
          email: user?.emailAddresses[0].emailAddress ?? "",
          name: user?.fullName ?? "",
          avatarUrl: user?.imageUrl ?? "",
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
  return NextResponse.redirect(new URL("/threads", request.url));
}
