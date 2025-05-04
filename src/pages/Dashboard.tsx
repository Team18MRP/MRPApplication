import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  PieChart, 
  BarChart, 
  Calendar, 
  Settings, 
  LogOut, 
  FileText, 
  Briefcase,
  ChartBar,
  User
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import ResumeUpload from '@/components/ResumeUpload';
import SkillsChart from '@/components/SkillsChart';
import JobCard from '@/components/JobCard';
import JobFilters from '@/components/JobFilters';
import DataAnalytics from '@/components/DataAnalytics';
import { toast } from '@/components/ui/sonner';
import JobListings from '@/components/JobListings';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("data");
  const [userName, setUserName] = useState<string>("Admin");
  const [userEmail, setUserEmail] = useState<string>("admin@example.com");
  const [userPhone, setUserPhone] = useState<string>("+1 (555) 123-4567");
  const [userPassword, setUserPassword] = useState<string>("");
  const [filterSearch, setFilterSearch] = useState<string>("");
  const [filterJobType, setFilterJobType] = useState<string>("");
  const [filterLocation, setFilterLocation] = useState<string>("");
  const [filterExperience, setFilterExperience] = useState<string>("");
  const [appliedJobs, setAppliedJobs] = useState<number[]>([]);
  
  // Use the currentUser from localStorage if available
  useEffect(() => {
    const currentUserJSON = localStorage.getItem('currentUser');
    if (currentUserJSON) {
      const currentUser = JSON.parse(currentUserJSON);
      if (currentUser.name) {
        setUserName(currentUser.name);
      }
      if (currentUser.email) {
        setUserEmail(currentUser.email);
      }
      if (currentUser.phone) {
        setUserPhone(currentUser.phone);
      }
      if (currentUser.password) {
        setUserPassword(currentUser.password);
      }
    }

    // Get applied jobs from localStorage if available
    const appliedJobsJSON = localStorage.getItem('appliedJobs');
    if (appliedJobsJSON) {
      setAppliedJobs(JSON.parse(appliedJobsJSON));
    }
  }, []);
  
  // Mock data for the job listings - focus on Business Analyst roles
  const [allJobs] = useState([
    {
      id: 1,
      title: 'Business Analyst',
      company: 'Tech Innovators Inc.',
      location: 'San Francisco, CA',
      salary: '$85,000 - $120,000',
      jobType: 'Full-time',
      experience: 'Mid Level',
      posted: '3 days ago',
      match: 92,
    },
    {
      id: 2,
      title: 'Senior Business Analyst',
      company: 'Global Analytics Partners',
      location: 'New York, NY',
      salary: '$110,000 - $140,000',
      jobType: 'Full-time',
      experience: 'Senior Level',
      posted: '1 week ago',
      match: 88,
    },
    {
      id: 3,
      title: 'Data Analyst',
      company: 'Insight Solutions',
      location: 'Remote',
      salary: '$75,000 - $95,000',
      jobType: 'Full-time',
      experience: 'Mid Level',
      posted: '2 days ago',
      match: 85,
    },
    {
      id: 4,
      title: 'Business Intelligence Analyst',
      company: 'Data Driven Corp',
      location: 'Austin, TX',
      salary: '$90,000 - $110,000',
      jobType: 'Full-time',
      experience: 'Senior Level',
      posted: '1 day ago',
      match: 82,
    },
    {
      id: 5,
      title: 'Junior Business Analyst',
      company: 'StartUp Ventures',
      location: 'Remote',
      salary: '$60,000 - $75,000',
      jobType: 'Full-time',
      experience: 'Entry Level',
      posted: '5 days ago',
      match: 78,
    },
    {
      id: 6,
      title: 'Business Systems Analyst',
      company: 'Enterprise Solutions Inc.',
      location: 'Seattle, WA',
      salary: '$95,000 - $125,000',
      jobType: 'Full-time',
      experience: 'Mid Level',
      posted: '3 days ago',
      match: 76,
    },
    {
      id: 7,
      title: 'Product Analyst',
      company: 'Digital Products Co.',
      location: 'San Francisco, CA',
      salary: '$80,000 - $110,000',
      jobType: 'Full-time',
      experience: 'Mid Level',
      posted: '1 week ago',
      match: 74,
    },
    {
      id: 8,
      title: 'Financial Analyst',
      company: 'Global Banking Group',
      location: 'New York, NY',
      salary: '$85,000 - $115,000',
      jobType: 'Full-time',
      experience: 'Mid Level',
      posted: '2 days ago',
      match: 72,
    },
    {
      id: 9,
      title: 'Business Analyst Intern',
      company: 'Tech Accelerator',
      location: 'San Francisco, CA',
      salary: '$25/hour',
      jobType: 'Internship',
      experience: 'Entry Level',
      posted: '1 week ago',
      match: 70,
    },
    {
      id: 10,
      title: 'Business Analyst (Contract)',
      company: 'Project Consultants Ltd.',
      location: 'Remote',
      salary: '$50 - $70/hour',
      jobType: 'Contract',
      experience: 'Mid Level',
      posted: '4 days ago',
      match: 68,
    },
    {
      id: 11,
      title: 'IT Business Analyst',
      company: 'Tech Systems International',
      location: 'Austin, TX',
      salary: '$90,000 - $115,000',
      jobType: 'Full-time',
      experience: 'Mid Level',
      posted: '2 days ago',
      match: 65,
    },
    {
      id: 12,
      title: 'Healthcare Business Analyst',
      company: 'Medical Systems Inc.',
      location: 'Seattle, WA',
      salary: '$85,000 - $105,000',
      jobType: 'Full-time',
      experience: 'Mid Level',
      posted: '1 week ago',
      match: 62,
    }
  ]);

  // Filter jobs based on current filters
  const filteredJobs = allJobs.filter(job => {
    // Filter by search term (title or company)
    const matchesSearch = filterSearch === '' || 
      job.title.toLowerCase().includes(filterSearch.toLowerCase()) ||
      job.company.toLowerCase().includes(filterSearch.toLowerCase());
    
    // Filter by job type
    const matchesJobType = filterJobType === '' || job.jobType === filterJobType;
    
    // Filter by location
    const matchesLocation = filterLocation === '' || job.location === filterLocation;
    
    // Filter by experience level
    const matchesExperience = filterExperience === '' || job.experience === filterExperience;
    
    return matchesSearch && matchesJobType && matchesLocation && matchesExperience;
  });

  // Mock data for job market trends
  const jobTrends = {
    'Jan': 65,
    'Feb': 70,
    'Mar': 60,
    'Apr': 75,
    'May': 85,
    'Jun': 80,
    'Jul': 90,
    'Aug': 85,
    'Sep': 95,
    'Oct': 88,
  };

  const skillDemand = {
    'SQL': 96,
    'Excel': 82,
    'PowerBI': 90,
    'Python': 92,
    'Tableau': 88,
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  const handleSaveSettings = () => {
    // Update the user data in localStorage
    const currentUser = {
      name: userName,
      email: userEmail,
      phone: userPhone,
      password: userPassword
    };
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    toast.success('Settings saved successfully');
  };

  const handleFilterChange = (filters: { search: string, jobType: string, location: string, experience: string }) => {
    setFilterSearch(filters.search);
    setFilterJobType(filters.jobType);
    setFilterLocation(filters.location);
    setFilterExperience(filters.experience);
  };

  const handleApplyJob = (jobId: number) => {
    if (!appliedJobs.includes(jobId)) {
      const newAppliedJobs = [...appliedJobs, jobId];
      setAppliedJobs(newAppliedJobs);
      localStorage.setItem('appliedJobs', JSON.stringify(newAppliedJobs));
      toast.success('Job application submitted successfully');
    }
  };

  const handleRoleSelect = (role: string) => {
    setFilterSearch(role);
    setActiveTab("jobs");
  };

  return (
    <div className="min-h-screen bg-app-dark">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 bottom-0 w-64 bg-app-gray p-4 flex flex-col">
        <div className="mb-8 flex items-center">
          <h1 className="text-white text-xl font-bold">EmployeeAnalytics</h1>
        </div>

        <nav className="space-y-2 flex-1">
          <Button 
            variant="ghost" 
            className={`w-full justify-start ${activeTab === "data" ? "text-white" : "text-app-text-gray"}`}
            onClick={() => setActiveTab("data")}
          >
            <ChartBar className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
          <Button 
            variant="ghost" 
            className={`w-full justify-start ${activeTab === "dashboard" ? "text-white" : "text-app-text-gray"}`}
            onClick={() => setActiveTab("dashboard")}
          >
            <BarChart className="mr-2 h-4 w-4" />
            Overview
          </Button>
          <Button 
            variant="ghost" 
            className={`w-full justify-start ${activeTab === "jobs" ? "text-white" : "text-app-text-gray"}`}
            onClick={() => setActiveTab("jobs")}
          >
            <Briefcase className="mr-2 h-4 w-4" />
            Job Listings
          </Button>
          <Button 
            variant="ghost" 
            className={`w-full justify-start ${activeTab === "resume" ? "text-white" : "text-app-text-gray"}`}
            onClick={() => setActiveTab("resume")}
          >
            <FileText className="mr-2 h-4 w-4" />
            Resumes
          </Button>
          <Button 
            variant="ghost" 
            className={`w-full justify-start ${activeTab === "settings" ? "text-white" : "text-app-text-gray"}`}
            onClick={() => setActiveTab("settings")}
          >
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </nav>

        <Button variant="ghost" className="w-full justify-start text-app-text-gray" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>

      {/* Main content */}
      <div className="ml-64 p-4 md:p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-white text-2xl font-bold">
            {activeTab === "dashboard" && "Overview"}
            {activeTab === "jobs" && "Job Listings"}
            {activeTab === "data" && "Dashboard"}
            {activeTab === "resume" && "Resume Analysis"}
            {activeTab === "settings" && "User Settings"}
          </h1>
          <div className="bg-app-gray px-4 py-2 rounded-full">
            <span className="text-white">Welcome, {userName}</span>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6 bg-app-gray border-b border-app-light-gray w-full justify-start">
            <TabsTrigger value="data" className="data-[state=active]:bg-app-purple data-[state=active]:text-white">
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-app-purple data-[state=active]:text-white">
              Overview
            </TabsTrigger>
            <TabsTrigger value="jobs" className="data-[state=active]:bg-app-purple data-[state=active]:text-white">
              Jobs
            </TabsTrigger>
            <TabsTrigger value="resume" className="data-[state=active]:bg-app-purple data-[state=active]:text-white">
              Resumes
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-app-purple data-[state=active]:text-white">
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="data">
            <DataAnalytics />
          </TabsContent>

          <TabsContent value="dashboard">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              <Card className="bg-app-gray border-none">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white">Business Analyst Jobs</CardTitle>
                  <CardDescription className="text-app-text-gray">Current openings</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-app-purple">120</p>
                </CardContent>
              </Card>

              <Card className="bg-app-gray border-none">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white">Average Salary</CardTitle>
                  <CardDescription className="text-app-text-gray">Business Analyst positions</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-app-purple">$92,500</p>
                </CardContent>
              </Card>

              <Card className="bg-app-gray border-none">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white">Skill Match</CardTitle>
                  <CardDescription className="text-app-text-gray">Your profile match</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-app-purple">78%</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-6">
              <Card className="bg-app-gray border-none">
                <CardHeader>
                  <CardTitle className="text-white">Job Market Trends</CardTitle>
                  <CardDescription className="text-app-text-gray">Business Analyst positions available</CardDescription>
                </CardHeader>
                <CardContent className="h-64">
                  <div className="h-full w-full">
                    <SkillsChart 
                      skills={jobTrends}
                      chartType="line"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-app-gray border-none">
                <CardHeader>
                  <CardTitle className="text-white">Top Skills in Demand</CardTitle>
                  <CardDescription className="text-app-text-gray">Current market demand</CardDescription>
                </CardHeader>
                <CardContent className="h-64">
                  <div className="h-full w-full">
                    <SkillsChart 
                      skills={skillDemand}
                      chartType="bar"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="jobs">
            <JobListings initialSearchTerm={filterSearch} onApply={handleApplyJob} // ✅ Add this
            appliedJobs={appliedJobs}/>
          </TabsContent>

          <TabsContent value="resume">
            <ResumeUpload onRoleSelect={handleRoleSelect} 
            />
          </TabsContent>

          <TabsContent value="settings">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-app-gray border-none">
                <CardHeader>
                  <CardTitle className="text-white">Personal Information</CardTitle>
                  <CardDescription className="text-app-text-gray">
                    Update your personal details
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-white">Full Name</Label>
                      <Input 
                        id="name" 
                        value={userName} 
                        onChange={(e) => setUserName(e.target.value)}
                        className="bg-app-light-gray border-app-light-gray text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={userEmail} 
                        onChange={(e) => setUserEmail(e.target.value)}
                        className="bg-app-light-gray border-app-light-gray text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-white">Phone</Label>
                      <Input 
                        id="phone" 
                        value={userPhone} 
                        onChange={(e) => setUserPhone(e.target.value)}
                        className="bg-app-light-gray border-app-light-gray text-white"
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="bg-app-purple hover:bg-app-purple/90 w-full"
                    onClick={handleSaveSettings}
                  >
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>

              <Card className="bg-app-gray border-none">
                <CardHeader>
                  <CardTitle className="text-white">Account Security</CardTitle>
                  <CardDescription className="text-app-text-gray">
                    Manage your account password
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password" className="text-white">Current Password</Label>
                      <Input 
                        id="current-password" 
                        type="password" 
                        placeholder="••••••••"
                        value={userPassword}
                        readOnly
                        className="bg-app-light-gray border-app-light-gray text-white"
                      />
                      <p className="text-xs text-app-text-gray mt-1">This is your password from account creation</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password" className="text-white">New Password</Label>
                      <Input 
                        id="new-password" 
                        type="password" 
                        placeholder="••••••••"
                        className="bg-app-light-gray border-app-light-gray text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password" className="text-white">Confirm New Password</Label>
                      <Input 
                        id="confirm-password" 
                        type="password" 
                        placeholder="••••••••"
                        className="bg-app-light-gray border-app-light-gray text-white"
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="bg-app-purple hover:bg-app-purple/90 w-full"
                    onClick={handleSaveSettings}
                  >
                    Update Password
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
