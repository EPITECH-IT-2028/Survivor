"use client";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { FiltersComboBoxResponsive } from "./filter";
import { Button } from "./ui/button";
import { setNewsById } from "@/app/hooks/news/setNewsById";
import { deleteNewsById } from "@/app/hooks/news/deleteNewsById";
import { categoryFilter, categoryId, CategoryNews, TNews } from "@/app/types/news";
import { DatePicker } from "./ui/datePicker";
import { getStartups } from "@/app/hooks/startups/getStartups";
import { start } from "repl";

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
  onDataChanged
}: UpdateNewsProps) {
  const [newsData, setNewsData] = useState<TNews | null>(null);
  const [startupsList, setStartupsList] = useState<{ value: number; label: string }[]>([{ value: 0, label: "-" }]);

  useEffect(() => {
    setNewsData(data);
  }, [data]);

  useEffect(() => {
    const fetchStartups = async () => {
      const startups = await getStartups();
      setStartupsList([{ value: 0, label: "-" }]);
      setStartupsList((prev) => [...prev, ...startups.map(s => ({ value: s.id, label: s.name }))]);
    };
    fetchStartups();
  })


  if (!newsData) {
    return <div>Loading event data...</div>;
  }

  const handleUpdateNews = async () => {
    if (!newsData) return;
    try {
      console.log("Updating news with data: ", newsData);
      await setNewsById(newsData.id, newsData);
      onDataChanged?.();
      onClose();
    } catch (e) {
      console.error("Failed to update news", e);
    }
  }

  const handleDeleteNews = async () => {
    if (newsData === null || newsData.id == null) {
      return;
    }
    try {
      await deleteNewsById(newsData.id);
      onDataChanged && onDataChanged();
      onClose();
    } catch (e) {
      console.error("Failed to delete news", e);
    }
  }

  if (!startupsList || !newsData) return (<p>Events and startups loading ...</p>)

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent>
        <DialogTitle>Update News</DialogTitle>
        <DialogContent>
          <Input value={newsData!.title} onChange={(e) => { setNewsData({ ...newsData!, title: e.target.value }) }} />
          <FiltersComboBoxResponsive
            filtersList={categoryFilter.filter(c => c.value !== '-')}
            placeHolder={categoryFilter[categoryId[newsData.category ?? '-']] || { label: 'Select category' }}
            onSelection={(value: CategoryNews) => { setNewsData({ ...newsData!, category: value }) }}
          />
          {
            startupsList?.length > 0 &&
            <FiltersComboBoxResponsive
              filtersList={startupsList.filter(s => s.value !== 0)}
              placeHolder={startupsList.find(s => s.value === newsData.startup_id) || startupsList[0]}
              onSelection={(value: number) => {
                setNewsData({ ...newsData!, 
                  startup_id: value,
                  startup: startupsList.find(s => s.value === value)?.label || "" });
              }}
            />
          }
          <Input value={newsData!.description} onChange={(e) => { setNewsData({ ...newsData!, description: e.target.value }) }} />
          <Input value={newsData!.location} onChange={(e) => { setNewsData({ ...newsData!, location: e.target.value }) }} />
          <DatePicker
            date={newsData?.news_date}
            onSelectAction={(value: Date) => setNewsData({ ...newsData, news_date: value })}
          />
          <Button className="bg-red-400 hover:bg-red-500 cursor-pointer" onClick={handleDeleteNews}>Delete news</Button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button className="bg-green-400 hover:bg-green-500 cursor-pointer" onClick={handleUpdateNews}>Apply</Button>
            <Button className="bg-blue-400 hover:bg-blue-500 cursor-pointer" onClick={onClose}>Cancel</Button>
          </div>
        </DialogContent>
      </DialogContent>
    </Dialog>
  )
}
