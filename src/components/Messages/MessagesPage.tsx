import React, { useState, useEffect } from 'react';
import { Search, Send, Users, MessageCircle } from 'lucide-react';
import { Message, User } from '../../types';
import { useAuth } from '../../contexts/AuthContext';

interface Conversation {
  id: string;
  participant: User;
  lastMessage: Message;
  unreadCount: number;
}

const MessagesPage: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
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
        bio: 'Passionate about AI and machine learning.',
        skills: ['Python', 'TensorFlow', 'React'],
        interests: ['AI', 'Research'],
        createdAt: '2024-01-15T00:00:00Z',
      },
      {
        id: '3',
        email: 'bob@stanford.edu',
        name: 'Bob Chen',
        university: 'Stanford University',
        major: 'Electrical Engineering',
        graduationYear: 2024,
        bio: 'Senior EE student interested in hardware design.',
        skills: ['C++', 'VHDL', 'Circuit Design'],
        interests: ['Hardware', 'IoT'],
        createdAt: '2024-01-10T00:00:00Z',
      },
    ];

    const mockConversations: Conversation[] = mockUsers.map((participant, index) => ({
      id: participant.id,
      participant,
      lastMessage: {
        id: `msg-${index}`,
        senderId: index === 0 ? participant.id : user?.id || '1',
        receiverId: index === 0 ? user?.id || '1' : participant.id,
        content: index === 0 
          ? 'Hey! Are you still looking for a study partner for CS229?' 
          : 'Thanks for connecting! Looking forward to collaborating.',
        createdAt: new Date(Date.now() - index * 3600000).toISOString(),
      },
      unreadCount: index === 0 ? 2 : 0,
    }));

    setConversations(mockConversations);
  }, [user?.id]);

  useEffect(() => {
    if (selectedConversation) {
      // Mock messages for selected conversation
      const mockMessages: Message[] = [
        {
          id: '1',
          senderId: selectedConversation,
          receiverId: user?.id || '1',
          content: 'Hey! Are you still looking for a study partner for CS229?',
          createdAt: '2024-01-25T10:00:00Z',
        },
        {
          id: '2',
          senderId: user?.id || '1',
          receiverId: selectedConversation,
          content: 'Yes! I\'d love to study together. When are you usually free?',
          createdAt: '2024-01-25T10:05:00Z',
        },
        {
          id: '3',
          senderId: selectedConversation,
          receiverId: user?.id || '1',
          content: 'I\'m free most evenings after 6 PM. How about we meet at the library tomorrow?',
          createdAt: '2024-01-25T10:10:00Z',
        },
      ];
      setMessages(mockMessages);
    }
  }, [selectedConversation, user?.id]);

  const filteredConversations = conversations.filter(conv =>
    conv.participant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversation) return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: user?.id || '1',
      receiverId: selectedConversation,
      content: newMessage.trim(),
      createdAt: new Date().toISOString(),
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      });
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  const selectedConversationData = conversations.find(conv => conv.id === selectedConversation);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-[600px] flex">
        {/* Conversations List */}
        <div className="w-1/3 border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Messages</h2>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md text-sm leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredConversations.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                <MessageCircle className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                <p className="text-sm">No conversations yet</p>
              </div>
            ) : (
              filteredConversations.map((conversation) => (
                <button
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation.id)}
                  className={`w-full p-4 text-left hover:bg-gray-50 border-b border-gray-100 transition-colors ${
                    selectedConversation === conversation.id ? 'bg-blue-50 border-blue-200' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {conversation.participant.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatTime(conversation.lastMessage.createdAt)}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-600 truncate">
                          {conversation.lastMessage.content}
                        </p>
                        {conversation.unreadCount > 0 && (
                          <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-blue-600 rounded-full">
                            {conversation.unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      {selectedConversationData?.participant.name}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {selectedConversationData?.participant.major} • {selectedConversationData?.participant.university}
                    </p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.senderId === user?.id ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.senderId === user?.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.senderId === user?.id ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {formatTime(message.createdAt)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    type="submit"
                    disabled={!newMessage.trim()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <MessageCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
                <p className="text-sm text-gray-500">Choose a conversation from the list to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;