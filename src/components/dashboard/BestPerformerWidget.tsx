import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function BestPerformerWidget() {
  return (
    <Card className="card-shadow-md animate-fade-in">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
          <Trophy className="w-4 h-4" />
          Best Performer
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <Avatar className="h-16 w-16 mx-auto mb-3 ring-4 ring-chart-yellow">
          <AvatarFallback className="bg-chart-blue text-white text-xl">
            AA
          </AvatarFallback>
        </Avatar>
        
        <h3 className="text-lg font-bold text-foreground">Ahmed Altaifi</h3>
        <p className="text-xs text-muted-foreground mb-4">Chief Technical Officer</p>

        <div className="flex items-center justify-center gap-1 mb-2">
          <Trophy className="w-4 h-4 text-chart-yellow" />
          <span className="text-sm text-foreground">
            <span className="font-bold">448</span>/500 Tasks Done
          </span>
        </div>

        <div className="w-full h-2 bg-muted rounded-full overflow-hidden mb-2">
          <div
            className="h-full bg-chart-orange"
            style={{ width: "89.6%" }}
          />
        </div>
        <span className="text-xs text-chart-green font-medium">95% Completed</span>

        <div className="mt-4 text-center">
          <span className="text-sm font-medium text-foreground">Best Performer</span>
        </div>
      </CardContent>
    </Card>
  );
}
