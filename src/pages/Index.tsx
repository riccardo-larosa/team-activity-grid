import { useState, useMemo } from "react";
import { TeamSelector } from "@/components/TeamSelector";
import { TeamMemberRow } from "@/components/TeamMemberRow";
import { DateRangeFilter, DateRange } from "@/components/DateRangeFilter";
import { teams, getTeamMembers, getDefaultDateRange } from "@/lib/mockData";
import { Activity, GitCommit, TrendingUp } from "lucide-react";
import { differenceInDays } from "date-fns";

const Index = () => {
  const [selectedTeam, setSelectedTeam] = useState(teams[0].id);
  const [dateRange, setDateRange] = useState<DateRange>(getDefaultDateRange());
  
  const teamMembers = useMemo(
    () => getTeamMembers(selectedTeam, dateRange),
    [selectedTeam, dateRange]
  );
  
  const teamStats = useMemo(() => {
    const total = teamMembers.reduce((sum, m) => sum + m.totalContributions, 0);
    const avg = Math.round(total / teamMembers.length);
    const topContributor = teamMembers.reduce((top, m) => 
      m.totalContributions > top.totalContributions ? m : top
    );
    return { total, avg, topContributor };
  }, [teamMembers]);

  const periodLabel = useMemo(() => {
    const days = differenceInDays(dateRange.to, dateRange.from);
    if (days <= 7) return "Last week";
    if (days <= 30) return "Last month";
    if (days <= 90) return "Last 3 months";
    if (days <= 182) return "Last 6 months";
    return "Last year";
  }, [dateRange]);

  const currentTeam = teams.find((t) => t.id === selectedTeam);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-foreground mb-1">
            Team Activity Dashboard
          </h1>
          <p className="text-muted-foreground">
            Track contributions and activity across your development teams
          </p>
        </div>

        {/* Team Selector, Date Filter and Stats */}
        <div className="flex flex-col gap-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <TeamSelector
              teams={teams}
              selectedTeam={selectedTeam}
              onSelectTeam={setSelectedTeam}
            />
            <DateRangeFilter
              dateRange={dateRange}
              onDateRangeChange={setDateRange}
            />
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 px-4 py-2 bg-card rounded-lg border border-border/50">
              <Activity className="h-4 w-4 text-contrib-3" />
              <div>
                <p className="text-xs text-muted-foreground">Total</p>
                <p className="font-semibold text-foreground">{teamStats.total.toLocaleString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 px-4 py-2 bg-card rounded-lg border border-border/50">
              <GitCommit className="h-4 w-4 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Avg/Member</p>
                <p className="font-semibold text-foreground">{teamStats.avg.toLocaleString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 px-4 py-2 bg-card rounded-lg border border-border/50">
              <TrendingUp className="h-4 w-4 text-contrib-4" />
              <div>
                <p className="text-xs text-muted-foreground">Top Contributor</p>
                <p className="font-semibold text-foreground">{teamStats.topContributor.name.split(" ")[0]}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Team Name */}
        <div className="mb-6">
          <h2 className="text-lg font-medium text-foreground">
            {currentTeam?.name}
          </h2>
          <p className="text-sm text-muted-foreground">
            {currentTeam?.memberCount} team members · {periodLabel} of activity
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-2 mb-6 text-xs text-muted-foreground">
          <span>Less</span>
          <div className="flex gap-[3px]">
            <div className="w-[11px] h-[11px] rounded-sm bg-contrib-0" />
            <div className="w-[11px] h-[11px] rounded-sm bg-contrib-1" />
            <div className="w-[11px] h-[11px] rounded-sm bg-contrib-2" />
            <div className="w-[11px] h-[11px] rounded-sm bg-contrib-3" />
            <div className="w-[11px] h-[11px] rounded-sm bg-contrib-4" />
          </div>
          <span>More</span>
        </div>

        {/* Team Members Grid */}
        <div className="space-y-3">
          {teamMembers.map((member) => (
            <TeamMemberRow
              key={member.name}
              name={member.name}
              role={member.role}
              contributions={member.contributions}
              totalContributions={member.totalContributions}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
