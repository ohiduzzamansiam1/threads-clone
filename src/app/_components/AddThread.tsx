"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { handleThreadPost } from "@/lib/actions";
import { ImagePlus, Loader, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { toast } from "sonner";

export default function AddThread() {
  const [thread, setThread] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const [previewImageUrl, setPreviewImageUrl] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageClick = () => {
    imageInputRef.current?.click();
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Get the selected file from the event
    const selectedFile = e.target.files?.[0];

    // Check if a file was selected
    if (selectedFile) {
      // Check if the file size exceeds the limit (10MB)
      if (selectedFile.size > 10 * 1024 * 1024) {
        // Show an error toast message
        toast.error("Image size exceeds the limit (10MB).");
        return;
      }

      // Set the selected file as the image file
      setImageFile(selectedFile);

      // Generate a URL for the image file and set it as the preview image URL
      const imageUrl = URL.createObjectURL(selectedFile);
      setPreviewImageUrl(imageUrl);
    }
  };

  return (
    <div className="h-dvh md:pt-5">
      <Image
        src={"/images/logo.svg"}
        width={40}
        height={40}
        alt="Logo"
        className="mx-auto py-2 lg:py-0"
      />

      <form
        className="flex items-start gap-3 mt-5 lg:px-5"
        onSubmit={async (e) => {
          e.preventDefault();

          if (isSubmitting) return;

          setIsSubmitting(true);

          const data = new FormData(e.target as HTMLFormElement);
          const { success, error } = await handleThreadPost(data);

          if (success) {
            setThread("");
            setPreviewImageUrl("");
            setImageFile(null);
            toast.success("Thread created successfully");

            setIsSubmitting(false);
          } else {
            toast.error(error);
          }
        }}
      >
        <Avatar>
          <AvatarImage src={""} />
          <AvatarFallback>S</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <Textarea
            placeholder="Write your thread here..."
            className="resize-none h-28"
            name="thread"
            value={thread}
            onChange={(e) => setThread(e.target.value)}
          />

          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2">
              <input
                type="file"
                accept="image/*"
                ref={imageInputRef}
                className="hidden"
                onChange={handleImageChange}
                name="image"
              />
              <div className={`relative ${imageFile ? "block" : "hidden"}`}>
                <Image
                  src={previewImageUrl ?? ""}
                  width={50}
                  height={50}
                  alt="Image"
                  className="aspect-square size-[1.6rem] rounded-sm"
                />
                <div
                  onClick={() => setImageFile(null)}
                  className="absolute -top-1 -right-1 p-[0.15rem] bg-primary cursor-pointer text-white rounded-full"
                >
                  <X size={10} />
                </div>
              </div>
              <ImagePlus
                className="text-neutral-600"
                cursor={"pointer"}
                size={30}
                onClick={handleImageClick}
              />
            </div>
            <Button
              type="submit"
              size={"sm"}
              className="w-24 gap-1"
              disabled={(!thread.trim() && !imageFile) || isSubmitting}
            >
              {isSubmitting ? (
                <Loader className="size-4 animate-spin" />
              ) : (
                "Post"
              )}
            </Button>
          </div>
        </div>
      </form>

      <Separator className="my-3 opacity-50" />
    </div>
  );
}
