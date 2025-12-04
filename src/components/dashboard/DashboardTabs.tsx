import { cn } from "@/lib/utils";

interface Tab {
  id: string;
  label: string;
  count?: number;
  active?: boolean;
}

const tabs: Tab[] = [
  { id: "dashboard", label: "Dashboard", active: true },
  { id: "task-update", label: "Task Update", count: 99 },
  { id: "favourite", label: "Favourite" },
  { id: "posts", label: "Posts" },
  { id: "new-tasks", label: "New Tasks" },
  { id: "pending-tasks", label: "Pending Tasks", count: 18 },
  { id: "lapsed-tasks", label: "Lapsed Tasks", count: 6 },
  { id: "active-timers", label: "Active Timers" },
];

export function DashboardTabs() {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={cn(
            "relative flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors",
            tab.active
              ? "bg-primary text-primary-foreground"
              : "bg-card text-foreground border border-border hover:bg-muted"
          )}
        >
          {tab.label}
          {tab.count && (
            <span
              className={cn(
                "absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] flex items-center justify-center text-[10px] font-bold rounded-full",
                tab.active
                  ? "bg-chart-red text-white"
                  : "bg-chart-red text-white"
              )}
            >
              {tab.count > 99 ? "99+" : tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
