import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface ContributionDay {
  date: string;
  count: number;
}

interface ContributionGridProps {
  contributions: ContributionDay[];
  weeks?: number;
}

const getContribLevel = (count: number): string => {
  if (count === 0) return "bg-contrib-0";
  if (count <= 2) return "bg-contrib-1";
  if (count <= 5) return "bg-contrib-2";
  if (count <= 8) return "bg-contrib-3";
  return "bg-contrib-4";
};

export const ContributionGrid = ({ contributions, weeks = 52 }: ContributionGridProps) => {
  // Group contributions by week
  const weeksData: ContributionDay[][] = [];
  for (let i = 0; i < weeks; i++) {
    const weekStart = i * 7;
    weeksData.push(contributions.slice(weekStart, weekStart + 7));
  }

  return (
    <div className="flex gap-[3px] overflow-x-auto">
      {weeksData.map((week, weekIndex) => (
        <div key={weekIndex} className="flex flex-col gap-[3px]">
          {week.map((day, dayIndex) => (
            <Tooltip key={dayIndex}>
              <TooltipTrigger asChild>
                <div
                  className={`w-[11px] h-[11px] rounded-sm ${getContribLevel(day.count)} transition-all hover:ring-1 hover:ring-foreground/20`}
                />
              </TooltipTrigger>
              <TooltipContent side="top" className="text-xs">
                <p className="font-medium">{day.count} contributions</p>
                <p className="text-muted-foreground">{day.date}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      ))}
    </div>
  );
};
