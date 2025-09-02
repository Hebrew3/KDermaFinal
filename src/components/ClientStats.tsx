import {
  Users,
  Calendar,
  TrendingUp,
  Activity,
  User,
  UserPlus,
  Clock,
  Heart
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

// Interface for the stats props
interface StatsCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

// StatsCard component
export const StatsCard = ({ title, value, description, icon, trend }: StatsCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center space-x-2">
          {trend && (
            <span className={`flex items-center text-xs ${trend.isPositive ? 'text-green-500' : 'text-red-500'}`}>
              <span className={`mr-1 ${trend.isPositive ? 'rotate-0' : 'rotate-180'}`}>
                <TrendingUp size={12} />
              </span>
              {trend.value}%
            </span>
          )}
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

// Client Stats component
export const ClientStats = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatsCard
        title="Total Clients"
        value="384"
        description="Active and inactive clients"
        icon={<Users size={16} />}
      />
      <StatsCard
        title="Active Clients"
        value="297"
        description="Compared to 274 last month"
        icon={<Activity size={16} />}
        trend={{ value: 8.4, isPositive: true }}
      />
      <StatsCard
        title="New Clients"
        value="42"
        description="Acquired this month"
        icon={<UserPlus size={16} />}
        trend={{ value: 12.3, isPositive: true }}
      />
      <StatsCard
        title="Return Rate"
        value="68%"
        description="Clients with repeat visits"
        icon={<Heart size={16} />}
        trend={{ value: 4.2, isPositive: true }}
      />
    </div>
  );
};