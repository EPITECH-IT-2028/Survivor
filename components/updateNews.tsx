"use client";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { FiltersComboBoxResponsive } from "./filter";
import { Button } from "./ui/button";
import { setNewsById } from "@/app/hooks/news/setNewsById";
import { deleteNewsById } from "@/app/hooks/news/deleteNewsById";
import {
  categoryFilter,
  categoryId,
  CategoryNews,
  TNews,
} from "@/app/types/news";
import { DatePicker } from "./ui/datePicker";
import { getStartups } from "@/app/hooks/startups/getStartups";
import { PulseLoader } from "react-spinners";
import Image from "next/image";
import NewsImage from "./NewsImage";
import { Label } from "./ui/label";

interface UpdateNewsProps {
  data: TNews;
  isOpen: boolean;
  onClose: () => void;
  onDataChanged?: () => void;
}

export default function UpdateNews({
  data,
  isOpen,
  onClose,
  onDataChanged,
}: UpdateNewsProps) {
  const [newsData, setNewsData] = useState<TNews | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [startupsList, setStartupsList] = useState<
    { value: string; label: string }[]
  >([{ value: "0", label: "-" }]);

  useEffect(() => {
    setNewsData(data);
  }, [data]);

  useEffect(() => {
    const fetchStartups = async () => {
      const startups = await getStartups();
      setStartupsList([{ value: "0", label: "-" }]);
      setStartupsList((prev) => [
        ...prev,
        ...startups.map((s) => ({ value: s.id.toString(), label: s.name })),
      ]);
    };
    fetchStartups();
  });

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        setNewsData({ ...newsData!, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateNews = async () => {
    if (!newsData) return;
    try {
      await setNewsById(newsData.id, newsData);
      onDataChanged?.();
      onClose();
    } catch (e) {
      console.error("Failed to update news", e);
    }
  };

  const handleDeleteNews = async () => {
    if (newsData === null || newsData.id == null) {
      return;
    }
    try {
      await deleteNewsById(newsData.id);
      if (onDataChanged) {
        onDataChanged();
      }
      onClose();
    } catch (e) {
      console.error("Failed to delete news", e);
    }
  };

  if (!startupsList || !newsData)
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <PulseLoader size={30} color="#F18585" />
      </div>
    );

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update News</DialogTitle>
        </DialogHeader>
        <Input
          value={newsData!.title}
          onChange={(e) => {
            setNewsData({ ...newsData!, title: e.target.value });
          }}
        />
        <FiltersComboBoxResponsive
          filtersList={categoryFilter.filter((c) => c.value !== "-")}
          placeHolder={
            categoryFilter[categoryId[newsData.category ?? "-"]] || {
              label: "Select category",
            }
          }
          onSelection={(value: string) => {
            setNewsData({ ...newsData!, category: value as CategoryNews });
          }}
        />
        {startupsList?.length > 0 && (
          <FiltersComboBoxResponsive
            filtersList={startupsList.filter((s) => s.value !== "0")}
            placeHolder={
              startupsList.find(
                (s) => s.value === newsData.startup_id.toString(),
              ) || startupsList[0]
            }
            onSelection={(value: string) => {
              setNewsData({
                ...newsData!,
                startup_id: parseInt(value),
                startup:
                  startupsList.find((s) => s.value === value)?.label || "",
              });
            }}
          />
        )}
        <Input
          value={newsData!.description}
          onChange={(e) => {
            setNewsData({ ...newsData!, description: e.target.value });
          }}
        />
        <Input
          value={newsData!.location}
          onChange={(e) => {
            setNewsData({ ...newsData!, location: e.target.value });
          }}
        />
        <DatePicker
          date={newsData?.news_date}
          onSelectAction={(value: Date) =>
            setNewsData({ ...newsData, news_date: value })
          }
        />
        <div className="cursor-pointer border-2 border-dashed rounded-2xl p-6 text-center items-center">
          <Input
            type="file"
            accept="image/*"
            className="hidden"
            id="fileInput"
            onChange={handleFile}
          />
          <Label htmlFor="fileInput">
            {preview ? (
              <div className="flex flex-col items-center">
                <Image
                  src={preview}
                  alt="Preview"
                  width={200}
                  height={200}
                  className="mx-auto rounded-lg"
                />
                <Button
                  className="cursor-pointer bg-red-400 hover:bg-red-500"
                  onClick={() => {
                    setPreview(null);
                    setNewsData({ ...newsData!, image: null });
                  }}
                >
                  Remove Image
                </Button>
              </div>
            ) : preview === null && newsData.image ? (
              <div className="flex flex-col items-center">
                <NewsImage id={newsData.id} />
                <Button
                  className="cursor-pointer bg-red-400 hover:bg-red-500"
                  onClick={() => {
                    setPreview(null);
                    setNewsData({ ...newsData!, image: null });
                  }}
                >
                  Remove Image
                </Button>
              </div>
            ) : (
              <h1 className="text-gray-500">Click or drop an image here</h1>
            )}
          </Label>
        </div>
        <Button
          className="cursor-pointer bg-red-400 hover:bg-red-500"
          onClick={handleDeleteNews}
        >
          Delete news
        </Button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            className="cursor-pointer bg-green-400 hover:bg-green-500"
            onClick={handleUpdateNews}
          >
            Apply
          </Button>
          <Button
            className="cursor-pointer bg-blue-400 hover:bg-blue-500"
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
