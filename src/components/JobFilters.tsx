
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Filter, Search } from 'lucide-react';

interface JobFiltersProps {
  onFilterChange: (filters: {
    search: string;
    jobType: string;
    location: string;
    experience: string;
  }) => void;
}

const JobFilters: React.FC<JobFiltersProps> = ({ onFilterChange }) => {
  const [search, setSearch] = React.useState('');
  const [jobType, setJobType] = React.useState('all');
  const [location, setLocation] = React.useState('all');
  const [experience, setExperience] = React.useState('all');

  // Update filters whenever any filter value changes
  React.useEffect(() => {
    onFilterChange({
      search,
      jobType: jobType === 'all' ? '' : jobType,
      location: location === 'all' ? '' : location,
      experience: experience === 'all' ? '' : experience
    });
  }, [search, jobType, location, experience, onFilterChange]);

  return (
    <Card className="bg-app-gray border-none mb-6">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Filter className="mr-2 h-5 w-5" />
          Filter Jobs
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-app-text-gray" />
              <Input
                placeholder="Search job titles or keywords..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-app-light-gray border-app-light-gray text-white pl-8"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="jobType" className="text-white">Job Type</Label>
              <Select value={jobType} onValueChange={setJobType}>
                <SelectTrigger id="jobType" className="bg-app-light-gray border-app-light-gray text-white">
                  <SelectValue placeholder="All Job Types" />
                </SelectTrigger>
                <SelectContent className="bg-app-gray text-white border-app-light-gray">
                  <SelectItem value="all">All Job Types</SelectItem>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                  <SelectItem value="Internship">Internship</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="text-white">Location</Label>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger id="location" className="bg-app-light-gray border-app-light-gray text-white">
                  <SelectValue placeholder="All Locations" />
                </SelectTrigger>
                <SelectContent className="bg-app-gray text-white border-app-light-gray">
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="Remote">Remote</SelectItem>
                  <SelectItem value="San Francisco, CA">San Francisco, CA</SelectItem>
                  <SelectItem value="New York, NY">New York, NY</SelectItem>
                  <SelectItem value="Austin, TX">Austin, TX</SelectItem>
                  <SelectItem value="Seattle, WA">Seattle, WA</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience" className="text-white">Experience Level</Label>
              <Select value={experience} onValueChange={setExperience}>
                <SelectTrigger id="experience" className="bg-app-light-gray border-app-light-gray text-white">
                  <SelectValue placeholder="All Levels" />
                </SelectTrigger>
                <SelectContent className="bg-app-gray text-white border-app-light-gray">
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="Entry Level">Entry Level</SelectItem>
                  <SelectItem value="Mid Level">Mid Level</SelectItem>
                  <SelectItem value="Senior Level">Senior Level</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobFilters;
