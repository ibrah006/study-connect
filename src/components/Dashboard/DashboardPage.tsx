import React from 'react';
import { Users, Calendar, Briefcase, MessageCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import EventsSection from './EventsSection';

interface DashboardPageProps {
  onNavigate: (tab: string) => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate }) => {
  const { user } = useAuth();

  const quickActions = [
    {
      id: 'discover',
      title: 'Find Study Partners',
      description: 'Connect with students in your courses',
      icon: Users,
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600',
    },
    {
      id: 'groups',
      title: 'Join Study Groups',
      description: 'Collaborate on assignments and projects',
      icon: Users,
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600',
    },
    {
      id: 'careers',
      title: 'Explore Careers',
      description: 'Find internships and job opportunities',
      icon: Briefcase,
      color: 'bg-purple-500',
      hoverColor: 'hover:bg-purple-600',
    },
    {
      id: 'messages',
      title: 'Check Messages',
      description: 'Stay connected with your network',
      icon: MessageCircle,
      color: 'bg-orange-500',
      hoverColor: 'hover:bg-orange-600',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.name?.split(' ')[0]}! 👋
        </h1>
        <p className="text-gray-600">
          Ready to connect, learn, and grow with your university community?
        </p>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              onClick={() => onNavigate(action.id)}
              className={`${action.color} ${action.hoverColor} text-white rounded-lg p-6 text-left transition-all duration-200 transform hover:scale-105 hover:shadow-lg`}
            >
              <Icon className="w-8 h-8 mb-4" />
              <h3 className="text-lg font-semibold mb-2">{action.title}</h3>
              <p className="text-sm opacity-90">{action.description}</p>
            </button>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Events Section - Takes up 2 columns */}
        <div className="lg:col-span-2">
          <EventsSection onViewAllEvents={() => onNavigate('events')} />
        </div>

        {/* Stats/Info Sidebar */}
        <div className="space-y-6">
          {/* Profile Completion */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Completion</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Basic Info</span>
                <span className="text-green-600 font-medium">Complete</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Skills & Interests</span>
                <span className="text-green-600 font-medium">Complete</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Profile Photo</span>
                <span className="text-yellow-600 font-medium">Optional</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
              <p className="text-xs text-gray-500 text-center">85% Complete</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Network</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Users className="w-5 h-5 text-blue-500 mr-3" />
                  <span className="text-gray-700">Connections</span>
                </div>
                <span className="text-xl font-bold text-gray-900">24</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Users className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Study Groups</span>
                </div>
                <span className="text-xl font-bold text-gray-900">3</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 text-purple-500 mr-3" />
                  <span className="text-gray-700">Events Joined</span>
                </div>
                <span className="text-xl font-bold text-gray-900">7</span>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm text-gray-700">Joined CS229 Study Group</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm text-gray-700">Connected with Alice Johnson</p>
                  <p className="text-xs text-gray-500">1 day ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm text-gray-700">RSVP'd to Tech Talk event</p>
                  <p className="text-xs text-gray-500">2 days ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;