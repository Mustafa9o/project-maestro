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
  MessageSquare,
  Link2,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface Task {
  id: string;
  title: string;
  subtasksCount: number;
  subtasksCompleted: number;
  assignees: { initials: string; color: string }[];
  status: "completed" | "pending" | "in-progress" | "overdue";
  statusLabel: string;
  dueDate?: string;
  dateRange?: string;
  hasFile?: boolean;
  hasComments?: boolean;
}

interface TaskGroup {
  id: string;
  name: string;
  color: string;
  completedCount: number;
  totalCount: number;
  tasks: Task[];
}

const taskGroups: TaskGroup[] = [
  {
    id: "recruitment",
    name: "استقدام ونقل عمالة",
    color: "#E91E63",
    completedCount: 11,
    totalCount: 14,
    tasks: [
      {
        id: "1",
        title: "استقدام موظفين الباكستان",
        subtasksCount: 4,
        subtasksCompleted: 0,
        assignees: [{ initials: "MA", color: "bg-teal-500" }],
        status: "in-progress",
        statusLabel: "جاري العمل",
        dueDate: "23 Oct, 2025",
      },
      {
        id: "2",
        title: "تعيين موظفين أبدال",
        subtasksCount: 1,
        subtasksCompleted: 1,
        assignees: [{ initials: "MA", color: "bg-teal-500" }],
        status: "completed",
        statusLabel: "تم",
        dateRange: "20-Oct - 30-Oct",
      },
      {
        id: "3",
        title: "احتساب نسبة الموظفين الذين عليهم تأمين صحي والمطابقة",
        subtasksCount: 1,
        subtasksCompleted: 0,
        assignees: [{ initials: "", color: "bg-gray-400" }],
        status: "completed",
        statusLabel: "تم",
      },
      {
        id: "4",
        title: "عمل اتفاقيات عدم افصاح 6 موظفين",
        subtasksCount: 0,
        subtasksCompleted: 0,
        assignees: [{ initials: "", color: "bg-gray-400" }],
        status: "completed",
        statusLabel: "تم",
      },
      {
        id: "5",
        title: "ترتيب مقابلات عذا الساعة 12 الظهر لسكرتر مدير التنفيذي بعد الفرز",
        subtasksCount: 0,
        subtasksCompleted: 0,
        assignees: [{ initials: "", color: "bg-gray-400" }],
        status: "completed",
        statusLabel: "تم",
      },
      {
        id: "6",
        title: "عمل تأمين طبي ل36 موظف والتأكد من اصدارها",
        subtasksCount: 0,
        subtasksCompleted: 0,
        assignees: [{ initials: "", color: "bg-gray-400" }],
        status: "completed",
        statusLabel: "تم",
      },
      {
        id: "7",
        title: "تأمين طبي لموظفين في ملكف الأكسل الجديد",
        subtasksCount: 0,
        subtasksCompleted: 0,
        assignees: [{ initials: "", color: "bg-gray-400" }],
        status: "completed",
        statusLabel: "تم",
      },
      {
        id: "8",
        title: "التأكد من اصدار الفيزا الى استاذ عبداللطيف",
        subtasksCount: 2,
        subtasksCompleted: 0,
        assignees: [{ initials: "", color: "bg-gray-400" }],
        status: "completed",
        statusLabel: "تم",
      },
    ],
  },
  {
    id: "dues",
    name: "مخالصات وصرف مستحقات",
    color: "#9C27B0",
    completedCount: 2,
    totalCount: 2,
    tasks: [
      {
        id: "9",
        title: "مستحقات مختار",
        subtasksCount: 0,
        subtasksCompleted: 0,
        assignees: [],
        status: "completed",
        statusLabel: "تم",
      },
      {
        id: "10",
        title: "مخالصة مها الصعب",
        subtasksCount: 0,
        subtasksCompleted: 0,
        assignees: [],
        status: "completed",
        statusLabel: "تم",
      },
    ],
  },
  {
    id: "onboarding",
    name: "تهيئة الموظفين الجدد",
    color: "#FF5722",
    completedCount: 20,
    totalCount: 23,
    tasks: [
      {
        id: "11",
        title: "تجهيز نموذج وإرسال شهادة من حصول القمي على شهادة اختصاصي صحية",
        subtasksCount: 0,
        subtasksCompleted: 0,
        assignees: [{ initials: "", color: "bg-gray-400" }],
        status: "completed",
        statusLabel: "تم",
        dueDate: "18 Oct, 2025",
      },
      {
        id: "12",
        title: "ارسال ايميل بيانات الموظفين الجدد للمسؤول في الشركة",
        subtasksCount: 0,
        subtasksCompleted: 0,
        assignees: [{ initials: "MA", color: "bg-purple-500" }],
        status: "completed",
        statusLabel: "تم",
        dueDate: "13 Oct, 2025",
        dateRange: "06-Oct - 13-Oct",
      },
      {
        id: "13",
        title: "خطة تدريب وتأهيل للموظفين الجدد",
        subtasksCount: 0,
        subtasksCompleted: 0,
        assignees: [{ initials: "", color: "bg-purple-500" }],
        status: "completed",
        statusLabel: "تم",
        dueDate: "24 Oct, 2025",
        dateRange: "06-Oct - 16-Oct",
      },
    ],
  },
];

const viewTabs = [
  { id: "task", label: "Task", active: true },
  { id: "files", label: "Files", active: false },
  { id: "kanban", label: "Kanban", active: false },
  { id: "gantt", label: "Gantt", active: false },
  { id: "chart", label: "Chart", active: false },
  { id: "mind-map", label: "Mind Map", active: false },
  { id: "forms", label: "Forms", active: false },
];

const timelineSteps = [
  { id: 1, label: "مهام غير مصنفة", completed: false },
  { id: 2, label: "تهيئة الموظفين الجدد", completed: false },
  { id: 3, label: "استقدام ونقل عمالة", completed: true },
  { id: 4, label: "مخالصات وصرف مستحقات", completed: true },
];

export default function Tasks() {
  const [expandedGroups, setExpandedGroups] = useState<string[]>(["recruitment", "dues", "onboarding"]);
  const [activeTab, setActiveTab] = useState("task");

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
        return "bg-status-pending text-white";
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
          <h1 className="text-2xl font-bold text-foreground">أكتوبر</h1>
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
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
              activeTab === tab.id
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
      <div className="relative py-6 px-8 bg-card rounded-lg card-shadow">
        <div className="absolute inset-x-8 top-1/2 h-1 bg-gray-200 -translate-y-1/2" />
        <div className="relative flex items-center justify-between">
          {timelineSteps.map((step, i) => (
            <div key={step.id} className="flex flex-col items-center gap-2">
              <div
                className={cn(
                  "w-6 h-6 rounded-full border-4 z-10",
                  step.completed
                    ? "bg-status-completed border-status-completed"
                    : "bg-white border-gray-300"
                )}
              />
              <span className="text-xs text-muted-foreground text-center max-w-[120px]">
                {step.label}
              </span>
            </div>
          ))}
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 z-10">
              <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-yellow-500">
                <path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z" fill="currentColor" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Task Table */}
      <div className="bg-card rounded-lg card-shadow-md overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-[auto,1fr,100px,80px,100px,140px,100px,60px,60px] gap-2 px-4 py-3 border-b border-border bg-muted/50 text-sm font-medium text-muted-foreground">
          <div className="w-8" />
          <div className="flex items-center gap-2">
            <Link2 className="w-4 h-4" />
            Tasks
          </div>
          <div>Subtasks</div>
          <div>الأشخاص</div>
          <div>الحالة</div>
          <div>التاريخ</div>
          <div>الوقت</div>
          <div>ملف</div>
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
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted/50 transition-colors border-b border-border"
            >
              <ChevronDown
                className={cn(
                  "w-4 h-4 transition-transform",
                  !expandedGroups.includes(group.id) && "-rotate-90"
                )}
              />
              <span
                className="px-2 py-1 rounded text-white text-xs font-medium flex items-center gap-1"
                style={{ backgroundColor: group.color }}
              >
                <MoreHorizontal className="w-3 h-3" />
                {group.name}
              </span>
              <span className="text-sm text-muted-foreground">
                {group.completedCount}/{group.totalCount}
              </span>
              <span className="text-xs text-muted-foreground">Tasks</span>
            </button>

            {/* Tasks */}
            {expandedGroups.includes(group.id) && (
              <div
                className="border-l-4"
                style={{ borderLeftColor: group.color }}
              >
                {group.tasks.map((task) => (
                  <div
                    key={task.id}
                    className="grid grid-cols-[auto,1fr,100px,80px,100px,140px,100px,60px,60px] gap-2 px-4 py-3 border-b border-border hover:bg-muted/30 transition-colors items-center"
                  >
                    <div className="w-8 flex items-center justify-center">
                      <input type="checkbox" className="rounded border-gray-300" />
                    </div>
                    <div className="flex items-center gap-2 text-sm text-foreground">
                      {task.title}
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-xs text-muted-foreground bg-white">
                        {task.subtasksCount}
                      </span>
                      <span className="flex items-center gap-0.5 text-xs text-muted-foreground">
                        <Plus className="w-3 h-3" />
                        {task.subtasksCompleted}
                      </span>
                    </div>
                    <div className="flex -space-x-1">
                      {task.assignees.length > 0 ? (
                        task.assignees.map((assignee, i) => (
                          <Avatar key={i} className="h-7 w-7 border-2 border-white">
                            <AvatarFallback className={cn("text-white text-[10px]", assignee.color)}>
                              {assignee.initials || <MessageSquare className="w-3 h-3" />}
                            </AvatarFallback>
                          </Avatar>
                        ))
                      ) : (
                        <Avatar className="h-7 w-7 border-2 border-white">
                          <AvatarFallback className="bg-gray-300 text-gray-500">
                            <MessageSquare className="w-3 h-3" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                    <div>
                      <span
                        className={cn(
                          "px-3 py-1 rounded text-xs font-medium",
                          getStatusStyles(task.status)
                        )}
                      >
                        {task.statusLabel}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {task.dueDate && <span>{task.dueDate}</span>}
                    </div>
                    <div>
                      {task.dateRange ? (
                        <span className="px-2 py-1 rounded bg-status-completed text-white text-xs">
                          {task.dateRange}
                        </span>
                      ) : (
                        <button className="p-1 rounded hover:bg-muted">
                          <Plus className="w-4 h-4 text-muted-foreground" />
                        </button>
                      )}
                    </div>
                    <div>
                      {task.hasFile ? (
                        <button className="p-1 rounded hover:bg-muted">
                          <FileText className="w-4 h-4 text-chart-blue" />
                        </button>
                      ) : (
                        <button className="p-1 rounded hover:bg-muted">
                          <Users className="w-4 h-4 text-muted-foreground" />
                        </button>
                      )}
                    </div>
                    <div>
                      <button className="p-1 rounded hover:bg-muted">
                        <Users className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </div>
                  </div>
                ))}
                {/* Add Task Row */}
                <button className="w-full px-4 py-3 text-left text-sm text-muted-foreground hover:bg-muted/30 transition-colors border-b border-border">
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
