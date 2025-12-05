import { useState } from "react";
import { Plus, List, FolderPlus, ListPlus, LayoutTemplate } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

const mockBoards = [
  { id: "1", name: "Human Resources - November 2025" },
  { id: "2", name: "Human Resources - December 2025" },
  { id: "3", name: "Legal - October 2025" },
];

const mockGroups = [
  { id: "1", name: "Governance" },
  { id: "2", name: "Issues" },
  { id: "3", name: "Projects" },
];

const mockFolders = [
  { id: "1", name: "Human Resources" },
  { id: "2", name: "Legal" },
  { id: "3", name: "IT Department" },
];

export function CreateBoardTaskMenu() {
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [isFolderDialogOpen, setIsFolderDialogOpen] = useState(false);
  const [isBoardDialogOpen, setIsBoardDialogOpen] = useState(false);

  const [taskForm, setTaskForm] = useState({
    board: "",
    group: "",
    name: "",
  });

  const [folderName, setFolderName] = useState("");
  
  const [boardForm, setBoardForm] = useState({
    folder: "",
    name: "",
  });

  const handleCreateTask = () => {
    if (!taskForm.board || !taskForm.group || !taskForm.name) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Task Created",
      description: `Task "${taskForm.name}" has been created successfully.`,
    });
    setTaskForm({ board: "", group: "", name: "" });
    setIsTaskDialogOpen(false);
  };

  const handleCreateFolder = () => {
    if (!folderName) {
      toast({
        title: "Error",
        description: "Please enter a folder name",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Folder Created",
      description: `Folder "${folderName}" has been created successfully.`,
    });
    setFolderName("");
    setIsFolderDialogOpen(false);
  };

  const handleCreateBoard = () => {
    if (!boardForm.folder || !boardForm.name) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Board Created",
      description: `Board "${boardForm.name}" has been created successfully.`,
    });
    setBoardForm({ folder: "", name: "" });
    setIsBoardDialogOpen(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="w-full flex items-center justify-between p-3 rounded-lg border border-dashed border-sidebar-foreground/30 text-sidebar-foreground hover:bg-sidebar-hover transition-colors">
            <span className="text-sm font-medium">Create board/task</span>
            <Plus className="w-4 h-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          <DropdownMenuItem onClick={() => setIsBoardDialogOpen(true)}>
            <List className="w-4 h-4 mr-2" />
            New Board
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsFolderDialogOpen(true)}>
            <FolderPlus className="w-4 h-4 mr-2" />
            New Folder
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsTaskDialogOpen(true)}>
            <ListPlus className="w-4 h-4 mr-2" />
            Create Task
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LayoutTemplate className="w-4 h-4 mr-2" />
            Choose Template
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Create Task Dialog */}
      <Dialog open={isTaskDialogOpen} onOpenChange={setIsTaskDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create Task</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Board</label>
              <Select
                value={taskForm.board}
                onValueChange={(value) =>
                  setTaskForm({ ...taskForm, board: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a board" />
                </SelectTrigger>
                <SelectContent>
                  {mockBoards.map((board) => (
                    <SelectItem key={board.id} value={board.id}>
                      {board.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Group</label>
              <Select
                value={taskForm.group}
                onValueChange={(value) =>
                  setTaskForm({ ...taskForm, group: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a group" />
                </SelectTrigger>
                <SelectContent>
                  {mockGroups.map((group) => (
                    <SelectItem key={group.id} value={group.id}>
                      {group.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Task Name</label>
              <Input
                placeholder="Enter task name"
                value={taskForm.name}
                onChange={(e) =>
                  setTaskForm({ ...taskForm, name: e.target.value })
                }
              />
            </div>
            <Button
              onClick={handleCreateTask}
              className="w-full bg-sidebar-bg hover:bg-sidebar-bg/90"
            >
              Create
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Create Folder Dialog */}
      <Dialog open={isFolderDialogOpen} onOpenChange={setIsFolderDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create Folder</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Name</label>
              <Input
                placeholder="Enter folder name"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
              />
            </div>
            <Button
              onClick={handleCreateFolder}
              className="w-full bg-sidebar-bg hover:bg-sidebar-bg/90"
            >
              Create
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Create Board Dialog */}
      <Dialog open={isBoardDialogOpen} onOpenChange={setIsBoardDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create Board</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Folder</label>
              <Select
                value={boardForm.folder}
                onValueChange={(value) =>
                  setBoardForm({ ...boardForm, folder: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a folder" />
                </SelectTrigger>
                <SelectContent>
                  {mockFolders.map((folder) => (
                    <SelectItem key={folder.id} value={folder.id}>
                      {folder.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Name</label>
              <Input
                placeholder="Enter board name"
                value={boardForm.name}
                onChange={(e) =>
                  setBoardForm({ ...boardForm, name: e.target.value })
                }
              />
            </div>
            <Button
              onClick={handleCreateBoard}
              className="w-full bg-sidebar-bg hover:bg-sidebar-bg/90"
            >
              Next
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
