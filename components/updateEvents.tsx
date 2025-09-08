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
import { setEventById } from "@/app/hooks/events/setEventById";
import { deleteEventById } from "@/app/hooks/events/deleteEventById";
import { targetAudienceId, targetAudienceFilters, TEvent, TargetAudience, eventTypeFilters, EventType, eventTypeId } from "@/app/types/event";
import { DatePickerEvent } from "./ui/datePicker";

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
  onDataChanged
}: UpdateEventProps) {
  const [eventData, setEventData] = useState<TEvent | null>(null);

  useEffect(() => {
    setEventData(data);
  }, [data]);

  if (!eventData) {
    return <div>Loading event data...</div>;
  }

  const handleUpdateEvent = async () => {
    if (!eventData) return;
    try {
      await setEventById(eventData.id, eventData);
      onDataChanged?.();
      onClose();
    } catch (e) {
      console.error("Failed to update event", e);
    }
  }

  const handleDeleteEvent = async () => {
    if (eventData === null || eventData.id == null) {
      return;
    }
    try {
      await deleteEventById(eventData.id);
      onDataChanged && onDataChanged();
      onClose();
    } catch (e) {
      console.error("Failed to delete event", e);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent>
        <DialogTitle>Update Event</DialogTitle>
        <DialogContent>
          <Input value={eventData!.name} onChange={(e) => { setEventData({ ...eventData!, name: e.target.value }) }}/>
          <FiltersComboBoxResponsive
            filtersList={eventTypeFilters.filter(f => f.value !== '-')}
            placeHolder={eventTypeFilters[eventTypeId[eventData.event_type ?? '-']] || { label: 'Select event type' }}
            onSelection={(value: EventType) => { setEventData({ ...eventData!, event_type: value }) }}
          />
          <Input value={eventData!.location ?? ""} onChange={(e) => { setEventData({ ...eventData!, location: e.target.value }) }}/>
          <DatePickerEvent date={eventData?.dates} onSelectAction={(value: string) => setEventData(prev => prev ? {...prev, dates: value} : null)}/>
          <FiltersComboBoxResponsive
            filtersList={targetAudienceFilters.filter(f => f.value !== '-')}
            placeHolder={targetAudienceFilters[targetAudienceId[eventData.target_audience ?? '-']] || { label: 'Select audience' }}
            onSelection={(value: TargetAudience) => { setEventData({ ...eventData!, target_audience: value }) }}
          />
          <Button className="bg-red-400 hover:bg-red-500 cursor-pointer" onClick={handleDeleteEvent}>Delete event</Button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button className="bg-green-400 hover:bg-green-500 cursor-pointer" onClick={handleUpdateEvent}>Apply</Button>
            <Button className="bg-blue-400 hover:bg-blue-500 cursor-pointer" onClick={onClose}>Cancel</Button>
          </div>
        </DialogContent>
      </DialogContent>
    </Dialog>
  )
}
