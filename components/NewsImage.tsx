import { useEffect, useState } from "react";
import { getNewsImage } from "@/app/hooks/news/getNewsImage";
import Image from "next/image";

export default function NewsImage({ id }: { id: number }) {
  const [imgSrc, setImgSrc] = useState<string | null>(null);

  useEffect(() => {
    async function loadImage() {
      const buffer = await getNewsImage(id);
      if (!buffer) return;

      const blob = new Blob([buffer], { type: 'image/jpeg' });
      const url = URL.createObjectURL(blob);
      setImgSrc(url);

      return () => URL.revokeObjectURL(url);
    }

    loadImage();
  }, [id]);

  if (!imgSrc) return <p>No provided image</p>;

  return <Image src={imgSrc} alt={`No provided image`} width={0} height={0} className="rounded-xl shadow-md w-auto h-60" />;
}
