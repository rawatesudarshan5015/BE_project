import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { MessageList } from '../components/MessageList';
import { users } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import { useMessages } from '../context/MessageContext';
import { Send } from 'lucide-react';

export const Messages: React.FC = () => {
  const { userId } = useParams<{ userId?: string }>();
  const { currentUser } = useAuth();
  const { messages, sendMessage } = useMessages();
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  if (!currentUser) return null;

  const selectedUser = userId ? users.find(u => u.id === userId) : null;
  const conversation = userId
    ? messages
        .filter(
          m =>
            (m.senderId === currentUser.id && m.receiverId === userId) ||
            (m.senderId === userId && m.receiverId === currentUser.id)
        )
        .sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        )
    : [];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !userId) return;

    sendMessage(userId, newMessage.trim());
    setNewMessage('');
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation]);

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-4">
          <MessageList />
        </div>
        <div className="col-span-8">
          {selectedUser ? (
            <div className="bg-white rounded-lg shadow h-[calc(100vh-12rem)]">
              <div className="p-4 border-b">
                <div className="flex items-center space-x-3">
                  <img
                    src={selectedUser.avatar}
                    alt={selectedUser.name}
                    className="h-10 w-10 rounded-full"
                  />
                  <div>
                    <h2 className="font-semibold">{selectedUser.name}</h2>
                    <p className="text-sm text-gray-500">
                      {selectedUser.role} - {selectedUser.department}
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-4 h-[calc(100%-8rem)] overflow-y-auto space-y-4">
                {conversation.map(message => {
                  const isOwn = message.senderId === currentUser.id;
                  return (
                    <div
                      key={message.id}
                      className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                          isOwn
                            ? 'bg-indigo-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <p>{message.content}</p>
                        <p
                          className={`text-xs mt-1 ${
                            isOwn ? 'text-indigo-200' : 'text-gray-500'
                          }`}
                        >
                          {formatDistanceToNow(new Date(message.createdAt), {
                            addSuffix: true,
                          })}
                        </p>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>
              <form
                onSubmit={handleSendMessage}
                className="p-4 border-t bg-white"
              >
                <div className="flex space-x-4">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={e => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <button
                    type="submit"
                    className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow h-[calc(100vh-12rem)] flex items-center justify-center">
              <p className="text-gray-500">Select a conversation to start messaging</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};