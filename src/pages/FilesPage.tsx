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
import {
  File,
  Folder,
  FolderPlus,
  Upload,
  Share2,
  Star,
  Trash2,
  MoreVertical,
  Megaphone,
  Search,
} from "lucide-react";

interface FileItem {
  id: string;
  name: string;
  type: "file" | "folder";
  size?: string;
  date: string;
  starred?: boolean;
}

const mockFolders: FileItem[] = [];
const mockFiles: FileItem[] = [];

const sidebarItems = [
  { icon: File, label: "My Files", id: "my-files", active: true },
  { icon: Share2, label: "Shared With Me", id: "shared" },
  { icon: Star, label: "Favourite", id: "favourite" },
  { icon: Trash2, label: "Trash", id: "trash" },
];

export default function FilesPage() {
  const [activeSection, setActiveSection] = useState("my-files");
  const [folders, setFolders] = useState<FileItem[]>(mockFolders);
  const [files, setFiles] = useState<FileItem[]>(mockFiles);
  const [newFolderName, setNewFolderName] = useState("");
  const [newFolderDialogOpen, setNewFolderDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const storageUsed = 0;
  const storageTotal = 300;

  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      const newFolder: FileItem = {
        id: Date.now().toString(),
        name: newFolderName,
        type: "folder",
        date: new Date().toLocaleDateString(),
      };
      setFolders([...folders, newFolder]);
      setNewFolderName("");
      setNewFolderDialogOpen(false);
    }
  };

  const handleUploadFiles = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.multiple = true;
    input.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      if (target.files) {
        const newFiles: FileItem[] = Array.from(target.files).map((file) => ({
          id: Date.now().toString() + Math.random(),
          name: file.name,
          type: "file" as const,
          size: `${(file.size / 1024).toFixed(1)} KB`,
          date: new Date().toLocaleDateString(),
        }));
        setFiles([...files, ...newFiles]);
      }
    };
    input.click();
  };

  const filteredFolders = folders.filter((folder) =>
    folder.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredFiles = files.filter((file) =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
      <Megaphone className="w-20 h-20 mb-4 text-muted-foreground/50" />
      <p className="text-sm">No result found</p>
    </div>
  );

  return (
    <div className="flex h-full">
      {/* Left Sidebar */}
      <aside className="w-56 bg-primary text-primary-foreground flex flex-col">
        <nav className="flex-1 py-4">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                activeSection === item.id
                  ? "bg-primary-foreground/10"
                  : "hover:bg-primary-foreground/5"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </nav>

        {/* Storage Usage */}
        <div className="p-4 border-t border-primary-foreground/10">
          <div className="w-full h-2 bg-primary-foreground/20 rounded-full overflow-hidden mb-2">
            <div
              className="h-full bg-primary-foreground transition-all"
              style={{ width: `${(storageUsed / storageTotal) * 100}%` }}
            />
          </div>
          <p className="text-xs text-primary-foreground/70">
            {storageUsed}MB of {storageTotal} GB used
          </p>
        </div>

        <div className="p-4 text-xs text-primary-foreground/50">
          © 2025 EYENAK
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto bg-background">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search files and folders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 ml-4">
            <Dialog open={newFolderDialogOpen} onOpenChange={setNewFolderDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  <FolderPlus className="w-4 h-4 mr-2" />
                  New Folder
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Folder</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <Input
                    placeholder="Folder name"
                    value={newFolderName}
                    onChange={(e) => setNewFolderName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleCreateFolder()}
                  />
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setNewFolderDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleCreateFolder}>Create</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Button onClick={handleUploadFiles}>
              <Upload className="w-4 h-4 mr-2" />
              Upload Files
            </Button>
          </div>
        </div>

        {/* Folders Section */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-4 text-foreground">Folder</h2>
          <div className="border-t border-border pt-4">
            {filteredFolders.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {filteredFolders.map((folder) => (
                  <div
                    key={folder.id}
                    className="flex flex-col items-center p-4 rounded-lg border border-border hover:bg-muted transition-colors cursor-pointer group"
                  >
                    <div className="relative">
                      <Folder className="w-12 h-12 text-primary mb-2" />
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="absolute -top-1 -right-1 p-1 rounded opacity-0 group-hover:opacity-100 hover:bg-muted-foreground/10">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>Rename</DropdownMenuItem>
                          <DropdownMenuItem>Share</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <span className="text-sm text-center truncate w-full">{folder.name}</span>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState />
            )}
          </div>
        </section>

        {/* Files Section */}
        <section>
          <h2 className="text-lg font-semibold mb-4 text-foreground">Files</h2>
          <div className="border-t border-border pt-4">
            {filteredFiles.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {filteredFiles.map((file) => (
                  <div
                    key={file.id}
                    className="flex flex-col items-center p-4 rounded-lg border border-border hover:bg-muted transition-colors cursor-pointer group"
                  >
                    <div className="relative">
                      <File className="w-12 h-12 text-muted-foreground mb-2" />
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="absolute -top-1 -right-1 p-1 rounded opacity-0 group-hover:opacity-100 hover:bg-muted-foreground/10">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>Download</DropdownMenuItem>
                          <DropdownMenuItem>Share</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <span className="text-sm text-center truncate w-full">{file.name}</span>
                    {file.size && (
                      <span className="text-xs text-muted-foreground">{file.size}</span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState />
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
