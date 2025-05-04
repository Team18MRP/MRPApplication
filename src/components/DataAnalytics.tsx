
import React from 'react';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from '@/components/ui/chart';
import { 
  BarChart as RechartsBarChart, 
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartPie, ChartBar } from 'lucide-react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { useIsMobile } from '@/hooks/use-mobile';

// Business Analyst Jobs dataset
const businessAnalystData = {
  // Average salary by experience level
  salaryByExperience: [
    { name: 'Entry Level', value: 65000 },
    { name: 'Mid Level', value: 85000 },
    { name: 'Senior Level', value: 120000 },
    { name: 'Executive', value: 150000 },
  ],
  // Job distribution by location
  jobsByLocation: [
    { name: 'New York', value: 24 },
    { name: 'California', value: 22 },
    { name: 'Texas', value: 16 },
    { name: 'Illinois', value: 12 },
    { name: 'Massachusetts', value: 8 },
    { name: 'Other', value: 18 },
  ],
  // Skills demand trend over time (months)
  skillsDemandTrend: [
    { name: 'Jan', SQL: 85, Excel: 90, PowerBI: 70, Python: 65 },
    { name: 'Feb', SQL: 86, Excel: 88, PowerBI: 72, Python: 68 },
    { name: 'Mar', SQL: 84, Excel: 91, PowerBI: 75, Python: 71 },
    { name: 'Apr', SQL: 88, Excel: 89, PowerBI: 76, Python: 75 },
    { name: 'May', SQL: 90, Excel: 87, PowerBI: 78, Python: 78 },
    { name: 'Jun', SQL: 92, Excel: 88, PowerBI: 80, Python: 80 },
    { name: 'Jul', SQL: 93, Excel: 86, PowerBI: 83, Python: 82 },
    { name: 'Aug', SQL: 95, Excel: 85, PowerBI: 85, Python: 86 },
    { name: 'Sep', SQL: 94, Excel: 83, PowerBI: 88, Python: 89 },
    { name: 'Oct', SQL: 96, Excel: 82, PowerBI: 90, Python: 92 },
  ],
  // Job postings by industry
  jobsByIndustry: [
    { name: 'Technology', value: 35 },
    { name: 'Finance', value: 25 },
    { name: 'Healthcare', value: 15 },
    { name: 'Retail', value: 10 },
    { name: 'Manufacturing', value: 8 },
    { name: 'Other', value: 7 },
  ],
  // Top job titles
  topJobTitles: [
    { title: 'Business Analyst', count: 45, avgSalary: '$85,000' },
    { title: 'Data Analyst', count: 32, avgSalary: '$78,000' },
    { title: 'Business Intelligence Analyst', count: 28, avgSalary: '$92,000' },
    { title: 'Systems Analyst', count: 22, avgSalary: '$89,000' },
    { title: 'Financial Analyst', count: 18, avgSalary: '$81,000' },
  ],
};

const COLORS = ['#9b87f5', '#7E69AB', '#6E59A5', '#8B5CF6', '#D946EF', '#F97316'];

const DataAnalytics: React.FC = () => {
  const isMobile = useIsMobile();
  
  const getResponsiveMargin = () => {
    return isMobile 
      ? { top: 20, right: 20, left: 10, bottom: 80 }
      : { top: 20, right: 30, left: 20, bottom: 50 };
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-app-gray border-none">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-white">Salary Distribution</CardTitle>
              <CardDescription className="text-app-text-gray">By experience level</CardDescription>
            </div>
            <ChartBar className="h-5 w-5 text-app-purple" />
          </CardHeader>
          <CardContent className="h-72">
            <ChartContainer className="h-full w-full" config={{}}>
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart data={businessAnalystData.salaryByExperience} margin={getResponsiveMargin()}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fill: '#8A8D91' }} 
                    angle={-45}
                    textAnchor="end"
                    height={50}
                    interval={0}
                    fontSize={isMobile ? 10 : 12}
                  />
                  <YAxis 
                    tick={{ fill: '#8A8D91' }} 
                    fontSize={isMobile ? 10 : 12}
                    width={isMobile ? 30 : 40}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="value" name="Average Salary ($)" fill="#9b87f5" radius={[4, 4, 0, 0]} />
                </RechartsBarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="bg-app-gray border-none">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-white">Job Distribution</CardTitle>
              <CardDescription className="text-app-text-gray">By location</CardDescription>
            </div>
            <ChartPie className="h-5 w-5 text-app-purple" />
          </CardHeader>
          <CardContent className="h-72">
            <ChartContainer className="h-full w-full" config={{}}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={isMobile ? { top: 0, right: 0, left: 0, bottom: 0 } : undefined}>
                  <Pie
                    data={businessAnalystData.jobsByLocation}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={isMobile ? 70 : 90}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={isMobile ? undefined : ({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {businessAnalystData.jobsByLocation.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-app-gray border-none">
        <CardHeader>
          <CardTitle className="text-white">Skills Demand Trend</CardTitle>
          <CardDescription className="text-app-text-gray">Monthly trend of in-demand skills</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <ChartContainer className="h-full w-full" config={{}}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={businessAnalystData.skillsDemandTrend} margin={getResponsiveMargin()}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fill: '#8A8D91' }} 
                  fontSize={isMobile ? 10 : 12}
                  height={isMobile ? 40 : 20}
                />
                <YAxis 
                  tick={{ fill: '#8A8D91' }} 
                  domain={[60, 100]} 
                  fontSize={isMobile ? 10 : 12}
                  width={isMobile ? 30 : 40}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend 
                  wrapperStyle={isMobile ? { fontSize: '10px' } : undefined}
                />
                <Line type="monotone" dataKey="SQL" stroke="#9b87f5" strokeWidth={2} activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="Excel" stroke="#D946EF" strokeWidth={2} activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="PowerBI" stroke="#F97316" strokeWidth={2} activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="Python" stroke="#0EA5E9" strokeWidth={2} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-app-gray border-none">
          <CardHeader>
            <CardTitle className="text-white">Job Distribution by Industry</CardTitle>
            <CardDescription className="text-app-text-gray">Business analyst roles across sectors</CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <ChartContainer className="h-full w-full" config={{}}>
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart data={businessAnalystData.jobsByIndustry} layout="vertical" margin={getResponsiveMargin()}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis 
                    type="number" 
                    tick={{ fill: '#8A8D91' }}
                    fontSize={isMobile ? 10 : 12}
                  />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    width={isMobile ? 80 : 100} 
                    tick={{ fill: '#8A8D91' }}
                    fontSize={isMobile ? 10 : 12}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="value" name="Job Postings (%)" fill="#8B5CF6" radius={[0, 4, 4, 0]} />
                </RechartsBarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="bg-app-gray border-none overflow-auto">
          <CardHeader>
            <CardTitle className="text-white">Top Job Titles</CardTitle>
            <CardDescription className="text-app-text-gray">Most common analyst positions</CardDescription>
          </CardHeader>
          <CardContent className="pr-2 max-h-72 overflow-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-app-light-gray">
                  <TableHead className="text-white">Job Title</TableHead>
                  <TableHead className="text-white text-right">Listings</TableHead>
                  <TableHead className="text-white text-right">Avg. Salary</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {businessAnalystData.topJobTitles.map((job, index) => (
                  <TableRow key={index} className="border-b border-app-light-gray">
                    <TableCell className="text-app-text-gray">{job.title}</TableCell>
                    <TableCell className="text-app-text-gray text-right">{job.count}</TableCell>
                    <TableCell className="text-app-text-gray text-right">{job.avgSalary}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DataAnalytics;
