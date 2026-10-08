"use client";
import Image from "next/image";
import { useState } from "react";
import { imageUrl } from "@/lib/data";

type GalleryProps = {
  slug: string;
  name: string;
};

// The image numbers we have for each service
const IMAGE_NUMBERS = [1, 2, 3];

export function Gallery({ slug, name }: GalleryProps) {
  // Which image is shown big. Starts with image 1.
  const [selectedImage, setSelectedImage] = useState(1);

  return (
    <div>
      {/* Big image */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-ink/5">
        <Image
          src={imageUrl(slug, selectedImage, 1000, 750)}
          alt={`${name}, view ${selectedImage}`}
          fill
          priority
          sizes="(min-width:1024px) 50vw, 100vw"
          className="object-cover"
        />
      </div>

      {/* Small clickable thumbnails */}
      <div
        className="mt-3 flex gap-3"
        role="group"
        aria-label="Gallery thumbnails"
      >
        {IMAGE_NUMBERS.map((number) => {
          const isSelected = selectedImage === number;

          return (
            <button
              key={number}
              onClick={() => setSelectedImage(number)}
              aria-label={`Show image ${number}`}
              aria-pressed={isSelected}
              className={`relative h-16 w-20 overflow-hidden rounded-md border-2 ${
                isSelected ? "border-brand" : "border-transparent"
              }`}
            >
              <Image
                src={imageUrl(slug, number, 160, 120)}
                alt=""
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
