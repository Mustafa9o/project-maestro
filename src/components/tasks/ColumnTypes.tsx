import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface ColumnValueProps {
  value: any;
  onChange: (value: any) => void;
  columnType: string;
}

export function NumberColumn({ value, onChange }: ColumnValueProps) {
  return (
    <Input
      type="number"
      value={value?.number || ""}
      onChange={(e) => onChange({ number: e.target.value })}
      className="w-20 text-center"
      placeholder="0"
    />
  );
}

export function EmailColumn({ value, onChange }: ColumnValueProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [email, setEmail] = useState(value?.email || "");
  const [displayName, setDisplayName] = useState(value?.displayName || "");

  const handleSave = () => {
    onChange({ email, displayName });
    setDialogOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setDialogOpen(true)}
        className="flex items-center gap-2 p-2 rounded hover:bg-muted transition-colors text-sm"
      >
        {value?.email ? (
          <>
            <Mail className="w-4 h-4 text-chart-blue" />
            <span>{value.displayName || value.email}</span>
          </>
        ) : (
          <span className="text-muted-foreground">Add email</span>
        )}
      </button>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5" />
              Email Address
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Email Address</label>
              <Input
                type="email"
                placeholder="demo@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Display Name</label>
              <Input
                placeholder="(Optional)"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>
            <Button onClick={handleSave} className="w-full">
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function RatingColumn({ value, onChange }: ColumnValueProps) {
  const rating = value?.rating || 0;
  const maxStars = 5;

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: maxStars }).map((_, i) => (
        <button
          key={i}
          onClick={() => onChange({ rating: i + 1 })}
          className="hover:scale-110 transition-transform"
        >
          <Star
            className={cn(
              "w-5 h-5",
              i < rating
                ? "fill-chart-yellow text-chart-yellow"
                : "fill-gray-200 text-gray-200"
            )}
          />
        </button>
      ))}
    </div>
  );
}

export function PriorityColumn({ value, onChange }: ColumnValueProps) {
  const [open, setOpen] = useState(false);
  const priority = value?.priority || "none";

  const priorities = [
    { value: "high", label: "High", color: "text-chart-red" },
    { value: "medium", label: "Medium", color: "text-chart-yellow" },
    { value: "low", label: "Low", color: "text-chart-blue" },
    { value: "none", label: "None", color: "text-gray-400" },
  ];

  const currentPriority = priorities.find((p) => p.value === priority);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "px-3 py-1.5 rounded text-sm font-medium transition-colors hover:opacity-80",
          currentPriority?.color
        )}
      >
        {currentPriority?.label || "None"}
      </button>
      {open && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setOpen(false)}
          />
          <div className="absolute top-full left-0 mt-1 bg-popover border rounded-lg shadow-lg p-1 z-20 min-w-[120px]">
            {priorities.map((p) => (
              <button
                key={p.value}
                onClick={() => {
                  onChange({ priority: p.value });
                  setOpen(false);
                }}
                className={cn(
                  "w-full text-left px-3 py-2 rounded hover:bg-muted transition-colors",
                  p.color
                )}
              >
                {p.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function LocationColumn({ value, onChange }: ColumnValueProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [location, setLocation] = useState(value?.location || "");

  const handleSave = () => {
    onChange({ location });
    setDialogOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setDialogOpen(true)}
        className="flex items-center gap-2 p-2 rounded hover:bg-muted transition-colors"
      >
        {value?.location ? (
          <>
            <MapPin className="w-4 h-4 text-chart-blue" />
            <span className="text-sm">{value.location}</span>
          </>
        ) : (
          <MapPin className="w-4 h-4 text-muted-foreground" />
        )}
      </button>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Location
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Input
              placeholder="Enter location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <Button onClick={handleSave} className="w-full">
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function DateColumn({ value, onChange }: ColumnValueProps) {
  return (
    <Input
      type="date"
      value={value?.date || ""}
      onChange={(e) => onChange({ date: e.target.value })}
      className="w-40"
    />
  );
}

export function TextColumn({ value, onChange }: ColumnValueProps) {
  return (
    <Input
      type="text"
      value={value?.text || ""}
      onChange={(e) => onChange({ text: e.target.value })}
      placeholder="Enter text"
      className="w-full"
    />
  );
}
