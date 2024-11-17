import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { Message } from '../types';
import { messages as initialMessages } from '../data/mockData';
import { useAuth } from './AuthContext';

interface MessageContextType {
  messages: Message[];
  sendMessage: (receiverId: string, content: string) => void;
}

const MessageContext = createContext<MessageContextType | null>(null);

export const MessageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [socket, setSocket] = useState<Socket | null>(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    // In a real app, this would connect to your actual backend
    const mockSocket = io('http://localhost:3000', {
      autoConnect: false,
    });

    setSocket(mockSocket);

    return () => {
      mockSocket.close();
    };
  }, []);

  const sendMessage = (receiverId: string, content: string) => {
    if (!currentUser) return;

    const newMessage: Message = {
      id: `m${Date.now()}`,
      senderId: currentUser.id,
      receiverId,
      content,
      createdAt: new Date().toISOString(),
    };

    setMessages(prev => [...prev, newMessage]);

    // In a real app, this would emit to the socket
    console.log('Sending message:', newMessage);
  };

  return (
    <MessageContext.Provider value={{ messages, sendMessage }}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessages = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error('useMessages must be used within a MessageProvider');
  }
  return context;
};