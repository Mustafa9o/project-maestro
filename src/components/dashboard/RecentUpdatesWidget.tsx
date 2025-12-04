import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const updates = [
  {
    id: 1,
    user: "Jane Green",
    avatar: "JG",
    color: "bg-chart-green",
    type: "System / widgets",
    message:
      "We will activate the new widgets and templates at the same time when we launch the new update, this is...",
    time: "30 days ago",
  },
  {
    id: 2,
    user: "John Smith",
    avatar: "JS",
    color: "bg-chart-blue",
    type: "Fitness Project / UI",
    message:
      "Finished the new UI for the new extension, is there anything to modify? @Mary Clark.",
    time: "15 days ago",
  },
];

export function RecentUpdatesWidget() {
  return (
    <Card className="card-shadow-md animate-fade-in">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
            <MessageSquare className="w-4 h-4" />
            Recent Update
          </CardTitle>
          <span className="text-sm font-bold text-foreground">52</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {updates.map((update) => (
          <div key={update.id} className="space-y-2">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarFallback className={`${update.color} text-white text-[10px]`}>
                  {update.avatar}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium text-foreground">
                {update.user}
              </span>
              <span className="text-[10px] text-muted-foreground ml-auto">
                {update.time}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-chart-purple font-medium">
                {update.type}
              </span>
              <p className="text-xs text-muted-foreground line-clamp-2">
                {update.message}
              </p>
            </div>
          </div>
        ))}

        <div className="mt-4 text-center">
          <span className="text-sm font-medium text-foreground">Recent Updates</span>
        </div>
      </CardContent>
    </Card>
  );
}
