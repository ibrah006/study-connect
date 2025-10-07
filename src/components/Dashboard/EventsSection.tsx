import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Users, ArrowRight, Globe } from 'lucide-react';
import { Event } from '../../types';

interface EventsSectionProps {
  onViewAllEvents: () => void;
}

const EventsSection: React.FC<EventsSectionProps> = ({ onViewAllEvents }) => {
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);

  useEffect(() => {
    // Mock upcoming events - replace with actual API call
    const mockEvents: Event[] = [
      {
        id: '1',
        title: 'Tech Talk: AI in Healthcare',
        description: 'Join us for an exciting presentation on how artificial intelligence is revolutionizing healthcare.',
        category: 'academic',
        date: '2024-02-15',
        time: '19:00',
        location: 'Gates Building, Room 104',
        university: 'Stanford University',
        organizerId: '2',
        currentAttendees: 67,
        maxAttendees: 100,
        isVirtual: false,
        tags: ['AI', 'Healthcare', 'Technology'],
        createdAt: '2024-01-25T00:00:00Z',
      },
      {
        id: '2',
        title: 'Virtual Career Fair',
        description: 'Connect with top employers from tech, finance, consulting, and more.',
        category: 'career',
        date: '2024-02-20',
        time: '10:00',
        location: 'Virtual Event',
        university: 'Stanford University',
        organizerId: '4',
        currentAttendees: 234,
        maxAttendees: 500,
        isVirtual: true,
        tags: ['Career', 'Networking', 'Virtual'],
        createdAt: '2024-01-18T00:00:00Z',
      },
      {
        id: '3',
        title: 'International Food Festival',
        description: 'Celebrate diversity through food! Students from around the world will share traditional dishes.',
        category: 'cultural',
        date: '2024-02-25',
        time: '17:00',
        location: 'Student Union Plaza',
        university: 'Stanford University',
        organizerId: '5',
        currentAttendees: 145,
        isVirtual: false,
        tags: ['Food', 'Culture', 'International'],
        createdAt: '2024-01-22T00:00:00Z',
      },
    ];
    setUpcomingEvents(mockEvents);
  }, []);

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
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { 
        weekday: 'short',
        month: 'short', 
        day: 'numeric'
      });
    }
  };

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
            <Calendar className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Upcoming Events</h2>
            <p className="text-sm text-gray-600">Don't miss out on campus activities</p>
          </div>
        </div>
        <button
          onClick={onViewAllEvents}
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
        >
          View All
          <ArrowRight className="w-4 h-4 ml-1" />
        </button>
      </div>

      <div className="space-y-4">
        {upcomingEvents.map((event) => (
          <div
            key={event.id}
            className="flex items-start space-x-4 p-4 rounded-lg border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all cursor-pointer"
            onClick={onViewAllEvents}
          >
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex flex-col items-center justify-center">
                <span className="text-xs font-medium text-gray-600 uppercase">
                  {formatDate(event.date).split(' ')[0]}
                </span>
                <span className="text-sm font-bold text-gray-900">
                  {formatDate(event.date).split(' ')[1]?.replace(',', '') || new Date(event.date).getDate()}
                </span>
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center mb-2">
                <h3 className="text-sm font-semibold text-gray-900 truncate mr-2">
                  {event.title}
                </h3>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(event.category)}`}>
                  {event.category}
                </span>
              </div>

              <div className="flex items-center space-x-4 text-xs text-gray-600 mb-2">
                <div className="flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  <span>{formatTime(event.time)}</span>
                </div>
                <div className="flex items-center">
                  {event.isVirtual ? (
                    <>
                      <Globe className="w-3 h-3 mr-1" />
                      <span>Virtual</span>
                    </>
                  ) : (
                    <>
                      <MapPin className="w-3 h-3 mr-1" />
                      <span className="truncate">{event.location}</span>
                    </>
                  )}
                </div>
                <div className="flex items-center">
                  <Users className="w-3 h-3 mr-1" />
                  <span>{event.currentAttendees} attending</span>
                </div>
              </div>

              <p className="text-xs text-gray-600 line-clamp-1">
                {event.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {upcomingEvents.length === 0 && (
        <div className="text-center py-8">
          <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-sm font-medium text-gray-900 mb-2">No upcoming events</h3>
          <p className="text-sm text-gray-500">Check back later for new campus events</p>
        </div>
      )}
    </div>
  );
};

export default EventsSection;