import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface TimeRange {
  label: string;
  value: string;
}

const timeRanges: TimeRange[] = [
  { label: 'Week', value: 'week' },
  { label: 'Month', value: 'month' },
  { label: 'Year', value: 'year' },
  { label: 'All', value: 'all' },
];

interface ProfitDataPoint {
  date: string;
  value: number;
}

interface ProfitChartProps {
  userId: string;
}

const ProfitChart: React.FC<ProfitChartProps> = ({ userId }) => {
  const [activeRange, setActiveRange] = useState<string>('month');

  if (!userId) {
    return <div>User not logged in. Cannot load profit data.</div>;
  }

  const fetchProfitData = async (): Promise<ProfitDataPoint[]> => {
    const { data, error } = await supabase
      .from('transactions')
      .select('created_at, amount')
      .eq('user_id', userId)
      .eq('type', 'profit')
      .order('created_at', { ascending: true });

    if (error) {
      throw new Error(error.message);
    }

    if (!data) {
      return [];
    }

    return data.map((item: any) => ({
      date: item.created_at,
      value: item.amount,
    }));
  };

  const { data, isLoading, error } = useQuery<ProfitDataPoint[], Error>({
    queryKey: ['profitData', userId, activeRange],
    queryFn: fetchProfitData,
  });

  if (isLoading) {
    return <div>Loading profit data...</div>;
  }

  if (error) {
    return <div>Error loading profit data: {error.message}</div>;
  }

  const chartData = (data || []).map(d => ({
    name: new Date(d.date).toLocaleDateString(),
    value: d.value,
  }));

  return (
    <div className="chart-container">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Profit Growth</h2>
        <div className="flex gap-2">
          {timeRanges.map((range) => (
            <Button
              key={range.value}
              variant={activeRange === range.value ? "default" : "outline"}
              className={
                activeRange === range.value
                  ? "bg-investment-green hover:bg-green-600"
                  : "text-gray-500 hover:text-gray-800"
              }
              onClick={() => setActiveRange(range.value)}
            >
              {range.label}
            </Button>
          ))}
        </div>
      </div>
      
      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9E9E9E', fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9E9E9E', fontSize: 12 }}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip
              formatter={(value) => [`$${value}`, 'Profit']}
              contentStyle={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}
            />
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4CAF50" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#4CAF50" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Line
              type="monotone"
              dataKey="value"
              stroke="#4CAF50"
              strokeWidth={3}
              activeDot={{ r: 8, fill: "#4CAF50", stroke: "white", strokeWidth: 2 }}
              dot={{ r: 4, fill: "white", stroke: "#4CAF50", strokeWidth: 2 }}
              fillOpacity={1}
              fill="url(#colorValue)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProfitChart;
