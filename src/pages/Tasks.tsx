import { useState } from "react";
import {
  Settings2,
  Users,
  Settings,
  Eye,
  Search,
  Download,
  Plus,
  MoreHorizontal,
  ChevronDown,
  FileText,
  Building2,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface Task {
  id: string;
  title: string;
  subtasks: number;
  assignees: string[];
  status: "completed" | "pending" | "in-progress" | "overdue";
  statusLabel: string;
  dueDate?: string;
  hasFile?: boolean;
}

interface TaskGroup {
  id: string;
  name: string;
  color: string;
  tasks: Task[];
}

const taskGroups: TaskGroup[] = [
  {
    id: "governance",
    name: "Governance & Compliance (Policies & Procedures)",
    color: "bg-chart-purple",
    tasks: [
      {
        id: "1",
        title: "Complete first phase of compliance assurance project",
        subtasks: 0,
        assignees: ["JD", "MS"],
        status: "pending",
        statusLabel: "Before December",
      },
      {
        id: "2",
        title: "Service policy for legal affairs department",
        subtasks: 0,
        assignees: ["AB", "CD"],
        status: "completed",
        statusLabel: "Done",
        hasFile: true,
      },
      {
        id: "3",
        title: "Account opening file review policy",
        subtasks: 0,
        assignees: ["EF"],
        status: "pending",
        statusLabel: "Before December",
        hasFile: true,
      },
      {
        id: "4",
        title: "Complete internal work organization regulation",
        subtasks: 0,
        assignees: [],
        status: "overdue",
        statusLabel: "Before December",
        dueDate: "27-Nov - 27-Nov",
        hasFile: true,
      },
    ],
  },
  {
    id: "issues",
    name: "Issues - Najiz",
    color: "bg-chart-red",
    tasks: [
      {
        id: "5",
        title: "Update Iraq agency with registration agent notes",
        subtasks: 0,
        assignees: ["GH"],
        status: "completed",
        statusLabel: "Done",
      },
    ],
  },
];

const viewTabs = [
  { id: "task", label: "Task", active: true },
  { id: "files", label: "Files" },
  { id: "kanban", label: "Kanban" },
  { id: "gantt", label: "Gantt" },
  { id: "chart", label: "Chart" },
  { id: "mind-map", label: "Mind Map" },
  { id: "forms", label: "Forms" },
];

export default function Tasks() {
  const [expandedGroups, setExpandedGroups] = useState<string[]>(["governance", "issues"]);

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) =>
      prev.includes(groupId)
        ? prev.filter((id) => id !== groupId)
        : [...prev, groupId]
    );
  };

  const getStatusStyles = (status: Task["status"]) => {
    switch (status) {
      case "completed":
        return "bg-status-completed text-white";
      case "pending":
        return "bg-status-pending text-white";
      case "in-progress":
        return "bg-status-in-progress text-white";
      case "overdue":
        return "bg-status-overdue text-white";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">November - 2025</h1>
          <p className="text-sm text-muted-foreground">Add board description</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm hover:bg-muted transition-colors">
            <Settings2 className="w-4 h-4" />
            Automation
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm hover:bg-muted transition-colors">
            <Users className="w-4 h-4" />
            / 5
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm hover:bg-muted transition-colors">
            <Settings className="w-4 h-4" />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm hover:bg-muted transition-colors">
            <Building2 className="w-4 h-4" />
            Client
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm hover:bg-muted transition-colors">
            <Eye className="w-4 h-4" />
            Show Activity
          </button>
          <button className="p-2 rounded-lg border border-border hover:bg-muted transition-colors">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* View Tabs */}
      <div className="flex items-center gap-2">
        <button className="p-2 rounded-lg border border-border hover:bg-muted transition-colors">
          <Settings2 className="w-4 h-4" />
        </button>
        {viewTabs.map((tab) => (
          <button
            key={tab.id}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
              tab.active
                ? "bg-primary text-primary-foreground"
                : "border border-border hover:bg-muted"
            )}
          >
            {tab.label}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-2">
          <button className="p-2 rounded-lg border border-border hover:bg-muted transition-colors">
            <Search className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-lg border border-border hover:bg-muted transition-colors">
            <Download className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-lg border border-border hover:bg-muted transition-colors">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative h-12 bg-card rounded-lg card-shadow flex items-center px-6">
        <div className="absolute inset-x-6 top-1/2 h-0.5 bg-border" />
        {[...Array(7)].map((_, i) => (
          <div
            key={i}
            className="relative flex-1 flex justify-center"
          >
            <div className={cn(
              "w-4 h-4 rounded-full border-2 border-border bg-card z-10",
              i === 6 && "bg-chart-yellow border-chart-yellow"
            )} />
          </div>
        ))}
      </div>

      {/* Task Table */}
      <div className="bg-card rounded-lg card-shadow-md overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-[1fr,100px,100px,120px,140px,100px,60px,60px] gap-4 px-4 py-3 border-b border-border bg-muted/50 text-sm font-medium text-muted-foreground">
          <div className="flex items-center gap-2">
            <span>↗</span>
            Tasks
          </div>
          <div>Subtasks</div>
          <div>Assignees</div>
          <div>Status</div>
          <div>Due Date</div>
          <div>Time</div>
          <div>File</div>
          <div className="flex items-center justify-center">
            <Plus className="w-4 h-4" />
          </div>
        </div>

        {/* Task Groups */}
        {taskGroups.map((group) => (
          <div key={group.id}>
            {/* Group Header */}
            <button
              onClick={() => toggleGroup(group.id)}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted/50 transition-colors"
            >
              <ChevronDown
                className={cn(
                  "w-4 h-4 transition-transform",
                  !expandedGroups.includes(group.id) && "-rotate-90"
                )}
              />
              <span className={cn("w-6 h-6 rounded flex items-center justify-center", group.color)}>
                <MoreHorizontal className="w-4 h-4 text-white" />
              </span>
              <span className="font-medium text-foreground">{group.name}</span>
              <span className="text-sm text-muted-foreground">
                {group.tasks.filter(t => t.status === "completed").length}/{group.tasks.length} Tasks
              </span>
            </button>

            {/* Tasks */}
            {expandedGroups.includes(group.id) && (
              <div className="border-l-4" style={{ borderColor: `var(--${group.color.replace("bg-", "")})` }}>
                {group.tasks.map((task) => (
                  <div
                    key={task.id}
                    className="grid grid-cols-[1fr,100px,100px,120px,140px,100px,60px,60px] gap-4 px-4 py-3 border-b border-border hover:bg-muted/30 transition-colors items-center"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full border border-border flex items-center justify-center text-xs text-muted-foreground">
                        {task.subtasks}
                      </span>
                      <span className="text-sm text-foreground">{task.title}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Plus className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{task.subtasks}</span>
                    </div>
                    <div className="flex -space-x-2">
                      {task.assignees.map((assignee, i) => (
                        <Avatar key={i} className="h-6 w-6 border-2 border-card">
                          <AvatarFallback className="bg-chart-blue text-white text-[10px]">
                            {assignee}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                      {task.assignees.length > 2 && (
                        <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-[10px] text-muted-foreground border-2 border-card">
                          +{task.assignees.length - 2}
                        </span>
                      )}
                    </div>
                    <div>
                      <span className={cn(
                        "px-3 py-1 rounded-full text-xs font-medium",
                        getStatusStyles(task.status)
                      )}>
                        {task.statusLabel}
                      </span>
                    </div>
                    <div>
                      {task.dueDate && (
                        <span className="px-3 py-1 rounded bg-chart-green text-white text-xs">
                          {task.dueDate}
                        </span>
                      )}
                    </div>
                    <div>
                      <button className="p-1 rounded hover:bg-muted">
                        <Plus className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </div>
                    <div>
                      {task.hasFile && (
                        <button className="p-1 rounded hover:bg-muted">
                          <FileText className="w-4 h-4 text-chart-blue" />
                        </button>
                      )}
                    </div>
                    <div>
                      <button className="p-1 rounded hover:bg-muted">
                        <Building2 className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </div>
                  </div>
                ))}
                {/* Add Task Row */}
                <button className="w-full px-4 py-3 text-left text-sm text-muted-foreground hover:bg-muted/30 transition-colors">
                  Add new task
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
