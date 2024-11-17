import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Home, MessageSquare, Users, LogOut } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentUser, logout } = useAuth();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Users className="h-8 w-8 text-indigo-600" />
            <span className="font-bold text-xl">CollegeConnect</span>
          </Link>

          {currentUser && (
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-gray-600 hover:text-indigo-600">
                <Home className="h-6 w-6" />
              </Link>
              <Link to="/messages" className="text-gray-600 hover:text-indigo-600">
                <MessageSquare className="h-6 w-6" />
              </Link>
              <Link to={`/profile/${currentUser.id}`} className="flex items-center space-x-2">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="h-8 w-8 rounded-full"
                />
              </Link>
              <button
                onClick={logout}
                className="text-gray-600 hover:text-indigo-600"
              >
                <LogOut className="h-6 w-6" />
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};