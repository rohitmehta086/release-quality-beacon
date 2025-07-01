
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Bug, CheckCircle, AlertTriangle } from 'lucide-react';
import type { DashboardMetrics } from '@/types/dashboard';

interface MetricsOverviewProps {
  data: DashboardMetrics;
}

export const MetricsOverview: React.FC<MetricsOverviewProps> = ({ data }) => {
  const avgPassRate = data.testCasePassRate.length > 0 
    ? Math.round((data.testCasePassRate.reduce((sum, item) => sum + item.avgPassRate, 0) / data.testCasePassRate.length) * 100) / 100
    : 0;

  const totalTestRuns = data.bugCountPerRun.length;
  const runsWithNoBugs = data.bugCountPerRun.filter(run => run.bugCount === 0).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-emerald-100">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-green-700">
            Avg Pass Rate
          </CardTitle>
          <TrendingUp className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-800">{avgPassRate}%</div>
          <p className="text-xs text-green-600 mt-1">
            Across all releases
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-lg border-0 bg-gradient-to-br from-red-50 to-rose-100">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-red-700">
            Total Bugs
          </CardTitle>
          <Bug className="h-4 w-4 text-red-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-800">{data.bugTrends.totalBugs}</div>
          <p className="text-xs text-red-600 mt-1">
            {data.bugTrends.highSeverity} high severity
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-cyan-100">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-blue-700">
            Bug Resolution
          </CardTitle>
          <CheckCircle className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-800">
            {Math.round((data.bugTrends.closedBugs / data.bugTrends.totalBugs) * 100)}%
          </div>
          <p className="text-xs text-blue-600 mt-1">
            {data.bugTrends.closedBugs} of {data.bugTrends.totalBugs} closed
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-lg border-0 bg-gradient-to-br from-purple-50 to-violet-100">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-purple-700">
            Clean Runs
          </CardTitle>
          <AlertTriangle className="h-4 w-4 text-purple-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-purple-800">
            {totalTestRuns > 0 ? Math.round((runsWithNoBugs / totalTestRuns) * 100) : 0}%
          </div>
          <p className="text-xs text-purple-600 mt-1">
            {runsWithNoBugs} of {totalTestRuns} runs
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
