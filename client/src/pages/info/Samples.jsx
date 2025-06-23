import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Nav from '../../components/Nav';
import { Download, FileText, Play, Eye, BookOpen, Star, CheckCircle, ArrowRight, Gift, Zap } from 'lucide-react';

const Samples = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [email, setEmail] = useState('');

  const categories = [
    { id: 'all', name: 'All Samples', icon: BookOpen },
    { id: 'notes', name: 'Interactive Notes', icon: FileText },
    { id: 'videos', name: 'Video Lessons', icon: Play },
    { id: 'exercises', name: 'Practice Exercises', icon: CheckCircle }
  ];

  const sampleMaterials = [
    {
      id: 1,
      title: "Database Fundamentals - Interactive Guide",
      category: 'notes',
      type: 'PDF + Interactive Elements',
      description: "Master database concepts with our signature interactive approach. Includes real examples and practice scenarios.",
      downloadSize: '2.5 MB',
      pages: 15,
      difficulty: 'Beginner',
      rating: 4.9,
      downloads: 1250,
      features: ['Interactive diagrams', 'Step-by-step examples', 'Quick revision notes'],
      preview: true
    },
    {
      id: 2,
      title: "Spreadsheet Mastery - Sample Lesson",
      category: 'videos',
      type: 'Video Tutorial',
      description: "Watch Ahmad transform complex spreadsheet formulas into simple, understandable concepts in just 15 minutes.",
      duration: '15:30',
      difficulty: 'Intermediate',
      rating: 4.8,
      downloads: 890,
      features: ['HD video quality', 'Downloadable worksheets', 'Practice files included'],
      preview: true
    },
    {
      id: 3,
      title: "HTML & CSS Basics - Starter Pack",
      category: 'notes',
      type: 'PDF + Code Files',
      description: "Build your first webpage with our beginner-friendly guide. No prior coding experience needed!",
      downloadSize: '3.1 MB',
      pages: 20,
      difficulty: 'Beginner',
      rating: 4.9,
      downloads: 2100,
      features: ['Code examples', 'Visual guides', 'Project templates'],
      preview: true
    },
    {
      id: 4,
      title: "IGCSE ICT Mock Exam - Paper 1",
      category: 'exercises',
      type: 'Practice Test',
      description: "Test your knowledge with authentic IGCSE-style questions. Includes detailed marking scheme and solutions.",
      downloadSize: '1.8 MB',
      pages: 12,
      difficulty: 'Advanced',
      rating: 4.7,
      downloads: 1560,
      features: ['Real exam format', 'Detailed solutions', 'Grade boundaries'],
      preview: true
    },
    {
      id: 5,
      title: "Network Security Explained",
      category: 'videos',
      type: 'Video Tutorial',
      description: "Understand cybersecurity concepts that every IGCSE student needs to know. Made simple and engaging!",
      duration: '12:45',
      difficulty: 'Intermediate',
      rating: 4.8,
      downloads: 720,
      features: ['Animated explanations', 'Real-world examples', 'Key terms glossary'],
      preview: true
    },
    {
      id: 6,
      title: "Python Programming - Quick Start",
      category: 'notes',
      type: 'PDF + Code Files',
      description: "Your first steps into programming with Python. Written specifically for IGCSE ICT students.",
      downloadSize: '4.2 MB',
      pages: 25,
      difficulty: 'Beginner',
      rating: 4.9,
      downloads: 1890,
      features: ['Beginner-friendly', 'Practice exercises', 'Code playground'],
      preview: true
    }
  ];

  const filteredMaterials = selectedCategory === 'all' 
    ? sampleMaterials 
    : sampleMaterials.filter(material => material.category === selectedCategory);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setEmailSubmitted(true);
      console.log('Email submitted:', email);
    }
  };

  const benefits = [
    {
      icon: <Gift className="text-[#CA133E]" size={40} />,
      title: "100% Free Forever",
      description: "No hidden fees, no credit card required. These samples are our gift to help you succeed."
    },
    {
      icon: <Zap className="text-[#CA133E]" size={40} />,
      title: "Instant Access",
      description: "Download immediately after entering your email. Start learning in the next 30 seconds!"
    },
    {
      icon: <Star className="text-[#CA133E]" size={40} />,
      title: "Premium Quality",
      description: "Same high-quality materials our paying students use. Experience the AT-ICT difference yourself."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />
      
      <div className="pt-24 pb-12">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-[#CA133E] to-[#A01030] text-white py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center"
            >
              <span className="bg-white bg-opacity-20 text-white px-4 py-2 rounded-full text-sm font-bold mb-4 inline-block">
                🎁 FREE SAMPLES
              </span>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Experience <span className="text-yellow-300">AT-ICT Quality</span>
                <br />Before You Enroll!
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                Download premium IGCSE ICT materials worth <span className="font-bold text-yellow-300">$200+</span> 
                absolutely FREE! See why 500+ students chose us.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#samples" className="bg-white text-[#CA133E] px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all">
                  Browse Free Samples 👇
                </a>
                <a href="/register" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-[#CA133E] transition-all">
                  Start Full Course 🚀
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
                Why Our <span className="text-[#CA133E]">Free Samples</span> Are Different
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    className="text-center p-6"
                  >
                    <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                      {benefit.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Email Collection */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl mx-auto text-center"
            >
              {!emailSubmitted ? (
                <>
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">
                    Get Instant Access to All <span className="text-[#CA133E]">Free Samples</span>
                  </h2>
                  <p className="text-lg text-gray-600 mb-8">
                    Enter your email to unlock 6 premium IGCSE ICT materials worth $200+ 
                    and join 2,000+ students already learning with AT-ICT!
                  </p>
                  
                  <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="flex-1 px-6 py-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#CA133E] text-lg"
                      required
                    />
                    <button
                      type="submit"
                      className="bg-[#CA133E] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#A01030] transition-all"
                    >
                      Get Free Access 🎁
                    </button>
                  </form>
                  
                  <p className="text-sm text-gray-500 mt-4">
                    ✅ No spam, ever. Unsubscribe anytime. ✅ Instant download links.
                  </p>
                </>
              ) : (
                <div className="bg-green-50 border border-green-200 rounded-xl p-8">
                  <div className="text-green-600 text-6xl mb-4">🎉</div>
                  <h3 className="text-2xl font-bold text-green-800 mb-4">Success! Check Your Email</h3>
                  <p className="text-green-700 mb-6">
                    We've sent download links for all 6 free samples to <strong>{email}</strong>
                    <br />Check your inbox (and spam folder) in the next few minutes!
                  </p>
                  <a 
                    href="#samples" 
                    className="bg-[#CA133E] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#A01030] transition-all inline-block"
                  >
                    Browse Samples Below 👇
                  </a>
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Sample Materials */}
        <section id="samples" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
                <span className="text-[#CA133E]">Premium</span> Sample Materials
              </h2>
              <p className="text-xl text-gray-600 text-center mb-12">
                Explore the same high-quality materials our students use to achieve A* grades
              </p>
              
              {/* Category Filter */}
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-all ${
                      selectedCategory === category.id
                        ? 'bg-[#CA133E] text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    <category.icon size={20} className="mr-2" />
                    {category.name}
                  </button>
                ))}
              </div>

              {/* Materials Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence>
                  {filteredMaterials.map((material, index) => (
                    <motion.div
                      key={material.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -30 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 group"
                    >
                      {/* Material Header */}
                      <div className="p-6 bg-gradient-to-r from-gray-50 to-gray-100">
                        <div className="flex items-start justify-between mb-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            material.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                            material.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {material.difficulty}
                          </span>
                          <div className="flex items-center text-sm text-gray-600">
                            <Star className="text-yellow-500 mr-1" size={16} fill="currentColor" />
                            {material.rating}
                          </div>
                        </div>
                        
                        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-[#CA133E] transition-colors">
                          {material.title}
                        </h3>
                        
                        <div className="flex items-center text-sm text-gray-600 mb-3">
                          <span className="bg-[#CA133E] text-white px-2 py-1 rounded text-xs font-semibold mr-3">
                            {material.type}
                          </span>
                          {material.downloadSize && <span>📁 {material.downloadSize}</span>}
                          {material.duration && <span>⏱️ {material.duration}</span>}
                          {material.pages && <span>📄 {material.pages} pages</span>}
                        </div>
                      </div>

                      {/* Material Content */}
                      <div className="p-6">
                        <p className="text-gray-600 mb-4 leading-relaxed">
                          {material.description}
                        </p>
                        
                        <div className="space-y-2 mb-6">
                          <h4 className="font-semibold text-gray-800 text-sm">What's Included:</h4>
                          {material.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center text-sm text-gray-600">
                              <CheckCircle className="text-green-500 mr-2" size={16} />
                              {feature}
                            </div>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                          <span>📥 {material.downloads.toLocaleString()} downloads</span>
                          <span>⭐ Highly rated</span>
                        </div>
                        
                        <div className="flex gap-3">
                          <button className="flex-1 bg-[#CA133E] text-white py-3 px-4 rounded-xl font-semibold hover:bg-[#A01030] transition-all flex items-center justify-center">
                            <Download size={20} className="mr-2" />
                            Download Free
                          </button>
                          <button className="p-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all">
                            <Eye size={20} className="text-gray-600" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-r from-[#0F0F0F] via-[#4A0D0D] to-[#C70039]">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center text-white"
            >
              <h2 className="text-4xl font-bold mb-6">
                Love What You See? 
                <br />Get the <span className="text-yellow-300">Complete Course!</span>
              </h2>
              <p className="text-xl mb-8 opacity-90">
                These free samples are just the beginning. Our full course includes 200+ materials, 
                personal mentoring, live sessions, and a guaranteed path to A* success.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white bg-opacity-10 p-6 rounded-xl">
                  <div className="text-3xl font-bold text-yellow-300 mb-2">200+</div>
                  <div className="text-lg">Premium Materials</div>
                </div>
                <div className="bg-white bg-opacity-10 p-6 rounded-xl">
                  <div className="text-3xl font-bold text-yellow-300 mb-2">95%</div>
                  <div className="text-lg">A*/A Success Rate</div>
                </div>
                <div className="bg-white bg-opacity-10 p-6 rounded-xl">
                  <div className="text-3xl font-bold text-yellow-300 mb-2">24/7</div>
                  <div className="text-lg">Personal Support</div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/register" className="bg-yellow-300 text-black px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-200 transition-all flex items-center justify-center">
                  Enroll Now - Special Offer 🚀
                  <ArrowRight size={20} className="ml-2" />
                </a>
                <a href="/fees" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-black transition-all">
                  View Pricing Plans
                </a>
              </div>
              
              <p className="text-sm opacity-70 mt-4">
                🎯 Limited Time: First 50 students get 20% off + Free bonus materials
              </p>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Samples; 