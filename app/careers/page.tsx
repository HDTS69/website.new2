'use client';

import { motion } from 'framer-motion';
import { SparklesCore } from '@/components/ui/sparkles';
import { AnimatedButton } from '@/components/ui/AnimatedButton';

const jobOpenings = [
  {
    title: 'Licensed Plumber',
    type: 'Full Time',
    location: 'Brisbane',
    requirements: [
      'Valid plumbing license',
      'Minimum 3 years experience',
      'Own reliable vehicle',
      'Strong problem-solving skills',
      'Excellent customer service',
    ],
    responsibilities: [
      'Residential and commercial plumbing services',
      'Emergency repairs and maintenance',
      'Installation of plumbing systems',
      'Customer communication and service',
      'Compliance with safety standards',
    ],
  },
  {
    title: 'Gas Fitter',
    type: 'Full Time',
    location: 'Brisbane & Gold Coast',
    requirements: [
      'Gas fitting license',
      'Minimum 2 years experience',
      'Own tools and vehicle',
      'Strong attention to detail',
      'Team player mentality',
    ],
    responsibilities: [
      'Gas appliance installation and repairs',
      'Gas leak detection and repairs',
      'Compliance certificates',
      'Safety inspections',
      'Customer service',
    ],
  },
  {
    title: 'Air Conditioning Technician',
    type: 'Full Time',
    location: 'Brisbane',
    requirements: [
      'Air conditioning license',
      'Minimum 2 years experience',
      'Own vehicle',
      'Strong technical skills',
      'Problem-solving ability',
    ],
    responsibilities: [
      'AC installation and repairs',
      'Maintenance services',
      'System diagnostics',
      'Customer communication',
      'Quality assurance',
    ],
  },
];

const benefits = [
  {
    title: 'Competitive Salary',
    description: 'Above-market rates with regular performance reviews and increases.',
  },
  {
    title: 'Work Vehicle',
    description: 'Fully maintained company vehicle for work use.',
  },
  {
    title: 'Tools & Equipment',
    description: 'Latest tools and equipment provided.',
  },
  {
    title: 'Training & Development',
    description: 'Ongoing training and upskilling opportunities.',
  },
  {
    title: 'Career Growth',
    description: 'Clear career progression pathways.',
  },
  {
    title: 'Work-Life Balance',
    description: 'Flexible scheduling and family-friendly policies.',
  },
];

export default function CareersPage() {
  return (
    <div className="pt-32 pb-16 min-h-screen">
      {/* Background Effects */}
      <div className="fixed inset-0 -z-10">
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={2}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#1CD4A7"
          speed={0.3}
        />
      </div>

      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#1CD4A7] via-white to-[#1CD4A7]">
            Join Our Team
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            We're looking for talented professionals to join our growing team. Discover exciting career opportunities and grow with us.
          </p>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-semibold text-white mb-8 text-center">Why Work With Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="p-6 rounded-xl bg-gradient-to-br from-gray-900 to-gray-800"
              >
                <h3 className="text-xl font-semibold text-white mb-2">{benefit.title}</h3>
                <p className="text-gray-300">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Current Openings */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl font-semibold text-white mb-8 text-center">Current Openings</h2>
          <div className="space-y-6">
            {jobOpenings.map((job, index) => (
              <motion.div
                key={job.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="p-6 rounded-xl bg-gradient-to-br from-gray-900 to-gray-800"
              >
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-2xl font-semibold text-white mb-2">{job.title}</h3>
                    <div className="flex items-center gap-4 text-gray-400">
                      <span>{job.type}</span>
                      <span>•</span>
                      <span>{job.location}</span>
                    </div>
                  </div>
                  <AnimatedButton href="/careers/apply" variant="primary">
                    Apply Now
                  </AnimatedButton>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Requirements</h4>
                    <ul className="space-y-2">
                      {job.requirements.map((req) => (
                        <li key={req} className="flex items-start space-x-3 text-gray-300">
                          <svg
                            className="w-5 h-5 text-[#00E6CA] mt-1 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Responsibilities</h4>
                    <ul className="space-y-2">
                      {job.responsibilities.map((resp) => (
                        <li key={resp} className="flex items-start space-x-3 text-gray-300">
                          <svg
                            className="w-5 h-5 text-[#00E6CA] mt-1 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <h2 className="text-2xl font-semibold text-white mb-4">
            Don't See the Right Position?
          </h2>
          <p className="text-gray-300 mb-8">
            We're always looking for talented individuals. Send us your resume and we'll keep it on file for future opportunities.
          </p>
          <AnimatedButton href="/careers/contact" variant="primary">
            Contact Our HR Team
          </AnimatedButton>
        </motion.div>
      </div>
    </div>
  );
} 