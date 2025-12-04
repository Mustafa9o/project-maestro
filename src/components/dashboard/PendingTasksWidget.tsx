import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";
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
  },
  {
    id: 2,
    user: "John Smith",
    avatar: "JS",
    color: "bg-chart-blue",
    project: "Eyenak / App Design",
    task: "Android App Test",
    time: "15 days ago",
  },
];

export function PendingTasksWidget() {
  return (
    <Card className="card-shadow-md animate-fade-in">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
            <Clock className="w-4 h-4" />
            Pending Tasks
          </CardTitle>
          <span className="text-sm font-bold text-foreground">448</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {tasks.map((task) => (
          <div key={task.id} className="space-y-1">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarFallback className={`${task.color} text-white text-[10px]`}>
                  {task.avatar}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium text-foreground">
                {task.user}
              </span>
              <span className="text-[10px] text-muted-foreground ml-auto">
                {task.time}
              </span>
            </div>
            <div className="ml-8">
              <p className="text-[10px] text-chart-orange">{task.project}</p>
              <p className="text-xs text-foreground bg-chart-orange/20 px-2 py-1 rounded mt-1">
                {task.task}
              </p>
            </div>
          </div>
        ))}

        <div className="mt-4 text-center">
          <span className="text-sm font-medium text-foreground">Pending Task</span>
        </div>
      </CardContent>
    </Card>
  );
}
