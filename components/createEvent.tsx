"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { FiltersComboBoxResponsive } from "./filter";
import { Button } from "./ui/button";
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
import { addEvent } from "@/app/hooks/events/addEvent";
import { PulseLoader } from "react-spinners";

interface CreateEventProps {
  isOpen: boolean;
  onClose: () => void;
  onDataChanged?: () => void;
}

export default function CreateEvent({
  isOpen,
  onClose,
  onDataChanged,
}: CreateEventProps) {
  const [eventData, setEventData] = useState<TEvent>({
    name: "",
    dates: undefined,
    location: null,
    description: null,
    event_type: "-",
    target_audience: "-",
    id: 0,
    image: null
  });

  if (!eventData) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <PulseLoader size={30} color="#F18585" />
      </div>
    );
  }

  const handleCreateEvent = async () => {
    if (!eventData) return;
    try {
      if (
        !eventData.name ||
        !eventData.dates ||
        eventData.event_type === "-" ||
        eventData.target_audience === "-" ||
        !eventData.location ||
        !eventData.description
      ) {
        return;
      }
      await addEvent(eventData);
      if (onDataChanged) onDataChanged();
      onClose();
    } catch (e) {
      console.error("Failed to create event", e);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle>Create Event</DialogTitle>
        <Input
          value={eventData!.name}
          placeholder="Event Name"
          onChange={(e) => {
            setEventData({ ...eventData!, name: e.target.value });
          }}
        />
        <FiltersComboBoxResponsive
          filtersList={eventTypeFilters.filter((f) => f.value !== "-")}
          placeHolder={eventTypeFilters[eventTypeId["-"]]}
          onSelection={(value: string) => {
            setEventData({ ...eventData!, event_type: value as EventType });
          }}
        />
        <Input
          value={eventData!.location ?? ""}
          placeholder="Location"
          onChange={(e) => {
            setEventData({ ...eventData!, location: e.target.value });
          }}
        />
        <DatePicker
          date={eventData?.dates}
          onSelectAction={(value: Date) =>
            setEventData((prev) => ({ ...prev, dates: value }))
          }
        />
        <FiltersComboBoxResponsive
          filtersList={targetAudienceFilters.filter((f) => f.value !== "-")}
          placeHolder={
            targetAudienceFilters[
              targetAudienceId[eventData.target_audience ?? "-"]
            ]
          }
          onSelection={(value: string) => {
            setEventData({
              ...eventData!,
              target_audience: value as TargetAudience,
            });
          }}
        />
        <Input
          value={eventData!.description ?? ""}
          placeholder="Description"
          onChange={(e) => {
            setEventData({ ...eventData!, description: e.target.value });
          }}
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Button
            className="cursor-pointer bg-green-400 hover:bg-green-500"
            onClick={handleCreateEvent}
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
