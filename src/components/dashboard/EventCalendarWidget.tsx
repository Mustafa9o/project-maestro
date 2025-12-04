import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Calendar, Grid3X3, List } from "lucide-react";

const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
const dates = [
  [null, null, null, null, 1, 2, 3],
  [4, 5, 6, 7, 8, 9, 10],
  [11, 12, 13, 14, 15, 16, 17],
  [18, 19, 20, 21, 22, 23, 24],
  [25, 26, 27, 28, 29, 30, null],
];

export function EventCalendarWidget() {
  return (
    <Card className="card-shadow-md animate-fade-in">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4" />
            Event Calendar
          </CardTitle>
          <div className="flex items-center gap-1">
            <button className="p-1 rounded hover:bg-muted">
              <Calendar className="w-4 h-4 text-muted-foreground" />
            </button>
            <button className="p-1 rounded hover:bg-muted">
              <Grid3X3 className="w-4 h-4 text-muted-foreground" />
            </button>
            <span className="relative">
              <List className="w-4 h-4 text-muted-foreground" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-chart-red text-white text-[8px] rounded-full flex items-center justify-center">
                2
              </span>
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-3">
          <button className="p-1 rounded hover:bg-muted">
            <ChevronLeft className="w-4 h-4 text-muted-foreground" />
          </button>
          <span className="text-sm font-medium">April, 2020</span>
          <button className="p-1 rounded hover:bg-muted">
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* Days Header */}
        <div className="grid grid-cols-7 gap-1 mb-1">
          {days.map((day) => (
            <div
              key={day}
              className={`text-center text-[10px] font-medium py-1 ${
                day === "SAT" || day === "SUN"
                  ? "text-chart-blue"
                  : "text-muted-foreground"
              }`}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {dates.flat().map((date, index) => (
            <div
              key={index}
              className={`text-center text-xs py-1.5 rounded ${
                date === 11
                  ? "bg-chart-blue text-white font-medium"
                  : date
                  ? "text-foreground hover:bg-muted cursor-pointer"
                  : ""
              }`}
            >
              {date}
            </div>
          ))}
        </div>

        <div className="mt-4 text-center">
          <span className="text-sm font-medium text-foreground">Event Calendar</span>
        </div>
      </CardContent>
    </Card>
  );
}
