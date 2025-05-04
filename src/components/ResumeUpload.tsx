
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/sonner';
import { FileText, FileSearch, BarChart2, Code2, BriefcaseBusiness } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SkillsChart from '@/components/SkillsChart';

interface Resume {
  name: string;
  skills: { [key: string]: number };
  projectSkills: { [key: string]: number };
  experienceSkills: { [key: string]: number };
  suggestedRoles: string[];
  analysis: {
    strengths: string[];
    improvements: string[];
    summary: string;
  }
}

// Different skill sets for generating different resume analyses
const skillSets = {
  developer: {
    'React': 85,
    'JavaScript': 90,
    'TypeScript': 75,
    'HTML/CSS': 80,
    'Node.js': 65,
    'Python': 60,
    'Data Analysis': 55,
    'UI/UX Design': 70,
  },
  analyst: {
    'SQL': 85,
    'Excel': 90,
    'Data Analysis': 82,
    'Power BI': 75,
    'Python': 65,
    'Business Intelligence': 78,
    'Statistics': 72,
    'Tableau': 68,
  },
  designer: {
    'Figma': 88,
    'Adobe Photoshop': 82,
    'UI/UX Design': 90,
    'Wireframing': 85,
    'Prototyping': 80,
    'HTML/CSS': 70,
    'User Research': 75,
    'Design Systems': 78,
  },
  marketing: {
    'Content Marketing': 85,
    'SEO': 80,
    'Social Media': 92,
    'Google Analytics': 75,
    'Email Marketing': 88,
    'Marketing Automation': 70,
    'Adobe Creative Suite': 65,
    'CRM': 72,
  },
  dataScience: {
    'Python': 92,
    'Machine Learning': 88,
    'Data Analysis': 90,
    'SQL': 85,
    'Statistics': 87,
    'Data Visualization': 82,
    'R': 75,
    'Big Data': 80,
  },
  productManager: {
    'Product Strategy': 90,
    'User Research': 85,
    'Agile Methodologies': 88,
    'Requirements Definition': 82,
    'Market Analysis': 80,
    'Stakeholder Management': 85,
    'Roadmapping': 78,
    'Analytics': 75,
  }
};

// Role suggestions based on skill sets
const roleSuggestions = {
  developer: [
    'Frontend Developer',
    'React Developer',
    'UI Engineer',
    'Full Stack Developer',
    'JavaScript Developer',
    'Web Developer',
    'Frontend Engineer',
  ],
  analyst: [
    'Business Analyst',
    'Data Analyst',
    'BI Specialist',
    'SQL Developer',
    'Financial Analyst',
    'Operations Analyst',
    'Systems Analyst',
    'Research Analyst',
  ],
  designer: [
    'UI/UX Designer',
    'Product Designer',
    'Web Designer',
    'Design Systems Specialist',
    'Interaction Designer',
    'Visual Designer',
    'UX Researcher',
    'Creative Director',
  ],
  marketing: [
    'Digital Marketing Specialist',
    'Content Strategist',
    'SEO Specialist',
    'Social Media Manager',
    'Brand Manager',
    'Marketing Analyst',
    'Growth Marketer',
    'Marketing Operations Manager',
  ],
  dataScience: [
    'Data Scientist',
    'Machine Learning Engineer',
    'Data Engineer',
    'AI Specialist',
    'Research Scientist',
    'Quantitative Analyst',
    'Statistical Analyst',
    'Big Data Engineer',
  ],
  productManager: [
    'Product Manager',
    'Product Owner',
    'Technical Product Manager',
    'Associate Product Manager',
    'Senior Product Manager',
    'Product Marketing Manager',
    'Digital Product Manager',
    'Growth Product Manager',
  ]
};

// Map file extensions to likely profile types
const fileExtensionProfiles = {
  'pdf': ['developer', 'analyst', 'designer', 'marketing', 'dataScience', 'productManager'],
  'doc': ['analyst', 'marketing', 'productManager'],
  'docx': ['analyst', 'marketing', 'productManager'],
  'txt': ['developer', 'dataScience'],
  'json': ['developer', 'dataScience'],
}

interface ResumeUploadProps {
  onRoleSelect?: (role: string) => void;
}

const ResumeUpload: React.FC<ResumeUploadProps> = ({ onRoleSelect }) => {
  const [fileName, setFileName] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [resume, setResume] = useState<Resume | null>(null);
  const [notes, setNotes] = useState<string>('');
  const [selectedChartType, setSelectedChartType] = useState<'bar' | 'pie' | 'line'>('bar');
  const [profileType, setProfileType] = useState<keyof typeof skillSets>('developer');
  const [activeSkillTab, setActiveSkillTab] = useState<'overall' | 'projects' | 'experience'>('overall');

  // Generate project skills (subset of general skills with some different values)
  const generateProjectSkills = (skills: { [key: string]: number }) => {
    const projectSkills: { [key: string]: number } = {};
    
    // Select a random subset of skills (60-80% of all skills)
    const allSkills = Object.keys(skills);
    const skillCount = Math.floor(allSkills.length * (0.6 + Math.random() * 0.2));
    const selectedSkills = allSkills.sort(() => 0.5 - Math.random()).slice(0, skillCount);
    
    // For each selected skill, assign a value that's somewhat related to the main skill value
    selectedSkills.forEach(skill => {
      const baseValue = skills[skill];
      // Random adjustment between -15 and +5
      const adjustment = Math.floor(Math.random() * 20) - 15;
      projectSkills[skill] = Math.max(30, Math.min(100, baseValue + adjustment));
    });
    
    // Add 1-3 project-specific skills not in the general skills
    const projectSpecificSkills = [
      'Git', 'Agile', 'Scrum', 'Jira', 'CI/CD', 'Docker', 'AWS', 'Azure', 
      'Project Management', 'Documentation', 'Testing', 'Debugging'
    ];
    
    const additionalCount = Math.floor(Math.random() * 3) + 1;
    const additionalSkills = projectSpecificSkills.sort(() => 0.5 - Math.random()).slice(0, additionalCount);
    
    additionalSkills.forEach(skill => {
      projectSkills[skill] = Math.floor(Math.random() * 30) + 60; // Random value between 60-90
    });
    
    return projectSkills;
  };
  
  // Generate experience skills (different emphasis than project skills)
  const generateExperienceSkills = (skills: { [key: string]: number }) => {
    const experienceSkills: { [key: string]: number } = {};
    
    // Select a random subset of skills (70-90% of all skills)
    const allSkills = Object.keys(skills);
    const skillCount = Math.floor(allSkills.length * (0.7 + Math.random() * 0.2));
    const selectedSkills = allSkills.sort(() => 0.5 - Math.random()).slice(0, skillCount);
    
    // For experience skills, we emphasize higher proficiency in fewer skills
    selectedSkills.forEach(skill => {
      const baseValue = skills[skill];
      // Random adjustment between -10 and +15
      const adjustment = Math.floor(Math.random() * 25) - 10;
      experienceSkills[skill] = Math.max(40, Math.min(100, baseValue + adjustment));
    });
    
    // Add 1-3 experience-specific skills not in the general skills
    const experienceSpecificSkills = [
      'Leadership', 'Communication', 'Mentoring', 'Client Management', 
      'Stakeholder Management', 'Team Management', 'Requirements Gathering',
      'Process Improvement', 'Resource Planning', 'Budgeting'
    ];
    
    const additionalCount = Math.floor(Math.random() * 3) + 1;
    const additionalSkills = experienceSpecificSkills.sort(() => 0.5 - Math.random()).slice(0, additionalCount);
    
    additionalSkills.forEach(skill => {
      experienceSkills[skill] = Math.floor(Math.random() * 25) + 65; // Random value between 65-90
    });
    
    return experienceSkills;
  };

  // Generate a resume analysis based on the skills
  const generateAnalysis = (skills: { [key: string]: number }, projectSkills: { [key: string]: number }, experienceSkills: { [key: string]: number }) => {
    // Identify strengths (skills above 75)
    const strengths = Object.entries(skills)
      .filter(([_, value]) => value >= 75)
      .map(([skill, _]) => skill)
      .slice(0, 5);  // Top 5 strengths
    
    // Identify areas for improvement (skills below 65)
    const improvements = Object.entries(skills)
      .filter(([_, value]) => value < 65)
      .map(([skill, _]) => skill)
      .slice(0, 5);  // Top 5 areas for improvement
    
    // Project-specific insights
    const projectStrengths = Object.entries(projectSkills)
      .filter(([_, value]) => value >= 80)
      .map(([skill, _]) => skill)
      .slice(0, 3);

    // Experience-specific insights
    const experienceStrengths = Object.entries(experienceSkills)
      .filter(([_, value]) => value >= 80)
      .map(([skill, _]) => skill)
      .slice(0, 3);
    
    // Generate summary text
    let summary = `Your resume demonstrates strong proficiency in ${strengths.join(', ')}. `;
    
    if (projectStrengths.length > 0) {
      summary += `Your projects showcase excellent ${projectStrengths.join(', ')} skills. `;
    }
    
    if (experienceStrengths.length > 0) {
      summary += `Your work experience highlights strong capabilities in ${experienceStrengths.join(', ')}. `;
    }
    
    if (improvements.length > 0) {
      summary += `Consider developing further expertise in ${improvements.join(', ')} to enhance your profile.`;
    }
    
    return {
      strengths,
      improvements,
      summary
    };
  };

  // Generate a resume analysis based on the profile type and file name
  const generateResumeAnalysis = (fileName: string, type: keyof typeof skillSets) => {
    // Extract skills and modulate them slightly to make them more realistic
    const skills = { ...skillSets[type] };
    
    // Add some randomness to each skill value
    Object.keys(skills).forEach(skill => {
      const originalValue = skills[skill];
      // Random adjustment between -10 and +10
      const adjustment = Math.floor(Math.random() * 20) - 10;
      skills[skill] = Math.max(30, Math.min(100, originalValue + adjustment));
    });
    
    // Generate project and experience specific skills
    const projectSkills = generateProjectSkills(skills);
    const experienceSkills = generateExperienceSkills(skills);
    
    // Generate analysis based on all skill sets
    const analysis = generateAnalysis(skills, projectSkills, experienceSkills);
    
    return {
      name: fileName,
      skills,
      projectSkills,
      experienceSkills,
      suggestedRoles: roleSuggestions[type],
      analysis
    };
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      
      // Attempt to determine profile type by file extension or name contents
      const extension = file.name.split('.').pop()?.toLowerCase() || '';
      
      // Determine likely profile types based on file extension
      let likelyProfiles = fileExtensionProfiles[extension as keyof typeof fileExtensionProfiles] || 
                          ['developer', 'analyst', 'designer', 'marketing', 'dataScience', 'productManager'];
      
      // Check filename for additional hints
      const lowerFileName = file.name.toLowerCase();
      if (lowerFileName.includes('dev') || lowerFileName.includes('code') || lowerFileName.includes('program')) {
        likelyProfiles = ['developer', 'dataScience'];
      } else if (lowerFileName.includes('design') || lowerFileName.includes('ui') || lowerFileName.includes('ux')) {
        likelyProfiles = ['designer'];
      } else if (lowerFileName.includes('market') || lowerFileName.includes('content') || lowerFileName.includes('seo')) {
        likelyProfiles = ['marketing'];
      } else if (lowerFileName.includes('data') || lowerFileName.includes('analy') || lowerFileName.includes('bi')) {
        likelyProfiles = ['analyst', 'dataScience'];
      } else if (lowerFileName.includes('product') || lowerFileName.includes('pm') || lowerFileName.includes('manager')) {
        likelyProfiles = ['productManager'];
      }
      
      // Select one of the likely profiles randomly
      const randomProfile = likelyProfiles[Math.floor(Math.random() * likelyProfiles.length)] as keyof typeof skillSets;
      setProfileType(randomProfile);
    }
  };

  const handleUpload = () => {
    if (!fileName) {
      toast.error('Please select a file to upload');
      return;
    }
    
    setIsUploading(true);
    
    // Simulate API call with a timeout and generate dynamic resume analysis
    setTimeout(() => {
      setIsUploading(false);
      const resumeData = generateResumeAnalysis(fileName, profileType);
      setResume(resumeData);
      toast.success('Resume uploaded and analyzed successfully!');
    }, 1500);
  };

  const handleChartTypeChange = (type: 'bar' | 'pie' | 'line') => {
    setSelectedChartType(type);
  };

  const handleRoleSelect = (role: string) => {
    if (onRoleSelect) {
      onRoleSelect(role);
    }
  };
  
  // Get the currently active skills set based on the active tab
  const getActiveSkills = () => {
    if (!resume) return {};
    
    switch (activeSkillTab) {
      case 'projects':
        return resume.projectSkills;
      case 'experience':
        return resume.experienceSkills;
      case 'overall':
      default:
        return resume.skills;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-app-gray border-none">
        <CardHeader>
          <CardTitle className="text-white">Resume Upload</CardTitle>
          <CardDescription className="text-app-text-gray">
            Upload a resume to analyze skills and get role suggestions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Input
                id="resume-upload"
                type="file"
                accept=".pdf,.doc,.docx"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={handleFileChange}
              />
              <div className="flex items-center bg-app-light-gray border border-app-text-gray/20 rounded-md px-4 py-2 text-app-text-gray">
                <FileText className="mr-2 h-4 w-4" />
                <span>{fileName || 'Choose a file...'}</span>
              </div>
            </div>
            <Button 
              onClick={handleUpload} 
              className="bg-app-purple hover:bg-app-purple/90"
              disabled={isUploading}
            >
              {isUploading ? (
                'Analyzing...'
              ) : (
                <>
                  <FileSearch className="mr-2 h-4 w-4" />
                  Analyze
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {resume && (
        <>
          <Card className="bg-app-gray border-none">
            <CardHeader>
              <CardTitle className="text-white">Skills Analysis</CardTitle>
              <CardDescription className="text-app-text-gray">
                Detailed breakdown of skills found in your resume
              </CardDescription>

              <div className="space-y-4 mt-2">
                <Tabs value={activeSkillTab} onValueChange={(v) => setActiveSkillTab(v as 'overall' | 'projects' | 'experience')}>
                  <TabsList className="bg-app-light-gray">
                    <TabsTrigger value="overall" className="data-[state=active]:bg-app-purple">
                      <BarChart2 className="mr-2 h-4 w-4" />
                      Overall Skills
                    </TabsTrigger>
                    <TabsTrigger value="projects" className="data-[state=active]:bg-app-purple">
                      <Code2 className="mr-2 h-4 w-4" />
                      Project Skills
                    </TabsTrigger>
                    <TabsTrigger value="experience" className="data-[state=active]:bg-app-purple">
                      <BriefcaseBusiness className="mr-2 h-4 w-4" />
                      Experience Skills
                    </TabsTrigger>
                  </TabsList>
                </Tabs>

                <div className="flex space-x-3">
                  <Button 
                    size="sm" 
                    variant={selectedChartType === 'bar' ? 'default' : 'outline'}
                    className={selectedChartType === 'bar' ? 'bg-app-purple' : 'text-app-text-gray'} 
                    onClick={() => handleChartTypeChange('bar')}
                  >
                    Bar Chart
                  </Button>
                  <Button 
                    size="sm" 
                    variant={selectedChartType === 'pie' ? 'default' : 'outline'} 
                    className={selectedChartType === 'pie' ? 'bg-app-purple' : 'text-app-text-gray'}
                    onClick={() => handleChartTypeChange('pie')}
                  >
                    Pie Chart
                  </Button>
                  <Button 
                    size="sm" 
                    variant={selectedChartType === 'line' ? 'default' : 'outline'} 
                    className={selectedChartType === 'line' ? 'bg-app-purple' : 'text-app-text-gray'}
                    onClick={() => handleChartTypeChange('line')}
                  >
                    Line Chart
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="h-80">
                <SkillsChart 
                  skills={getActiveSkills()} 
                  chartType={selectedChartType}
                  height={300}
                  title={
                    activeSkillTab === 'projects' ? 'Skills From Projects' : 
                    activeSkillTab === 'experience' ? 'Skills From Work Experience' :
                    'Overall Skills Profile'
                  }
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-app-gray border-none">
            <CardHeader>
              <CardTitle className="text-white">Analysis Summary</CardTitle>
              <CardDescription className="text-app-text-gray">
                Key insights from your resume
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-app-light-gray/50 p-4 rounded-md border border-app-purple/20">
                  <p className="text-white">{resume.analysis.summary}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-app-light-gray/30 p-4 rounded-md">
                    <h4 className="text-app-purple font-medium mb-2">Strengths</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {resume.analysis.strengths.map((strength, idx) => (
                        <li key={idx} className="text-white">{strength}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-app-light-gray/30 p-4 rounded-md">
                    <h4 className="text-app-purple font-medium mb-2">Areas for Development</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {resume.analysis.improvements.map((improvement, idx) => (
                        <li key={idx} className="text-white">{improvement}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-app-gray border-none">
            <CardHeader>
              <CardTitle className="text-white">Suggested Roles</CardTitle>
              <CardDescription className="text-app-text-gray">
                Based on the skills analyzed from your resume
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {resume.suggestedRoles.map((role, index) => (
                  <div 
                    key={index} 
                    className="bg-app-light-gray p-3 rounded-md flex items-center justify-between cursor-pointer hover:bg-app-purple/20 transition-colors"
                    onClick={() => handleRoleSelect(role)}
                  >
                    <span className="text-white">{role}</span>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Details</span>
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-app-gray border-none">
            <CardHeader>
              <CardTitle className="text-white">Notes</CardTitle>
              <CardDescription className="text-app-text-gray">
                Add your notes about this resume
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea 
                value={notes} 
                onChange={(e) => setNotes(e.target.value)} 
                placeholder="Add your notes here..." 
                className="bg-app-light-gray border-none text-white min-h-[100px]"
              />
            </CardContent>
            <CardFooter>
              <Button className="bg-app-purple hover:bg-app-purple/90 ml-auto">
                Save Notes
              </Button>
            </CardFooter>
          </Card>
        </>
      )}
    </div>
  );
};

export default ResumeUpload;
