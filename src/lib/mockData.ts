import { differenceInDays } from "date-fns";

export type DateRange = {
  from: Date;
  to: Date;
};

// Seeded random for consistent data per member
const seededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

// Generate mock contribution data for a date range
const generateContributions = (
  dateRange: DateRange,
  activityLevel: number = 0.5,
  seed: number = 0
) => {
  const contributions = [];
  const days = differenceInDays(dateRange.to, dateRange.from) + 1;

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(dateRange.to);
    date.setDate(date.getDate() - i);

    // Use seeded random for consistent data
    const daySeed = seed + date.getTime();
    const random = seededRandom(daySeed);

    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const baseChance = isWeekend ? 0.3 : 0.7;
    const hasContribution = random < baseChance * activityLevel;
    const count = hasContribution
      ? Math.floor(seededRandom(daySeed + 1) * 12 * activityLevel) + 1
      : 0;

    contributions.push({
      date: date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      count,
    });
  }

  return contributions;
};

const calculateTotal = (contributions: { count: number }[]) =>
  contributions.reduce((sum, c) => sum + c.count, 0);

export const teams = [
  { id: "frontend", name: "Frontend Platform", memberCount: 6 },
  { id: "backend", name: "Backend Services", memberCount: 7 },
  { id: "mobile", name: "Mobile Apps", memberCount: 5 },
  { id: "devops", name: "DevOps & Infrastructure", memberCount: 4 },
  { id: "data", name: "Data Engineering", memberCount: 6 },
  { id: "ml", name: "Machine Learning", memberCount: 5 },
  { id: "security", name: "Security", memberCount: 4 },
  { id: "qa", name: "Quality Assurance", memberCount: 6 },
  { id: "design-system", name: "Design Systems", memberCount: 5 },
  { id: "api", name: "API Platform", memberCount: 7 },
  { id: "payments", name: "Payments", memberCount: 5 },
  { id: "search", name: "Search & Discovery", memberCount: 6 },
  { id: "notifications", name: "Notifications", memberCount: 4 },
  { id: "analytics", name: "Analytics", memberCount: 5 },
  { id: "auth", name: "Authentication", memberCount: 4 },
  { id: "growth", name: "Growth Engineering", memberCount: 6 },
  { id: "platform", name: "Platform Core", memberCount: 7 },
  { id: "internal", name: "Internal Tools", memberCount: 5 },
  { id: "integrations", name: "Integrations", memberCount: 6 },
  { id: "localization", name: "Localization", memberCount: 4 },
  { id: "performance", name: "Performance", memberCount: 5 },
  { id: "reliability", name: "Site Reliability", memberCount: 6 },
];

const membersByTeam: Record<string, { name: string; role: string; activityLevel: number }[]> = {
  frontend: [
    { name: "Sarah Chen", role: "Tech Lead", activityLevel: 0.9 },
    { name: "Marcus Johnson", role: "Senior Engineer", activityLevel: 0.85 },
    { name: "Emily Rodriguez", role: "Senior Engineer", activityLevel: 0.8 },
    { name: "Alex Kim", role: "Engineer", activityLevel: 0.7 },
    { name: "Jordan Lee", role: "Engineer", activityLevel: 0.65 },
    { name: "Taylor Swift", role: "Junior Engineer", activityLevel: 0.5 },
  ],
  backend: [
    { name: "Michael Brown", role: "Tech Lead", activityLevel: 0.95 },
    { name: "Lisa Wang", role: "Senior Engineer", activityLevel: 0.88 },
    { name: "David Miller", role: "Senior Engineer", activityLevel: 0.82 },
    { name: "Rachel Green", role: "Engineer", activityLevel: 0.75 },
    { name: "Chris Evans", role: "Engineer", activityLevel: 0.7 },
    { name: "Nina Patel", role: "Engineer", activityLevel: 0.68 },
    { name: "Tom Wilson", role: "Junior Engineer", activityLevel: 0.55 },
  ],
  mobile: [
    { name: "Jessica Liu", role: "Tech Lead", activityLevel: 0.92 },
    { name: "Ryan Cooper", role: "Senior Engineer", activityLevel: 0.84 },
    { name: "Amanda Foster", role: "Engineer", activityLevel: 0.76 },
    { name: "Kevin Zhang", role: "Engineer", activityLevel: 0.72 },
    { name: "Sophie Martin", role: "Junior Engineer", activityLevel: 0.58 },
  ],
  devops: [
    { name: "James Wright", role: "Tech Lead", activityLevel: 0.88 },
    { name: "Olivia Scott", role: "Senior Engineer", activityLevel: 0.82 },
    { name: "Daniel Kim", role: "Engineer", activityLevel: 0.74 },
    { name: "Emma Davis", role: "Engineer", activityLevel: 0.69 },
  ],
};

// Generate default members for teams without specific data
const defaultMembers = [
  { name: "Alex Thompson", role: "Tech Lead", activityLevel: 0.9 },
  { name: "Sam Williams", role: "Senior Engineer", activityLevel: 0.85 },
  { name: "Jamie Garcia", role: "Senior Engineer", activityLevel: 0.78 },
  { name: "Casey Brown", role: "Engineer", activityLevel: 0.72 },
  { name: "Morgan Lee", role: "Engineer", activityLevel: 0.68 },
  { name: "Riley Taylor", role: "Junior Engineer", activityLevel: 0.55 },
];

export const getDefaultDateRange = (): DateRange => {
  const to = new Date();
  const from = new Date();
  from.setDate(from.getDate() - 182); // 6 months default
  return { from, to };
};

export const getTeamMembers = (teamId: string, dateRange: DateRange = getDefaultDateRange()) => {
  const members = membersByTeam[teamId] || defaultMembers.slice(0, teams.find(t => t.id === teamId)?.memberCount || 5);
  
  return members.map((member, index) => {
    // Use member index as seed for consistent data
    const seed = teamId.charCodeAt(0) * 1000 + index;
    const contributions = generateContributions(dateRange, member.activityLevel, seed);
    return {
      ...member,
      contributions,
      totalContributions: calculateTotal(contributions),
    };
  });
};
