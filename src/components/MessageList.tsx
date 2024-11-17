import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { messages, users } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

export const MessageList: React.FC = () => {
  const { currentUser } = useAuth();

  if (!currentUser) return null;

  const userMessages = messages.filter(
    m => m.senderId === currentUser.id || m.receiverId === currentUser.id
  );

  const uniqueUsers = new Set(
    userMessages.map(m =>
      m.senderId === currentUser.id ? m.receiverId : m.senderId
    )
  );

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Messages</h2>
      </div>
      <div className="divide-y">
        {Array.from(uniqueUsers).map(userId => {
          const user = users.find(u => u.id === userId);
          if (!user) return null;

          const lastMessage = userMessages
            .filter(
              m =>
                (m.senderId === userId && m.receiverId === currentUser.id) ||
                (m.senderId === currentUser.id && m.receiverId === userId)
            )
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            )[0];

          return (
            <Link
              key={userId}
              to={`/messages/${userId}`}
              className="flex items-center p-4 hover:bg-gray-50"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="h-12 w-12 rounded-full"
              />
              <div className="ml-4 flex-1">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-medium text-gray-900">{user.name}</h3>
                  <p className="text-sm text-gray-500">
                    {formatDistanceToNow(new Date(lastMessage.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
                <p className="text-sm text-gray-500 truncate">
                  {lastMessage.content}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};