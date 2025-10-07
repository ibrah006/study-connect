import React from 'react';
import { Calendar, Clock, MapPin, Users, ExternalLink, Heart, UserCheck, Globe } from 'lucide-react';
import { Event } from '../../types';

interface EventCardProps {
  event: Event;
  onRSVP: (eventId: string, status: 'going' | 'interested' | 'not-going') => void;
  userRSVPStatus?: 'going' | 'interested' | 'not-going' | null;
}

const EventCard: React.FC<EventCardProps> = ({ event, onRSVP, userRSVPStatus = null }) => {
  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'academic': 'bg-blue-100 text-blue-800',
      'social': 'bg-pink-100 text-pink-800',
      'career': 'bg-green-100 text-green-800',
      'sports': 'bg-orange-100 text-orange-800',
      'cultural': 'bg-purple-100 text-purple-800',
      'volunteer': 'bg-yellow-100 text-yellow-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const isEventFull = event.maxAttendees ? event.currentAttendees >= event.maxAttendees : false;
  const isEventPast = new Date(event.date) < new Date();

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <h3 className="text-lg font-semibold text-gray-900 mr-3">{event.title}</h3>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(event.category)}`}>
              {event.category}
            </span>
          </div>
          
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              <span>{formatDate(event.date)}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              <span>{formatTime(event.time)}</span>
            </div>
            <div className="flex items-center">
              {event.isVirtual ? (
                <>
                  <Globe className="w-4 h-4 mr-2" />
                  <span>Virtual Event</span>
                </>
              ) : (
                <>
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{event.location}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <p className="text-gray-700 text-sm mb-4 line-clamp-3">{event.description}</p>

      {event.club && (
        <div className="mb-4 p-3 bg-gray-50 rounded-md">
          <p className="text-sm text-gray-600">
            Organized by <span className="font-medium text-gray-900">{event.club.name}</span>
          </p>
        </div>
      )}

      {event.tags && event.tags.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {event.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700"
              >
                {tag}
              </span>
            ))}
            {event.tags.length > 3 && (
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700">
                +{event.tags.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            <span>
              {event.currentAttendees}
              {event.maxAttendees && ` / ${event.maxAttendees}`} attending
            </span>
          </div>
          {isEventFull && (
            <span className="text-red-600 font-medium">Full</span>
          )}
        </div>

        {!isEventPast ? (
          <div className="flex space-x-2">
            <button
              onClick={() => onRSVP(event.id, 'interested')}
              className={`p-2 rounded-full transition-colors ${
                userRSVPStatus === 'interested'
                  ? 'text-pink-600 bg-pink-50 hover:bg-pink-100'
                  : 'text-gray-400 hover:text-pink-600 hover:bg-pink-50'
              }`}
              title="Interested"
            >
              <Heart className={`w-5 h-5 ${userRSVPStatus === 'interested' ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={() => onRSVP(event.id, 'going')}
              disabled={isEventFull && userRSVPStatus !== 'going'}
              className={`inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                userRSVPStatus === 'going'
                  ? 'border-green-600 text-green-600 bg-green-50 hover:bg-green-100'
                  : isEventFull
                  ? 'border-gray-300 text-gray-400 bg-gray-50 cursor-not-allowed'
                  : 'border-blue-600 text-blue-600 bg-white hover:bg-blue-50'
              }`}
            >
              <UserCheck className="w-4 h-4 mr-2" />
              {userRSVPStatus === 'going' ? 'Going' : 'RSVP'}
            </button>
          </div>
        ) : (
          <span className="text-gray-500 text-sm">Event ended</span>
        )}
      </div>

      {event.isVirtual && event.meetingLink && userRSVPStatus === 'going' && (
        <div className="mt-4 p-3 bg-blue-50 rounded-md">
          <a
            href={event.meetingLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Join Virtual Event
          </a>
        </div>
      )}
    </div>
  );
};

export default EventCard;