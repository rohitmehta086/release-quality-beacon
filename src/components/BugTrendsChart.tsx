
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Bug } from 'lucide-react';
import type { BugTrends } from '@/types/dashboard';

interface BugTrendsChartProps {
  data: BugTrends;
}

const COLORS = {
  High: '#ef4444',
  Medium: '#f59e0b',
  Low: '#10b981'
};

export const BugTrendsChart: React.FC<BugTrendsChartProps> = ({ data }) => {
  const pieData = [
    { name: 'High Severity', value: data.severityBreakdown.High, color: COLORS.High },
    { name: 'Medium Severity', value: data.severityBreakdown.Medium, color: COLORS.Medium },
    { name: 'Low Severity', value: data.severityBreakdown.Low, color: COLORS.Low }
  ];

  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bug className="h-5 w-5 text-red-600" />
          Bug Trends Overview
        </CardTitle>
        <CardDescription>
          Distribution of bugs by severity and current status
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{data.totalBugs}</div>
            <div className="text-sm text-blue-700">Total Bugs</div>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <div className="text-2xl font-bold text-red-600">{data.highSeverity}</div>
            <div className="text-sm text-red-700">High Severity</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{data.closedBugs}</div>
            <div className="text-sm text-green-700">Closed Bugs</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">{data.openBugs}</div>
            <div className="text-sm text-orange-700">Open Bugs</div>
          </div>
        </div>
        
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              dataKey="value"
              label={({ name, value }) => `${name}: ${value}`}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
