import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// Define the schema for the webhook payload from Directus
const DirectusWebhookSchema = z.object({
  event: z.enum(["items.create", "items.update", "items.delete"]),
  collection: z.string(),
  key: z.string(),
  payload: z.record(z.any()),
});

export async function POST(request: NextRequest) {
  try {
    // Get the secret from the request headers
    const secret = request.headers.get("x-webhook-secret");
    
    // Verify the secret
    if (secret !== process.env.CMS_WEBHOOK_SECRET) {
      return NextResponse.json(
        { error: "Invalid webhook secret" },
        { status: 401 }
      );
    }
    
    // Parse the request body
    const body = await request.json();
    
    // Validate the webhook payload
    const result = DirectusWebhookSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid webhook payload", details: result.error.format() },
        { status: 400 }
      );
    }
    
    const { collection, payload } = result.data;
    
    // Determine the path to revalidate based on the collection and payload
    let path = "";
    
    if (collection === "posts") {
      // Revalidate the blog post page and the blog index page
      const slug = payload.slug;
      path = `/blog/${slug}`;
      revalidatePath(path);
      revalidatePath("/blog");
      console.log(`Revalidated blog post: ${path}`);
    } else if (collection === "pages") {
      // Revalidate the page
      const slug = payload.slug;
      path = `/${slug}`;
      revalidatePath(path);
      console.log(`Revalidated page: ${path}`);
    } else {
      // Revalidate the home page for other collections
      path = "/";
      revalidatePath(path);
      console.log(`Revalidated home page`);
    }
    
    return NextResponse.json({ revalidated: true, path });
  } catch (error) {
    console.error("Error revalidating path:", error);
    return NextResponse.json(
      { error: "Failed to revalidate path" },
      { status: 500 }
    );
  }
}
