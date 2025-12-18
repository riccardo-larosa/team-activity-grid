import { ContributionGrid } from "./ContributionGrid";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ContributionDay {
  date: string;
  count: number;
}

interface TeamMemberRowProps {
  name: string;
  avatar?: string;
  role: string;
  contributions: ContributionDay[];
  totalContributions: number;
}

export const TeamMemberRow = ({
  name,
  avatar,
  role,
  contributions,
  totalContributions,
}: TeamMemberRowProps) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="flex items-center gap-6 p-4 bg-card rounded-xl border border-border/50 hover:border-border transition-colors">
      <div className="flex items-center gap-4 min-w-[200px]">
        <Avatar className="h-10 w-10">
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback className="bg-secondary text-secondary-foreground text-sm font-medium">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium text-foreground">{name}</p>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </div>
      
      <div className="flex-1 overflow-hidden">
        <ContributionGrid contributions={contributions} weeks={26} />
      </div>
      
      <div className="text-right min-w-[100px]">
        <p className="font-semibold text-foreground">{totalContributions.toLocaleString()}</p>
        <p className="text-xs text-muted-foreground">contributions</p>
      </div>
    </div>
  );
};
