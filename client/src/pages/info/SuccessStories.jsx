import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Nav from '../../components/Nav';
import { Star, Award, TrendingUp, Users, Quote, Play, ArrowRight } from 'lucide-react';

const SuccessStories = () => {
  const [selectedStory, setSelectedStory] = useState(null);

  const successStories = [
    {
      id: 1,
      name: "Sarah Ahmed",
      age: 16,
      country: "United Arab Emirates",
      school: "GEMS Modern Academy",
      beforeGrade: "C",
      afterGrade: "A*",
      improvement: "+3 grades",
      duration: "8 weeks",
      quote: "I was completely lost with databases and programming. Ahmad's teaching style made everything click instantly!",
      fullStory: "When I started with AT-ICT, I was struggling to understand even basic ICT concepts. Databases seemed like a foreign language, and programming was absolutely terrifying. But Ahmad had this amazing way of breaking down complex topics into simple, digestible pieces. The interactive notes were a game-changer - I could actually see how concepts worked rather than just memorizing them. Within 8 weeks, I went from barely passing to achieving an A* in my mock exams. The confidence I gained extends far beyond ICT - I now approach all subjects with a problem-solving mindset.",
      videoTestimonial: true,
      achievements: ["A* in Final IGCSE", "School ICT Award Winner", "University Scholarship Recipient"],
      subjects: ["Database Design", "Programming", "Web Development"]
    },
    {
      id: 2,
      name: "Omar Hassan",
      age: 17,
      country: "Egypt",
      school: "Cairo American College",
      beforeGrade: "D",
      afterGrade: "A*",
      improvement: "+4 grades",
      duration: "10 weeks",
      quote: "From failing to becoming the top ICT student in my school - AT-ICT transformed my entire academic journey!",
      fullStory: "I'll be honest - I was ready to drop ICT entirely. I was failing every test, couldn't understand spreadsheets, and programming seemed impossible. My parents were disappointed, and I felt hopeless. Then I found Ahmad and AT-ICT. The first thing that amazed me was how patient Ahmad was. He never made me feel stupid for asking the same question multiple times. The recorded sessions were a lifesaver - I could pause, rewind, and learn at my own pace. The breakthrough came in week 6 when I finally understood how databases work. Suddenly, everything started making sense. I ended up not just passing, but achieving the highest ICT grade in my entire school year.",
      videoTestimonial: true,
      achievements: ["Top ICT Student - School Level", "A* in Final IGCSE", "Accepted to Computer Science Program"],
      subjects: ["Spreadsheets", "Database Management", "Network Security"]
    },
    {
      id: 3,
      name: "Fatima Al-Zahra",
      age: 15,
      country: "Saudi Arabia",
      school: "International School of Riyadh",
      beforeGrade: "B",
      afterGrade: "A*",
      improvement: "+2 grades",
      duration: "6 weeks",
      quote: "The personal attention and practical approach made all the difference. I finally understood why ICT matters!",
      fullStory: "I was already doing okay in ICT with a B grade, but I knew I could do better. What I loved about AT-ICT was the focus on real-world applications. Ahmad didn't just teach us theory - he showed us how ICT skills are used in actual careers and daily life. The web development module was particularly exciting. I built my first website and felt like a real programmer! The continuous support was incredible - Ahmad was always available to answer questions and provide feedback. The A* felt achievable rather than impossible.",
      videoTestimonial: false,
      achievements: ["A* in Final IGCSE", "Regional Coding Competition Participant", "School Website Developer"],
      subjects: ["Web Development", "Digital Media", "Project Management"]
    },
    {
      id: 4,
      name: "Ahmed Khaled",
      age: 16,
      country: "Qatar",
      school: "Doha International School",
      beforeGrade: "C",
      afterGrade: "A",
      improvement: "+2 grades",
      duration: "9 weeks",
      quote: "Ahmad made ICT fun and engaging. I actually look forward to ICT lessons now!",
      fullStory: "ICT used to be my least favorite subject. I found it boring and couldn't see the point of learning about computers - I thought I already knew everything from using social media and games. Ahmad completely changed my perspective. He showed me how ICT is behind everything we use daily, from smartphones to online shopping. The hands-on projects were amazing - we built apps, designed websites, and even learned about cybersecurity by trying to 'hack' (safely) into test systems. Now I'm considering studying computer science at university!",
      videoTestimonial: false,
      achievements: ["A in Final IGCSE", "School Tech Club President", "Cybersecurity Workshop Participant"],
      subjects: ["Cybersecurity", "App Development", "System Analysis"]
    },
    {
      id: 5,
      name: "Noor Abdullah",
      age: 16,
      country: "Kuwait",
      school: "American School of Kuwait",
      beforeGrade: "D",
      afterGrade: "A*",
      improvement: "+4 grades",
      duration: "12 weeks",
      quote: "I never thought I was 'smart enough' for ICT. Ahmad proved me wrong and changed my entire self-image!",
      fullStory: "I had convinced myself that I wasn't a 'tech person.' Math and science were never my strong subjects, so I assumed ICT would be the same. I was struggling badly and my confidence was at an all-time low. Ahmad's approach was different from any teacher I'd had before. He focused on understanding rather than memorization, and he celebrated every small victory. The turning point was when I successfully created my first database system - I felt like I had superpowers! Ahmad's constant encouragement and the supportive learning environment at AT-ICT helped me realize that anyone can excel in ICT with the right guidance.",
      videoTestimonial: true,
      achievements: ["A* in Final IGCSE", "Most Improved Student Award", "Peer Tutor for Junior Students"],
      subjects: ["Database Systems", "Data Analysis", "Problem Solving"]
    },
    {
      id: 6,
      name: "Youssef Mohammed",
      age: 17,
      country: "Oman",
      school: "Sultan's School",
      beforeGrade: "C",
      afterGrade: "A*",
      improvement: "+3 grades",
      duration: "7 weeks",
      quote: "The exam preparation was phenomenal. I felt completely confident walking into my IGCSE ICT exam!",
      fullStory: "What impressed me most about AT-ICT was how exam-focused everything was. Ahmad didn't just teach us ICT concepts - he taught us how to answer IGCSE questions effectively. We practiced with real past papers, learned time management strategies, and understood exactly what examiners were looking for. The mock exams were incredibly helpful - they simulated the real exam environment perfectly. When I sat for my actual IGCSE exam, it felt like just another practice session. I knew exactly what to expect and how to tackle each question type.",
      videoTestimonial: false,
      achievements: ["A* in Final IGCSE", "School Exam Techniques Workshop Leader", "University Merit Scholarship"],
      subjects: ["Exam Techniques", "Time Management", "Question Analysis"]
    }
  ];

  const statistics = [
    { number: "500+", label: "Students Taught", icon: Users },
    { number: "95%", label: "A*/A Success Rate", icon: Award },
    { number: "4.2", label: "Average Grade Improvement", icon: TrendingUp },
    { number: "98%", label: "Student Satisfaction", icon: Star }
  ];

  const beforeAfterData = [
    { grade: "A*", before: 5, after: 47 },
    { grade: "A", before: 12, after: 28 },
    { grade: "B", before: 25, after: 15 },
    { grade: "C", before: 35, after: 8 },
    { grade: "D", before: 18, after: 2 },
    { grade: "F", before: 5, after: 0 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />
      
      <div className="pt-24 pb-12">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-[#0F0F0F] via-[#4A0D0D] to-[#C70039] text-white py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center"
            >
              <span className="bg-white bg-opacity-20 text-white px-4 py-2 rounded-full text-sm font-bold mb-4 inline-block">
                🏆 SUCCESS STORIES
              </span>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Real Students, <span className="text-yellow-300">Real Results</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                Discover how ordinary students achieved extraordinary results with AT-ICT. 
                These aren't just grades - they're life-changing transformations.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {statistics.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white bg-opacity-10 p-4 rounded-xl text-center"
                  >
                    <stat.icon className="mx-auto mb-2 text-yellow-300" size={28} />
                    <div className="text-2xl font-bold text-yellow-300 mb-1">{stat.number}</div>
                    <div className="text-sm">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Before vs After Visualization */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12"
              >
                <h2 className="text-4xl font-bold text-gray-800 mb-4">
                  The <span className="text-[#CA133E]">Transformation</span> is Real
                </h2>
                <p className="text-xl text-gray-600">
                  See how our students' grades improved after joining AT-ICT
                </p>
              </motion.div>
              
              <div className="bg-gray-50 p-8 rounded-xl">
                <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">Grade Distribution: Before vs After</h3>
                <div className="grid grid-cols-6 gap-4">
                  {beforeAfterData.map((data, index) => (
                    <div key={index} className="text-center">
                      <div className="text-lg font-bold text-gray-800 mb-4">Grade {data.grade}</div>
                      <div className="space-y-2">
                        <div className="bg-red-200 rounded-lg p-3">
                          <div className="text-sm text-gray-600 mb-1">Before</div>
                          <div className="text-2xl font-bold text-red-600">{data.before}%</div>
                        </div>
                        <div className="bg-green-200 rounded-lg p-3">
                          <div className="text-sm text-gray-600 mb-1">After</div>
                          <div className="text-2xl font-bold text-green-600">{data.after}%</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Success Stories Grid */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
                <span className="text-[#CA133E]">Student</span> Success Stories
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {successStories.map((story, index) => (
                  <motion.div
                    key={story.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all cursor-pointer"
                    onClick={() => setSelectedStory(story)}
                  >
                    <div className="p-6">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-[#CA133E] rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {story.name.charAt(0)}
                        </div>
                        {story.videoTestimonial && (
                          <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold flex items-center">
                            <Play size={12} className="mr-1" />
                            Video
                          </div>
                        )}
                      </div>
                      
                      {/* Student Info */}
                      <h3 className="text-xl font-bold text-gray-800 mb-1">{story.name}</h3>
                      <p className="text-gray-600 text-sm mb-1">{story.school}</p>
                      <p className="text-gray-500 text-sm mb-4">{story.country} • Age {story.age}</p>
                      
                      {/* Grade Improvement */}
                      <div className="bg-gradient-to-r from-red-100 to-green-100 p-4 rounded-lg mb-4">
                        <div className="flex items-center justify-center space-x-4">
                          <div className="text-center">
                            <div className="text-red-600 font-bold text-2xl">{story.beforeGrade}</div>
                            <div className="text-xs text-gray-600">Before</div>
                          </div>
                          <ArrowRight className="text-gray-400" size={20} />
                          <div className="text-center">
                            <div className="text-green-600 font-bold text-2xl">{story.afterGrade}</div>
                            <div className="text-xs text-gray-600">After</div>
                          </div>
                          <div className="text-center">
                            <div className="text-[#CA133E] font-bold text-lg">{story.improvement}</div>
                            <div className="text-xs text-gray-600">in {story.duration}</div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Quote */}
                      <div className="relative">
                        <Quote className="absolute top-0 left-0 text-[#CA133E] opacity-20" size={24} />
                        <p className="text-gray-700 italic pl-8 text-sm leading-relaxed">
                          "{story.quote}"
                        </p>
                      </div>
                      
                      {/* Achievements Preview */}
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center text-sm text-gray-600">
                          <Award className="text-[#CA133E] mr-2" size={16} />
                          <span>{story.achievements.length} Major Achievements</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-r from-[#CA133E] to-[#A01030]">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl mx-auto text-center text-white"
            >
              <h2 className="text-4xl font-bold mb-6">
                Your Success Story <span className="text-yellow-300">Starts Here</span>
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Join hundreds of students who have already transformed their ICT journey. 
                What will your before and after story look like?
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/register" className="bg-white text-[#CA133E] px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all">
                  Start Your Transformation 🚀
                </a>
                <a href="/samples" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-[#CA133E] transition-all">
                  See Sample Materials 📚
                </a>
              </div>
              
              <p className="text-sm opacity-70 mt-6">
                🎯 95% of our students achieve A*/A grades • 💯 30-day money-back guarantee
              </p>
            </motion.div>
          </div>
        </section>
      </div>
      
      {/* Story Modal */}
      {selectedStory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl max-w-2xl w-full max-h-96 overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-800">{selectedStory.name}'s Journey</h3>
                <button
                  onClick={() => setSelectedStory(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">{selectedStory.fullStory}</p>
                
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Key Achievements:</h4>
                  <ul className="space-y-1">
                    {selectedStory.achievements.map((achievement, index) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <Star className="text-yellow-500 mr-2" size={16} />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Subjects Mastered:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedStory.subjects.map((subject, index) => (
                      <span key={index} className="bg-[#CA133E] text-white px-3 py-1 rounded-full text-sm">
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default SuccessStories; 