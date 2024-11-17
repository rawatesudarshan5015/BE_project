import React from 'react';
import { Post } from '../components/Post';
import { posts } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Welcome to CollegeConnect</h1>
        <p className="text-xl text-gray-600 mb-8">Please log in to continue</p>
        <Link
          to="/login"
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
        >
          Log In
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <div className="space-y-6">
        {posts.map(post => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};