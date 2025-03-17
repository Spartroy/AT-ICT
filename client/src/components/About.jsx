import React from 'react';
import Nav from "../components/Nav";
import { Book, Award, Users, Clock } from 'lucide-react';
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

  return (
    <div className="flex flex-col min-h-screen ">
      <Nav />



      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-16 pb-4 at-grid-bg text-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="mx-auto text-center"
            >
              <p className="text-[20pt] md:text-[35pt] mt-[80px] text-black">
                Learning ICT with an <span className='text-[#CA133E] font-bold'>Engaging </span> & <span className='text-[#CA133E] font-bold'> Effective</span> Approach
              </p>
            </motion.div>
          </div>
        </section>

        {/* Teacher Profile */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.h2
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="text-[24pt] md:text-[30pt] font-bold text-center mb-12"
            >
              Meet Your Instructor
            </motion.h2>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-3">
                  <div className="bg-atblack text-white p-8 flex flex-col justify-center items-center text-center">
                    <div className="w-40 h-40 bg-gray-300 rounded-full mb-4 overflow-hidden">
                      <img src={PP} alt="Ahmad Tamer Ali" className="w-full h-full object-cover" />
                    </div>
                    <h4 className="text-[16pt] text-black font-bold mb-4">Eng. Ahmad Tamer Ali</h4>
                    <p className="text-[16pt] text-gray-300 mb-4">Software Engineer & Experienced Teacher</p>
                    <div className="flex space-x-3">
                      {[
                        { icon: "twitter", link: "#" },
                        { icon: "instagram", link: "#" },
                        { icon: "linkedin", link: "#" },
                      ].map((social, index) => (
                        <a
                          key={index}
                          href={social.link}
                          className="text-gray-300 hover:text-[#CA133E] transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                            {social.icon === "twitter" && (
                              <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                            )}
                            {social.icon === "instagram" && (
                              <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                            )}
                            {social.icon === "linkedin" && (
                              <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                            )}
                          </svg>
                        </a>
                      ))}
                    </div>
                  </div>

                  <div className="col-span-2 p-8">
                    <p className="text-gray-700 mb-4 text-[14pt]">

                      I am Ahmad Tamer, a dedicated ICT teacher with over 5 years of experience teaching the <span className='text-[#CA133E] font-bold'>OL ICT  </span>curriculum for <span className='text-[#CA133E] font-bold'> Cambridge</span> IGCSE students. <br /> <br />
                      With a strong background in computer science and teaching experience <br /> I combine <span className='text-[#CA133E] font-bold'>technical expertise</span> with <span className='text-[#CA133E] font-bold'>effective teaching</span> methodologies to provide my students with the best learning experience.
                    </p>
                    <p className="text-gray-700 mb-4 text-[14pt]">
                      Alhamdulillah, I have worked with various <strong>online</strong> & <strong>onground</strong> educational centers and taught numerous students from different nationalities across the <strong>Middle East</strong>. <br /> <br />
                      As a former <strong>IGCSE student</strong>, I deeply understand the challenges students face in ICT. This insight has allowed me to develop a teaching approach that addresses these challenges in an effective way <br /> Making learning <span className='text-[#CA133E] font-bold'>Fun, Engaging, <span className='text-gray-700'>and</span> Impactful</span>.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* About Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
            >
              <motion.div variants={fadeInUp}>
                <h2 className="text-[50pt] text-[#CA133E] font-bold mb-6">Our Mission</h2>
                <p className="text-gray-700 mb-4 text-[16pt]">
                  At <span className='text-[#CA133E] font-bold'>AT-ICT</span>, we are dedicated to providing a high-quality ICT education that empowers students to excel in the digital world. <br /> <br />
                  Our curriculum combines theoretical knowledge with practical skills,<br /> To ensure that our students are well-prepared for :-
                </p>
                <ul className='marker:text-[#CA133E] list-disc ml-6 sm:ml-8 md:ml-8 text-left font-bold text-[16pt]'>
                  <li>Academic success</li>
                  <li>Real-world applications</li>
                </ul>
                <p className="text-gray-700 mb-4 text-[16pt]">
                  We've developed an unlike learning methods that ensure learning in a simple and engaging way.
                </p>
                <p className="text-gray-700 mb-4 text-[16pt]">
                  Our goal is to boost the student abilities while using computer by equipping them with the knowledge, skills & confidence.<br /> <br />Not just to <span className='text-[#CA133E] font-bold'>get an A*</span>,
                  But Lead Students to thrive through the world beyond School & Univerity.
                </p>
              </motion.div>

              <motion.div
                variants={staggerContainer}
                className="grid grid-cols-2 gap-6 mt-8"
              >
                {[
                  { icon: <Book size={40} />, title: "Comprehensive Curriculum", description: "Covering all essential ICT topics with in-depth materials" },
                  { icon: <Award size={40} />, title: "Expert Teaching", description: "Learn from experienced ICT professionals and educators" },
                  { icon: <Users size={40} />, title: "Supportive Community", description: "Join a community of learners and educators" },
                  { icon: <Clock size={40} />, title: "Flexible Learning", description: "Access materials and resources at your own pace" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    whileHover={{ scale: 1.05 }}
                    className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition-all"
                  >
                    {/* Icon */}
                    <div className="text-[#CA133E] mb-4">{item.icon}</div>

                    {/* Title */}
                    <h3 className="text-[12pt] sm:text-[15pt] font-bold mb-2">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-[10pt] sm:text-[14pt]">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>


      </main>
    </div>
  );
};

export default About;