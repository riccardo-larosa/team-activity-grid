import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Users } from "lucide-react";

interface Team {
  id: string;
  name: string;
  memberCount: number;
}

interface TeamSelectorProps {
  teams: Team[];
  selectedTeam: string;
  onSelectTeam: (teamId: string) => void;
}

export const TeamSelector = ({ teams, selectedTeam, onSelectTeam }: TeamSelectorProps) => {
  const selected = teams.find((t) => t.id === selectedTeam);

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Users className="h-4 w-4" />
        <span className="text-sm font-medium">Team</span>
      </div>
      <Select value={selectedTeam} onValueChange={onSelectTeam}>
        <SelectTrigger className="w-[280px] bg-card border-border/50">
          <SelectValue placeholder="Select a team">
            {selected && (
              <span className="flex items-center gap-2">
                <span>{selected.name}</span>
                <span className="text-muted-foreground text-xs">
                  ({selected.memberCount} members)
                </span>
              </span>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {teams.map((team) => (
            <SelectItem key={team.id} value={team.id}>
              <span className="flex items-center gap-2">
                <span>{team.name}</span>
                <span className="text-muted-foreground text-xs">
                  ({team.memberCount} members)
                </span>
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
