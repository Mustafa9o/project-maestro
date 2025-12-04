import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const tasks = [
  {
    id: 1,
    user: "Jane Green",
    avatar: "JG",
    color: "bg-chart-green",
    project: "Eyenak / App Design",
    task: "iOS App test",
    time: "30 days ago",
    statusColor: "bg-chart-orange",
  },
  {
    id: 2,
    user: "John Smith",
    avatar: "JS",
    color: "bg-chart-blue",
    project: "Eyenak / App Design",
    task: "Android App Test",
    time: "15 days ago",
    statusColor: "bg-chart-green",
  },
];

export function NewTasksWidget() {
  return (
    <Card className="card-shadow-md animate-fade-in">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
            <FileText className="w-4 h-4" />
            New Tasks
          </CardTitle>
          <span className="text-sm font-bold text-foreground">12</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
          >
            <Avatar className="h-8 w-8 mt-0.5">
              <AvatarFallback className={`${task.color} text-white text-xs`}>
                {task.avatar}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground truncate">
                  {task.user}
                </span>
                <span className="text-[10px] text-muted-foreground">
                  {task.time}
                </span>
              </div>
              <p className="text-[10px] text-chart-orange">{task.project}</p>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-xs text-foreground">{task.task}</p>
                <span className={`w-2 h-2 rounded-full ${task.statusColor}`} />
              </div>
            </div>
          </div>
        ))}

        <div className="mt-4 text-center">
          <span className="text-sm font-medium text-foreground">New Tasks</span>
        </div>
      </CardContent>
    </Card>
  );
}
