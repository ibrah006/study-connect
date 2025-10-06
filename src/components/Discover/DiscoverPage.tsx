import React, { useState, useEffect } from 'react';
import { Search, Filter, Users } from 'lucide-react';
import { User } from '../../types';
import UserCard from './UserCard';

const DiscoverPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    university: '',
    major: '',
    graduationYear: '',
  });
  const [showFilters, setShowFilters] = useState(false);

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockUsers: User[] = [
      {
        id: '2',
        email: 'alice@stanford.edu',
        name: 'Alice Johnson',
        university: 'Stanford University',
        major: 'Computer Science',
        graduationYear: 2025,
        bio: 'Passionate about AI and machine learning. Looking for study partners for CS229.',
        skills: ['Python', 'TensorFlow', 'React', 'Data Science'],
        interests: ['AI', 'Research', 'Startups'],
        createdAt: '2024-01-15T00:00:00Z',
      },
      {
        id: '3',
        email: 'bob@stanford.edu',
        name: 'Bob Chen',
        university: 'Stanford University',
        major: 'Electrical Engineering',
        graduationYear: 2024,
        bio: 'Senior EE student interested in hardware design and embedded systems.',
        skills: ['C++', 'VHDL', 'Circuit Design', 'Arduino'],
        interests: ['Hardware', 'IoT', 'Robotics'],
        createdAt: '2024-01-10T00:00:00Z',
      },
      {
        id: '4',
        email: 'carol@berkeley.edu',
        name: 'Carol Davis',
        university: 'UC Berkeley',
        major: 'Business Administration',
        graduationYear: 2025,
        bio: 'MBA student focusing on tech entrepreneurship and venture capital.',
        skills: ['Strategy', 'Finance', 'Marketing', 'Leadership'],
        interests: ['Entrepreneurship', 'VC', 'Tech'],
        createdAt: '2024-01-20T00:00:00Z',
      },
      {
        id: '5',
        email: 'david@mit.edu',
        name: 'David Wilson',
        university: 'MIT',
        major: 'Mathematics',
        graduationYear: 2026,
        bio: 'Math major with interests in cryptography and theoretical computer science.',
        skills: ['Mathematics', 'Cryptography', 'Python', 'LaTeX'],
        interests: ['Theory', 'Security', 'Research'],
        createdAt: '2024-01-25T00:00:00Z',
      },
    ];
    setUsers(mockUsers);
  }, []);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.major.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.university.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesUniversity = !filters.university || user.university === filters.university;
    const matchesMajor = !filters.major || user.major === filters.major;
    const matchesYear = !filters.graduationYear || user.graduationYear.toString() === filters.graduationYear;

    return matchesSearch && matchesUniversity && matchesMajor && matchesYear;
  });

  const handleConnect = (userId: string) => {
    console.log('Connecting to user:', userId);
    // Implement connection logic
  };

  const handleMessage = (userId: string) => {
    console.log('Messaging user:', userId);
    // Implement messaging logic
  };

  const universities = [...new Set(users.map(user => user.university))];
  const majors = [...new Set(users.map(user => user.major))];
  const years = [...new Set(users.map(user => user.graduationYear))].sort();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Discover Students</h1>
        <p className="text-gray-600">Connect with fellow students at your university and beyond</p>
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
              placeholder="Search by name, major, or university..."
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
                  University
                </label>
                <select
                  value={filters.university}
                  onChange={(e) => setFilters({ ...filters, university: e.target.value })}
                  className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="">All Universities</option>
                  {universities.map(uni => (
                    <option key={uni} value={uni}>{uni}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Major
                </label>
                <select
                  value={filters.major}
                  onChange={(e) => setFilters({ ...filters, major: e.target.value })}
                  className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="">All Majors</option>
                  {majors.map(major => (
                    <option key={major} value={major}>{major}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Graduation Year
                </label>
                <select
                  value={filters.graduationYear}
                  onChange={(e) => setFilters({ ...filters, graduationYear: e.target.value })}
                  className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="">All Years</option>
                  {years.map(year => (
                    <option key={year} value={year.toString()}>{year}</option>
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
          <Users className="w-4 h-4 mr-2" />
          {filteredUsers.length} students found
        </div>
      </div>

      {filteredUsers.length === 0 ? (
        <div className="text-center py-12">
          <Users className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No students found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search criteria or filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map(user => (
            <UserCard
              key={user.id}
              user={user}
              onConnect={handleConnect}
              onMessage={handleMessage}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DiscoverPage;