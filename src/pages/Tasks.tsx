import { useState, useEffect } from "react";
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
  Edit2,
  Trash2,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { AddColumnDialog } from "@/components/tasks/AddColumnDialog";
import {
  NumberColumn,
  EmailColumn,
  RatingColumn,
  PriorityColumn,
  LocationColumn,
  DateColumn,
  TextColumn,
} from "@/components/tasks/ColumnTypes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";

interface CustomColumn {
  id: string;
  name: string;
  column_type: string;
  order_index: number;
  settings?: any;
}

interface Task {
  id: string;
  title: string;
  subtasksCount: number;
  subtasksCompleted: number;
  assignees: { initials: string; color: string }[];
  columnValues: Record<string, any>;
}

interface TaskGroup {
  id: string;
  name: string;
  color: string;
  completedCount: number;
  totalCount: number;
  tasks: Task[];
}

const mockGroups: TaskGroup[] = [
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
        columnValues: {},
      },
      {
        id: "2",
        title: "تعيين موظفين أبدال",
        subtasksCount: 1,
        subtasksCompleted: 1,
        assignees: [{ initials: "MA", color: "bg-teal-500" }],
        columnValues: {},
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
        id: "3",
        title: "مستحقات مختار",
        subtasksCount: 0,
        subtasksCompleted: 0,
        assignees: [],
        columnValues: {},
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
  const [expandedGroups, setExpandedGroups] = useState<string[]>(["recruitment", "dues"]);
  const [activeTab, setActiveTab] = useState("task");
  const [columns, setColumns] = useState<CustomColumn[]>([]);
  const [taskGroups, setTaskGroups] = useState<TaskGroup[]>(mockGroups);
  const [currentBoardId, setCurrentBoardId] = useState<string>("");

  useEffect(() => {
    initializeBoard();
  }, []);

  const initializeBoard = async () => {
    let { data: boards, error: boardError } = await supabase
      .from("boards")
      .select("*")
      .limit(1)
      .maybeSingle();

    if (!boards) {
      const { data: newBoard, error: createError } = await supabase
        .from("boards")
        .insert([{ name: "أكتوبر", description: "Add board description" }])
        .select()
        .single();

      if (createError) {
        console.error("Error creating board:", createError);
        return;
      }
      boards = newBoard;

      const defaultColumns = [
        { board_id: boards.id, name: "Rating", column_type: "rating", order_index: 0 },
        { board_id: boards.id, name: "Number", column_type: "number", order_index: 1 },
        { board_id: boards.id, name: "Location", column_type: "location", order_index: 2 },
        { board_id: boards.id, name: "Email", column_type: "email", order_index: 3 },
        { board_id: boards.id, name: "Priority", column_type: "priority", order_index: 4 },
      ];

      await supabase.from("custom_columns").insert(defaultColumns);
    }

    setCurrentBoardId(boards.id);
    loadColumns(boards.id);
  };

  const loadColumns = async (boardId: string) => {
    const { data, error } = await supabase
      .from("custom_columns")
      .select("*")
      .eq("board_id", boardId)
      .order("order_index", { ascending: true });

    if (error) {
      console.error("Error loading columns:", error);
      return;
    }

    setColumns(data || []);
  };

  const handleAddColumn = async (name: string, type: string) => {
    if (!currentBoardId) return;

    const { data, error } = await supabase
      .from("custom_columns")
      .insert([
        {
          board_id: currentBoardId,
          name,
          column_type: type,
          order_index: columns.length,
        },
      ])
      .select()
      .single();

    if (error) {
      toast({
        title: "Error",
        description: "Failed to add column",
        variant: "destructive",
      });
      return;
    }

    setColumns([...columns, data]);
    toast({
      title: "Column Added",
      description: `${name} column has been added successfully`,
    });
  };

  const handleDeleteColumn = async (columnId: string) => {
    const { error } = await supabase
      .from("custom_columns")
      .delete()
      .eq("id", columnId);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete column",
        variant: "destructive",
      });
      return;
    }

    setColumns(columns.filter((col) => col.id !== columnId));
    toast({
      title: "Column Deleted",
      description: "Column has been removed",
    });
  };

  const handleUpdateColumnValue = async (
    taskId: string,
    columnId: string,
    value: any
  ) => {
    setTaskGroups((prev) =>
      prev.map((group) => ({
        ...group,
        tasks: group.tasks.map((task) =>
          task.id === taskId
            ? {
                ...task,
                columnValues: { ...task.columnValues, [columnId]: value },
              }
            : task
        ),
      }))
    );

    toast({
      title: "Value Updated",
      description: "Column value has been saved",
    });
  };

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) =>
      prev.includes(groupId)
        ? prev.filter((id) => id !== groupId)
        : [...prev, groupId]
    );
  };

  const renderColumnCell = (
    task: Task,
    column: CustomColumn
  ) => {
    const value = task.columnValues[column.id];

    const props = {
      value,
      onChange: (newValue: any) =>
        handleUpdateColumnValue(task.id, column.id, newValue),
      columnType: column.column_type,
    };

    switch (column.column_type) {
      case "number":
        return <NumberColumn {...props} />;
      case "email":
        return <EmailColumn {...props} />;
      case "rating":
        return <RatingColumn {...props} />;
      case "priority":
        return <PriorityColumn {...props} />;
      case "location":
        return <LocationColumn {...props} />;
      case "date":
        return <DateColumn {...props} />;
      case "text":
      default:
        return <TextColumn {...props} />;
    }
  };

  const gridColsClass = `grid-cols-[auto,1fr,100px,80px,${columns.map(() => "minmax(120px,1fr)").join(",")},60px]`;

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
        </div>
      </div>

      {/* Timeline */}
      <div className="relative py-6 px-8 bg-card rounded-lg card-shadow">
        <div className="absolute inset-x-8 top-1/2 h-1 bg-gray-200 -translate-y-1/2" />
        <div className="relative flex items-center justify-between">
          {timelineSteps.map((step) => (
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
      <div className="bg-card rounded-lg card-shadow-md overflow-x-auto">
        {/* Table Header */}
        <div className="min-w-max">
          <div
            className="grid gap-2 px-4 py-3 border-b border-border bg-muted/50 text-sm font-medium text-muted-foreground"
            style={{
              gridTemplateColumns: `auto 1fr 100px 80px ${columns.map(() => "minmax(140px, 1fr)").join(" ")} 60px`,
            }}
          >
            <div className="w-8" />
            <div className="flex items-center gap-2">
              <Link2 className="w-4 h-4" />
              Tasks
            </div>
            <div>Subtasks</div>
            <div>الأشخاص</div>
            {columns.map((column) => (
              <div key={column.id} className="flex items-center justify-between">
                <span>{column.name}</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="p-1 rounded hover:bg-muted opacity-0 group-hover:opacity-100">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <Edit2 className="w-4 h-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDeleteColumn(column.id)}
                      className="text-destructive"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
            <div className="flex items-center justify-center">
              <AddColumnDialog onAdd={handleAddColumn} />
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
                      className="grid gap-2 px-4 py-3 border-b border-border hover:bg-muted/30 transition-colors items-center group"
                      style={{
                        gridTemplateColumns: `auto 1fr 100px 80px ${columns.map(() => "minmax(140px, 1fr)").join(" ")} 60px`,
                      }}
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
                      {columns.map((column) => (
                        <div key={column.id}>
                          {renderColumnCell(task, column)}
                        </div>
                      ))}
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
    </div>
  );
}
