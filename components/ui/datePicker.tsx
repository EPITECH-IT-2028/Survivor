"use client";

import { useState } from "react";
import { Card } from "./card";
import { Calendar } from "./calendar";

export function DatePickerEvent({
  date,
  onSelectAction
}: {
  date?: Date;
  onSelectAction: (value: Date) => void;
}) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(date);

  const handleDateChange = (newDate: Date) => {
    setSelectedDate(newDate);
    if (newDate) {
      onSelectAction(newDate);
    }
  };

  console.log(selectedDate);
  return (
    <Card className="w-fit h-full">
      <Calendar
        captionLayout="dropdown"
        defaultMonth={selectedDate ?? undefined}
        onDayClick={handleDateChange}
      />
    </Card>
  );
}
