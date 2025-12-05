import { Search, RefreshCw, Globe, ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NotificationsPanel } from "@/components/NotificationsPanel";

export function Header() {
  return (
    <header className="h-14 bg-sidebar flex items-center justify-between px-4">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-bold text-sidebar-foreground">TaskFlow</h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-lg text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-hover transition-colors">
          <Search className="w-5 h-5" />
        </button>
        <button className="p-2 rounded-lg text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-hover transition-colors">
          <RefreshCw className="w-5 h-5" />
        </button>
        <NotificationsPanel />
        <button className="flex items-center gap-1 p-2 rounded-lg text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-hover transition-colors">
          <Globe className="w-5 h-5" />
          <span className="text-sm">EN</span>
        </button>
        
        {/* User Profile */}
        <button className="flex items-center gap-2 p-1 rounded-lg hover:bg-sidebar-hover transition-colors">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback className="bg-chart-green text-white text-sm">
              JD
            </AvatarFallback>
          </Avatar>
          <span className="text-sm text-sidebar-foreground">John Doe</span>
          <ChevronDown className="w-4 h-4 text-sidebar-foreground/70" />
        </button>
      </div>
    </header>
  );
}
