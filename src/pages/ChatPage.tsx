import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Star,
  Mic,
  Smile,
  Paperclip,
  Send,
  ChevronDown,
  Image as ImageIcon,
  X,
} from "lucide-react";

interface ChatUser {
  id: string;
  name: string;
  avatar?: string;
  avatarFallback: string;
  avatarColor: string;
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount?: number;
  isOnline: boolean;
  hasImage?: boolean;
}

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
}

const mockUsers: ChatUser[] = [
  {
    id: "1",
    name: "دورات وورش - قانون",
    avatar: "/placeholder.svg",
    avatarFallback: "دق",
    avatarColor: "bg-gray-400",
    lastMessage: "https://www.tahakompltf.c...",
    lastMessageTime: "Mon",
    unreadCount: 1,
    isOnline: true,
  },
  {
    id: "2",
    name: "تعاميم ومستجدات الأنظمة",
    avatar: "/placeholder.svg",
    avatarFallback: "تم",
    avatarColor: "bg-gray-400",
    lastMessage: "Image",
    lastMessageTime: "Sun",
    unreadCount: 2,
    isOnline: false,
    hasImage: true,
  },
  {
    id: "3",
    name: "ابراهيم",
    avatarFallback: "اب",
    avatarColor: "bg-chart-blue",
    isOnline: true,
  },
  {
    id: "4",
    name: "abdullah",
    avatarFallback: "AB",
    avatarColor: "bg-chart-green",
    isOnline: false,
  },
  {
    id: "5",
    name: "Mashael",
    avatarFallback: "MA",
    avatarColor: "bg-chart-green",
    isOnline: true,
  },
  {
    id: "6",
    name: "رهام وليد التركي",
    avatarFallback: "رت",
    avatarColor: "bg-chart-red",
    isOnline: false,
  },
  {
    id: "7",
    name: "منيره وليد السماعيل",
    avatar: "/placeholder.svg",
    avatarFallback: "مس",
    avatarColor: "bg-chart-purple",
    isOnline: true,
  },
  {
    id: "8",
    name: "Mohammed almul",
    avatarFallback: "MA",
    avatarColor: "bg-chart-blue",
    isOnline: false,
  },
];

const mockMessages: Message[] = [
  {
    id: "1",
    senderId: "4",
    content: "Hello, how are you?",
    timestamp: "10:30 AM",
    isOwn: false,
  },
  {
    id: "2",
    senderId: "me",
    content: "I'm good, thanks! How about you?",
    timestamp: "10:32 AM",
    isOwn: true,
  },
];

export default function ChatPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<ChatUser | null>(mockUsers[3]);
  const [message, setMessage] = useState("");
  const [showUnreadBanner, setShowUnreadBanner] = useState(true);

  const filteredUsers = mockUsers.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalUnread = mockUsers.reduce(
    (acc, user) => acc + (user.unreadCount || 0),
    0
  );

  const handleSendMessage = () => {
    if (message.trim()) {
      // Here you would send the message
      setMessage("");
    }
  };

  return (
    <div className="flex h-full">
      {/* Left Sidebar - User List */}
      <div className="w-64 bg-sidebar flex flex-col">
        {/* Search */}
        <div className="p-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search Member"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-background"
            />
          </div>
        </div>

        {/* Filter */}
        <div className="px-3 py-2 flex items-center justify-between">
          <button className="flex items-center gap-1 text-sm text-sidebar-foreground">
            All Users
            <ChevronDown className="w-4 h-4" />
          </button>
          <button className="p-1.5 rounded bg-muted">
            <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
              <div className="bg-muted-foreground rounded-sm" />
              <div className="bg-muted-foreground rounded-sm" />
              <div className="bg-muted-foreground rounded-sm" />
              <div className="bg-muted-foreground rounded-sm" />
            </div>
          </button>
        </div>

        {/* User List */}
        <ScrollArea className="flex-1">
          <div className="space-y-1 px-2">
            {filteredUsers.map((user) => (
              <button
                key={user.id}
                onClick={() => setSelectedUser(user)}
                className={`w-full flex items-center gap-3 p-2 rounded-lg transition-colors ${
                  selectedUser?.id === user.id
                    ? "bg-sidebar-active"
                    : "hover:bg-sidebar-hover"
                }`}
              >
                <div className="relative">
                  <Avatar className="h-10 w-10">
                    {user.avatar && <AvatarImage src={user.avatar} />}
                    <AvatarFallback className={`${user.avatarColor} text-white text-sm`}>
                      {user.avatarFallback}
                    </AvatarFallback>
                  </Avatar>
                  {user.isOnline && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-chart-green border-2 border-sidebar rounded-full" />
                  )}
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-sidebar-foreground truncate">
                      {user.name}
                    </span>
                    {user.lastMessageTime && (
                      <span className="text-xs text-sidebar-foreground/60">
                        {user.lastMessageTime}
                      </span>
                    )}
                  </div>
                  {user.lastMessage && (
                    <div className="flex items-center gap-1 text-xs text-sidebar-foreground/60 truncate">
                      {user.hasImage && <ImageIcon className="w-3 h-3" />}
                      <span className="truncate">{user.lastMessage}</span>
                    </div>
                  )}
                </div>
                {user.unreadCount && user.unreadCount > 0 && (
                  <Badge className="bg-chart-red text-white h-5 w-5 p-0 flex items-center justify-center text-xs rounded-full">
                    {user.unreadCount}
                  </Badge>
                )}
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-background">
        {selectedUser ? (
          <>
            {/* Chat Header */}
            <div className="h-14 border-b flex items-center justify-between px-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  {selectedUser.avatar && <AvatarImage src={selectedUser.avatar} />}
                  <AvatarFallback className={`${selectedUser.avatarColor} text-white`}>
                    {selectedUser.avatarFallback}
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium">{selectedUser.name}</span>
              </div>
              <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                <Star className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* Messages Area */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {mockMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[70%] p-3 rounded-lg ${
                        msg.isOwn
                          ? "bg-chart-blue text-white"
                          : "bg-muted"
                      }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                      <span className="text-xs opacity-70 mt-1 block">
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 border-t">
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1"
                />
                <Button variant="ghost" size="icon">
                  <Mic className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Smile className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Paperclip className="w-5 h-5" />
                </Button>
                <Button
                  size="icon"
                  className="bg-chart-blue hover:bg-chart-blue/90"
                  onClick={handleSendMessage}
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            Select a user to start chatting
          </div>
        )}
      </div>

      {/* Unread Messages Banner */}
      {showUnreadBanner && totalUnread > 0 && (
        <div className="fixed bottom-4 left-4 bg-card border rounded-lg shadow-lg p-4 max-w-xs">
          <div className="flex items-start gap-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-gray-400 text-white">دق</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-chart-red">
                  Unread Messages: {totalUnread}
                </span>
                <button
                  onClick={() => setShowUnreadBanner(false)}
                  className="p-1 hover:bg-muted rounded"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-sm font-medium mt-1">دورات وورش - قانون</p>
              <p className="text-xs text-muted-foreground truncate">
                منيره و وليد السماعيل: https://www.tahakompltf.c...
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
