import React from 'react';
import { BookOpen, FileCheck, Video } from 'lucide-react';
import { motion } from 'framer-motion';

const WhyChooseATICT = () => {
  // Animation variants for the cards
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  // Animation for the section heading
  const headingVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <section className="py-16 bg-gray-50 bg-gradient-to-br from-[#3a1a1a] via-[#2a1a1a] to-[#1a1a1a]">
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <motion.h2
          className="text-[40pt] sm:text-[40pt] md:text-[40pt] font-bold text-center mb-8 md:mb-16 text-white"
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Why Choose <span className="text-[#CA133E]">AT-ICT </span>?
        </motion.h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4">
          {/* Card 1 */}
          <motion.div
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-105"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4">
              <BookOpen className="text-[#CA133E]" size={30} />
            </div>
            <h3 className="text-[18pt] sm:text-[20pt] font-semibold mb-2">Interactive Notes</h3>
            <p className="text-gray-600 text-[14pt] sm:text-[16pt]">
              Access <span className="text-[#CA133E] font-bold">comprehensive</span> and <span className="text-[#CA133E] font-bold">Interactive</span><br />
              learning materials designed to enhance your understanding and Memorization.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-105"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4">
              <FileCheck className="text-[#CA133E]" size={30} />
            </div>
            <h3 className="text-[18pt] sm:text-[20pt] font-semibold mb-2">Compact Plan</h3>
            <p className="text-gray-600 text-[14pt] sm:text-[16pt]">
              Follow a structured learning path that efficiently covers all required skills and knowledge.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-105"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4">
              <Video className="text-[#CA133E]" size={30} />
            </div>
            <h3 className="text-[18pt] sm:text-[20pt] font-semibold mb-2">Recorded Sessions</h3>
            <p className="text-gray-600 text-[14pt] sm:text-[16pt]">
              Whenever you're <strong>stuck</strong>,  <span  className="text-[#CA133E] font-bold">We've got you !</span> With our <span className='text-[20pt] font-bold'>Huge</span> library of past recorded videos, Solving Practical & Explaing Theory.
            </p>
          </motion.div>

          {/* Card 4 */}

           <motion.div
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-105"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4">
              <BookOpen className="text-[#CA133E]" size={30} />
            </div>
            <h3 className="text-[18pt] sm:text-[20pt] font-semibold mb-2">Continous Assistance</h3>
            <p className="text-gray-600 text-[14pt] sm:text-[16pt]">
           

            </p>
          </motion.div>

          {/* Card 5 */}

          <motion.div
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-105"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4">
              <BookOpen className="text-[#CA133E]" size={30} />
            </div>
            <h3 className="text-[18pt] sm:text-[20pt] font-semibold mb-2">Practical Activities</h3>
            <p className="text-gray-600 text-[14pt] sm:text-[16pt]">
        

            </p>
          </motion.div>

          {/* Card 6 */}


          <motion.div
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-105"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4">
              <BookOpen className="text-[#CA133E]" size={30} />
            </div>
            <h3 className="text-[18pt] sm:text-[20pt] font-semibold mb-2">Interactive Notes</h3>
            <p className="text-gray-600 text-[14pt] sm:text-[16pt]">
            
            
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseATICT;