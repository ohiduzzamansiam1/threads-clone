"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { SignOutButton, useUser } from "@clerk/nextjs";
import { Bell, HomeIcon, LogOut, Search, User2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const left_menu = [
  {
    name: "Home",
    href: "/",
    icon: HomeIcon,
  },
  {
    name: "Explore",
    href: "/explore",
    icon: Search,
  },
  {
    name: "Notificatios",
    href: "/notificatios",
    icon: Bell,
  },
  {
    name: "Profile",
    href: "/profile",
    icon: User2,
  },
];

export default function LeftSideBar() {
  const pathname = usePathname();
  const { user } = useUser();
  return (
    <div className="h-dvh md:w-1/3 md:py-5 px-2 hidden md:flex flex-col">
      <div className="flex items-center ml-8">
        <Image src="/images/logo.svg" width={50} height={50} alt="Logo" />
        <h1 className="font-bold text-xl ml-2">Threads</h1>
      </div>

      <ul className="ml-3.5 mt-10 space-y-1 flex-1 flex justify-center flex-col">
        {left_menu.map((item, index) => (
          <li key={index}>
            <Link
              href={item.href}
              className={`flex items-center gap-3 transition hover:bg-black/5 dark:hover:bg-white/10 w-fit px-8 py-2 rounded-full ${
                pathname === item.href ? "bg-black/5 dark:bg-white/10" : ""
              }`}
            >
              <item.icon size={22} className="flex-shrink" />
              <span className="text-lg font-medium">{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex flex-col ml-10 lg:flex-row items-center justify-between">
        <div className="flex flex-col lg:flex-row gap-2 items-center">
          <Avatar>
            <AvatarImage src={user?.imageUrl} />
            <AvatarFallback>
              {user?.firstName?.slice(0, 1).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="text-center lg:text-start">
            <h1 className="font-semibold text-sm line-clamp-1">
              {user?.fullName}
            </h1>
            <h3 className="text-xs line-clamp-1">
              @{user?.firstName?.toLowerCase()}
              {user?.fullName?.split(" ").length! > 1 && "_"}
              {user?.lastName?.toLowerCase()}
            </h3>
          </div>
        </div>

        <SignOutButton redirectUrl="/">
          <Button variant={"ghost"} size={"icon"}>
            <LogOut size={16} color="red" />
          </Button>
        </SignOutButton>
      </div>
    </div>
  );
}
