import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { projectId, dataset } from "./client";

const builder = imageUrlBuilder({
  projectId: projectId || "gaposa-cms",
  dataset: dataset || "production",
});

export function urlForImage(source: SanityImageSource) {
  return builder.image(source).auto("format").fit("max");
}

export function urlFor(source: any) {
  return urlForImage(source);
}

export function getSanityImageUrl(image: any): string | null {
  if (!image) return null;
  if (typeof image === "string") return image;
  if (image?.asset?.url) return image.asset.url;
  try {
    return builder.image(image).auto("format").fit("max").url();
  } catch {
    return null;
  }
}
