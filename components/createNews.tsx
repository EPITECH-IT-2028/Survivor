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
import {
  categoryFilter,
  categoryId,
  CategoryNews,
  TNews
} from "@/app/types/news";
import { DatePicker } from "./ui/datePicker";
import { addNews } from "@/app/hooks/news/addNews";
import { getStartups } from "@/app/hooks/startups/getStartups";

interface CreateNewsProps {
  isOpen: boolean;
  onClose: () => void;
  onDataChanged?: () => void;
}

export default function CreateEvent({
  isOpen,
  onClose,
  onDataChanged,
}: CreateNewsProps) {
  const [newsData, setNewsData] = useState<TNews>(
    {
      title: "",
      category: "-",
      startup_id: 0,
      news_date: undefined,
      description: "",
      startup: "",
      location: "",
      id: 0,
    }
  );

  const [startupsList, setStartupsList] = useState<{ value: number; label: string }[]>([{ value: 0, label: "-" }]);

  useEffect(() => {
    const fetchStartups = async () => {
      const startups = await getStartups();
      const newStartupsList = [
        { value: 0, label: "-" },
        ...startups.map(s => ({ value: s.id, label: s.name }))
      ];
      setStartupsList(newStartupsList);
    };
    fetchStartups();
  }, []);

  const handleCreateNews = async () => {
    if (!newsData) return;
    try {
      if (!newsData.title || !newsData.news_date || newsData.category === '-'
        || !newsData.description || !newsData.startup_id) {
        return;
      }
      await addNews(newsData);
      if (onDataChanged) onDataChanged();
      onClose();
    } catch (e) {
      console.error("Failed to create event", e);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle>Create News</DialogTitle>
        <DialogContent>
          <Input
            value={newsData.title ?? ""}
            placeholder="News Title"
            onChange={(e) => { setNewsData({ ...newsData!, title: e.target.value }) }}
          />
          <FiltersComboBoxResponsive
            filtersList={categoryFilter.filter(f => f.value !== '-')}
            placeHolder={categoryFilter[categoryId['-']]}
            onSelection={(value: CategoryNews) => { setNewsData({ ...newsData!, category: value }) }}
          />
          <Input
            value={newsData!.description ?? ""}
            placeholder="Description"
            onChange={(e) => { setNewsData({ ...newsData!, description: e.target.value }) }}
          />
          <Input
            value={newsData!.location ?? ""}
            placeholder="Location"
            onChange={(e) => { setNewsData({ ...newsData!, location: e.target.value }) }}
          />
          <DatePicker
            date={newsData?.news_date}
            onSelectAction={(value: Date) => setNewsData(prev => ({ ...prev, news_date: value }))}
          />
          {
            startupsList?.length > 0 &&
            <FiltersComboBoxResponsive
              filtersList={startupsList.filter(s => s.value !== 0)}
              placeHolder={startupsList[0]}
              onSelection={(value: number) => {
                setNewsData({ ...newsData!, startup_id: value, startup: startupsList.find(s => s.value === value)?.label || "" });
              }}
            />
          }
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button className="bg-green-400 hover:bg-green-500 cursor-pointer" onClick={handleCreateNews}>Apply</Button>
            <Button className="bg-blue-400 hover:bg-blue-500 cursor-pointer" onClick={onClose}>Cancel</Button>
          </div>
        </DialogContent>
      </DialogContent>
    </Dialog>
  );
}
