
import React from 'react';
import { Button } from '@/components/ui/button';
import { Briefcase, MapPin, Calendar } from 'lucide-react';

interface JobCardProps {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  jobType: string;
  experience: string;
  posted: string;
  match: number;
  isApplied?: boolean;
  onApply?: () => void;
}

const JobCard: React.FC<JobCardProps> = ({ 
  id, 
  title, 
  company, 
  location, 
  salary, 
  jobType, 
  experience, 
  posted, 
  match,
  isApplied = false,
  onApply
}) => {
  return (
    <div className="bg-app-light-gray rounded-lg p-4 flex flex-col md:flex-row md:items-center gap-4">
      <div className="md:w-2/3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-white font-medium text-lg">{title}</h3>
            <div className="text-app-text-gray mt-1">{company}</div>
          </div>
          <div className="bg-app-purple/20 text-app-purple px-3 py-1 rounded-full text-sm">
            {match}% Match
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-3">
          <div className="bg-app-dark px-3 py-1 rounded-full text-sm text-app-text-gray flex items-center">
            <Briefcase className="w-3 h-3 mr-1" />
            {jobType}
          </div>
          <div className="bg-app-dark px-3 py-1 rounded-full text-sm text-app-text-gray flex items-center">
            <MapPin className="w-3 h-3 mr-1" />
            {location}
          </div>
          <div className="bg-app-dark px-3 py-1 rounded-full text-sm text-app-text-gray">
            {experience}
          </div>
          <div className="bg-app-dark px-3 py-1 rounded-full text-sm text-app-text-gray flex items-center">
            <Calendar className="w-3 h-3 mr-1" />
            {posted}
          </div>
        </div>

        <div className="text-white mt-3">
          <span className="font-medium">Salary: </span>
          {salary}
        </div>
      </div>
      
      <div className="md:w-1/3 flex justify-end md:border-l md:border-app-gray md:pl-4">
        <div className="space-y-2 w-full">
          <Button 
            className={
              isApplied 
              ? "w-full bg-green-600 hover:bg-green-700 cursor-default"
              : "w-full bg-app-purple hover:bg-app-purple/90"
            }
            onClick={!isApplied && onApply ? onApply : undefined}
            disabled={isApplied}
          >
            {isApplied ? "Applied" : "Apply Now"}
          </Button>
          <Button variant="outline" className="w-full bg-transparent border-app-text-gray text-app-text-gray hover:text-white hover:border-white">
            Save Job
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
