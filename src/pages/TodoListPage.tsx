import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import {
  FileText,
  Tag,
  Edit3,
  Archive,
  Trash2,
  Plus,
  MoreVertical,
  Search,
  ChevronDown,
} from "lucide-react";

interface TodoItem {
  id: string;
  content: string;
  color: "yellow" | "green" | "white";
  label?: string;
  archived?: boolean;
  deleted?: boolean;
}

const colorClasses = {
  yellow: "bg-yellow-200 border-yellow-300",
  green: "bg-green-300 border-green-400",
  white: "bg-white border-gray-200",
};

const mockTodos: TodoItem[] = [
  {
    id: "1",
    content: "Review the new employee responsibilities and prepare the onboarding documents",
    color: "yellow",
  },
  {
    id: "2",
    content: "Reference meeting\nSend policy guides\nOperations, IT, Quality, Customer experience\nJob descriptions\nBoard meeting minutes\nRegulatory reports\nCommittee lists\nBranch and warehouse list",
    color: "green",
  },
  {
    id: "3",
    content: "Escalation mechanism\nIntervene in environmental and social responsibility",
    color: "white",
  },
];

const sidebarItems = [
  { icon: FileText, label: "Todo List", id: "todos", active: true },
  { icon: Tag, label: "Labels", id: "labels", hasDropdown: true },
  { icon: Edit3, label: "Edit Labels", id: "edit-labels", indent: true },
  { icon: Archive, label: "Archive", id: "archive" },
  { icon: Trash2, label: "Trash", id: "trash" },
];

export default function TodoListPage() {
  const [activeSection, setActiveSection] = useState("todos");
  const [todos, setTodos] = useState<TodoItem[]>(mockTodos);
  const [searchQuery, setSearchQuery] = useState("");
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newTodoContent, setNewTodoContent] = useState("");
  const [newTodoColor, setNewTodoColor] = useState<"yellow" | "green" | "white">("yellow");
  const [labelsExpanded, setLabelsExpanded] = useState(true);

  const handleAddTodo = () => {
    if (newTodoContent.trim()) {
      const newTodo: TodoItem = {
        id: Date.now().toString(),
        content: newTodoContent,
        color: newTodoColor,
      };
      setTodos([...todos, newTodo]);
      setNewTodoContent("");
      setAddDialogOpen(false);
    }
  };

  const handleDeleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleArchiveTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, archived: true } : todo
      )
    );
  };

  const filteredTodos = todos.filter((todo) => {
    const matchesSearch = todo.content
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    
    if (activeSection === "archive") return todo.archived && matchesSearch;
    if (activeSection === "trash") return todo.deleted && matchesSearch;
    return !todo.archived && !todo.deleted && matchesSearch;
  });

  return (
    <div className="flex h-full">
      {/* Left Sidebar */}
      <aside className="w-56 bg-primary text-primary-foreground flex flex-col">
        <nav className="flex-1 py-4">
          {sidebarItems.map((item) => (
            <div key={item.id}>
              {item.hasDropdown ? (
                <button
                  onClick={() => setLabelsExpanded(!labelsExpanded)}
                  className={`w-full flex items-center justify-between gap-3 px-4 py-3 text-sm transition-colors hover:bg-primary-foreground/5`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      labelsExpanded ? "rotate-180" : ""
                    }`}
                  />
                </button>
              ) : (
                <button
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                    item.indent ? "pl-8" : ""
                  } ${
                    activeSection === item.id
                      ? "bg-primary-foreground/10"
                      : "hover:bg-primary-foreground/5"
                  } ${
                    item.indent && !labelsExpanded ? "hidden" : ""
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              )}
            </div>
          ))}
        </nav>

        <div className="p-4 text-xs text-primary-foreground/50">
          © 2025 EYENAK
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto bg-background">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-foreground" />
            <h1 className="text-xl font-semibold text-foreground">Todo List</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Todo
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Todo</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <Textarea
                    placeholder="Enter your todo content..."
                    value={newTodoContent}
                    onChange={(e) => setNewTodoContent(e.target.value)}
                    rows={4}
                  />
                  <div>
                    <label className="text-sm font-medium mb-2 block">Color</label>
                    <div className="flex gap-2">
                      {(["yellow", "green", "white"] as const).map((color) => (
                        <button
                          key={color}
                          onClick={() => setNewTodoColor(color)}
                          className={`w-8 h-8 rounded-full border-2 ${colorClasses[color]} ${
                            newTodoColor === color
                              ? "ring-2 ring-primary ring-offset-2"
                              : ""
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setAddDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddTodo}>Add Todo</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Todo Cards */}
        <div className="flex flex-wrap gap-4">
          {filteredTodos.map((todo) => (
            <div
              key={todo.id}
              className={`w-64 min-h-32 p-4 rounded-lg border shadow-sm ${colorClasses[todo.color]} relative group`}
            >
              <p className="text-sm text-gray-800 whitespace-pre-line pr-6">
                {todo.content}
              </p>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="absolute bottom-3 right-3 p-1 rounded hover:bg-black/5">
                    <MoreVertical className="w-4 h-4 text-gray-600" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleArchiveTodo(todo.id)}>
                    Archive
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleDeleteTodo(todo.id)}
                    className="text-destructive"
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>

        {filteredTodos.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
            <FileText className="w-16 h-16 mb-4 opacity-50" />
            <p>No todos found</p>
          </div>
        )}
      </main>
    </div>
  );
}
