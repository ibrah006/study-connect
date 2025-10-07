import React, { useState, useEffect } from 'react';
import { Search, Filter, Users, Plus } from 'lucide-react';
import { Club } from '../../types';
import ClubCard from './ClubCard';
import { useAuth } from '../../contexts/AuthContext';

const ClubsPage: React.FC = () => {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    university: '',
    isActive: true,
  });
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'joined'>('all');
  const [joinedClubs, setJoinedClubs] = useState<Set<string>>(new Set());
  const { user } = useAuth();

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockClubs: Club[] = [
      {
        id: '1',
        name: 'Computer Science Society',
        description: 'A community for CS students to collaborate on projects, attend tech talks, and prepare for careers in technology. We host weekly coding sessions and invite industry speakers.',
        category: 'Technology',
        university: 'Stanford University',
        memberCount: 245,
        isActive: true,
        tags: ['Programming', 'Tech Talks', 'Networking', 'Career Development'],
        meetingSchedule: 'Wednesdays 7:00 PM',
        contactEmail: 'cs-society@stanford.edu',
        createdAt: '2024-01-15T00:00:00Z',
      },
      {
        id: '2',
        name: 'Debate Club',
        description: 'Sharpen your argumentation skills and engage in intellectual discourse on current events, philosophy, and policy. Perfect for pre-law students and anyone who loves a good debate.',
        category: 'Academic',
        university: 'Stanford University',
        memberCount: 89,
        isActive: true,
        tags: ['Public Speaking', 'Critical Thinking', 'Current Events'],
        meetingSchedule: 'Tuesdays & Thursdays 6:30 PM',
        contactEmail: 'debate@stanford.edu',
        createdAt: '2024-01-10T00:00:00Z',
      },
      {
        id: '3',
        name: 'Environmental Action Group',
        description: 'Dedicated to promoting sustainability on campus and in the community. We organize clean-up events, advocate for green policies, and educate about climate change.',
        category: 'Volunteer',
        university: 'Stanford University',
        memberCount: 156,
        isActive: true,
        tags: ['Sustainability', 'Community Service', 'Advocacy'],
        meetingSchedule: 'Sundays 2:00 PM',
        contactEmail: 'green@stanford.edu',
        createdAt: '2024-01-20T00:00:00Z',
      },
      {
        id: '4',
        name: 'International Students Association',
        description: 'A welcoming community for international students to connect, share cultures, and support each other through the university experience.',
        category: 'Cultural',
        university: 'Stanford University',
        memberCount: 312,
        isActive: true,
        tags: ['Cultural Exchange', 'Support Network', 'Events'],
        meetingSchedule: 'Fridays 5:00 PM',
        contactEmail: 'isa@stanford.edu',
        createdAt: '2024-01-05T00:00:00Z',
      },
      {
        id: '5',
        name: 'Entrepreneurship Club',
        description: 'For aspiring entrepreneurs and innovators. We host pitch competitions, startup workshops, and networking events with successful founders and VCs.',
        category: 'Professional',
        university: 'Stanford University',
        memberCount: 198,
        isActive: true,
        tags: ['Startups', 'Innovation', 'Networking', 'Business'],
        meetingSchedule: 'Mondays 7:30 PM',
        contactEmail: 'entrepreneurs@stanford.edu',
        createdAt: '2024-01-12T00:00:00Z',
      },
      {
        id: '6',
        name: 'Ultimate Frisbee Club',
        description: 'Join us for fun, competitive ultimate frisbee! All skill levels welcome. We practice regularly and compete in inter-collegiate tournaments.',
        category: 'Sports',
        university: 'Stanford University',
        memberCount: 67,
        isActive: true,
        tags: ['Sports', 'Competition', 'Fitness', 'Team Building'],
        meetingSchedule: 'Tuesdays & Saturdays 4:00 PM',
        contactEmail: 'frisbee@stanford.edu',
        createdAt: '2024-01-08T00:00:00Z',
      },
    ];
    setClubs(mockClubs);
    
    // Mock joined clubs
    setJoinedClubs(new Set(['1', '3']));
  }, []);

  const filteredClubs = clubs.filter(club => {
    const matchesSearch = club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         club.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         club.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = !filters.category || club.category === filters.category;
    const matchesUniversity = !filters.university || club.university === filters.university;
    const matchesActive = !filters.isActive || club.isActive;

    if (activeTab === 'joined') {
      const isJoined = joinedClubs.has(club.id);
      return matchesSearch && matchesCategory && matchesUniversity && matchesActive && isJoined;
    }
    
    return matchesSearch && matchesCategory && matchesUniversity && matchesActive;
  });

  const handleJoinClub = (clubId: string) => {
    const newJoinedClubs = new Set(joinedClubs);
    if (joinedClubs.has(clubId)) {
      newJoinedClubs.delete(clubId);
    } else {
      newJoinedClubs.add(clubId);
    }
    setJoinedClubs(newJoinedClubs);
    
    // Update member count
    setClubs(clubs.map(club => 
      club.id === clubId 
        ? { ...club, memberCount: joinedClubs.has(clubId) ? club.memberCount - 1 : club.memberCount + 1 }
        : club
    ));
  };

  const categories = [...new Set(clubs.map(club => club.category))];
  const universities = [...new Set(clubs.map(club => club.university))];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">College Clubs</h1>
          <p className="text-gray-600">Discover and join clubs that match your interests</p>
        </div>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          <Plus className="w-4 h-4 mr-2" />
          Create Club
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('all')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'all'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            All Clubs ({clubs.length})
          </button>
          <button
            onClick={() => setActiveTab('joined')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'joined'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            My Clubs ({joinedClubs.size})
          </button>
        </nav>
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
              placeholder="Search clubs by name, description, or tags..."
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
                  Category
                </label>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                  className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
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
                  {universities.map(university => (
                    <option key={university} value={university}>{university}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={filters.isActive ? 'active' : 'all'}
                  onChange={(e) => setFilters({ ...filters, isActive: e.target.value === 'active' })}
                  className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="all">All Clubs</option>
                  <option value="active">Active Only</option>
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
          {filteredClubs.length} clubs found
        </div>
      </div>

      {filteredClubs.length === 0 ? (
        <div className="text-center py-12">
          <Users className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            {activeTab === 'joined' ? 'No clubs joined yet' : 'No clubs found'}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {activeTab === 'joined' 
              ? 'Join some clubs to see them here.'
              : 'Try adjusting your search criteria or filters.'
            }
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClubs.map(club => (
            <ClubCard
              key={club.id}
              club={club}
              onJoin={handleJoinClub}
              isJoined={joinedClubs.has(club.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ClubsPage;