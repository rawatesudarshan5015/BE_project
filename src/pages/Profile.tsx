import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { users, posts } from '../data/mockData';
import { Post } from '../components/Post';
import { useAuth } from '../context/AuthContext';
import { Pencil, Check, X } from 'lucide-react';

export const Profile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { currentUser } = useAuth();
  const user = users.find(u => u.id === id);
  const userPosts = posts.filter(post => post.userId === id);

  const [isEditing, setIsEditing] = useState(false);
  const [editedBio, setEditedBio] = useState(user?.bio || '');
  const [editedYear, setEditedYear] = useState(user?.year || '');

  if (!user) return <div>User not found</div>;

  const isConnected = currentUser?.connections.includes(user.id);
  const isOwnProfile = currentUser?.id === user.id;

  const handleSaveProfile = () => {
    // In a real app, this would update the backend
    console.log('Saving profile:', { bio: editedBio, year: editedYear });
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center space-x-6">
          <img
            src={user.avatar}
            alt={user.name}
            className="h-32 w-32 rounded-full"
          />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
              {isOwnProfile && !isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-gray-600 hover:text-indigo-600"
                >
                  <Pencil className="h-5 w-5" />
                </button>
              )}
              {isEditing && (
                <div className="flex space-x-2">
                  <button
                    onClick={handleSaveProfile}
                    className="text-green-600 hover:text-green-700"
                  >
                    <Check className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>
            <p className="text-gray-600">
              {user.role} - {user.department}
            </p>
            {isEditing ? (
              <input
                type="text"
                value={editedYear}
                onChange={e => setEditedYear(e.target.value)}
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Year"
              />
            ) : (
              user.year && <p className="text-gray-600">{user.year}</p>
            )}
            {isEditing ? (
              <textarea
                value={editedBio}
                onChange={e => setEditedBio(e.target.value)}
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                rows={3}
                placeholder="Bio"
              />
            ) : (
              <p className="mt-2 text-gray-700">{user.bio}</p>
            )}
            <div className="mt-4">
              {currentUser && currentUser.id !== user.id && (
                <button
                  className={`px-4 py-2 rounded-md ${
                    isConnected
                      ? 'bg-gray-200 text-gray-700'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  {isConnected ? 'Connected' : 'Connect'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {userPosts.map(post => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};