"use client";

import UserCard from "./UserCard";

export default function RightSideBar() {
  return (
    <div className="h-dvh md:w-1/4 lg:p-10 md:pt-5 hidden xl:flex flex-col">
      <h1 className="text-2xl font-extrabold text-neutral-800 dark:text-white mt-2">
        Suggested for you
      </h1>

      <div className="space-y-3 mt-10">
        <UserCard name="Lydia Mitchell" username="lydia_mitchell" />
        <UserCard name="Evan Stone" username="evan_stone" />
        <UserCard name="Maya Carter" username="maya_carter" />
        <UserCard name="Oliver Brooks" username="oliver_brooks" />
        <UserCard name="Chloe Harper" username="chloe_harper" />
      </div>
    </div>
  );
}
