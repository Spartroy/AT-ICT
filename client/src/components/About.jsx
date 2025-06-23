import React from 'react';
import { Award, Users, Star, Trophy, Target, Zap, CheckCircle, TrendingUp } from 'lucide-react';
import PP from "../assets/PP.jpg";
import { motion } from 'framer-motion';

const About = () => {
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const successStats = [
    { number: "500+", label: "Students Taught", icon: Users },
    { number: "95%", label: "A* Achievement Rate", icon: Trophy },
    { number: "5+", label: "Years Experience", icon: Award },
    { number: "50+", label: "Countries Reached", icon: Target }
  ];

  const studentTestimonials = [
    {
      name: "Sarah Ahmed",
      grade: "A*",
      country: "UAE",
      text: "Ahmad made ICT so enjoyable! I went from struggling with databases to acing my IGCSE with an A*. His teaching style is incredible!"
    },
    {
      name: "Omar Hassan",
      grade: "A*",
      country: "Egypt",
      text: "The interactive notes and recorded sessions saved me! I could learn at my own pace and still get personal help when needed."
    },
    {
      name: "Fatima Al-Zahra",
      grade: "A",
      country: "Saudi Arabia",
      text: "From complete beginner to confident coder! Ahmad's patience and teaching methods are unmatched."
    }
  ];

  const achievements = [
    "🏆 Top-rated IGCSE ICT instructor across multiple platforms",
    "📊 Consistently delivers 95%+ A*/A grades among students",
    "🌍 Taught students from 50+ countries worldwide",
    "💡 Developed unique interactive learning methodology",
    "🎯 100% exam pass rate in the last 3 years",
    "⭐ Rated 5/5 stars by 500+ students and parents"
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* Hero Section - Attention Grabber */}
        <section className="pt-24 pb-12 bg-gradient-to-br from-[#1a1a1a] via-[#2a1a1a] to-[#3a1a1a] text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNDQTEzM0UiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iNCIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
          
          <div className="container mx-auto px-4 relative">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="text-center max-w-4xl mx-auto"
            >
              <span className="text-[#CA133E] font-bold text-lg tracking-wide uppercase">Meet Your ICT Success Partner</span>
              <h1 className="text-4xl md:text-6xl font-bold mt-4 mb-6">
                From <span className="text-[#CA133E]">Struggling</span> to 
                <br className="hidden md:block" />
                <span className="text-[#CA133E]"> A* Champion!</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
                Discover how <span className="text-[#CA133E] font-semibold">500+ students</span> achieved their ICT dreams with our 
                <span className="text-[#CA133E] font-semibold"> proven method</span> that transforms confusion into confidence!
              </p>
              
              {/* Success Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                {successStats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="w-16 h-16 bg-[#CA133E] rounded-full flex items-center justify-center mx-auto mb-3">
                      <stat.icon className="text-white" size={28} />
                    </div>
                    <div className="text-3xl font-bold text-[#CA133E] mb-1">{stat.number}</div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Teacher Profile - The Story */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="max-w-6xl mx-auto"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Teacher Image & Credentials */}
                <div className="text-center lg:text-left">
                  <div className="relative inline-block">
                    <div className="w-80 h-80 mx-auto lg:mx-0">
                      <img 
                        src={PP} 
                        alt="Ahmad Tamer Ali" 
                        className="w-full h-full object-cover rounded-2xl shadow-xl"
                      />
                    </div>
                    {/* Floating Achievement Badge */}
                    <div className="absolute -top-4 -right-4 bg-[#CA133E] text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                      <Star className="inline mr-1" size={16} />
                      5★ Rated
                    </div>
                  </div>
                  
                  {/* Quick Credentials */}
                  <div className="mt-8 space-y-3">
                    <div className="flex items-center justify-center lg:justify-start">
                      <CheckCircle className="text-green-500 mr-2" size={20} />
                      <span className="text-gray-700">Software Engineer & IGCSE Expert</span>
                    </div>
                    <div className="flex items-center justify-center lg:justify-start">
                      <CheckCircle className="text-green-500 mr-2" size={20} />
                      <span className="text-gray-700">5+ Years Teaching Experience</span>
                    </div>
                    <div className="flex items-center justify-center lg:justify-start">
                      <CheckCircle className="text-green-500 mr-2" size={20} />
                      <span className="text-gray-700">Former IGCSE Student (I've Been There!)</span>
                    </div>
                  </div>
                </div>

                {/* The Story */}
                <div>
                  <span className="text-[#CA133E] font-bold text-lg">My Journey</span>
                  <h2 className="text-4xl font-bold text-gray-800 mt-2 mb-6">
                    Why I <span className="text-[#CA133E]">Transformed</span> ICT Education
                  </h2>
                  
                  <div className="space-y-6 text-gray-700 leading-relaxed">
                    <p className="text-lg">
                      <strong>I remember my own IGCSE struggles...</strong> Sitting in class, completely lost with spreadsheets and databases. 
                      That frustration? I've felt it too. That's exactly why I created AT-ICT.
                    </p>
                    
                    <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-[#CA133E]">
                      <p className="font-semibold text-[#CA133E] mb-2">💡 The Breakthrough Moment:</p>
                      <p>
                        "When I finally understood ICT through <em>real examples and hands-on practice</em>, 
                        I knew I had to share this approach with others. That was 5 years ago..."
                      </p>
                    </div>
                    
                    <p>
                      Since then, I've dedicated my career to making ICT <strong>simple, engaging, and actually fun!</strong> 
                      My engineering background + teaching passion + student perspective = a teaching method that just works.
                    </p>
                    
                    <div className="bg-[#CA133E] bg-opacity-10 p-6 rounded-xl">
                      <p className="font-bold text-[#CA133E] text-lg">My Promise to You:</p>
                      <p className="mt-2">
                        "I won't just teach you ICT concepts – I'll show you how to <em>think like a tech expert</em>, 
                        solve problems confidently, and ace your exams with strategies that actually work in the real world."
                      </p>
                      <div className="mt-4 flex items-center">
                        <img src={PP} alt="Ahmad" className="w-12 h-12 rounded-full mr-3" />
                        <div>
                          <div className="font-bold text-gray-800">Eng. Ahmad Tamer Ali</div>
                          <div className="text-sm text-gray-600">Your ICT Success Partner</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Achievements Section */}
        <section className="py-20 bg-gradient-to-r from-[#0F0F0F] via-[#4A0D0D] to-[#C70039]">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="max-w-4xl mx-auto text-center"
            >
              <h2 className="text-4xl font-bold text-white mb-4">
                Why <span className="text-[#CA133E]">500+ Students</span> Choose AT-ICT
              </h2>
              <p className="text-xl text-gray-300 mb-12">
                Real results from real students. Here's what makes us different:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 text-left"
                  >
                    <p className="text-white text-lg">{achievement}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Student Success Stories */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="max-w-6xl mx-auto"
            >
              <div className="text-center mb-16">
                <span className="text-[#CA133E] font-bold text-lg">Student Success Stories</span>
                <h2 className="text-4xl font-bold text-gray-800 mt-2 mb-4">
                  Real Students, <span className="text-[#CA133E]">Real Results</span>
                </h2>
                <p className="text-xl text-gray-600">
                  Don't just take our word for it - hear from students who transformed their ICT journey
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {studentTestimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-[#CA133E] rounded-full flex items-center justify-center text-white font-bold">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                        <div className="flex items-center">
                          <span className="text-[#CA133E] font-bold mr-2">Grade: {testimonial.grade}</span>
                          <span className="text-gray-500 text-sm">• {testimonial.country}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex text-[#CA133E] mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} fill="currentColor" />
                      ))}
                    </div>
                    <p className="text-gray-700 italic">"{testimonial.text}"</p>
                  </motion.div>
                ))}
                  </div>

              {/* Call to Action */}
              <div className="text-center mt-16">
                <div className="bg-[#CA133E] text-white rounded-xl p-8 max-w-2xl mx-auto">
                  <h3 className="text-2xl font-bold mb-4">Ready to Join Our Success Stories?</h3>
                  <p className="text-lg mb-6 opacity-90">
                    Your A* journey starts with a single step. Let's make it happen together!
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="/register" className="bg-white text-[#CA133E] px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all">
                      Start Your Journey 🚀
                    </a>
                    <a href="/samples" className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-xl font-bold hover:bg-white hover:text-[#CA133E] transition-all">
                      View Free Samples 📚
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Why Choose AT-ICT - Enhanced */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="max-w-6xl mx-auto"
            >
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">
                  The <span className="text-[#CA133E]">AT-ICT Advantage</span>
                </h2>
                <p className="text-xl text-gray-600">
                  What makes our students consistently outperform others?
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { 
                    icon: <Zap size={40} />, 
                    title: "Interactive Learning", 
                    description: "No boring lectures! Every concept comes alive through hands-on activities and real examples.",
                    benefit: "85% faster comprehension"
                  },
                  { 
                    icon: <TrendingUp size={40} />, 
                    title: "Proven Method", 
                    description: "Our step-by-step approach has helped 500+ students achieve A*/A grades consistently.",
                    benefit: "95% success rate"
                  },
                  { 
                    icon: <Users size={40} />, 
                    title: "Personal Support", 
                    description: "Never feel stuck! Get personal guidance and answers to all your questions anytime.",
                    benefit: "24/7 support available"
                  },
                  { 
                    icon: <Trophy size={40} />, 
                    title: "Exam Mastery", 
                    description: "Learn insider tips and strategies that examiners look for to maximize your grades.",
                    benefit: "A* grade guarantee"
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    whileHover={{ scale: 1.05 }}
                    className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
                  >
                    <div className="text-[#CA133E] mb-6">{item.icon}</div>
                    <h3 className="text-xl font-bold mb-3 text-gray-800">{item.title}</h3>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    <div className="bg-[#CA133E] bg-opacity-10 px-3 py-1 rounded-full text-sm font-semibold text-[#CA133E] inline-block">
                      {item.benefit}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;