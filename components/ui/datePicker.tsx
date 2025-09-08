"use client";

import { DatePicker } from "@mantine/dates";
import { useState } from "react";
import { Card } from "./card";

export function DatePickerEvent({
  date = "",
  onSelectAction
}: {
  date?: string | null;
  onSelectAction: (value: string) => void;
}) {
  const [selectedDate, setSelectedDate] = useState<Date | string | null>(date);

  const handleDateChange = (newDate: Date | string | null) => {
    setSelectedDate(newDate);
    if (newDate) {
      if (newDate instanceof Date) {
        onSelectAction(newDate.toISOString());
      } else {
        onSelectAction(newDate);
      }
    }
  };

  return (
    <Card className="w-fit">
      <DatePicker
        value={selectedDate}
        onChange={handleDateChange}
      />
    </Card>
  );
}
