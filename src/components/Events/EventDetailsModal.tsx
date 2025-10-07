import React from 'react';
import { X, Calendar, Clock, MapPin, Users, Globe, ExternalLink, Heart, UserCheck, Tag } from 'lucide-react';
import { Event } from '../../types';

interface EventDetailsModalProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
  onRSVP: (eventId: string, status: 'going' | 'interested' | 'not-going') => void;
  userRSVPStatus?: 'going' | 'interested' | 'not-going' | null;
}

const EventDetailsModal: React.FC<EventDetailsModalProps> = ({ 
  event, 
  isOpen, 
  onClose, 
  onRSVP, 
  userRSVPStatus = null 
}) => {
  if (!isOpen || !event) return null;

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
      weekday: 'long',
      month: 'long', 
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
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-10 mx-auto p-0 border w-full max-w-2xl shadow-lg rounded-lg bg-white">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-gray-200">
          <div className="flex-1">
            <div className="flex items-center mb-3">
              <h2 className="text-2xl font-bold text-gray-900 mr-3">{event.title}</h2>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(event.category)}`}>
                {event.category}
              </span>
            </div>
            
            <div className="space-y-2 text-gray-600">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-3" />
                <span className="font-medium">{formatDate(event.date)}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-3" />
                <span>{formatTime(event.time)}</span>
              </div>
              <div className="flex items-center">
                {event.isVirtual ? (
                  <>
                    <Globe className="w-5 h-5 mr-3" />
                    <span>Virtual Event - {event.location}</span>
                  </>
                ) : (
                  <>
                    <MapPin className="w-5 h-5 mr-3" />
                    <span>{event.location}</span>
                  </>
                )}
              </div>
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-3" />
                <span>
                  {event.currentAttendees} attending
                  {event.maxAttendees && ` (${event.maxAttendees} max)`}
                </span>
                {isEventFull && (
                  <span className="ml-2 text-red-600 font-medium">• Full</span>
                )}
              </div>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors ml-4"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Description */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">About This Event</h3>
            <p className="text-gray-700 leading-relaxed">{event.description}</p>
          </div>

          {/* Organizer */}
          {event.club && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-medium text-gray-900 mb-1">Organized by</h4>
              <p className="text-gray-700">{event.club.name}</p>
              <p className="text-sm text-gray-500">{event.club.contactEmail}</p>
            </div>
          )}

          {/* Tags */}
          {event.tags && event.tags.length > 0 && (
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {event.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700"
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Virtual Event Link */}
          {event.isVirtual && event.meetingLink && userRSVPStatus === 'going' && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="text-sm font-medium text-blue-900 mb-2">Meeting Information</h4>
              <a
                href={event.meetingLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Join Virtual Event
              </a>
              <p className="text-sm text-blue-700 mt-1">
                This link will be available 15 minutes before the event starts.
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-lg">
          {!isEventPast ? (
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                {isEventFull && userRSVPStatus !== 'going' ? (
                  <span className="text-red-600 font-medium">This event is full</span>
                ) : (
                  <span>Let others know if you're attending</span>
                )}
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => onRSVP(event.id, 'interested')}
                  className={`inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md transition-colors ${
                    userRSVPStatus === 'interested'
                      ? 'border-pink-600 text-pink-600 bg-pink-50 hover:bg-pink-100'
                      : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
                  }`}
                >
                  <Heart className={`w-4 h-4 mr-2 ${userRSVPStatus === 'interested' ? 'fill-current' : ''}`} />
                  {userRSVPStatus === 'interested' ? 'Interested' : 'Interested'}
                </button>
                
                <button
                  onClick={() => onRSVP(event.id, 'going')}
                  disabled={isEventFull && userRSVPStatus !== 'going'}
                  className={`inline-flex items-center px-6 py-2 border text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
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
            </div>
          ) : (
            <div className="text-center">
              <span className="text-gray-500">This event has ended</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetailsModal;