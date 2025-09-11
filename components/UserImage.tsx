import { useEffect, useState } from "react";
import { getUserImage } from "@/app/hooks/users/getUserImage";
import Image from "next/image";

export default function UserImage({
  id,
  key,
}: {
  id: number;
  key?: string | number;
}) {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cleanup: (() => void) | undefined;

    async function loadImage() {
      setLoading(true);
      setImgSrc(null);

      try {
        const buffer = await getUserImage(id);
        if (!buffer) {
          setImgSrc(null);
          setLoading(false);
          return;
        }

        const blob = new Blob([buffer], { type: "image/jpeg" });
        const url = URL.createObjectURL(blob);
        setImgSrc(url);
        setLoading(false);

        cleanup = () => URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Error loading image:", error);
        setImgSrc(null);
        setLoading(false);
      }
    }

    loadImage();

    return () => {
      if (cleanup) cleanup();
    };
  }, [id, key]);

  if (loading) return <p>Loading image...</p>;
  if (!imgSrc) return <p>No provided image</p>;

  return (
    <Image
      src={imgSrc}
      alt={`User image`}
      width={0}
      height={0}
      className="rounded-xl shadow-md w-auto h-60"
    />
  );
}
