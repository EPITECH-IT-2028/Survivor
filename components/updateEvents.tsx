"use client";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { FiltersComboBoxResponsive } from "./filter";
import { Button } from "./ui/button";
import { setEventById } from "@/app/hooks/events/setEventById";
import { deleteEventById } from "@/app/hooks/events/deleteEventById";
import {
  targetAudienceId,
  targetAudienceFilters,
  TEvent,
  TargetAudience,
  eventTypeFilters,
  EventType,
  eventTypeId,
} from "@/app/types/event";
import { DatePicker } from "./ui/datePicker";
import { PulseLoader } from "react-spinners";
import EventImage from "./EventImage";
import Image from "next/image";
import { Label } from "./ui/label";

interface UpdateEventProps {
  data: TEvent;
  isOpen: boolean;
  onClose: () => void;
  onDataChanged?: () => void;
}

export default function UpdateEvent({
  data,
  isOpen,
  onClose,
  onDataChanged,
}: UpdateEventProps) {
  const [eventData, setEventData] = useState<TEvent | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    setEventData(data);
  }, [data]);

  const handleUpdateEvent = async () => {
    if (!eventData) return;
    try {
      await setEventById(eventData.id, eventData);
      onDataChanged?.();
      onClose();
    } catch (e) {
      console.error("Failed to update event", e);
    }
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        setEventData({ ...eventData!, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteEvent = async () => {
    if (eventData === null || eventData.id == null) {
      return;
    }
    try {
      await deleteEventById(eventData.id);
      if (onDataChanged) {
        onDataChanged();
      }
      onClose();
    } catch (e) {
      console.error("Failed to delete event", e);
    }
  };

  if (!eventData) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <PulseLoader size={30} color="#F18585" />
      </div>
    );
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent>
        <DialogTitle>Update Event</DialogTitle>
        <DialogContent>
          <Input
            value={eventData!.name}
            onChange={(e) => {
              setEventData({ ...eventData!, name: e.target.value });
            }}
          />
          <FiltersComboBoxResponsive
            filtersList={eventTypeFilters.filter((f) => f.value !== "-")}
            placeHolder={
              eventTypeFilters[eventTypeId[eventData.event_type ?? "-"]] || {
                label: "Select event type",
              }
            }
            onSelection={(value: string) => {
              setEventData({ ...eventData!, event_type: value as EventType });
            }}
          />
          <Input
            value={eventData!.location ?? ""}
            onChange={(e) => {
              setEventData({ ...eventData!, location: e.target.value });
            }}
          />
          <DatePicker
            date={eventData?.dates}
            onSelectAction={(value: Date) =>
              setEventData({ ...eventData, dates: value })
            }
          />
          <FiltersComboBoxResponsive
            filtersList={targetAudienceFilters.filter((f) => f.value !== "-")}
            placeHolder={
              targetAudienceFilters[
                targetAudienceId[eventData.target_audience ?? "-"]
              ] || { label: "Select audience" }
            }
            onSelection={(value: string) => {
              setEventData({
                ...eventData!,
                target_audience: value as TargetAudience,
              });
            }}
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
                      setEventData({ ...eventData!, image: null });
                    }}
                  >
                    Remove Image
                  </Button>
                </div>
              ) : preview === null && eventData.image ? (
                <div className="flex flex-col items-center">
                  <EventImage id={eventData.id} />
                  <Button
                    className="cursor-pointer bg-red-400 hover:bg-red-500"
                    onClick={() => {
                      setPreview(null);
                      setEventData({ ...eventData!, image: null });
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
            onClick={handleDeleteEvent}
          >
            Delete event
          </Button>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Button
              className="cursor-pointer bg-green-400 hover:bg-green-500"
              onClick={handleUpdateEvent}
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
      </DialogContent>
    </Dialog>
  );
}
