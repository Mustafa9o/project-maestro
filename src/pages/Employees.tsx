import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  UserPlus,
  Mail,
  Phone,
  MoreVertical,
  Filter,
  Grid3X3,
  List,
  Users,
  UserCheck,
  UserX,
} from "lucide-react";

interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  status: "active" | "inactive" | "pending";
  avatar?: string;
  joinDate: string;
  tasksCompleted: number;
  projectsCount: number;
}

const mockEmployees: Employee[] = [
  {
    id: "1",
    name: "Ahmed Hassan",
    email: "ahmed.hassan@company.com",
    phone: "+20 123 456 7890",
    role: "Project Manager",
    department: "Human Resources",
    status: "active",
    joinDate: "2023-01-15",
    tasksCompleted: 145,
    projectsCount: 8,
  },
  {
    id: "2",
    name: "Sara Mohamed",
    email: "sara.mohamed@company.com",
    phone: "+20 123 456 7891",
    role: "UI/UX Designer",
    department: "Design",
    status: "active",
    joinDate: "2023-03-20",
    tasksCompleted: 89,
    projectsCount: 5,
  },
  {
    id: "3",
    name: "Omar Ali",
    email: "omar.ali@company.com",
    phone: "+20 123 456 7892",
    role: "Frontend Developer",
    department: "Engineering",
    status: "active",
    joinDate: "2023-02-10",
    tasksCompleted: 203,
    projectsCount: 12,
  },
  {
    id: "4",
    name: "Fatma Ibrahim",
    email: "fatma.ibrahim@company.com",
    phone: "+20 123 456 7893",
    role: "HR Specialist",
    department: "Human Resources",
    status: "pending",
    joinDate: "2024-01-05",
    tasksCompleted: 12,
    projectsCount: 2,
  },
  {
    id: "5",
    name: "Mohamed Khaled",
    email: "mohamed.khaled@company.com",
    phone: "+20 123 456 7894",
    role: "Backend Developer",
    department: "Engineering",
    status: "active",
    joinDate: "2022-11-30",
    tasksCompleted: 287,
    projectsCount: 15,
  },
  {
    id: "6",
    name: "Nour Ahmed",
    email: "nour.ahmed@company.com",
    phone: "+20 123 456 7895",
    role: "Legal Advisor",
    department: "Legal",
    status: "inactive",
    joinDate: "2023-06-18",
    tasksCompleted: 67,
    projectsCount: 4,
  },
  {
    id: "7",
    name: "Youssef Tarek",
    email: "youssef.tarek@company.com",
    phone: "+20 123 456 7896",
    role: "Marketing Lead",
    department: "Marketing",
    status: "active",
    joinDate: "2023-04-01",
    tasksCompleted: 156,
    projectsCount: 9,
  },
  {
    id: "8",
    name: "Layla Mahmoud",
    email: "layla.mahmoud@company.com",
    phone: "+20 123 456 7897",
    role: "QA Engineer",
    department: "Engineering",
    status: "active",
    joinDate: "2023-07-22",
    tasksCompleted: 98,
    projectsCount: 6,
  },
];

const departments = ["All", "Human Resources", "Engineering", "Design", "Legal", "Marketing"];

const Employees = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("");

  const filteredEmployees = mockEmployees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment =
      selectedDepartment === "All" || emp.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const stats = {
    total: mockEmployees.length,
    active: mockEmployees.filter((e) => e.status === "active").length,
    pending: mockEmployees.filter((e) => e.status === "pending").length,
    inactive: mockEmployees.filter((e) => e.status === "inactive").length,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-status-completed/20 text-status-completed";
      case "pending":
        return "bg-status-warning/20 text-status-warning";
      case "inactive":
        return "bg-status-overdue/20 text-status-overdue";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const handleInvite = () => {
    console.log("Inviting:", { email: inviteEmail, role: inviteRole });
    setInviteEmail("");
    setInviteRole("");
    setInviteDialogOpen(false);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground font-cairo">
            Team Members
          </h1>
          <p className="text-muted-foreground text-sm">
            Manage your team and invite new members
          </p>
        </div>

        <Dialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-sidebar-bg hover:bg-sidebar-bg/90 text-white gap-2">
              <UserPlus className="w-4 h-4" />
              Invite Member
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="font-cairo">Invite New Member</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <Input
                  type="email"
                  placeholder="colleague@company.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Role</label>
                <Select value={inviteRole} onValueChange={setInviteRole}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="developer">Developer</SelectItem>
                    <SelectItem value="designer">Designer</SelectItem>
                    <SelectItem value="manager">Project Manager</SelectItem>
                    <SelectItem value="hr">HR Specialist</SelectItem>
                    <SelectItem value="legal">Legal Advisor</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Department</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="hr">Human Resources</SelectItem>
                    <SelectItem value="legal">Legal</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                className="w-full bg-sidebar-bg hover:bg-sidebar-bg/90"
                onClick={handleInvite}
                disabled={!inviteEmail || !inviteRole}
              >
                Send Invitation
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="card-shadow">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-sidebar-bg/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-sidebar-bg" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.total}</p>
              <p className="text-xs text-muted-foreground">Total Members</p>
            </div>
          </CardContent>
        </Card>
        <Card className="card-shadow">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-status-completed/10 flex items-center justify-center">
              <UserCheck className="w-5 h-5 text-status-completed" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.active}</p>
              <p className="text-xs text-muted-foreground">Active</p>
            </div>
          </CardContent>
        </Card>
        <Card className="card-shadow">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-status-warning/10 flex items-center justify-center">
              <UserPlus className="w-5 h-5 text-status-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.pending}</p>
              <p className="text-xs text-muted-foreground">Pending</p>
            </div>
          </CardContent>
        </Card>
        <Card className="card-shadow">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-status-overdue/10 flex items-center justify-center">
              <UserX className="w-5 h-5 text-status-overdue" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.inactive}</p>
              <p className="text-xs text-muted-foreground">Inactive</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="card-shadow">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search members..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="w-40">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("grid")}
                className={viewMode === "grid" ? "bg-sidebar-bg" : ""}
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("list")}
                className={viewMode === "list" ? "bg-sidebar-bg" : ""}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Employee Cards/List */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredEmployees.map((employee) => (
            <Card key={employee.id} className="card-shadow hover:shadow-lg transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <Avatar className="w-14 h-14">
                    <AvatarImage src={employee.avatar} />
                    <AvatarFallback className="bg-sidebar-bg text-white text-lg">
                      {employee.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>

                <h3 className="font-semibold text-foreground font-cairo">{employee.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{employee.role}</p>

                <Badge className={`${getStatusColor(employee.status)} mb-3`}>
                  {employee.status.charAt(0).toUpperCase() + employee.status.slice(1)}
                </Badge>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    <span className="truncate">{employee.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    <span>{employee.phone}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                  <div className="text-center">
                    <p className="text-lg font-bold text-foreground">{employee.tasksCompleted}</p>
                    <p className="text-xs text-muted-foreground">Tasks</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-foreground">{employee.projectsCount}</p>
                    <p className="text-xs text-muted-foreground">Projects</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-medium text-sidebar-bg">{employee.department}</p>
                    <p className="text-xs text-muted-foreground">Dept</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="card-shadow">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-4 font-medium text-muted-foreground">Member</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Role</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Department</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Tasks</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Projects</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEmployees.map((employee) => (
                    <tr key={employee.id} className="border-t border-border hover:bg-muted/30">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={employee.avatar} />
                            <AvatarFallback className="bg-sidebar-bg text-white text-sm">
                              {employee.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-foreground">{employee.name}</p>
                            <p className="text-xs text-muted-foreground">{employee.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-sm text-foreground">{employee.role}</td>
                      <td className="p-4 text-sm text-muted-foreground">{employee.department}</td>
                      <td className="p-4">
                        <Badge className={getStatusColor(employee.status)}>
                          {employee.status.charAt(0).toUpperCase() + employee.status.slice(1)}
                        </Badge>
                      </td>
                      <td className="p-4 text-sm text-foreground">{employee.tasksCompleted}</td>
                      <td className="p-4 text-sm text-foreground">{employee.projectsCount}</td>
                      <td className="p-4">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Employees;
