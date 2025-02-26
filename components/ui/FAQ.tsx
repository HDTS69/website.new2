'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What services do you offer?",
    answer: "At HD Trade Services, we specialize in plumbing, gas fitting, roofing, and air conditioning installations and maintenance. Whether you need a quick repair, regular servicing, or a complete installation, we've got you covered."
  },
  {
    question: "Do you service my area?",
    answer: "We primarily service Brisbane but also Ipswich and Morten bay and Gold Coast. Please ask to confirm if we can reach your location."
  },
  {
    question: "What are your operating hours?",
    answer: "We operate Monday to Friday from 7:00 AM to 5:00 PM. Emergency services may be available outside these hours—just ask!"
  },
  {
    question: "Do you have a call-out fee?",
    answer: "Yes, we have a $120 attendance fee. This covers travel in one of our fully stocked vans and the first 15 minutes for you to show the technician your issue."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept cash, card payments, and bank transfers. For larger jobs, we can discuss payment plans or financing options."
  },
  {
    question: "How can I book a service?",
    answer: "You can book a service by calling us directly or using the contact form on our website. We'll get back to you promptly to confirm the details."
  },
  {
    question: "What's your cancellation policy?",
    answer: "We ask for at least 24 hours' notice if you need to cancel or reschedule your appointment. This helps us manage our schedule and accommodate other customers."
  },
  {
    question: "How long will the job take?",
    answer: "The time required depends on the complexity of the job. For standard repairs, it's often resolved within a few hours. Installations or larger projects may take a day or longer."
  },
  {
    question: "What types of air conditioning systems do you install?",
    answer: "We install split systems, ducted systems, and reverse cycle air conditioners. We can also recommend the best system for your home based on your needs and budget."
  },
  {
    question: "Can you install hot water systems?",
    answer: "Yes, we install and repair all types of hot water systems, including gas, electric, and solar. Let us know your requirements, and we can recommend the best solution for your home."
  },
  {
    question: "Do you do gas fitting and appliance installation?",
    answer: "Yes, we provide professional gas fitting services, including the installation and maintenance of gas appliances like stoves, ovens, and heaters."
  },
  {
    question: "Can you replace my roof or fix a roof leak?",
    answer: "We handle both small roof repairs and full roof replacements. We work with all types of roofing materials, including metal, tile, and more."
  },
  {
    question: "Do you provide warranties for your work?",
    answer: "Yes, we provide warranties on both our workmanship and the materials we use. The specific terms depend on the type of service, so feel free to ask for details."
  },
  {
    question: "What if I'm not satisfied with the work?",
    answer: "Customer satisfaction is our top priority. If you're not happy with our work, let us know, and we'll do our best to make it right."
  },
  {
    question: "Do you offer maintenance packages?",
    answer: "Yes, we offer regular maintenance packages for air conditioning, plumbing, and roofing to keep your systems running smoothly and prevent costly repairs."
  },
  {
    question: "Do you handle insurance work?",
    answer: "Yes, we can assist with insurance claims for plumbing, roofing, or other damage-related work. We'll provide all necessary documentation and liaise with your insurer if needed."
  },
  {
    question: "Can you help me choose the right air conditioning system for my home?",
    answer: "We'll assess your home's size, layout, and insulation to recommend the best air conditioning system for your needs and budget."
  },
  {
    question: "What should I do if I smell gas?",
    answer: "If you smell gas, turn off your gas supply at the main valve immediately and call us or your local gas emergency service. Avoid using electrical devices or lighting any flames."
  }
];

export function FAQ() {
  const [isOpen, setIsOpen] = useState<boolean[]>(faqs.map(() => false));
  const [showAll, setShowAll] = useState(false);

  const toggleFaq = (index: number) => {
    setIsOpen(prev => prev.map((_, i) => i === index ? !prev[i] : false));
  };

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mt-10 text-center mb-6">
        <button
          onClick={toggleShowAll}
          className="inline-flex items-center gap-x-2 bg-black px-6 py-3 rounded-full text-sm font-semibold text-[#00E6CA] hover:text-white transition-colors focus:outline-none border border-[#00E6CA]/20"
        >
          {showAll ? "Show Less" : "View All FAQs"}
          <ChevronDown
            className={cn(
              "w-4 h-4 transition-transform duration-200",
              showAll ? "rotate-180" : ""
            )}
          />
        </button>
      </div>

      <div className={cn("space-y-4", !showAll && "hidden")}>
        {faqs.map((faq, index) => (
          <div
            key={faq.question}
            className="rounded-xl bg-gray-900/50 hover:bg-gray-900/70 transition-all duration-300"
          >
            <button
              onClick={() => toggleFaq(index)}
              className="flex w-full items-center justify-between px-4 py-5 sm:p-6 group"
            >
              <span className="text-lg font-medium text-white group-hover:text-[#00E6CA] transition-colors">
                {faq.question}
              </span>
              <ChevronDown
                className={cn(
                  "w-5 h-5 text-[#00E6CA] transition-transform duration-200",
                  isOpen[index] ? "rotate-180" : ""
                )}
              />
            </button>
            <div
              className={cn(
                "px-4 pb-5 sm:px-6 sm:pb-6",
                isOpen[index] ? "block" : "hidden"
              )}
            >
              <p className="text-gray-400">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 