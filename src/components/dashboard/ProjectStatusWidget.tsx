import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, MoreHorizontal } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Completed", value: 35, color: "hsl(142, 76%, 36%)" },
  { name: "In Progress", value: 25, color: "hsl(217, 91%, 60%)" },
  { name: "Pending", value: 20, color: "hsl(48, 96%, 53%)" },
  { name: "On Hold", value: 20, color: "hsl(220, 10%, 70%)" },
];

export function ProjectStatusWidget() {
  return (
    <Card className="card-shadow-md animate-fade-in">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
            <BarChart3 className="w-4 h-4" />
            Project Status
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
        <div className="relative w-full h-40">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={70}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 text-center">
          <span className="text-sm font-medium text-foreground">Project Status</span>
        </div>
      </CardContent>
    </Card>
  );
}
