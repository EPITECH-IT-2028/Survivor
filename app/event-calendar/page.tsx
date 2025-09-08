"use client"

import { useState, useEffect} from "react"
import { TEvent } from "@/app/types/event"
import { getEvents } from "@/app/hooks/events/getEvents"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import EventCard from "@/components/EventCard"

export default function Event() {
  const [eventInfo, setEventInfo] = useState<TEvent[]>([])

  useEffect(() => {
    const fetchEvent = async () => {
      const event = await getEvents();
      setEventInfo(event);
    };
    fetchEvent();
  }, []);

  const workshops = eventInfo.filter(event => event.event_type?.toLowerCase() === 'workshop')
  const conferences = eventInfo.filter(event => event.event_type?.toLowerCase() === 'conference')
  const pitchSessions = eventInfo.filter(event => event.event_type?.toLowerCase() === 'pitch session')

  return (
    <div className="space-y-8 p-6">
      {workshops.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Workshops</h2>
          <Carousel className="w-full max-w-7xl mx-auto">
            <CarouselContent className="-ml-1">
              {workshops.map((event) => (
                <CarouselItem key={event.id} className="pl-1 md:basis-1/2 lg:basis-1/3">
                  <EventCard event={event} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      )}

      {conferences.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Conferences</h2>
          <Carousel className="w-full max-w-7xl mx-auto">
            <CarouselContent className="-ml-1">
              {conferences.map((event) => (
                <CarouselItem key={event.id} className="pl-1 md:basis-1/2 lg:basis-1/3">
                  <EventCard event={event} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      )}

      {pitchSessions.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Pitch Sessions</h2>
          <Carousel className="w-full max-w-7xl mx-auto">
            <CarouselContent className="-ml-1">
              {pitchSessions.map((event) => (
                <CarouselItem key={event.id} className="pl-1 md:basis-1/2 lg:basis-1/3">
                  <EventCard event={event} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      )}
    </div>
  )
}