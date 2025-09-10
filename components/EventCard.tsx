import { TEvent } from "@/app/types/event"
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card"
import EventImage from "./EventImage";

export default function EventCard({ event }: { event: TEvent }) {

  const formatDate = (date: string | Date) => {
    const dateObject = typeof date === 'string' ? new Date(date) : date;
    return dateObject.toLocaleDateString('en-UK', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
  <Card className='h-80 w-full transform cursor-pointer rounded-xl border border-gray-200 bg-white p-4 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl'>
    <CardHeader className="pb-2">
      <CardTitle className="line-clamp-2 h-14 text-lg font-bold text-gray-900">
        {event.name}
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-3">
      <div className="space-y-2">
        <div className="flex items-center">
          <span className="w-16 text-xs font-medium text-gray-500">Date:</span>
          <span className="text-sm text-gray-700">
          {event.dates ? formatDate(event.dates) : 'N/A'}
          </span>
        </div>
        <div className="flex items-center">
          <span className="w-16 text-xs font-medium text-gray-500">Location:</span>
          <span className="truncate text-sm text-gray-700">
            {event.location || 'N/A'}
          </span>
        </div>
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
  )
}