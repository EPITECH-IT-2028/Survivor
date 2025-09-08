import { useEffect, useState } from "react";
import { getEventImage } from "@/app/hooks/events/getEventImage";

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

  if (!imgSrc) return <p>Aucune image disponible</p>;

  return <img src={imgSrc} alt={`Event ${id}`} className="rounded-xl shadow-md" />;
}
