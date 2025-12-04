import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, MoreHorizontal, Clock } from "lucide-react";

export function BoardDeadlineWidget() {
  return (
    <Card className="card-shadow-md animate-fade-in">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
            <Target className="w-4 h-4" />
            Board Deadline
          </CardTitle>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Drdsh</span>
            <button className="p-1 rounded hover:bg-muted">
              <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Progress Bar */}
        <div className="h-24 flex items-end gap-1 mb-4">
          <div className="flex-1 bg-chart-green rounded-t h-full" />
          <div className="flex-1 bg-chart-green rounded-t h-[90%]" />
          <div className="flex-1 bg-chart-green rounded-t h-[95%]" />
        </div>

        <div className="text-center mb-4">
          <span className="text-lg font-bold text-foreground">95% Completed</span>
        </div>

        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Target className="w-3 h-3" />
            <span>Project Deadline</span>
          </div>
          <div className="flex items-center gap-1 text-chart-orange">
            <Clock className="w-3 h-3" />
            <span>Time Left</span>
          </div>
        </div>
        <div className="flex items-center justify-between text-xs mt-1">
          <span className="text-foreground font-medium">20 May - 18 June, 2021</span>
          <span className="text-chart-orange font-medium">94 days 18 hrs</span>
        </div>

        <div className="mt-4 text-center">
          <span className="text-sm font-medium text-foreground">Board Deadline</span>
        </div>
      </CardContent>
    </Card>
  );
}
