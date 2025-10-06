import React from 'react';
import { User, MapPin, GraduationCap, Calendar, UserPlus, MessageCircle } from 'lucide-react';
import { User as UserType } from '../../types';

interface UserCardProps {
  user: UserType;
  onConnect: (userId: string) => void;
  onMessage: (userId: string) => void;
  isConnected?: boolean;
  connectionPending?: boolean;
}

const UserCard: React.FC<UserCardProps> = ({ 
  user, 
  onConnect, 
  onMessage, 
  isConnected = false,
  connectionPending = false 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6">
      <div className="flex items-start space-x-4">
        <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
          {user.profileImage ? (
            <img
              src={user.profileImage}
              alt={user.name}
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <User className="w-8 h-8 text-gray-600" />
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 truncate">{user.name}</h3>
          <div className="flex items-center text-sm text-gray-600 mt-1">
            <GraduationCap className="w-4 h-4 mr-1" />
            <span className="truncate">{user.major}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600 mt-1">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="truncate">{user.university}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600 mt-1">
            <Calendar className="w-4 h-4 mr-1" />
            <span>Class of {user.graduationYear}</span>
          </div>
        </div>
      </div>

      {user.bio && (
        <p className="text-gray-700 text-sm mt-4 line-clamp-2">{user.bio}</p>
      )}

      {user.skills && user.skills.length > 0 && (
        <div className="mt-4">
          <div className="flex flex-wrap gap-2">
            {user.skills.slice(0, 3).map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                {skill}
              </span>
            ))}
            {user.skills.length > 3 && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                +{user.skills.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}

      <div className="flex space-x-3 mt-6">
        {isConnected ? (
          <button
            onClick={() => onMessage(user.id)}
            className="flex-1 flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Message
          </button>
        ) : (
          <button
            onClick={() => onConnect(user.id)}
            disabled={connectionPending}
            className={`flex-1 flex items-center justify-center px-4 py-2 border text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              connectionPending
                ? 'border-gray-300 text-gray-400 bg-gray-50 cursor-not-allowed'
                : 'border-blue-600 text-blue-600 bg-white hover:bg-blue-50'
            }`}
          >
            <UserPlus className="w-4 h-4 mr-2" />
            {connectionPending ? 'Pending' : 'Connect'}
          </button>
        )}
      </div>
    </div>
  );
};

export default UserCard;