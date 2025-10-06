import React, { useState, useEffect } from 'react';
import { Users, UserCheck, UserX, Search } from 'lucide-react';
import { Connection, User } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import UserCard from '../Discover/UserCard';

const ConnectionsPage: React.FC = () => {
  const [connections, setConnections] = useState<Connection[]>([]);
  const [pendingRequests, setPendingRequests] = useState<Connection[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'connections' | 'pending'>('connections');
  const { user } = useAuth();

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
    ];

    const mockConnections: Connection[] = [
      {
        id: '1',
        userId: user?.id || '1',
        connectedUserId: '2',
        status: 'accepted',
        createdAt: '2024-01-15T00:00:00Z',
        user: mockUsers[0],
      },
      {
        id: '2',
        userId: user?.id || '1',
        connectedUserId: '3',
        status: 'accepted',
        createdAt: '2024-01-16T00:00:00Z',
        user: mockUsers[1],
      },
    ];

    const mockPendingRequests: Connection[] = [
      {
        id: '3',
        userId: '4',
        connectedUserId: user?.id || '1',
        status: 'pending',
        createdAt: '2024-01-25T00:00:00Z',
        user: mockUsers[2],
      },
    ];

    setConnections(mockConnections);
    setPendingRequests(mockPendingRequests);
  }, [user?.id]);

  const handleAcceptRequest = (connectionId: string) => {
    const request = pendingRequests.find(req => req.id === connectionId);
    if (request) {
      const acceptedConnection = { ...request, status: 'accepted' as const };
      setConnections([...connections, acceptedConnection]);
      setPendingRequests(pendingRequests.filter(req => req.id !== connectionId));
    }
  };

  const handleDeclineRequest = (connectionId: string) => {
    setPendingRequests(pendingRequests.filter(req => req.id !== connectionId));
  };

  const handleMessage = (userId: string) => {
    console.log('Messaging user:', userId);
    // Implement messaging logic
  };

  const filteredConnections = connections.filter(connection =>
    connection.user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    connection.user?.major.toLowerCase().includes(searchTerm.toLowerCase()) ||
    connection.user?.university.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPendingRequests = pendingRequests.filter(request =>
    request.user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.user?.major.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.user?.university.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Connections</h1>
        <p className="text-gray-600">Manage your network and connection requests</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('connections')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'connections'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-2" />
              Connections ({connections.length})
            </div>
          </button>
          <button
            onClick={() => setActiveTab('pending')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'pending'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center">
              <UserCheck className="w-4 h-4 mr-2" />
              Pending Requests ({pendingRequests.length})
              {pendingRequests.length > 0 && (
                <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                  {pendingRequests.length}
                </span>
              )}
            </div>
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
            placeholder={`Search ${activeTab === 'connections' ? 'connections' : 'requests'}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Content */}
      {activeTab === 'connections' ? (
        <div>
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-600">
              <Users className="w-4 h-4 mr-2" />
              {filteredConnections.length} connections
            </div>
          </div>

          {filteredConnections.length === 0 ? (
            <div className="text-center py-12">
              <Users className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                {searchTerm ? 'No connections found' : 'No connections yet'}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm 
                  ? 'Try adjusting your search criteria.'
                  : 'Start connecting with fellow students to build your network.'
                }
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredConnections.map(connection => (
                connection.user && (
                  <UserCard
                    key={connection.id}
                    user={connection.user}
                    onConnect={() => {}}
                    onMessage={handleMessage}
                    isConnected={true}
                  />
                )
              ))}
            </div>
          )}
        </div>
      ) : (
        <div>
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-600">
              <UserCheck className="w-4 h-4 mr-2" />
              {filteredPendingRequests.length} pending requests
            </div>
          </div>

          {filteredPendingRequests.length === 0 ? (
            <div className="text-center py-12">
              <UserCheck className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                {searchTerm ? 'No pending requests found' : 'No pending requests'}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm 
                  ? 'Try adjusting your search criteria.'
                  : 'New connection requests will appear here.'
                }
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredPendingRequests.map(request => (
                request.user && (
                  <div key={request.id} className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                          <Users className="w-6 h-6 text-gray-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{request.user.name}</h3>
                          <p className="text-gray-600">{request.user.major} • {request.user.university}</p>
                          <p className="text-sm text-gray-500">Class of {request.user.graduationYear}</p>
                        </div>
                      </div>
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleAcceptRequest(request.id)}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          <UserCheck className="w-4 h-4 mr-2" />
                          Accept
                        </button>
                        <button
                          onClick={() => handleDeclineRequest(request.id)}
                          className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          <UserX className="w-4 h-4 mr-2" />
                          Decline
                        </button>
                      </div>
                    </div>
                    {request.user.bio && (
                      <p className="mt-4 text-gray-700 text-sm">{request.user.bio}</p>
                    )}
                  </div>
                )
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ConnectionsPage;