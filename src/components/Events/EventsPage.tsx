import React, { useState, useEffect } from 'react';
import { Search, Filter, Calendar, Plus, Clock } from 'lucide-react';
import { Event, Club } from '../../types';
import EventCard from './EventCard';
import { useAuth } from '../../contexts/AuthContext';

const EventsPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    date: '',
    location: '',
    isVirtual: '',
  });
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'my-events'>('upcoming');
  const [userRSVPs, setUserRSVPs] = useState<Map<string, 'going' | 'interested' | 'not-going'>>(new Map());
  const { user } = useAuth();

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockClubs: Club[] = [
      {
        id: '1',
        name: 'Computer Science Society',
        description: '',
        category: 'Technology',
        university: 'Stanford University',
        memberCount: 245,
        isActive: true,
        tags: [],
        meetingSchedule: '',
        contactEmail: 'cs-society@stanford.edu',
        createdAt: '2024-01-15T00:00:00Z',
      },
      {
        id: '2',
        name: 'Environmental Action Group',
        description: '',
        category: 'Volunteer',
        university: 'Stanford University',
        memberCount: 156,
        isActive: true,
        tags: [],
        meetingSchedule: '',
        contactEmail: 'green@stanford.edu',
        createdAt: '2024-01-20T00:00:00Z',
      },
    ];

    const mockEvents: Event[] = [
      {
        id: '1',
        title: 'Tech Talk: AI in Healthcare',
        description: 'Join us for an exciting presentation on how artificial intelligence is revolutionizing healthcare. Our guest speaker, Dr. Sarah Chen from Stanford Medical, will discuss current applications and future possibilities.',
        category: 'academic',
        date: '2024-02-15',
        time: '19:00',
        location: 'Gates Building, Room 104',
        university: 'Stanford University',
        organizerId: '2',
        clubId: '1',
        maxAttendees: 100,
        currentAttendees: 67,
        isVirtual: false,
        tags: ['AI', 'Healthcare', 'Technology', 'Guest Speaker'],
        createdAt: '2024-01-25T00:00:00Z',
        club: mockClubs[0],
      },
      {
        id: '2',
        title: 'Campus Cleanup Day',
        description: 'Help us make our campus more beautiful! Join the Environmental Action Group for our monthly campus cleanup. We\'ll provide all supplies and refreshments.',
        category: 'volunteer',
        date: '2024-02-10',
        time: '09:00',
        location: 'Main Quad',
        university: 'Stanford University',
        organizerId: '3',
        clubId: '2',
        currentAttendees: 23,
        isVirtual: false,
        tags: ['Environment', 'Community Service', 'Outdoor'],
        createdAt: '2024-01-20T00:00:00Z',
        club: mockClubs[1],
      },
      {
        id: '3',
        title: 'Virtual Career Fair',
        description: 'Connect with top employers from tech, finance, consulting, and more. This virtual event features company booths, 1-on-1 chats with recruiters, and resume review sessions.',
        category: 'career',
        date: '2024-02-20',
        time: '10:00',
        location: 'Virtual Event',
        university: 'Stanford University',
        organizerId: '4',
        maxAttendees: 500,
        currentAttendees: 234,
        isVirtual: true,
        meetingLink: 'https://zoom.us/j/123456789',
        tags: ['Career', 'Networking', 'Recruiting', 'Virtual'],
        createdAt: '2024-01-18T00:00:00Z',
      },
      {
        id: '4',
        title: 'International Food Festival',
        description: 'Celebrate diversity through food! Students from around the world will share traditional dishes from their home countries. Come hungry and ready to explore new flavors.',
        category: 'cultural',
        date: '2024-02-25',
        time: '17:00',
        location: 'Student Union Plaza',
        university: 'Stanford University',
        organizerId: '5',
        currentAttendees: 145,
        isVirtual: false,
        tags: ['Food', 'Culture', 'International', 'Community'],
        createdAt: '2024-01-22T00:00:00Z',
      },
      {
        id: '5',
        title: 'Study Skills Workshop',
        description: 'Learn effective study techniques, time management strategies, and test-taking tips from academic success coaches. Perfect for students looking to improve their academic performance.',
        category: 'academic',
        date: '2024-02-12',
        time: '14:00',
        location: 'Library Conference Room A',
        university: 'Stanford University',
        organizerId: '6',
        maxAttendees: 30,
        currentAttendees: 18,
        isVirtual: false,
        tags: ['Study Skills', 'Academic Success', 'Workshop'],
        createdAt: '2024-01-19T00:00:00Z',
      },
      {
        id: '6',
        title: 'Basketball Tournament',
        description: 'Annual inter-dormitory basketball tournament! Form teams with your dorm mates and compete for the championship trophy. All skill levels welcome.',
        category: 'sports',
        date: '2024-02-18',
        time: '13:00',
        location: 'Recreation Center Courts',
        university: 'Stanford University',
        organizerId: '7',
        currentAttendees: 89,
        isVirtual: false,
        tags: ['Basketball', 'Competition', 'Sports', 'Tournament'],
        createdAt: '2024-01-16T00:00:00Z',
      },
    ];

    setEvents(mockEvents);
    
    // Mock user RSVPs
    const mockRSVPs = new Map([
      ['1', 'going'],
      ['3', 'interested'],
    ]);
    setUserRSVPs(mockRSVPs);
  }, []);

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = !filters.category || event.category === filters.category;
    const matchesLocation = !filters.location || 
                           event.location.toLowerCase().includes(filters.location.toLowerCase());
    const matchesVirtual = !filters.isVirtual || 
                          (filters.isVirtual === 'virtual' && event.isVirtual) ||
                          (filters.isVirtual === 'in-person' && !event.isVirtual);

    let matchesDate = true;
    if (filters.date) {
      const eventDate = new Date(event.date);
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      const nextWeek = new Date(today);
      nextWeek.setDate(today.getDate() + 7);

      switch (filters.date) {
        case 'today':
          matchesDate = eventDate.toDateString() === today.toDateString();
          break;
        case 'tomorrow':
          matchesDate = eventDate.toDateString() === tomorrow.toDateString();
          break;
        case 'this-week':
          matchesDate = eventDate >= today && eventDate <= nextWeek;
          break;
        default:
          matchesDate = true;
      }
    }

    if (activeTab === 'my-events') {
      const hasRSVP = userRSVPs.has(event.id) && userRSVPs.get(event.id) !== 'not-going';
      return matchesSearch && matchesCategory && matchesLocation && matchesVirtual && matchesDate && hasRSVP;
    }
    
    return matchesSearch && matchesCategory && matchesLocation && matchesVirtual && matchesDate;
  });

  const handleRSVP = (eventId: string, status: 'going' | 'interested' | 'not-going') => {
    const newRSVPs = new Map(userRSVPs);
    const currentStatus = newRSVPs.get(eventId);
    
    if (currentStatus === status) {
      // If clicking the same status, remove RSVP
      newRSVPs.delete(eventId);
    } else {
      newRSVPs.set(eventId, status);
    }
    
    setUserRSVPs(newRSVPs);
    
    // Update attendee count
    setEvents(events.map(event => {
      if (event.id === eventId) {
        let attendeeChange = 0;
        if (status === 'going' && currentStatus !== 'going') {
          attendeeChange = 1;
        } else if (currentStatus === 'going' && status !== 'going') {
          attendeeChange = -1;
        }
        return { ...event, currentAttendees: Math.max(0, event.currentAttendees + attendeeChange) };
      }
      return event;
    }));
  };

  const categories = [...new Set(events.map(event => event.category))];
  const upcomingEvents = events.filter(event => new Date(event.date) >= new Date());
  const myEvents = events.filter(event => userRSVPs.has(event.id) && userRSVPs.get(event.id) !== 'not-going');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Campus Events</h1>
          <p className="text-gray-600">Discover and attend events happening on campus</p>
        </div>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          <Plus className="w-4 h-4 mr-2" />
          Create Event
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'upcoming'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              Upcoming Events ({upcomingEvents.length})
            </div>
          </button>
          <button
            onClick={() => setActiveTab('my-events')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'my-events'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              My Events ({myEvents.length})
            </div>
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
              placeholder="Search events by title, description, or tags..."
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <select
                  value={filters.date}
                  onChange={(e) => setFilters({ ...filters, date: e.target.value })}
                  className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="">Any Date</option>
                  <option value="today">Today</option>
                  <option value="tomorrow">Tomorrow</option>
                  <option value="this-week">This Week</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Format
                </label>
                <select
                  value={filters.isVirtual}
                  onChange={(e) => setFilters({ ...filters, isVirtual: e.target.value })}
                  className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="">All Formats</option>
                  <option value="in-person">In-Person</option>
                  <option value="virtual">Virtual</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="Search location..."
                  value={filters.location}
                  onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                  className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="w-4 h-4 mr-2" />
          {filteredEvents.length} events found
        </div>
      </div>

      {filteredEvents.length === 0 ? (
        <div className="text-center py-12">
          <Calendar className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            {activeTab === 'my-events' ? 'No events in your calendar' : 'No events found'}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {activeTab === 'my-events' 
              ? 'RSVP to some events to see them here.'
              : 'Try adjusting your search criteria or filters.'
            }
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map(event => (
            <EventCard
              key={event.id}
              event={event}
              onRSVP={handleRSVP}
              userRSVPStatus={userRSVPs.get(event.id) || null}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default EventsPage;