import { TEvent } from "@/app/types/event";
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import EventImage from "./EventImage";

export default function EventCard({ event }: { event: TEvent }) {
  const formatDate = (date: string | Date) => {
    const dateObject = typeof date === "string" ? new Date(date) : date;
    return dateObject.toLocaleDateString("en-UK", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Card className="h-[24rem] w-full cursor-pointer rounded-xl bg-white">
      <CardHeader>
        <CardTitle className="line-clamp-2 text-lg font-bold">
          {event.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center">
          <span className="w-16 text-xs font-medium text-gray-500">Date:</span>
          <span className="text-sm text-gray-700">
            {event.dates ? formatDate(event.dates) : "N/A"}
          </span>
        </div>
        <div className="flex items-center">
          <span className="w-16 text-xs font-medium text-gray-500">
            Location:
          </span>
          <span className="truncate text-sm text-gray-700">
            {event.location || "N/A"}
          </span>
        </div>
        {event.description && (
          <div className="mt-3">
            <p className="line-clamp-3 text-xs text-gray-600">
              {event.description}
            </p>
          </div>
        )}
        <div className="mt-3">
          <EventImage id={event.id} />
        </div>
      </CardContent>
    </Card>
  );
}
