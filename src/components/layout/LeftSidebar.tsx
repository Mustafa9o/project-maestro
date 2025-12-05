import { useState } from "react";
import { NavLink } from "@/components/NavLink";
import {
  Home,
  ListTodo,
  Star,
  Users,
  MoreHorizontal,
  ChevronDown,
  ChevronRight,
  FolderOpen,
  Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { CreateBoardTaskMenu } from "@/components/CreateBoardTaskMenu";

interface ProjectItem {
  id: string;
  name: string;
  icon?: React.ReactNode;
}

interface ProjectGroup {
  id: string;
  name: string;
  items: ProjectItem[];
}

const projectGroups: ProjectGroup[] = [
  {
    id: "hr",
    name: "Human Resources",
    items: [
      { id: "oct", name: "October" },
      { id: "recruit-2026", name: "Recruitment 2026" },
      { id: "recruit-2025", name: "Recruitment 2025" },
      { id: "jan-2026", name: "January 2026" },
      { id: "nov-2025", name: "November 2025" },
      { id: "dec-2025", name: "December 2025" },
    ],
  },
  {
    id: "legal",
    name: "Legal",
    items: [
      { id: "oct-2025", name: "October 2025" },
      { id: "policies", name: "Policies & Procedures" },
      { id: "compliance", name: "Compliance Documents" },
    ],
  },
];

export function LeftSidebar() {
  const [expandedGroups, setExpandedGroups] = useState<string[]>(["hr", "legal"]);

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) =>
      prev.includes(groupId)
        ? prev.filter((id) => id !== groupId)
        : [...prev, groupId]
    );
  };

  return (
    <aside className="w-64 min-h-screen sidebar-gradient flex flex-col">
      {/* Top Navigation Icons */}
      <div className="flex items-center gap-2 p-4 border-b border-sidebar-hover">
        <button className="p-2 rounded-lg bg-sidebar-active hover:bg-sidebar-hover transition-colors">
          <Home className="w-5 h-5 text-sidebar-foreground" />
        </button>
        <button className="p-2 rounded-lg hover:bg-sidebar-hover transition-colors">
          <ListTodo className="w-5 h-5 text-sidebar-foreground" />
        </button>
        <button className="p-2 rounded-lg hover:bg-sidebar-hover transition-colors">
          <Star className="w-5 h-5 text-sidebar-foreground" />
        </button>
        <button className="p-2 rounded-lg bg-chart-purple hover:opacity-90 transition-opacity">
          <Users className="w-5 h-5 text-sidebar-foreground" />
        </button>
        <button className="p-2 rounded-lg hover:bg-sidebar-hover transition-colors">
          <MoreHorizontal className="w-5 h-5 text-sidebar-foreground" />
        </button>
      </div>

      {/* Create Board/Task Button */}
      <div className="p-4">
        <CreateBoardTaskMenu />
      </div>

      {/* Filter Tabs */}
      <div className="px-4 flex items-center gap-2 text-sm">
        <button className="px-3 py-1.5 rounded-full bg-chart-blue text-white font-medium">
          All
        </button>
        <button className="px-3 py-1.5 text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors">
          Subscribed
        </button>
        <button className="px-3 py-1.5 text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors">
          Only Me
        </button>
      </div>

      {/* Project Groups */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {projectGroups.map((group) => (
          <div key={group.id}>
            <button
              onClick={() => toggleGroup(group.id)}
              className="w-full flex items-center gap-2 p-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-hover transition-colors"
            >
              <FolderOpen className="w-4 h-4" />
              <span className="flex-1 text-left text-sm font-medium">
                {group.name}
              </span>
              {expandedGroups.includes(group.id) ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>

            {expandedGroups.includes(group.id) && (
              <div className="ml-4 mt-1 space-y-1">
                {group.items.map((item) => (
                  <NavLink
                    key={item.id}
                    to={`/project/${item.id}`}
                    className="flex items-center gap-2 p-2 rounded-lg text-sidebar-foreground/70 text-sm hover:bg-sidebar-hover hover:text-sidebar-foreground transition-colors"
                    activeClassName="bg-sidebar-active text-sidebar-foreground"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>{item.name}</span>
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-hover">
        <p className="text-xs text-sidebar-foreground/50 text-center">
          © 2025 TaskFlow
        </p>
      </div>
    </aside>
  );
}
