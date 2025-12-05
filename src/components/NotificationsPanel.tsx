import { useState } from "react";
import { Bell, X, Check, Clock } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Notification {
  id: string;
  type: "reminder" | "subscription" | "task";
  message: string;
  time: string;
  read: boolean;
  avatar?: string;
  avatarFallback?: string;
}

const initialNotifications: Notification[] = [
  {
    id: "1",
    type: "reminder",
    message: "Reminder: There is a scheduled event on 04 Dec, 2025 at 03:00 AM AST time.",
    time: "1d",
    read: false,
  },
  {
    id: "2",
    type: "reminder",
    message: "Reminder: There is a scheduled event on 03 Dec, 2025 at 11:00 AM AST time.",
    time: "2d",
    read: false,
  },
  {
    id: "3",
    type: "reminder",
    message: "Reminder: There is a scheduled event on 04 Dec, 2025 at 03:00 AM AST time.",
    time: "2d",
    read: false,
  },
  {
    id: "4",
    type: "reminder",
    message: "Reminder: Company license renewal deadline on 09 Dec, 2025 at 03:00 AM AST time.",
    time: "2d",
    read: true,
  },
  {
    id: "5",
    type: "subscription",
    message: "subscribed you to \"December - 2025\" board.",
    time: "3d",
    read: true,
    avatar: "/placeholder.svg",
    avatarFallback: "MA",
  },
  {
    id: "6",
    type: "reminder",
    message: "Reminder: There is a scheduled event on 02 Dec, 2025 at 01:00 PM AST time.",
    time: "4d",
    read: true,
  },
];

export function NotificationsPanel() {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button className="p-2 rounded-lg text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-hover transition-colors relative">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-chart-red text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold text-foreground">Notifications</h3>
          <Bell className="w-5 h-5 text-muted-foreground" />
        </div>
        <ScrollArea className="h-80">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              No notifications
            </div>
          ) : (
            <div className="divide-y">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 flex items-start gap-3 hover:bg-muted/50 transition-colors ${
                    !notification.read ? "bg-blue-50/50 dark:bg-blue-950/20" : ""
                  }`}
                >
                  {notification.avatar ? (
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={notification.avatar} />
                      <AvatarFallback className="bg-chart-purple text-white text-xs">
                        {notification.avatarFallback}
                      </AvatarFallback>
                    </Avatar>
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                      <Clock className="w-5 h-5 text-muted-foreground" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground leading-relaxed">
                      {notification.message}
                    </p>
                    <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>{notification.time}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => removeNotification(notification.id)}
                      className="p-1 rounded hover:bg-muted transition-colors"
                    >
                      <X className="w-4 h-4 text-muted-foreground" />
                    </button>
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="p-1 rounded hover:bg-muted transition-colors"
                    >
                      <Check className="w-4 h-4 text-chart-green" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
        {notifications.length > 0 && (
          <div className="p-3 border-t text-center">
            <button
              onClick={clearAll}
              className="text-sm text-chart-blue hover:underline"
            >
              Clear All
            </button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
