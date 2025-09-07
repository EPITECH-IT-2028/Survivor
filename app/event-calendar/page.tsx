"use client"

import { useState, useEffect} from "react"
import { TEvent } from "@/app/types/event"
import { getEvents } from "@/app/hooks/events/getEvents"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Card, CardTitle, CardHeader } from "@/components/ui/card"

export default function Event() {
  const [eventInfo, setEventInfo] = useState<TEvent[]>([])

  useEffect(() => {
    const fetchEvent = async () => {
      const event = await getEvents();
      setEventInfo(event);
    };
    fetchEvent();
  }, []);

  return (
    <div>
      <Carousel>
        <CarouselContent>
          {
            eventInfo.map((value) => (
              <CarouselItem key={value.id}>
                <Card className='h-64 w-full transform rounded-xl border border-gray-200 p-4 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer bg-white'>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-bold text-gray-900 line-clamp-2 h-14">
                    {value.name}
                  </CardTitle>
                </CardHeader>
                </Card>
              </CarouselItem>
            ))
          }
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}