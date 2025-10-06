import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Users } from 'lucide-react';
import { StudyGroup, GroupMember } from '../../types';
import StudyGroupCard from './StudyGroupCard';
import CreateGroupModal, { GroupFormData } from './CreateGroupModal';
import { useAuth } from '../../contexts/AuthContext';

const StudyGroupsPage: React.FC = () => {
  const [groups, setGroups] = useState<StudyGroup[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'joined'>('all');
  const { user } = useAuth();

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockGroups: StudyGroup[] = [
      {
        id: '1',
        name: 'CS229 Machine Learning Study Group',
        description: 'Weekly study sessions for CS229. We meet every Tuesday at 7 PM in the library. Currently working through problem sets and preparing for the midterm.',
        course: 'Machine Learning (CS229)',
        university: 'Stanford University',
        visibility: 'public',
        creatorId: '2',
        members: [
          { id: '1', userId: '2', groupId: '1', role: 'admin', joinedAt: '2024-01-15T00:00:00Z' },
          { id: '2', userId: '3', groupId: '1', role: 'member', joinedAt: '2024-01-16T00:00:00Z' },
          { id: '3', userId: '4', groupId: '1', role: 'member', joinedAt: '2024-01-17T00:00:00Z' },
        ],
        createdAt: '2024-01-15T00:00:00Z',
      },
      {
        id: '2',
        name: 'Data Structures & Algorithms',
        description: 'Collaborative problem solving for CS106B. We focus on coding interviews preparation and homework help.',
        course: 'Programming Abstractions (CS106B)',
        university: 'Stanford University',
        visibility: 'university-only',
        creatorId: '3',
        members: [
          { id: '4', userId: '3', groupId: '2', role: 'admin', joinedAt: '2024-01-10T00:00:00Z' },
          { id: '5', userId: '5', groupId: '2', role: 'member', joinedAt: '2024-01-12T00:00:00Z' },
        ],
        createdAt: '2024-01-10T00:00:00Z',
      },
      {
        id: '3',
        name: 'Organic Chemistry Study Circle',
        description: 'Small group for Organic Chemistry. We meet twice a week to go over reactions and mechanisms.',
        course: 'Organic Chemistry (CHEM 33)',
        university: 'Stanford University',
        visibility: 'private',
        creatorId: '4',
        members: [
          { id: '6', userId: '4', groupId: '3', role: 'admin', joinedAt: '2024-01-20T00:00:00Z' },
        ],
        createdAt: '2024-01-20T00:00:00Z',
      },
    ];
    setGroups(mockGroups);
  }, []);

  const filteredGroups = groups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         group.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         group.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === 'joined') {
      const isJoined = group.members.some(member => member.userId === user?.id);
      return matchesSearch && isJoined;
    }
    
    return matchesSearch;
  });

  const handleCreateGroup = (groupData: GroupFormData) => {
    const newGroup: StudyGroup = {
      id: Date.now().toString(),
      ...groupData,
      creatorId: user?.id || '1',
      members: [
        {
          id: Date.now().toString(),
          userId: user?.id || '1',
          groupId: Date.now().toString(),
          role: 'admin',
          joinedAt: new Date().toISOString(),
        }
      ],
      createdAt: new Date().toISOString(),
    };
    
    setGroups([newGroup, ...groups]);
    setShowCreateModal(false);
  };

  const handleJoinGroup = (groupId: string) => {
    console.log('Joining group:', groupId);
    // Implement join group logic
  };

  const isUserInGroup = (group: StudyGroup) => {
    return group.members.some(member => member.userId === user?.id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Study Groups</h1>
          <p className="text-gray-600">Join study groups or create your own</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Group
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
            All Groups
          </button>
          <button
            onClick={() => setActiveTab('joined')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'joined'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            My Groups
          </button>
        </nav>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search study groups..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Results */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center text-sm text-gray-600">
          <Users className="w-4 h-4 mr-2" />
          {filteredGroups.length} groups found
        </div>
      </div>

      {filteredGroups.length === 0 ? (
        <div className="text-center py-12">
          <Users className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            {activeTab === 'joined' ? 'No groups joined yet' : 'No study groups found'}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {activeTab === 'joined' 
              ? 'Join some study groups to see them here.'
              : 'Try adjusting your search or create a new group.'
            }
          </p>
          {activeTab !== 'joined' && (
            <button
              onClick={() => setShowCreateModal(true)}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create First Group
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGroups.map(group => (
            <StudyGroupCard
              key={group.id}
              group={group}
              onJoin={handleJoinGroup}
              isJoined={isUserInGroup(group)}
            />
          ))}
        </div>
      )}

      <CreateGroupModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateGroup}
      />
    </div>
  );
};

export default StudyGroupsPage;