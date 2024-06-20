import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface iUserCardProps {
  avatarUrl?: string;
  name: string;
  username: string;
}

export default function UserCard({
  avatarUrl,
  name,
  username,
}: iUserCardProps) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-2 items-center">
        <Avatar className="size-12">
          <AvatarImage src={avatarUrl ?? ""} />
          <AvatarFallback>{name?.slice(0, 1).toUpperCase()}</AvatarFallback>
        </Avatar>

        <div>
          <h1 className="font-medium text-sm">{name}</h1>
          <h3 className="text-xs">@{username}</h3>
        </div>
      </div>

      <Button size={"sm"}>View</Button>
    </div>
  );
}
