import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Type, Hash, Mail, Star, Flag, MapPin, Calendar, User, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface ColumnType {
  id: string;
  label: string;
  icon: React.ElementType;
}

const columnTypes: ColumnType[] = [
  { id: "text", label: "Text", icon: Type },
  { id: "number", label: "Number", icon: Hash },
  { id: "email", label: "Email", icon: Mail },
  { id: "rating", label: "Rating", icon: Star },
  { id: "priority", label: "Priority", icon: Flag },
  { id: "location", label: "Location", icon: MapPin },
  { id: "date", label: "Date", icon: Calendar },
  { id: "person", label: "Person", icon: User },
  { id: "file", label: "File", icon: FileText },
];

interface AddColumnDialogProps {
  onAdd: (name: string, type: string) => void;
}

export function AddColumnDialog({ onAdd }: AddColumnDialogProps) {
  const [open, setOpen] = useState(false);
  const [columnName, setColumnName] = useState("");
  const [selectedType, setSelectedType] = useState("text");

  const handleAdd = () => {
    if (columnName.trim()) {
      onAdd(columnName, selectedType);
      setColumnName("");
      setSelectedType("text");
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="p-2 rounded hover:bg-muted transition-colors">
          <Plus className="w-4 h-4" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add New Column</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Column Name</label>
            <Input
              placeholder="Enter column name"
              value={columnName}
              onChange={(e) => setColumnName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Column Type</label>
            <div className="grid grid-cols-3 gap-2">
              {columnTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className={cn(
                      "flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-colors",
                      selectedType === type.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-xs font-medium">{type.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <Button onClick={handleAdd} className="w-full" disabled={!columnName.trim()}>
            Add Column
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
