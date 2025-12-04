import { NavLink } from "@/components/NavLink";
import {
  Home,
  Calendar,
  FileText,
  ListTodo,
  MessageSquare,
  Video,
  Users,
  HelpCircle,
  MoreHorizontal,
} from "lucide-react";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Calendar, label: "Calendar", path: "/calendar" },
  { icon: FileText, label: "Files", path: "/files" },
  { icon: ListTodo, label: "Todo List", path: "/todo" },
  { icon: MessageSquare, label: "Chat", path: "/chat" },
  { icon: Video, label: "Meetings", path: "/meetings" },
  { icon: Users, label: "Employee", path: "/employees" },
  { icon: HelpCircle, label: "Help", path: "/help" },
  { icon: MoreHorizontal, label: "More", path: "/more" },
];

export function RightSidebar() {
  return (
    <aside className="w-16 min-h-screen bg-icon-sidebar border-l border-border flex flex-col items-center py-4">
      <nav className="flex flex-col items-center gap-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className="flex flex-col items-center justify-center p-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-icon-sidebar-hover transition-colors group"
            activeClassName="text-foreground bg-icon-sidebar-hover"
          >
            <item.icon className="w-5 h-5 mb-1" />
            <span className="text-[10px] font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
