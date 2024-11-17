import { User, Post, Message } from '../types';

export const users: User[] = [
  {
    id: "1",
    name: "Sudarshan Rawate",
    avatar: "https://i.ibb.co/58MGwtg/Whats-App-Image-2024-10-10-at-23-37-01-6c9178d4.jpg",
    role: "Student",
    department: "Computer Science",
    year: "4rd Year",
    bio: "Passionate about Blockchain",
    connections: ["2", "3", "4", "5"]
  },
  {
    id: "2",
    name: "Mrinmayi",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    role: "Student",
    department: "Electronics",
    year: "4th Year",
    bio: "Future Electronics Engineer | Tech Enthusiast",
    connections: ["1", "3", "4"]
  },
  {
    id: "3",
    name: "vaidish",
    avatar: "https://i.ibb.co/RYzmPmy/Whats-App-Image-2024-11-17-at-23-05-07-84b774cd.jpg",
    role: "Student",
    department: "Information Technology",
    bio: "Research interests in Distributed Systems",
    connections: ["1", "2", "5"]
  },
  {
    id: "4",
    name: "Milonee",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    role: "Student",
    department: "Data Science",
    year: "2nd Year",
    bio: "Data Science enthusiast | ML Researcher",
    connections: ["1", "2"]
  },
  {
    id: "5",
    name: "Krishna",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    role: "Professor",
    department: "Electronics",
    bio: "Specializing in VLSI Design | 15 years of research experience",
    connections: ["1", "3"]
  }
];

export const posts: Post[] = [
  {
    id: "1",
    userId: "1",
    content: "Just finished my machine learning project! Check out the results 🚀",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=600&fit=crop",
    likes: ["2", "3"],
    comments: [
      {
        id: "c1",
        userId: "2",
        content: "This is amazing! Would love to collaborate.",
        createdAt: "2024-03-10T10:00:00Z"
      }
    ],
    createdAt: "2024-03-10T09:00:00Z"
  },
  {
    id: "2",
    userId: "2",
    content: "Our team won the college hackathon! 🏆",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=600&fit=crop",
    likes: ["1"],
    comments: [],
    createdAt: "2024-03-09T15:30:00Z"
  },
  {
    id: "3",
    userId: "4",
    content: "Just published my first research paper on Deep Learning! 📚",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&h=600&fit=crop",
    likes: ["1", "2", "3"],
    comments: [
      {
        id: "c2",
        userId: "3",
        content: "Congratulations! This is groundbreaking work.",
        createdAt: "2024-03-08T14:30:00Z"
      }
    ],
    createdAt: "2024-03-08T12:00:00Z"
  },
  {
    id: "4",
    userId: "5",
    content: "Excited to announce our department's new research lab! 🔬",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop",
    likes: ["1", "2", "3", "4"],
    comments: [],
    createdAt: "2024-03-07T09:15:00Z"
  },
  {
    id: "5",
    userId: "3",
    content: "Great discussion in today's distributed systems lecture! Here are the key points...",
    likes: ["1", "4"],
    comments: [
      {
        id: "c3",
        userId: "1",
        content: "The concepts are much clearer now. Thanks professor!",
        createdAt: "2024-03-06T16:45:00Z"
      }
    ],
    createdAt: "2024-03-06T15:00:00Z"
  }
];

export const messages: Message[] = [
  {
    id: "m1",
    senderId: "1",
    receiverId: "2",
    content: "Hey, would you like to join our study group?",
    createdAt: "2024-03-10T08:00:00Z"
  },
  {
    id: "m2",
    senderId: "2",
    receiverId: "1",
    content: "Sure! When's the next session?",
    createdAt: "2024-03-10T08:05:00Z"
  },
  {
    id: "m3",
    senderId: "1",
    receiverId: "3",
    content: "Professor, I had a question about today's lecture",
    createdAt: "2024-03-10T14:00:00Z"
  },
  {
    id: "m4",
    senderId: "3",
    receiverId: "1",
    content: "Of course, what would you like to know?",
    createdAt: "2024-03-10T14:10:00Z"
  }
];