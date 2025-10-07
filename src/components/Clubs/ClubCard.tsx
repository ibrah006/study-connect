import React from 'react';
import { Users, Calendar, Mail, Tag, MapPin, UserPlus, Check } from 'lucide-react';
import { Club } from '../../types';

interface ClubCardProps {
  club: Club;
  onJoin: (clubId: string) => void;
  isJoined?: boolean;
}

const ClubCard: React.FC<ClubCardProps> = ({ club, onJoin, isJoined = false }) => {
  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'academic': 'bg-blue-100 text-blue-800',
      'sports': 'bg-green-100 text-green-800',
      'cultural': 'bg-purple-100 text-purple-800',
      'technology': 'bg-indigo-100 text-indigo-800',
      'volunteer': 'bg-yellow-100 text-yellow-800',
      'social': 'bg-pink-100 text-pink-800',
      'professional': 'bg-gray-100 text-gray-800',
    };
    return colors[category.toLowerCase()] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <h3 className="text-lg font-semibold text-gray-900 mr-3">{club.name}</h3>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(club.category)}`}>
              {club.category}
            </span>
          </div>
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{club.university}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{club.meetingSchedule}</span>
          </div>
        </div>
        <div className={`w-3 h-3 rounded-full ${club.isActive ? 'bg-green-400' : 'bg-gray-400'}`} 
             title={club.isActive ? 'Active' : 'Inactive'} />
      </div>

      <p className="text-gray-700 text-sm mb-4 line-clamp-3">{club.description}</p>

      {club.tags && club.tags.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {club.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700"
              >
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </span>
            ))}
            {club.tags.length > 3 && (
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700">
                +{club.tags.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            <span>{club.memberCount} members</span>
          </div>
          <div className="flex items-center">
            <Mail className="w-4 h-4 mr-1" />
            <span className="truncate">{club.contactEmail}</span>
          </div>
        </div>

        {isJoined ? (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <Check className="w-4 h-4 mr-1" />
            Joined
          </span>
        ) : (
          <button
            onClick={() => onJoin(club.id)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Join Club
          </button>
        )}
      </div>
    </div>
  );
};

export default ClubCard;