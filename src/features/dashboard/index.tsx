import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { OverviewTabContent } from './overview-tab-content';

export const Dashboard = () => {
  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
      <OverviewTabContent />
    </Tabs>
  );
};
