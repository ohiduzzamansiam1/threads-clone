"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { UTApi } from "uploadthing/server";
import { z } from "zod";
import { prisma } from "../../prisma/db";

const utapi = new UTApi();

export const handleThreadPost = async (formData: FormData) => {
  try {
    // Get the user ID from the authentication information
    const { userId } = auth();

    // If the user is not authenticated, return an error response
    if (!userId) {
      return {
        success: false,
        error: "Unauthorized",
      };
    }

    // Define the schema for validating the image file
    const imageSchema = z.object({
      image: z
        .instanceof(File)
        .refine((file) => file.size <= 10 * 1024 * 1024, {
          message: "Image file size must be less than 10MB",
        }),
    });

    // Validate the form data against the image schema
    const validatedData = imageSchema.safeParse({
      image: formData.get("image") as File,
    });

    // If the validation fails, return an error response
    if (!validatedData.success) {
      return {
        success: false,
        error: validatedData.error.message,
      };
    }

    // Extract the image file from the validated data
    const { image } = validatedData.data;

    // Get the thread data from the form data
    const thread = formData.get("thread");

    // If the image file is not empty, upload it to the server and get the URL
    const uploadedFile =
      image.size === 0
        ? undefined
        : (await utapi.uploadFiles([image]))[0].data?.url;

    // If no image file is provided and no thread data is provided, return an error response
    if (!uploadedFile && !thread) {
      return {
        success: false,
        error: "Invalid data",
      };
    }

    // Create a new thread in the database with the user ID, thread data, or image URL
    await prisma.thread.create({
      data: {
        userId,
        thread: (thread as string) ?? undefined,
        imageUrl: uploadedFile,
      },
    });

    revalidatePath("/threads");
    // Return a success response
    return { success: true };
  } catch (error: any) {
    console.log(error.message);
    return {
      success: false,
      error: "An unexpected error occurred",
    };
  }
};
