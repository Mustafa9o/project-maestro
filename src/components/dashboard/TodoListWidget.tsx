import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckSquare, Edit2 } from "lucide-react";

const todos = [
  {
    id: 1,
    text: "bbcb: I've done the translation, Kindly check the update at I've done the translation, Kindly check the update at",
    done: false,
  },
  {
    id: 2,
    text: "bbcb: I've done the translation, Kindly check.",
    done: false,
  },
];

export function TodoListWidget() {
  return (
    <Card className="card-shadow-md animate-fade-in">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
            <CheckSquare className="w-4 h-4" />
            To Do List
          </CardTitle>
          <span className="text-sm font-bold text-foreground">448</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="flex items-start gap-2 p-2 rounded-lg bg-chart-green/20"
          >
            <span className="w-5 h-5 rounded-full bg-chart-green text-white flex items-center justify-center text-[10px] mt-0.5">
              ✓
            </span>
            <p className="flex-1 text-xs text-foreground line-clamp-2">
              {todo.text}
            </p>
            <button className="p-1 rounded hover:bg-muted">
              <Edit2 className="w-3 h-3 text-muted-foreground" />
            </button>
          </div>
        ))}

        <div className="mt-4 text-center">
          <span className="text-sm font-medium text-foreground">To-do List</span>
        </div>
      </CardContent>
    </Card>
  );
}
