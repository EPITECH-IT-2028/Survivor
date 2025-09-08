import { useEffect, useState } from "react";
import { getEventImage } from "@/app/hooks/events/getEventImage";
import Image from "next/image";

export default function EventImage({ id }: { id: number }) {
  const [imgSrc, setImgSrc] = useState<string | null>(null);

  useEffect(() => {
    async function loadImage() {
      const buffer = await getEventImage(id);
      if (!buffer) return;

      const blob = new Blob([buffer], { type: "image/jpeg" });
      const url = URL.createObjectURL(blob);
      setImgSrc(url);

      return () => URL.revokeObjectURL(url);
    }

    loadImage();
  }, [id]);

  if (!imgSrc) return <p>No provided image</p>;

  return <Image src={imgSrc} alt={`No provided image`} width={0} height={0} className="rounded-xl shadow-md w-auto h-auto"/>;
}
