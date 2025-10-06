import React, { useState } from 'react';

const AICommandCenter = () => {
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (chatInput.trim()) {
      setChatMessages([...chatMessages, { text: chatInput, isUser: true }]);
      setChatInput('');
      // Simulate AI response
      setTimeout(() => {
        setChatMessages(prev => [...prev, { 
          text: "I'm here to help with your AI automation questions! What would you like to know about implementing AI in your business?", 
          isUser: false 
        }]);
      }, 1000);
    }
  };

  const exampleTopics = [
    "AI Business Automation",
    "Voice AI Implementation", 
    "Process Optimization",
    "Cost Reduction Strategies",
    "ROI Analysis"
  ];

  return (
    <div className="text-white py-20">
      <div className="container mx-auto px-4">
        {/* Title and Subtitle */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Your AI Command Center
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Search the web, analyze data, generate content, and get instant answers.
          </p>
        </div>

        {/* Chat Interface */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-black/20 backdrop-blur-md rounded-2xl p-8 border border-purple-500/30">
            {/* Chat Messages */}
            <div className="h-48 overflow-y-auto mb-6 space-y-3">
              {chatMessages.length === 0 ? (
                <div className="text-center text-gray-400 py-6">
                  Start a conversation to see how AI can help your business
                </div>
              ) : (
                chatMessages.map((message, index) => (
                  <div key={index} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs md:max-w-md px-3 py-2 rounded-xl ${
                      message.isUser 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-white/10 text-gray-200 border border-purple-500/30'
                    }`}>
                      {message.text}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleChatSubmit} className="relative">
              <div className="relative">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask anything... (Type @ to see commands)"
                  className="w-full bg-white/10 backdrop-blur-md border border-purple-500/30 rounded-xl px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Send
                </button>
              </div>
            </form>
          </div>

          {/* Example Topics */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {exampleTopics.map((topic, index) => (
              <button
                key={index}
                onClick={() => setChatInput(topic)}
                className="bg-purple-600/20 backdrop-blur-md border border-purple-500/30 text-purple-200 px-4 py-2 rounded-lg hover:bg-purple-600/30 transition-colors"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AICommandCenter;
