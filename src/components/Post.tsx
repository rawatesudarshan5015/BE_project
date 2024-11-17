import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { Post as PostType, User } from '../types';
import { users } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

interface PostProps {
  post: PostType;
}

export const Post: React.FC<PostProps> = ({ post }) => {
  const { currentUser } = useAuth();
  const [isLiked, setIsLiked] = useState(currentUser ? post.likes.includes(currentUser.id) : false);
  const [showComments, setShowComments] = useState(false);
  const author = users.find(u => u.id === post.userId) as User;

  const handleLike = () => {
    if (!currentUser) return;
    setIsLiked(!isLiked);
    // In a real app, you would update the backend here
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-center mb-4">
        <Link to={`/profile/${author.id}`} className="flex items-center">
          <img
            src={author.avatar}
            alt={author.name}
            className="h-10 w-10 rounded-full mr-3"
          />
          <div>
            <h3 className="font-semibold text-gray-900">{author.name}</h3>
            <p className="text-sm text-gray-500">
              {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
            </p>
          </div>
        </Link>
      </div>

      <p className="text-gray-800 mb-4">{post.content}</p>
      {post.image && (
        <img
          src={post.image}
          alt="Post content"
          className="rounded-lg mb-4 w-full"
        />
      )}

      <div className="flex items-center space-x-4 text-gray-500">
        <button
          onClick={handleLike}
          className={`flex items-center space-x-1 ${
            isLiked ? 'text-red-500' : ''
          }`}
        >
          <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
          <span>{post.likes.length}</span>
        </button>
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center space-x-1"
        >
          <MessageCircle className="h-5 w-5" />
          <span>{post.comments.length}</span>
        </button>
        <button className="flex items-center space-x-1">
          <Share2 className="h-5 w-5" />
        </button>
      </div>

      {showComments && (
        <div className="mt-4 space-y-4">
          {post.comments.map(comment => {
            const commentAuthor = users.find(u => u.id === comment.userId) as User;
            return (
              <div key={comment.id} className="flex items-start space-x-3">
                <img
                  src={commentAuthor.avatar}
                  alt={commentAuthor.name}
                  className="h-8 w-8 rounded-full"
                />
                <div className="flex-1 bg-gray-50 rounded-lg p-3">
                  <Link
                    to={`/profile/${commentAuthor.id}`}
                    className="font-semibold text-gray-900"
                  >
                    {commentAuthor.name}
                  </Link>
                  <p className="text-gray-800">{comment.content}</p>
                  <p className="text-sm text-gray-500">
                    {formatDistanceToNow(new Date(comment.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};