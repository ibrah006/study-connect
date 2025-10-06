import React from 'react';
import { Users, Lock, Globe, School, Calendar, UserPlus } from 'lucide-react';
import { StudyGroup } from '../../types';

interface StudyGroupCardProps {
  group: StudyGroup;
  onJoin: (groupId: string) => void;
  isJoined?: boolean;
}

const StudyGroupCard: React.FC<StudyGroupCardProps> = ({ group, onJoin, isJoined = false }) => {
  const getVisibilityIcon = () => {
    switch (group.visibility) {
      case 'public':
        return <Globe className="w-4 h-4" />;
      case 'private':
        return <Lock className="w-4 h-4" />;
      case 'university-only':
        return <School className="w-4 h-4" />;
      default:
        return <Globe className="w-4 h-4" />;
    }
  };

  const getVisibilityText = () => {
    switch (group.visibility) {
      case 'public':
        return 'Public';
      case 'private':
        return 'Private';
      case 'university-only':
        return 'University Only';
      default:
        return 'Public';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{group.name}</h3>
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <School className="w-4 h-4 mr-1" />
            <span>{group.course}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{group.university}</span>
          </div>
        </div>
        <div className="flex items-center text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
          {getVisibilityIcon()}
          <span className="ml-1">{getVisibilityText()}</span>
        </div>
      </div>

      <p className="text-gray-700 text-sm mb-4 line-clamp-3">{group.description}</p>

      <div className="flex items-center justify-between">
        <div className="flex items-center text-sm text-gray-600">
          <Users className="w-4 h-4 mr-1" />
          <span>{group.members.length} members</span>
        </div>

        {isJoined ? (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Joined
          </span>
        ) : (
          <button
            onClick={() => onJoin(group.id)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Join Group
          </button>
        )}
      </div>
    </div>
  );
};

export default StudyGroupCard;