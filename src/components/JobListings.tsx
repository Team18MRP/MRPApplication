
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Briefcase, Search, ArrowUp, ArrowDown } from 'lucide-react';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  posted: string;
  requirements: string[];
  skills: string[];
}

// Initial job listings with specific roles
const jobOpenings: Job[] = [
  // Business Analyst roles
  {
    id: 1,
    title: "Senior Business Analyst",
    company: "TechCorp",
    location: "San Francisco, CA",
    salary: "$95,000 - $120,000",
    type: "Full-time",
    posted: "2 days ago",
    requirements: ["5+ years experience", "Requirements analysis", "Process improvement"],
    skills: ["SQL", "Excel", "Tableau", "JIRA"]
  },
  {
    id: 2,
    title: "Business Systems Analyst",
    company: "Analytics Inc",
    location: "New York, NY",
    salary: "$90,000 - $110,000",
    type: "Full-time",
    posted: "1 day ago",
    requirements: ["3+ years experience", "SQL proficiency", "Systems integration"],
    skills: ["SQL", "Excel", "Visio", "Business Process Modeling"]
  },
  
  // Data Analyst roles
  {
    id: 3,
    title: "Data Analyst",
    company: "DataInsights",
    location: "Austin, TX",
    salary: "$85,000 - $105,000",
    type: "Full-time",
    posted: "3 days ago",
    requirements: ["2+ years experience", "Statistical analysis", "Data visualization"],
    skills: ["SQL", "Python", "Tableau", "Power BI"]
  },
  {
    id: 4,
    title: "Senior Data Analyst",
    company: "MetricsLab",
    location: "Seattle, WA",
    salary: "$95,000 - $120,000",
    type: "Full-time",
    posted: "1 week ago",
    requirements: ["4+ years experience", "Advanced analytics", "Dashboard creation"],
    skills: ["Python", "R", "SQL", "Tableau"]
  },
  
  // Data Engineer roles
  {
    id: 5,
    title: "Data Engineer",
    company: "DataFlow",
    location: "Chicago, IL",
    salary: "$110,000 - $140,000",
    type: "Full-time",
    posted: "2 days ago",
    requirements: ["3+ years experience", "ETL pipeline development", "Data warehousing"],
    skills: ["Python", "SQL", "Spark", "Airflow"]
  },
  
  // Java Developer roles
  {
    id: 6,
    title: "Java Developer",
    company: "JavaTech",
    location: "Remote",
    salary: "$100,000 - $130,000",
    type: "Full-time",
    posted: "3 days ago",
    requirements: ["3+ years experience", "Spring Boot", "Microservices"],
    skills: ["Java", "Spring", "SQL", "REST APIs"]
  },
  
  // Java Full Stack Developer roles
  {
    id: 7,
    title: "Java Full Stack Developer",
    company: "FullStack Solutions",
    location: "Boston, MA",
    salary: "$115,000 - $145,000",
    type: "Full-time",
    posted: "4 days ago",
    requirements: ["4+ years experience", "Front-end & back-end", "API development"],
    skills: ["Java", "Spring Boot", "React", "Angular"]
  },
  
  // Python Developer roles
  {
    id: 8,
    title: "Python Developer",
    company: "PythonWorks",
    location: "San Jose, CA",
    salary: "$95,000 - $125,000",
    type: "Full-time",
    posted: "1 week ago",
    requirements: ["3+ years experience", "Python frameworks", "API development"],
    skills: ["Python", "Django", "Flask", "REST APIs"]
  },
  
  // RPA Developer roles
  {
    id: 9,
    title: "RPA Developer",
    company: "AutomateNow",
    location: "Remote",
    salary: "$90,000 - $120,000",
    type: "Full-time",
    posted: "2 days ago",
    requirements: ["2+ years experience", "Process automation", "Bot development"],
    skills: ["UiPath", "Blue Prism", "Automation Anywhere", "Process Analysis"]
  },
  
  // Automation Engineer roles
  {
    id: 10,
    title: "Automation Engineer",
    company: "QualityTech",
    location: "Denver, CO",
    salary: "$95,000 - $125,000",
    type: "Full-time",
    posted: "3 days ago",
    requirements: ["3+ years experience", "Test automation", "CI/CD pipelines"],
    skills: ["Selenium", "Jenkins", "Git", "Python"]
  },
  
  // Tester/QA roles
  {
    id: 11,
    title: "QA Engineer",
    company: "TestRight",
    location: "Atlanta, GA",
    salary: "$80,000 - $105,000",
    type: "Full-time",
    posted: "5 days ago",
    requirements: ["2+ years experience", "Manual testing", "Test case creation"],
    skills: ["Selenium", "JIRA", "Agile", "API Testing"]
  },
  
  // Workday Consultant
  {
    id: 12,
    title: "Workday Consultant",
    company: "HR Systems Inc",
    location: "Chicago, IL",
    salary: "$110,000 - $140,000",
    type: "Full-time",
    posted: "1 week ago",
    requirements: ["3+ years experience", "Workday implementation", "HCM expertise"],
    skills: ["Workday", "HCM", "Integrations", "Business Process"]
  },
  
  // .NET Developer roles
  {
    id: 13,
    title: ".NET Developer",
    company: "DotNetSolutions",
    location: "Nashville, TN",
    salary: "$95,000 - $125,000",
    type: "Full-time",
    posted: "3 days ago",
    requirements: ["3+ years experience", ".NET Core", "Web API"],
    skills: ["C#", ".NET", "SQL Server", "Azure"]
  },
  
  // Data Scientist roles
  {
    id: 14,
    title: "Data Scientist",
    company: "AI Insights",
    location: "Boston, MA",
    salary: "$120,000 - $150,000",
    type: "Full-time",
    posted: "1 week ago",
    requirements: ["4+ years experience", "Machine learning", "Statistical modeling"],
    skills: ["Python", "R", "TensorFlow", "Machine Learning"]
  }
];

const generateAdditionalJobs = () => {
  const additionalJobs: Job[] = [];
  const nextId = jobOpenings.length + 1;
  
  // Companies for each role
  const companies = {
    ba: ["Business Solutions Inc.", "Strategic Analytics", "Enterprise Insights", "Process Innovations", "Optimum Business Group", "Peak Solutions", "Clarity Consulting", "Agile Business Partners", "Insight Analytics", "Vision Strategies"],
    da: ["DataMetrics", "Insight Analytics", "Data Driven Inc.", "Analytical Solutions", "Metric Masters", "Precision Data", "InfoInsights", "DataVision", "Analytics Hub", "Tableau Masters"],
    de: ["DataFlow Systems", "Pipeline Technologies", "CloudData Inc.", "DataArchitects", "ETL Solutions", "DataLake Technologies", "BigQuery Systems", "Hadoop Experts", "Snowflake Partners", "Data Warehouse Inc."],
    java: ["JavaPros", "Enterprise Java Inc.", "Spring Solutions", "Java Architects", "Microservice Tech", "JVM Experts", "Java Engineering", "Backend Masters", "ServerSide Solutions", "J2EE Technologies"],
    fullstack: ["FullStack Innovations", "360 Development", "Stack Masters", "End-to-End Solutions", "Integrated Systems", "Full Circle Tech", "OmniStack Solutions", "Complete Technology Partners", "Total Dev Solutions", "TechStack Inc."],
    python: ["PythonDev", "Snake Technologies", "PyTech Solutions", "Script Masters", "Python Innovations", "Django Solutions", "Flask Technologies", "Python Engineering", "PyData Systems", "Code Serpent Inc."],
    rpa: ["AutomateNow", "RPA Technologies", "Bot Builders", "Process Automation Inc.", "Intelligent Automation", "AutoFlow Solutions", "Digital Workers", "RPA Engineering", "Bot Masters", "Automation Excellence"],
    auto: ["QA Automation", "Test Engineering", "Quality Solutions", "TestPro Technologies", "Automated Testing Inc.", "Quality Assurance Tech", "Test Masters", "CI/CD Partners", "DevOps Automation", "Testing Excellence"],
    qa: ["Quality Assurance Inc.", "Test Experts", "Bug Hunters", "QA Solutions", "Test Masters", "Quality Control Tech", "TestRight", "QA Engineers", "Validation Partners", "Software Testing Inc."],
    workday: ["WorkdaySolutions", "HCM Technologies", "HR Systems Group", "Workday Partners", "Cloud HR Solutions", "Workday Integration Experts", "HR Cloud Technologies", "Workday Implementation Group", "HCM Solutions", "HR Tech Partners"],
    dotnet: ["DotNet Solutions", "Microsoft Technologies", "C# Engineering", "Azure Developers", "Enterprise .NET", "Windows Solutions", "ASP.NET Masters", "Microsoft Stack", ".NET Core Experts", "C# Development"],
    ds: ["Data Science Technologies", "AI Solutions", "Machine Learning Inc.", "ML Engineering", "Predictive Analytics", "AI Innovations", "Neural Tech", "Data Science Partners", "Model Builders", "AI Research Group"]
  };
  
  // Locations for jobs
  const locations = ["Remote", "New York, NY", "San Francisco, CA", "Austin, TX", "Seattle, WA", "Boston, MA", "Chicago, IL", "Los Angeles, CA", "Denver, CO", "Atlanta, GA", "Dallas, TX", "Portland, OR", "Miami, FL", "Washington, DC", "Phoenix, AZ"];
  
  // Job types
  const jobTypes = ["Full-time", "Contract", "Part-time"];
  
  // Posted timeframes
  const timeAgo = ["1 day ago", "2 days ago", "3 days ago", "4 days ago", "5 days ago", "1 week ago", "2 weeks ago"];
  
  // Levels for positions
  const levels = ["Junior", "Mid-level", "Senior", "Lead", "Principal"];
  
  // Helper function to generate random salary range
  const generateSalary = (baseMin: number, baseMax: number) => {
    const min = baseMin + Math.floor(Math.random() * 20) * 5000;
    const max = min + 30000 + Math.floor(Math.random() * 20) * 5000;
    return `$${(min/1000).toFixed(0)}k - $${(max/1000).toFixed(0)}k`;
  };
  
  // Role configurations - skills, requirements, and salary ranges
  const roleConfigs = {
    ba: {
      titles: ["Business Analyst", "Business Systems Analyst", "Process Analyst", "Business Process Analyst", "Requirements Analyst"],
      skills: ["SQL", "Excel", "Tableau", "Power BI", "JIRA", "Visio", "Business Process Modeling", "Requirements Gathering", "Stakeholder Management", "Agile Methodologies"],
      requirements: ["business analysis", "requirements gathering", "process improvement", "stakeholder management"],
      salary: [80000, 100000]
    },
    da: {
      titles: ["Data Analyst", "Business Intelligence Analyst", "Analytics Specialist", "Reporting Analyst", "Metrics Analyst"],
      skills: ["SQL", "Excel", "Tableau", "Power BI", "Python", "R", "Data Visualization", "Statistical Analysis", "ETL", "Database Management"],
      requirements: ["data analysis", "statistical analysis", "data visualization", "reporting"],
      salary: [75000, 95000]
    },
    de: {
      titles: ["Data Engineer", "ETL Developer", "Database Engineer", "Big Data Engineer", "Data Pipeline Engineer"],
      skills: ["Python", "SQL", "Spark", "Hadoop", "Airflow", "Kafka", "AWS", "Azure", "GCP", "ETL"],
      requirements: ["data pipeline development", "ETL processes", "data warehousing", "big data technologies"],
      salary: [100000, 130000]
    },
    java: {
      titles: ["Java Developer", "Java Engineer", "Java Application Developer", "Core Java Developer", "Java Backend Developer"],
      skills: ["Java", "Spring", "Hibernate", "SQL", "RESTful APIs", "Microservices", "JUnit", "Maven", "Git", "CI/CD"],
      requirements: ["Java development", "Spring framework", "API development", "software design"],
      salary: [90000, 120000]
    },
    fullstack: {
      titles: ["Java Full Stack Developer", "Full Stack Java Engineer", "Java Full Stack Engineer", "Full Stack Developer (Java)"],
      skills: ["Java", "Spring Boot", "React", "Angular", "JavaScript", "HTML/CSS", "REST APIs", "SQL", "Git", "Microservices"],
      requirements: ["full stack development", "frontend and backend", "Java ecosystem", "web applications"],
      salary: [100000, 135000]
    },
    python: {
      titles: ["Python Developer", "Python Software Engineer", "Python Application Developer", "Backend Python Developer"],
      skills: ["Python", "Django", "Flask", "FastAPI", "SQL", "RESTful APIs", "Docker", "Git", "AWS", "Testing"],
      requirements: ["Python development", "web frameworks", "API development", "software design"],
      salary: [85000, 115000]
    },
    rpa: {
      titles: ["RPA Developer", "RPA Engineer", "Automation Developer", "RPA Solutions Developer", "Process Automation Specialist"],
      skills: ["UiPath", "Blue Prism", "Automation Anywhere", "Process Analysis", "Workflow Design", "RPA", "SQL", "JavaScript", "VB.NET"],
      requirements: ["RPA development", "process automation", "bot development", "workflow design"],
      salary: [85000, 115000]
    },
    auto: {
      titles: ["Automation Engineer", "Test Automation Engineer", "Quality Automation Engineer", "SDET", "Automation Tester"],
      skills: ["Selenium", "Cypress", "TestNG", "JUnit", "Python", "Java", "CI/CD", "Jenkins", "Git", "Docker"],
      requirements: ["test automation", "CI/CD pipelines", "testing frameworks", "quality assurance"],
      salary: [90000, 120000]
    },
    qa: {
      titles: ["QA Engineer", "Software Tester", "Quality Assurance Analyst", "QA Analyst", "Test Engineer"],
      skills: ["Manual Testing", "Test Cases", "JIRA", "Agile", "API Testing", "Selenium", "SQL", "Regression Testing", "Test Planning"],
      requirements: ["software testing", "quality assurance", "test case creation", "defect tracking"],
      salary: [75000, 100000]
    },
    workday: {
      titles: ["Workday Consultant", "Workday Integration Specialist", "Workday HCM Consultant", "Workday Financial Consultant", "Workday Technical Consultant"],
      skills: ["Workday", "HCM", "Integrations", "Business Process", "Workday Studio", "EIB", "PICOF", "Workday Financials", "Prism Analytics"],
      requirements: ["Workday implementation", "HCM expertise", "business process design", "integration development"],
      salary: [100000, 140000]
    },
    dotnet: {
      titles: [".NET Developer", ".NET Software Engineer", "C# Developer", "ASP.NET Developer", ".NET Application Developer"],
      skills: ["C#", ".NET", "ASP.NET", "SQL Server", "Azure", "RESTful APIs", "Entity Framework", "LINQ", "MVC", "Web API"],
      requirements: [".NET development", "C# programming", "web application development", "database integration"],
      salary: [85000, 125000]
    },
    ds: {
      titles: ["Data Scientist", "Machine Learning Engineer", "AI Specialist", "ML Developer", "Applied Scientist"],
      skills: ["Python", "R", "TensorFlow", "PyTorch", "Machine Learning", "Statistical Modeling", "NLP", "Deep Learning", "Data Analysis", "Big Data"],
      requirements: ["machine learning", "statistical modeling", "data analytics", "algorithm development"],
      salary: [110000, 150000]
    }
  };
  
  // Generate jobs for each role category
  let currentId = nextId;
  
  // Function to generate jobs for a specific role category
  const generateJobsForCategory = (roleKey: keyof typeof roleConfigs, count: number) => {
    const config = roleConfigs[roleKey];
    
    for (let i = 0; i < count; i++) {
      // Pick random values
      const title = levels[Math.floor(Math.random() * levels.length)] + " " + config.titles[Math.floor(Math.random() * config.titles.length)];
      const company = companies[roleKey][Math.floor(Math.random() * companies[roleKey].length)];
      const location = locations[Math.floor(Math.random() * locations.length)];
      const jobType = jobTypes[Math.floor(Math.random() * jobTypes.length)];
      const posted = timeAgo[Math.floor(Math.random() * timeAgo.length)];
      const salary = generateSalary(config.salary[0], config.salary[1]);
      
      // Generate random requirements (2-3)
      const reqCount = 2 + Math.floor(Math.random() * 2);
      const requirements: string[] = [];
      const yearsExp = 1 + Math.floor(Math.random() * 7);
      requirements.push(`${yearsExp}+ years experience`);
      
      const tempReqs = [...config.requirements];
      for (let r = 0; r < reqCount; r++) {
        if (tempReqs.length === 0) break;
        const idx = Math.floor(Math.random() * tempReqs.length);
        requirements.push(tempReqs[idx]);
        tempReqs.splice(idx, 1);
      }
      
      // Generate random skills (4-5)
      const skillCount = 4 + Math.floor(Math.random() * 2);
      const skills: string[] = [];
      const tempSkills = [...config.skills];
      for (let s = 0; s < skillCount; s++) {
        if (tempSkills.length === 0) break;
        const idx = Math.floor(Math.random() * tempSkills.length);
        skills.push(tempSkills[idx]);
        tempSkills.splice(idx, 1);
      }
      
      // Add the job
      additionalJobs.push({
        id: currentId++,
        title,
        company,
        location,
        salary,
        type: jobType,
        posted,
        requirements,
        skills
      });
    }
  };
  
  // Generate approx 70 jobs for Business Analyst and Data Analyst categories
  generateJobsForCategory('ba', 70);
  generateJobsForCategory('da', 70);
  
  // Generate a decent number (20-30) for the other categories
  generateJobsForCategory('de', 30);
  generateJobsForCategory('java', 30);
  generateJobsForCategory('fullstack', 30);
  generateJobsForCategory('python', 30);
  generateJobsForCategory('rpa', 25);
  generateJobsForCategory('auto', 25);
  generateJobsForCategory('qa', 25);
  generateJobsForCategory('workday', 25);
  generateJobsForCategory('dotnet', 30);
  generateJobsForCategory('ds', 30);
  
  return additionalJobs;
};

const allJobs = [...jobOpenings, ...generateAdditionalJobs()];

interface JobListingsProps {
  initialSearchTerm?: string;
  onApply: (jobId: number) => void;
  appliedJobs?: number[];
}

const JobListings: React.FC<JobListingsProps> = ({ initialSearchTerm = '',onApply, appliedJobs = [] }) => {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<'title' | 'company' | 'posted'>('posted');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  
  // Update search term when initialSearchTerm changes
  useEffect(() => {
    if (initialSearchTerm) {
      setSearchTerm(initialSearchTerm);
      setCurrentPage(1); // Reset to first page when search term changes
    }
  }, [initialSearchTerm]);
  
  const itemsPerPage = 10;
  
  // Filter jobs based on search term
  const filteredJobs = allJobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) || 
    job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  // Sort jobs based on sortField and sortDirection
  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (sortField === 'posted') {
      // For 'posted', we need to convert the string to a comparable value
      const getDateValue = (posted: string) => {
        if (posted.includes('day')) {
          return parseInt(posted) || 0;
        } else if (posted.includes('week')) {
          return (parseInt(posted) || 0) * 7;
        }
        return 0;
      };
      
      const aValue = getDateValue(a.posted);
      const bValue = getDateValue(b.posted);
      
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    } else {
      // For 'title' and 'company', we can directly compare strings
      const aValue = a[sortField].toLowerCase();
      const bValue = b[sortField].toLowerCase();
      
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    }
  });
  
  // Paginate jobs
  const indexOfLastJob = currentPage * itemsPerPage;
  const indexOfFirstJob = indexOfLastJob - itemsPerPage;
  const currentJobs = sortedJobs.slice(indexOfFirstJob, indexOfLastJob);
  
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  
  // Handle sort toggle
  const toggleSort = (field: 'title' | 'company' | 'posted') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  return (
    <div className="space-y-6">
      <Card className="bg-app-gray border-none">
        <CardHeader className="pb-2">
          <CardTitle className="text-white">Job Listings</CardTitle>
          <CardDescription className="text-app-text-gray">
            {filteredJobs.length} opportunities found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search jobs by title, company, or skill..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // Reset to first page when searching
                }}
                className="pl-9 bg-app-light-gray border-none text-white"
              />
            </div>
            <Button
              variant="outline"
              className="text-app-purple border-app-purple hover:bg-app-purple/20"
              onClick={() => toggleSort('title')}
            >
              Title
              {sortField === 'title' && (
                sortDirection === 'asc' ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
              )}
            </Button>
            <Button
              variant="outline"
              className="text-app-purple border-app-purple hover:bg-app-purple/20"
              onClick={() => toggleSort('company')}
            >
              Company
              {sortField === 'company' && (
                sortDirection === 'asc' ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
              )}
            </Button>
            <Button
              variant="outline"
              className="text-app-purple border-app-purple hover:bg-app-purple/20"
              onClick={() => toggleSort('posted')}
            >
              Recent
              {sortField === 'posted' && (
                sortDirection === 'asc' ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
              )}
            </Button>
          </div>
          
          <div className="mt-4 space-y-4">
            {currentJobs.map((job) => (
              <Card key={job.id} className="bg-app-light-gray border-none">
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <Briefcase className="h-4 w-4 text-app-purple" />
                        <h3 className="text-white font-medium">{job.title}</h3>
                      </div>
                      <div className="mt-1 grid grid-cols-1 md:grid-cols-3 gap-1 text-sm text-app-purple">
                        <span>{job.company}</span>
                        <span>{job.location}</span>
                        <span>{job.salary}</span>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {job.skills.map((skill, index) => (
                          <span 
                            key={index} 
                            className="px-2 py-1 bg-app-purple/20 text-app-purple rounded-md text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="mt-3 md:mt-0 flex flex-col items-end">
                    <Button
  className="bg-app-purple hover:bg-app-purple/90 w-full md:w-auto"
  onClick={() => onApply(job.id)}
  disabled={appliedJobs.includes(job.id)}
>
  {appliedJobs.includes(job.id) ? 'Applied' : 'Apply Now'}
</Button>

                      <span className="mt-1 text-xs text-app-text-gray">{job.posted}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {currentJobs.length === 0 && (
              <div className="py-10 text-center">
                <p className="text-app-text-gray">No jobs matching your search criteria. Try different keywords.</p>
              </div>
            )}
          </div>
          
          {totalPages > 1 && (
            <div className="mt-6">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      href="#" 
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage > 1) setCurrentPage(currentPage - 1);
                      }} 
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <PaginationItem key={i}>
                        <PaginationLink 
                          href="#" 
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage(pageNum);
                          }}
                          isActive={pageNum === currentPage}
                        >
                          {pageNum}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}
                  
                  <PaginationItem>
                    <PaginationNext 
                      href="#" 
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                      }}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default JobListings;
