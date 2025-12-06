import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Mail,
  Users,
  Plus,
  X,
  UserPlus,
  Trash2,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  avatar?: string;
  initials: string;
  avatarColor: string;
  lastLogin: string;
  teamIds: string[];
}

interface Team {
  id: string;
  name: string;
  owner: string;
  memberIds: string[];
}

const initialEmployees: Employee[] = [
  {
    id: "1",
    name: "Abdullah",
    email: "f.planing2@ratio.sa",
    phone: "+966-560300392",
    role: "Legal Specialist",
    department: "Legal",
    initials: "AB",
    avatarColor: "bg-blue-500",
    lastLogin: "4 Dec, 2025 3:28 pm",
    teamIds: ["1"],
  },
  {
    id: "2",
    name: "Mashael",
    email: "mashael.almulhim@ratio.sa",
    phone: "+966-561129955",
    role: "منسق موارد بشرية",
    department: "Human Resources",
    initials: "MA",
    avatarColor: "bg-green-500",
    lastLogin: "30 Nov, 2025 12:08 pm",
    teamIds: ["2"],
  },
  {
    id: "3",
    name: "Mohammed Almulhim",
    email: "mohammed.almulhim@ratio.sa",
    phone: "+966-508232000",
    role: "HR SPECIALIST",
    department: "Human Resources",
    initials: "MA",
    avatarColor: "bg-teal-500",
    lastLogin: "2 Dec, 2025 2:11 pm",
    teamIds: ["2"],
  },
  {
    id: "4",
    name: "ابراهيم",
    email: "ibrahim.althani@ratio.sa",
    phone: "+966-547266627",
    role: "اخصائي قانوني",
    department: "Legal",
    initials: "اب",
    avatarColor: "bg-purple-500",
    lastLogin: "4 Dec, 2025 10:54 am",
    teamIds: ["1"],
  },
  {
    id: "5",
    name: "رهام وليد التركي",
    email: "hr@ratio.sa",
    phone: "+966-567331858",
    role: "Senior Human Resources Specialist",
    department: "Human Resources",
    initials: "رو",
    avatarColor: "bg-orange-500",
    lastLogin: "4 Dec, 2025 9:24 am",
    teamIds: ["2"],
  },
  {
    id: "6",
    name: "غادة الشهراني",
    email: "hrspecialist@ratio.sa",
    phone: "+966-543306647",
    role: "أخصائي موارد بشرية",
    department: "Human Resources",
    initials: "غا",
    avatarColor: "bg-green-600",
    lastLogin: "2 Dec, 2025 8:40 am",
    teamIds: ["2"],
  },
  {
    id: "7",
    name: "منيرة وليد السماعيل",
    email: "legal.specialist@ratio.sa",
    phone: "+966-539133770",
    role: "اخصائي شؤون قانونية",
    department: "Legal",
    initials: "MS",
    avatarColor: "bg-orange-600",
    lastLogin: "4 Dec, 2025 1:30 pm",
    teamIds: ["1"],
  },
  {
    id: "8",
    name: "هنادي الزمامي",
    email: "legal@ratio.sa",
    phone: "+966-545220541",
    role: "Manager",
    department: "Legal",
    avatar: "/teams2.png",
    initials: "HZ",
    avatarColor: "bg-teal-400",
    lastLogin: "5 Dec, 2025 10:51 am",
    teamIds: ["1", "2", "3"],
  },
];

const initialTeams: Team[] = [
  {
    id: "1",
    name: "الشؤون القانونية",
    owner: "هنادي الزمامي",
    memberIds: ["1", "4", "7", "8"],
  },
  {
    id: "2",
    name: "الموارد البشرية",
    owner: "هنادي الزمامي",
    memberIds: ["2", "3", "5", "6", "8"],
  },
  {
    id: "3",
    name: "تقنية معلومات",
    owner: "هنادي الزمامي",
    memberIds: ["8"],
  },
];

type TabType = "everyone" | "teams" | "invitations" | "clients";

const Employees = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<TabType>("everyone");
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("");
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [teams, setTeams] = useState<Team[]>(initialTeams);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [teamModalOpen, setTeamModalOpen] = useState(false);
  const [createTeamOpen, setCreateTeamOpen] = useState(false);
  const [newTeamName, setNewTeamName] = useState("");

  const filteredEmployees = employees.filter((emp) => {
    return (
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleInvite = () => {
    toast({ title: "Invitation sent", description: `Invited ${inviteEmail}` });
    setInviteEmail("");
    setInviteRole("");
    setInviteDialogOpen(false);
  };

  const getTeamMembers = (team: Team) => {
    return employees.filter((emp) => team.memberIds.includes(emp.id));
  };

  const getNonTeamMembers = (team: Team) => {
    return employees.filter((emp) => !team.memberIds.includes(emp.id));
  };

  const addMemberToTeam = (teamId: string, employeeId: string) => {
    setTeams((prev) =>
      prev.map((t) =>
        t.id === teamId
          ? { ...t, memberIds: [...t.memberIds, employeeId] }
          : t
      )
    );
    setEmployees((prev) =>
      prev.map((e) =>
        e.id === employeeId
          ? { ...e, teamIds: [...e.teamIds, teamId] }
          : e
      )
    );
    toast({ title: "Member added", description: "Team member added successfully" });
  };

  const removeMemberFromTeam = (teamId: string, employeeId: string) => {
    setTeams((prev) =>
      prev.map((t) =>
        t.id === teamId
          ? { ...t, memberIds: t.memberIds.filter((id) => id !== employeeId) }
          : t
      )
    );
    setEmployees((prev) =>
      prev.map((e) =>
        e.id === employeeId
          ? { ...e, teamIds: e.teamIds.filter((id) => id !== teamId) }
          : e
      )
    );
    toast({ title: "Member removed", description: "Team member removed successfully" });
  };

  const deleteTeam = (teamId: string) => {
    setTeams((prev) => prev.filter((t) => t.id !== teamId));
    setEmployees((prev) =>
      prev.map((e) => ({
        ...e,
        teamIds: e.teamIds.filter((id) => id !== teamId),
      }))
    );
    toast({ title: "Team deleted", description: "Team has been removed" });
  };

  const createTeam = () => {
    if (!newTeamName.trim()) return;
    const newTeam: Team = {
      id: `team-${Date.now()}`,
      name: newTeamName,
      owner: "هنادي الزمامي",
      memberIds: [],
    };
    setTeams((prev) => [...prev, newTeam]);
    setNewTeamName("");
    setCreateTeamOpen(false);
    toast({ title: "Team created", description: `${newTeamName} has been created` });
  };

  const openTeamManagement = (team: Team) => {
    setSelectedTeam(team);
    setTeamModalOpen(true);
  };

  const tabs = [
    { id: "everyone" as TabType, label: "Everyone at Ratio", count: employees.length, icon: Users },
    { id: "teams" as TabType, label: "Teams", count: teams.length, icon: Users },
    { id: "invitations" as TabType, label: "Invitations", count: 0, icon: Mail },
    { id: "clients" as TabType, label: "Clients", count: 0, icon: Users },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-muted-foreground" />
          <h1 className="text-xl font-semibold text-foreground">Members</h1>
        </div>
        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by name"
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-2 pb-3 text-sm font-medium transition-colors border-b-2",
              activeTab === tab.id
                ? "text-chart-blue border-chart-blue"
                : "text-muted-foreground border-transparent hover:text-foreground"
            )}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label} / {tab.count}
          </button>
        ))}
      </div>

      {/* Content based on active tab */}
      {activeTab === "everyone" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {/* Add New User Card */}
          <Dialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen}>
            <DialogTrigger asChild>
              <Card className="cursor-pointer hover:shadow-lg transition-shadow bg-sidebar-bg border-0 min-h-[320px] flex items-center justify-center">
                <CardContent className="flex flex-col items-center justify-center gap-4 p-6">
                  <div className="w-16 h-16 rounded-full border-2 border-dashed border-white/50 flex items-center justify-center">
                    <Plus className="w-8 h-8 text-white/70" />
                  </div>
                  <span className="text-white font-medium">Add New User</span>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
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

          {/* Employee Cards */}
          {filteredEmployees.map((employee) => (
            <Card key={employee.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                {/* Avatar */}
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    <Avatar className="w-20 h-20 border-4 border-status-completed">
                      {employee.avatar ? (
                        <AvatarImage src={employee.avatar} />
                      ) : (
                        <AvatarFallback className={cn("text-white text-lg font-semibold", employee.avatarColor)}>
                          {employee.initials}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-status-completed rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                  </div>
                </div>

                {/* Name and Role */}
                <div className="text-center mb-4">
                  <h3 className="font-semibold text-foreground">{employee.name}</h3>
                  <p className="text-sm text-chart-purple">{employee.role}</p>
                </div>

                {/* Details */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Login</span>
                    <span className="text-foreground">{employee.lastLogin}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email</span>
                    <span className="text-foreground truncate max-w-[180px]">{employee.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Mobile</span>
                    <span className="text-foreground">{employee.phone}</span>
                  </div>
                </div>

                {/* Teams Button */}
                <Button
                  variant="outline"
                  className="w-full mt-4 text-chart-orange border-chart-orange/30 hover:bg-chart-orange/10"
                >
                  Teams ({employee.teamIds.length})
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === "teams" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {/* Create New Team Card */}
          <Dialog open={createTeamOpen} onOpenChange={setCreateTeamOpen}>
            <DialogTrigger asChild>
              <Card className="cursor-pointer hover:shadow-lg transition-shadow bg-sidebar-bg border-0 min-h-[280px] flex items-center justify-center">
                <CardContent className="flex flex-col items-center justify-center gap-4 p-6">
                  <div className="w-16 h-16 rounded-full border-2 border-dashed border-white/50 flex items-center justify-center">
                    <Plus className="w-8 h-8 text-white/70" />
                  </div>
                  <span className="text-white font-medium">Create New Team</span>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Create New Team</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Team Name</label>
                  <Input
                    placeholder="Enter team name"
                    value={newTeamName}
                    onChange={(e) => setNewTeamName(e.target.value)}
                  />
                </div>
                <Button
                  className="w-full bg-sidebar-bg hover:bg-sidebar-bg/90"
                  onClick={createTeam}
                  disabled={!newTeamName.trim()}
                >
                  Create Team
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Team Cards */}
          {teams.map((team) => (
            <Card key={team.id} className="hover:shadow-lg transition-shadow relative border-2 border-status-completed">
              <button
                onClick={() => deleteTeam(team.id)}
                className="absolute top-2 right-2 w-5 h-5 bg-destructive rounded-full flex items-center justify-center hover:bg-destructive/80"
              >
                <X className="w-3 h-3 text-white" />
              </button>
              <CardContent className="p-6 flex flex-col items-center">
                {/* Team Icon */}
                <div className="w-20 h-20 rounded-full border-4 border-status-completed flex items-center justify-center mb-4 bg-blue-50">
                  <Users className="w-10 h-10 text-sidebar-bg" />
                </div>

                {/* Team Name */}
                <h3 className="font-semibold text-foreground text-lg mb-1">{team.name}</h3>
                <p className="text-sm text-muted-foreground mb-1">Owner: {team.owner}</p>
                <p className="text-sm text-foreground">{team.memberIds.length} Members</p>

                {/* Manage Team Button */}
                <Button
                  variant="outline"
                  className="w-full mt-4 text-chart-orange border-chart-orange/30 hover:bg-chart-orange/10"
                  onClick={() => openTeamManagement(team)}
                >
                  Add More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === "invitations" && (
        <div className="flex flex-col items-center justify-center py-16">
          <Mail className="w-16 h-16 text-muted-foreground/50 mb-4" />
          <h3 className="text-lg font-medium text-muted-foreground">No pending invitations</h3>
          <p className="text-sm text-muted-foreground">Invitations you send will appear here</p>
        </div>
      )}

      {activeTab === "clients" && (
        <div className="flex flex-col items-center justify-center py-16">
          <Users className="w-16 h-16 text-muted-foreground/50 mb-4" />
          <h3 className="text-lg font-medium text-muted-foreground">No clients yet</h3>
          <p className="text-sm text-muted-foreground">Your clients will appear here</p>
        </div>
      )}

      {/* Team Management Modal */}
      <Dialog open={teamModalOpen} onOpenChange={setTeamModalOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Manage Team: {selectedTeam?.name}
            </DialogTitle>
          </DialogHeader>
          
          {selectedTeam && (
            <div className="flex-1 overflow-auto space-y-6 py-4">
              {/* Current Members */}
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Current Members ({getTeamMembers(selectedTeam).length})
                </h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {getTeamMembers(selectedTeam).map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          {member.avatar ? (
                            <AvatarImage src={member.avatar} />
                          ) : (
                            <AvatarFallback className={cn("text-white text-sm", member.avatarColor)}>
                              {member.initials}
                            </AvatarFallback>
                          )}
                        </Avatar>
                        <div>
                          <p className="font-medium text-foreground">{member.name}</p>
                          <p className="text-sm text-muted-foreground">{member.role}</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => removeMemberFromTeam(selectedTeam.id, member.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  {getTeamMembers(selectedTeam).length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-4">No members in this team</p>
                  )}
                </div>
              </div>

              {/* Add Members */}
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <UserPlus className="w-4 h-4" />
                  Add Members
                </h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {getNonTeamMembers(selectedTeam).map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/30 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          {member.avatar ? (
                            <AvatarImage src={member.avatar} />
                          ) : (
                            <AvatarFallback className={cn("text-white text-sm", member.avatarColor)}>
                              {member.initials}
                            </AvatarFallback>
                          )}
                        </Avatar>
                        <div>
                          <p className="font-medium text-foreground">{member.name}</p>
                          <p className="text-sm text-muted-foreground">{member.role}</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-status-completed hover:text-status-completed hover:bg-status-completed/10"
                        onClick={() => addMemberToTeam(selectedTeam.id, member.id)}
                      >
                        <Check className="w-4 h-4 mr-1" />
                        Add
                      </Button>
                    </div>
                  ))}
                  {getNonTeamMembers(selectedTeam).length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-4">All members are in this team</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Employees;
