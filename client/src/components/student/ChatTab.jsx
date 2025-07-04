import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  ChatBubbleLeftRightIcon,
  PaperAirplaneIcon,
  UserIcon,
  AcademicCapIcon,
  TrashIcon,
  PaperClipIcon,
  DocumentIcon,
  PhotoIcon,
  MusicalNoteIcon,
  VideoCameraIcon,
  ArrowDownTrayIcon
} from '@heroicons/react/24/outline';

const ChatTab = ({ studentData }) => {
  const [teacher, setTeacher] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchTeacherInfo();
  }, []);

  useEffect(() => {
    if (teacher) {
      fetchMessages();
    }
  }, [teacher]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchTeacherInfo = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/chat/student/teacher', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setTeacher(data.data.teacher);
        setUnreadCount(data.data.unreadCount);
      } else {
        console.error('Failed to fetch teacher info');
      }
    } catch (error) {
      console.error('Error fetching teacher info:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async () => {
    if (!teacher) return;
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/chat/conversations/${teacher.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setMessages(data.data.messages);
        setUnreadCount(0); // Messages are marked as read when fetched
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if ((!newMessage.trim() && selectedFiles.length === 0) || !teacher) return;

    setSendingMessage(true);

    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      
      formData.append('recipientId', teacher.id);
      formData.append('content', newMessage);
      formData.append('type', 'text');

      // Add files to form data
      selectedFiles.forEach((file) => {
        formData.append('files', file);
      });

      const response = await fetch('http://localhost:5000/api/chat/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        setMessages(prev => [...prev, data.data.message]);
        setNewMessage('');
        setSelectedFiles([]);
        // Reset file input
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } else {
        console.error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setSendingMessage(false);
    }
  };

  const deleteMessage = async (messageId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/chat/messages/${messageId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setMessages(prev => prev.filter(msg => msg._id !== messageId));
      }
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const downloadFile = async (messageId, filename, originalName) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/chat/files/${messageId}/${filename}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = originalName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } else {
        console.error('Failed to download file');
      }
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  const getFileIcon = (mimetype) => {
    if (mimetype.startsWith('image/')) return PhotoIcon;
    if (mimetype.startsWith('audio/')) return MusicalNoteIcon;
    if (mimetype.startsWith('video/')) return VideoCameraIcon;
    return DocumentIcon;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatTimestamp = (timestamp) => {
    const messageTime = new Date(timestamp);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
    const messageDate = new Date(messageTime.getFullYear(), messageTime.getMonth(), messageTime.getDate());

    const timeString = messageTime.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    if (messageDate.getTime() === today.getTime()) {
      return timeString; // Today: just show time
    } else if (messageDate.getTime() === yesterday.getTime()) {
      return `Yesterday ${timeString}`;
    } else if (now.getTime() - messageTime.getTime() < 7 * 24 * 60 * 60 * 1000) {
      // Within a week: show day name
      return messageTime.toLocaleDateString('en-US', {
        weekday: 'short',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    } else {
      // Older: show date
      return messageTime.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-400"></div>
      </div>
    );
  }

  if (!teacher) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-800/60 rounded-xl p-6 shadow-2xl backdrop-blur-sm border-2 border-gray-600/50">
        <div className="text-center text-gray-400">
          <ChatBubbleLeftRightIcon className="h-16 w-16 mx-auto mb-4 text-gray-500" />
          <h3 className="text-lg font-medium text-white mb-2">No Teacher Assigned</h3>
          <p>Please contact admin to assign you to a teacher</p>
        </div>
      </div>
    );
  }

  return (
          <div className="flex flex-col h-[80vh] bg-gray-900/70 rounded-xl border border-gray-700/50 overflow-hidden shadow-2xl backdrop-blur-md">
      {/* Chat Header */}
              <div className="p-4 border-b border-gray-700/50 bg-gray-900/50 rounded-t-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center shadow-sm ring-2 ring-blue-500/50">
              <AcademicCapIcon className="h-7 w-7 text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-white">
                {teacher.fullName}
              </h3>
              <p className="text-sm text-gray-400">
                IGCSE Computer Science Teacher
              </p>
            </div>
          </div>
          
          {unreadCount > 0 && (
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center justify-center px-3 py-1 text-sm font-bold leading-none text-white bg-red-600 rounded-full">
                {unreadCount} new
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6">
        {messages.length === 0 ? (
          <div className="text-center text-gray-400 mt-12">
            <div className="bg-gray-800/60 rounded-full p-6 shadow-lg inline-block mb-4 border border-gray-700/50">
              <ChatBubbleLeftRightIcon className="h-16 w-16 text-gray-500" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">No messages yet</h3>
            <p className="text-sm text-gray-500">Start the conversation with your teacher!</p>
          </div>
        ) : (
          messages.map((message, index) => {
            // Correct identification: student messages on RIGHT, teacher messages on LEFT
            const isOwnMessage = message.sender.role === 'student';
            
            return (
              <motion.div
                key={message._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-4 group`}
              >
                <div className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${isOwnMessage ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  {/* Avatar */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md flex-shrink-0 ${
                    isOwnMessage ? 'bg-gradient-to-br from-blue-500 to-blue-600' : 'bg-gradient-to-br from-gray-600 to-gray-700'
                  }`}>
                    {isOwnMessage ? (
                      <UserIcon className="h-4 w-4 text-white" />
                    ) : (
                      <AcademicCapIcon className="h-4 w-4 text-white" />
                    )}
                  </div>
                  
                  {/* Message Container */}
                  <div className="relative">
                    {/* Message Bubble */}
                    <div className={`relative px-4 py-3 shadow-md ${
                      isOwnMessage 
                        ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl rounded-br-lg' 
                        : 'bg-gray-700/80 text-white rounded-xl rounded-bl-lg'
                    }`}>
                      {/* Sender Name */}
                      <p className={`text-xs font-semibold mb-1 ${
                        isOwnMessage ? 'text-blue-200' : 'text-gray-400'
                      }`}>
                        {isOwnMessage ? 'You' : `${message.sender.firstName} ${message.sender.lastName}`}
                      </p>
                      
                      {/* Message Content */}
                      {message.content && (
                        <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                          {message.content}
                        </p>
                      )}
                      
                      {/* File Attachments */}
                      {message.attachments && message.attachments.length > 0 && (
                        <div className="mt-3 space-y-2">
                          {message.attachments.map((attachment, idx) => {
                            const FileIcon = getFileIcon(attachment.mimetype);
                            return (
                                                              <div
                                  key={idx}
                                  className={`flex items-center space-x-3 p-3 rounded-xl ${
                                    isOwnMessage ? 'bg-blue-900/30' : 'bg-gray-600/50'
                                  }`}
                                >
                                  <div className={`p-2 rounded-xl ${
                                    isOwnMessage ? 'bg-white/10' : 'bg-gray-500/50'
                                  }`}>
                                    <FileIcon className={`h-5 w-5 ${
                                      isOwnMessage ? 'text-blue-200' : 'text-gray-300'
                                    }`} />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className={`text-sm font-medium truncate text-white`}>
                                      {attachment.originalName}
                                    </p>
                                    <p className={`text-xs ${
                                      isOwnMessage ? 'text-blue-200' : 'text-gray-400'
                                    }`}>
                                      {formatFileSize(attachment.size)}
                                    </p>
                                  </div>
                                  <button
                                    onClick={() => downloadFile(message._id, attachment.filename, attachment.originalName)}
                                    className={`p-2 rounded-full transition-colors ${
                                      isOwnMessage 
                                        ? 'hover:bg-white/20 text-white' 
                                        : 'hover:bg-gray-500/50 text-gray-300 hover:text-white'
                                    }`}
                                  >
                                    <ArrowDownTrayIcon className="h-5 w-5" />
                                  </button>
                                </div>
                            );
                          })}
                        </div>
                      )}
                      
                      {/* Timestamp */}
                      <p className={`text-xs mt-2 text-right ${
                        isOwnMessage ? 'text-blue-200' : 'text-gray-400'
                      }`}>
                        {formatTimestamp(message.createdAt)}
                      </p>
                    </div>
                    
                    {/* Delete Button for Student's Messages */}
                    {isOwnMessage && (
                      <button
                        onClick={() => deleteMessage(message._id)}
                        className="absolute top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 p-2 text-red-500 hover:text-red-400 hover:bg-red-500/20 rounded-full transition-all"
                        style={{ left: 'auto', right: '-2.5rem' }}
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* File Preview */}
      {selectedFiles.length > 0 && (
        <div className="px-6 py-4 bg-gray-900/50 border-t border-gray-700/50">
          <p className="text-sm font-medium text-blue-400 mb-3">Files to send:</p>
          <div className="flex flex-wrap gap-3">
            {selectedFiles.map((file, index) => {
              const FileIcon = getFileIcon(file.type);
              return (
                                                                <div key={index} className="flex items-center space-x-3 bg-gray-700/70 rounded-xl p-3 border border-gray-600/50 shadow-md hover:shadow-lg transition-shadow">
                          <div className="p-2 bg-blue-500/20 rounded-xl">
                            <FileIcon className="h-5 w-5 text-blue-300" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">{file.name}</p>
                            <p className="text-xs text-gray-400">{formatFileSize(file.size)}</p>
                          </div>
                          <button
                            onClick={() => removeFile(index)}
                            className="p-1 text-red-500 hover:text-red-400 hover:bg-red-500/20 rounded-full transition-colors"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Message Input */}
      <form onSubmit={sendMessage} className="p-4 border-t border-gray-700/50 bg-gray-900/50">
        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-3 text-gray-400 hover:text-blue-400 hover:bg-blue-500/20 rounded-full transition-colors"
          >
            <PaperClipIcon className="h-5 w-5" />
          </button>
          
          <div className="flex-1">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message to your teacher..."
              className="w-full px-4 py-3 border border-gray-600/80 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-800/90 text-white shadow-inner"
              disabled={sendingMessage}
            />
          </div>
          
          <button
            type="submit"
            disabled={(!newMessage.trim() && selectedFiles.length === 0) || sendingMessage}
            className={`p-3 rounded-full transition-all shadow-md hover:shadow-lg flex-shrink-0 ${
              (newMessage.trim() || selectedFiles.length > 0) && !sendingMessage
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transform hover:scale-105'
                : 'bg-gray-700 text-gray-500 cursor-not-allowed'
            }`}
          >
            {sendingMessage ? (
              <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
            ) : (
              <PaperAirplaneIcon className="h-5 w-5" />
            )}
          </button>
        </div>
        
        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={handleFileSelect}
          accept="image/*,audio/*,video/*,.pdf,.doc,.docx,.txt,.zip,.rar"
        />
      </form>
    </div>
  );
};

export default ChatTab; 