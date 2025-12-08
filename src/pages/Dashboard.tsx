import { Edit2, Printer, Maximize2 } from "lucide-react";
import { DashboardTabs } from "@/components/dashboard/DashboardTabs";
import { TaskStatusWidget } from "@/components/dashboard/TaskStatusWidget";
import { EventCalendarWidget } from "@/components/dashboard/EventCalendarWidget";
import { RecentUpdatesWidget } from "@/components/dashboard/RecentUpdatesWidget";
import { NewTasksWidget } from "@/components/dashboard/NewTasksWidget";
import { PendingTasksWidget } from "@/components/dashboard/PendingTasksWidget";
import { TodoListWidget } from "@/components/dashboard/TodoListWidget";
import { ProjectStatusWidget } from "@/components/dashboard/ProjectStatusWidget";
import { BoardDeadlineWidget } from "@/components/dashboard/BoardDeadlineWidget";
import { BestPerformerWidget } from "@/components/dashboard/BestPerformerWidget";

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <Edit2 className="w-4 h-4" />
            Customize
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg border border-border hover:bg-muted transition-colors">
            <Printer className="w-5 h-5 text-muted-foreground" />
          </button>
          <button className="p-2 rounded-lg border border-border hover:bg-muted transition-colors">
            <Maximize2 className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <DashboardTabs />

      {/* Welcome Section */}
      <div className="flex items-center gap-3 p-4 bg-card rounded-lg card-shadow">
        <span className="text-2xl">✨</span>
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            Start building your dashboard!
          </h2>
          <p className="text-sm text-muted-foreground">
            Pick your first widget to start
          </p>
        </div>
      </div>

      {/* Widgets Grid - Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        <TaskStatusWidget />
        <EventCalendarWidget />
        <RecentUpdatesWidget />
        <NewTasksWidget />
        <PendingTasksWidget />
      </div>

      {/* Widgets Grid - Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        <TodoListWidget />
        <ProjectStatusWidget />
        <BoardDeadlineWidget />
        <BestPerformerWidget />
        <div className="bg-card rounded-lg p-4 card-shadow-md h-full flex flex-col items-center justify-center text-muted-foreground border border-dashed border-border">
          <p className="text-sm">+ Add Widget</p>
        </div>
      </div>
    </div>
  );
}
