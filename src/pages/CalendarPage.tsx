import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ChevronLeft,
  ChevronRight,
  Link as LinkIcon,
  Calendar as CalendarIcon,
} from "lucide-react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  startOfWeek,
  endOfWeek,
  addDays,
  isWeekend,
} from "date-fns";

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  time: string;
  color: string;
}

const mockEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "Legal Affairs Meeting",
    date: new Date(2025, 11, 1),
    time: "12:45 pm",
    color: "bg-chart-blue",
  },
  {
    id: "2",
    title: "Training Session",
    date: new Date(2025, 11, 2),
    time: "12:00 am",
    color: "bg-chart-red",
  },
  {
    id: "3",
    title: "HR Department Meeting",
    date: new Date(2025, 11, 2),
    time: "11:00 am",
    color: "bg-chart-blue",
  },
  {
    id: "4",
    title: "Training & Development",
    date: new Date(2025, 11, 2),
    time: "1:00 pm",
    color: "bg-chart-blue",
  },
  {
    id: "5",
    title: "University Staff Meeting",
    date: new Date(2025, 11, 3),
    time: "11:00 am",
    color: "bg-chart-blue",
  },
];

type ViewType = "Month" | "Week" | "Day" | "List";

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 11, 1));
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date(2025, 11, 1));
  const [viewType, setViewType] = useState<ViewType>("Month");

  const goToPrevious = () => {
    if (viewType === "Month") {
      setCurrentDate(subMonths(currentDate, 1));
    } else if (viewType === "Week") {
      setCurrentDate(addDays(currentDate, -7));
    } else {
      setCurrentDate(addDays(currentDate, -1));
    }
  };

  const goToNext = () => {
    if (viewType === "Month") {
      setCurrentDate(addMonths(currentDate, 1));
    } else if (viewType === "Week") {
      setCurrentDate(addDays(currentDate, 7));
    } else {
      setCurrentDate(addDays(currentDate, 1));
    }
  };

  const goToToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
  };

  const getEventsForDate = (date: Date) => {
    return mockEvents.filter((event) => isSameDay(event.date, date));
  };

  const renderMonthView = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });
    const days = eachDayOfInterval({ start: startDate, end: endDate });

    const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    return (
      <div className="flex-1 border rounded-lg overflow-hidden bg-card">
        <div className="grid grid-cols-7 border-b">
          {weekDays.map((day) => (
            <div
              key={day}
              className="p-3 text-center text-sm font-medium text-muted-foreground border-r last:border-r-0"
            >
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 auto-rows-fr">
          {days.map((day, idx) => {
            const events = getEventsForDate(day);
            const isCurrentMonth = isSameMonth(day, currentDate);
            const isToday = isSameDay(day, new Date());
            const isSelected = selectedDate && isSameDay(day, selectedDate);
            const isWeekendDay = isWeekend(day);

            return (
              <div
                key={idx}
                onClick={() => setSelectedDate(day)}
                className={`min-h-24 p-2 border-r border-b last:border-r-0 cursor-pointer hover:bg-muted/50 transition-colors
                  ${!isCurrentMonth ? "text-muted-foreground/50" : ""}
                  ${isWeekendDay ? "bg-note-yellow/30" : ""}
                  ${isSelected ? "bg-primary/10" : ""}
                `}
              >
                <div
                  className={`text-sm font-medium mb-1 ${
                    isToday
                      ? "w-6 h-6 rounded-full bg-chart-blue text-white flex items-center justify-center"
                      : ""
                  }`}
                >
                  {format(day, "d")}
                </div>
                <div className="space-y-1">
                  {events.slice(0, 3).map((event) => (
                    <div
                      key={event.id}
                      className="text-xs truncate flex items-center gap-1"
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${event.color}`}
                      />
                      <span className="truncate">
                        {event.time} {event.title}
                      </span>
                    </div>
                  ))}
                  {events.length > 3 && (
                    <div className="text-xs text-muted-foreground">
                      +{events.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderDayView = () => {
    const hours = Array.from({ length: 18 }, (_, i) => i + 6); // 6am to 11pm
    const events = getEventsForDate(currentDate);

    return (
      <div className="flex-1 border rounded-lg overflow-hidden bg-card">
        <div className="p-3 border-b text-center font-medium">
          {format(currentDate, "EEEE")}
        </div>
        <ScrollArea className="h-[600px]">
          <div className="divide-y">
            <div className="p-3 text-sm text-muted-foreground">all-day</div>
            {hours.map((hour) => {
              const hourEvents = events.filter((e) => {
                const eventHour = parseInt(e.time.split(":")[0]);
                const isPM = e.time.includes("pm");
                const hour24 = isPM && eventHour !== 12 ? eventHour + 12 : eventHour;
                return hour24 === hour;
              });

              return (
                <div
                  key={hour}
                  className="flex min-h-16 border-b hover:bg-muted/30"
                >
                  <div className="w-16 p-2 text-sm text-muted-foreground text-right pr-4">
                    {hour === 12
                      ? "12pm"
                      : hour > 12
                      ? `${hour - 12}pm`
                      : `${hour}am`}
                  </div>
                  <div className="flex-1 p-2">
                    {hourEvents.map((event) => (
                      <div
                        key={event.id}
                        className="p-2 rounded bg-muted/50 mb-1"
                      >
                        <div className="flex items-center gap-2 text-sm">
                          <span className={`w-2 h-2 rounded-full ${event.color}`} />
                          <span className="font-medium">{event.time}</span>
                          <span>{event.title}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </div>
    );
  };

  const renderListView = () => {
    return (
      <div className="flex-1 border rounded-lg overflow-hidden bg-card">
        <ScrollArea className="h-[600px]">
          <div className="divide-y">
            {mockEvents.map((event) => (
              <div
                key={event.id}
                className="p-4 flex items-center gap-4 hover:bg-muted/50"
              >
                <div className="text-sm text-muted-foreground w-24">
                  {format(event.date, "MMM d, yyyy")}
                </div>
                <div className="flex items-center gap-2 flex-1">
                  <span className={`w-3 h-3 rounded-full ${event.color}`} />
                  <span className="font-medium">{event.time}</span>
                  <span>{event.title}</span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    );
  };

  return (
    <div className="flex h-full">
      {/* Left Sidebar - Mini Calendar */}
      <div className="w-64 bg-card border-r p-4 space-y-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => setCurrentDate(subMonths(currentDate, 1))}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <div className="flex-1 text-center">
            <span className="text-sm font-medium">{format(currentDate, "MMM")}</span>
            <span className="text-sm text-muted-foreground ml-2">
              {format(currentDate, "yyyy")}
            </span>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setCurrentDate(addMonths(currentDate, 1))}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          month={currentDate}
          onMonthChange={setCurrentDate}
          className="rounded-md border"
        />

        <div className="space-y-2">
          <h3 className="font-semibold text-sidebar-bg">Upcoming Events</h3>
          <div className="text-center py-8">
            <CalendarIcon className="w-12 h-12 mx-auto text-note-yellow mb-2" />
            <p className="text-sm text-sidebar-bg font-medium">No event found!</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={goToPrevious}
              className="bg-chart-blue text-white hover:bg-chart-blue/90"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={goToNext}
              className="bg-chart-blue text-white hover:bg-chart-blue/90"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
            <Button
              variant="default"
              onClick={goToToday}
              className="bg-chart-blue hover:bg-chart-blue/90"
            >
              Today
            </Button>
            <Button variant="outline" className="relative">
              Pending Invitations
              <Badge className="absolute -top-2 -right-2 bg-chart-red text-white h-5 w-5 p-0 flex items-center justify-center text-xs">
                1
              </Badge>
            </Button>
            <Button variant="outline">Private Calendar</Button>
            <Button variant="outline" size="icon">
              <LinkIcon className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold">
              {viewType === "Day"
                ? format(currentDate, "d MMMM yyyy")
                : format(currentDate, "MMMM yyyy")}
            </h2>
            <div className="flex border rounded-lg overflow-hidden">
              {(["Month", "Week", "Day", "List"] as ViewType[]).map((view) => (
                <Button
                  key={view}
                  variant={viewType === view ? "default" : "ghost"}
                  className={`rounded-none ${
                    viewType === view
                      ? "bg-chart-blue text-white"
                      : "hover:bg-muted"
                  }`}
                  onClick={() => setViewType(view)}
                >
                  {view}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Calendar View */}
        {viewType === "Month" && renderMonthView()}
        {viewType === "Day" && renderDayView()}
        {viewType === "Week" && renderMonthView()}
        {viewType === "List" && renderListView()}
      </div>
    </div>
  );
}
