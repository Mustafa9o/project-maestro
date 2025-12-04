import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Completed", value: 120, color: "hsl(142, 76%, 36%)" },
  { name: "Working on it", value: 448, color: "hsl(48, 96%, 53%)" },
  { name: "Pending", value: 20, color: "hsl(25, 95%, 53%)" },
];

export function TaskStatusWidget() {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card className="card-shadow-md animate-fade-in">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
          <span className="w-5 h-5 rounded-full border border-muted-foreground flex items-center justify-center text-xs">
            ✓
          </span>
          Tasks Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <div className="relative w-32 h-32">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={35}
                  outerRadius={55}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-foreground">{total}</span>
              <span className="text-[10px] text-muted-foreground">Total Task</span>
            </div>
          </div>
          
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">65% Completed</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-status-completed" style={{ width: "65%" }} />
            </div>
            
            <div className="grid grid-cols-3 gap-2 mt-4">
              <div className="text-center">
                <p className="text-lg font-bold text-foreground">120</p>
                <p className="text-[10px] text-muted-foreground">Completed</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-foreground">448</p>
                <p className="text-[10px] text-muted-foreground">Working on it</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-foreground">20</p>
                <p className="text-[10px] text-muted-foreground">Pending</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 text-center">
          <span className="text-sm font-medium text-foreground">Task Status</span>
        </div>
      </CardContent>
    </Card>
  );
}
