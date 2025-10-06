import React, { useState, useEffect } from 'react';
import { Search, Filter, Briefcase, MapPin, Building } from 'lucide-react';
import { JobOpportunity } from '../../types';
import JobCard from './JobCard';

const CareersPage: React.FC = () => {
  const [jobs, setJobs] = useState<JobOpportunity[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    type: '',
    location: '',
    company: '',
  });
  const [showFilters, setShowFilters] = useState(false);
  const [savedJobs, setSavedJobs] = useState<Set<string>>(new Set());

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockJobs: JobOpportunity[] = [
      {
        id: '1',
        title: 'Software Engineering Intern',
        company: 'Google',
        description: 'Join our team as a Software Engineering Intern and work on cutting-edge projects that impact billions of users. You\'ll collaborate with experienced engineers, contribute to real products, and gain valuable industry experience.',
        requirements: ['Python', 'Java', 'Data Structures', 'Algorithms', 'Computer Science'],
        location: 'Mountain View, CA',
        type: 'internship',
        postedAt: '2024-01-20T00:00:00Z',
        expiresAt: '2024-03-20T00:00:00Z',
      },
      {
        id: '2',
        title: 'Product Manager Intern',
        company: 'Meta',
        description: 'Work alongside our product teams to define, build, and launch products used by billions of people. This internship offers hands-on experience in product strategy, user research, and cross-functional collaboration.',
        requirements: ['Product Management', 'Analytics', 'User Research', 'Strategy', 'Communication'],
        location: 'Menlo Park, CA',
        type: 'internship',
        postedAt: '2024-01-18T00:00:00Z',
        expiresAt: '2024-03-18T00:00:00Z',
      },
      {
        id: '3',
        title: 'Data Science Intern',
        company: 'Netflix',
        description: 'Apply machine learning and statistical analysis to solve complex business problems. Work with large datasets to drive insights that improve our recommendation systems and user experience.',
        requirements: ['Python', 'Machine Learning', 'Statistics', 'SQL', 'Data Analysis'],
        location: 'Los Gatos, CA',
        type: 'internship',
        postedAt: '2024-01-15T00:00:00Z',
        expiresAt: '2024-03-15T00:00:00Z',
      },
      {
        id: '4',
        title: 'Frontend Developer',
        company: 'Airbnb',
        description: 'Build beautiful, responsive web applications that help millions of people find unique places to stay around the world. Work with React, TypeScript, and modern web technologies.',
        requirements: ['React', 'TypeScript', 'JavaScript', 'CSS', 'HTML'],
        location: 'San Francisco, CA',
        type: 'full-time',
        postedAt: '2024-01-22T00:00:00Z',
        expiresAt: '2024-04-22T00:00:00Z',
      },
      {
        id: '5',
        title: 'UX Design Intern',
        company: 'Adobe',
        description: 'Create intuitive and delightful user experiences for creative professionals. Work on design systems, user research, and prototyping for industry-leading creative tools.',
        requirements: ['Figma', 'User Research', 'Prototyping', 'Design Systems', 'Adobe Creative Suite'],
        location: 'San Jose, CA',
        type: 'internship',
        postedAt: '2024-01-25T00:00:00Z',
        expiresAt: '2024-03-25T00:00:00Z',
      },
    ];
    setJobs(mockJobs);
  }, []);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = !filters.type || job.type === filters.type;
    const matchesLocation = !filters.location || job.location.toLowerCase().includes(filters.location.toLowerCase());
    const matchesCompany = !filters.company || job.company.toLowerCase().includes(filters.company.toLowerCase());

    return matchesSearch && matchesType && matchesLocation && matchesCompany;
  });

  const handleSaveJob = (jobId: string) => {
    const newSavedJobs = new Set(savedJobs);
    if (savedJobs.has(jobId)) {
      newSavedJobs.delete(jobId);
    } else {
      newSavedJobs.add(jobId);
    }
    setSavedJobs(newSavedJobs);
  };

  const jobTypes = [...new Set(jobs.map(job => job.type))];
  const locations = [...new Set(jobs.map(job => job.location))];
  const companies = [...new Set(jobs.map(job => job.company))];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Career Opportunities</h1>
        <p className="text-gray-600">Discover internships and job opportunities from top companies</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search jobs, companies, or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </button>
        </div>

        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Job Type
                </label>
                <select
                  value={filters.type}
                  onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                  className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="">All Types</option>
                  {jobTypes.map(type => (
                    <option key={type} value={type}>
                      {type.split('-').map(word => 
                        word.charAt(0).toUpperCase() + word.slice(1)
                      ).join(' ')}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <select
                  value={filters.location}
                  onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                  className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="">All Locations</option>
                  {locations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company
                </label>
                <select
                  value={filters.company}
                  onChange={(e) => setFilters({ ...filters, company: e.target.value })}
                  className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="">All Companies</option>
                  {companies.map(company => (
                    <option key={company} value={company}>{company}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center text-sm text-gray-600">
          <Briefcase className="w-4 h-4 mr-2" />
          {filteredJobs.length} opportunities found
        </div>
      </div>

      {filteredJobs.length === 0 ? (
        <div className="text-center py-12">
          <Briefcase className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No opportunities found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search criteria or filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredJobs.map(job => (
            <JobCard
              key={job.id}
              job={job}
              onSave={handleSaveJob}
              isSaved={savedJobs.has(job.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CareersPage;