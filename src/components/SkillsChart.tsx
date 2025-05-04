
import React from 'react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { useIsMobile } from '@/hooks/use-mobile';

interface SkillsChartProps {
  skills: { [key: string]: number };
  chartType?: 'bar' | 'pie' | 'line';
  title?: string;
  className?: string;
  height?: number | string;
}

const SkillsChart: React.FC<SkillsChartProps> = ({ 
  skills, 
  chartType = 'bar', 
  title,
  className = "",
  height = 300,
}) => {
  const data = Object.entries(skills).map(([name, value]) => ({
    name,
    value
  }));

  const COLORS = ['#9b87f5', '#7E69AB', '#6E59A5', '#8B5CF6', '#D946EF', '#F97316', '#0EA5E9'];
  const isMobile = useIsMobile();
  
  // Dynamic margin based on device size
  const getMargin = () => {
    if (isMobile) {
      return { top: 20, right: 20, left: 10, bottom: 80 };
    }
    return { top: 20, right: 30, left: 20, bottom: 60 };
  };

  if (chartType === 'bar') {
    return (
      <div className={className}>
        {title && <h4 className="text-white text-lg font-medium mb-2">{title}</h4>}
        <div style={{ width: '100%', height: typeof height === 'number' ? `${height}px` : height }}>
          <ChartContainer className="w-full h-full" config={{}}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={getMargin()}>
                <XAxis 
                  dataKey="name" 
                  tick={{ fill: '#8A8D91' }}
                  angle={-45}
                  textAnchor="end"
                  height={70}
                  interval={0}
                  fontSize={isMobile ? 10 : 12}
                />
                <YAxis 
                  tick={{ fill: '#8A8D91' }} 
                  domain={[0, 100]}
                  fontSize={isMobile ? 10 : 12}
                  width={isMobile ? 30 : 40}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="value" fill="#9b87f5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </div>
    );
  } else if (chartType === 'line') {
    return (
      <div className={className}>
        {title && <h4 className="text-white text-lg font-medium mb-2">{title}</h4>}
        <div style={{ width: '100%', height: typeof height === 'number' ? `${height}px` : height }}>
          <ChartContainer className="w-full h-full" config={{}}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={getMargin()}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fill: '#8A8D91' }} 
                  angle={-45}
                  textAnchor="end"
                  height={70}
                  interval={0}
                  fontSize={isMobile ? 10 : 12}
                />
                <YAxis 
                  tick={{ fill: '#8A8D91' }}
                  fontSize={isMobile ? 10 : 12}
                  width={isMobile ? 30 : 40}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="value" stroke="#9b87f5" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </div>
    );
  }

  // Default to pie chart
  return (
    <div className={className}>
      {title && <h4 className="text-white text-lg font-medium mb-2">{title}</h4>}
      <div style={{ width: '100%', height: typeof height === 'number' ? `${height}px` : height }}>
        <ChartContainer className="w-full h-full" config={{}}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart margin={isMobile ? { top: 0, right: 0, left: 0, bottom: 0 } : undefined}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={isMobile ? 70 : 100}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend 
                content={<ChartLegendContent />} 
                verticalAlign={isMobile ? "bottom" : "middle"} 
                align={isMobile ? "center" : "right"}
                layout={isMobile ? "horizontal" : "vertical"}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  );
};

export default SkillsChart;
