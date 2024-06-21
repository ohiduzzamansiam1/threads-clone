"use client";

// src/components/ThreadCard.tsx

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { relativeDate } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ThreadCardProps {
  thread: {
    id: string;
    thread: string | null;
    imageUrl: string | null;
    createdAt: Date;
    user: {
      id: string;
      name: string;
      avatarUrl: string;
    };
  };
}

export default function ThreadCard({ thread }: ThreadCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    console.log(imageLoaded);
  }, [imageLoaded]);

  return (
    <div key={thread.id}>
      <div className="flex items-start gap-3 pt-2 px-4">
        <Avatar>
          <AvatarImage src={thread.user.avatarUrl} />
          <AvatarFallback>
            {thread.user?.name?.slice(0, 1).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <div>
            <h1 className="text-xs font-medium text-neutral-900">
              {thread.user.name}
            </h1>
            <h3 className="text-xs text-neutral-500">
              Posted {relativeDate(thread.createdAt)}
            </h3>
          </div>

          <div className="mt-2">
            {thread.thread && (
              <p className="text-sm font-medium mb-2 leading-relaxed text-neutral-800">
                {thread.thread}
              </p>
            )}
            {thread.imageUrl && (
              <div>
                <Image
                  src={thread.imageUrl}
                  width={1000}
                  height={1000}
                  alt="Image"
                  className={`${
                    !thread.thread ? "mt-3" : "mt-0"
                  } rounded-2xl w-full max-h-80 mb-2 object-cover`}
                  //   onLoad={() => setImageLoaded(true)}
                  priority
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <Separator className="my-2 opacity-70" />
    </div>
  );
}
