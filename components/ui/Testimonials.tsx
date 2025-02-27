"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { SparklesCore } from "./SparklesCore";

// Interfaces for type safety
interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  date: string;
}

// All reviews from the original component
const reviews: Review[] = [
  {
    id: "review-0",
    name: "Taryn Berg",
    rating: 5,
    text: "I recently had a challenging experience with another company that almost jeopardized my business, leaving me with just two weeks to set up my new dog grooming salon. In my search for reliable help, I obtained quotes from at least eight different contractors, and that's when I found Hayden from HD Plumbing Services. From the moment he arrived, Hayden's service was exceptional. He was punctual, incredibly helpful, and his quote was thousands less than the other estimates. It's clear that he is not only efficient but also communicates effectively throughout the entire process.",
    date: ""
  },
  {
    id: "review-1",
    name: "Andrew Kennedy",
    rating: 5,
    text: "Hayden has done various jobs for us - taps, plumbing check and certification, hot water system replacement, roof leak, etc. He is always prompt, efficient, professional and well priced. Best of all, Hayden is just a great guy who can be relied on to get the job done. We highly recommend him to anyone needing plumbing/roofing repairs or installations.",
    date: ""
  },
  {
    id: "review-2",
    name: "Michael Xu",
    rating: 5,
    text: "An excellent bloke, he diagnosed the problem quickly and was able to come up with an easy solution for the problem. Keeps you updated on the progress and is just an upstanding guy overall. The prices he quotes are also very fair. Would highly recommend HD Trade Services.",
    date: ""
  },
  {
    id: "review-3",
    name: "Morgan Duncan",
    rating: 5,
    text: "HD Trade Services did an outstanding job on my kitchen renovation. Professional, efficient, and knowledgeable. Completed on time, within budget, and with minimal disruption. Highly recommend for plumbing needs. Top-notch expertise and customer service!",
    date: ""
  },
  {
    id: "review-4",
    name: "Craig Wilson",
    rating: 5,
    text: "Hayden was professional, friendly and prompt. The cost of repairs were considerably cheaper than all other quotes given. I would recommend Hayden anytime",
    date: ""
  },
  {
    id: "review-5",
    name: "Michael Rooke",
    rating: 5,
    text: "Very friendly and hardworking and great work highly recommend",
    date: ""
  },
  {
    id: "review-6",
    name: "Dave Gama",
    rating: 5,
    text: "From the first call through to completion Hayden was professional, knowledgeable and efficient. He quickly diagnosed the cause of our blocked drain and had it fixed in no time with no fuss. Recommend.",
    date: ""
  },
  {
    id: "review-7",
    name: "Mitch Stevens",
    rating: 5,
    text: "Hayden HD was efficient, effective, affordable, professional and kept me informed through the entire process. Hayden stayed back after hours to ensure he completed the job.",
    date: ""
  },
  {
    id: "review-8",
    name: "Jeremy Rigby",
    rating: 5,
    text: "I cannot speak highly enough of Hayden. He is a highly skilled tradesman who definitely went the extra mile with a troublesome roof leak in my highset Queenslander. I would not hesitate to use and or recommend in the future.",
    date: ""
  },
  {
    id: "review-9",
    name: "Nicole Elizabeth",
    rating: 5,
    text: "Highly recommend Hayden. Absolute amazing service, very efficient, great communication, friendly, super helpful and knowledgeable and great rates!!",
    date: ""
  },
  {
    id: "review-10",
    name: "Greg Arkless",
    rating: 5,
    text: "I highly recommend this business I was impressed with professionalism and customer service Hayden fixed our air conditioning and drains really quickly thank you",
    date: ""
  },
  {
    id: "review-11",
    name: "Melinda Friend",
    rating: 5,
    text: "Hayden was asked to quote on a major plumbing job. He communicated well, was honest about needs and quotes, and cleaned up the area after being finished. I was so impressed that I want to get him back to do some other plumbing jobs!",
    date: ""
  },
  {
    id: "review-12",
    name: "David Spires",
    rating: 5,
    text: "Hayden is a super professional and down to earth Aussie bloke. You can see the pride he takes in his work and his attention to detail. Nothing but good things to say about him.",
    date: ""
  },
  {
    id: "review-13",
    name: "Harry Camerlengo",
    rating: 5,
    text: "Amazing service from HD Trade Services I cannot praise them enough for their expertise and efficiency. From the moment I called, Hayden and his team were incredibly responsive and attentive to my plumbing needs. They quickly diagnosed the issue and were able to fix it promptly. Not only did Hayden fix the issue promptly, but he took the time to ensure that everything was in proper working order before leaving. Hayden and his teams attention to detail and commitment to quality craftsmanship set them apart. I highly recommend this plumbing company to anyone in need of reliable and trustworthy service.",
    date: ""
  },
  {
    id: "review-14",
    name: "Lucas Roseneder",
    rating: 5,
    text: "Engaged Hayden's services for multiple jobs around the house and couldn't believe how impressive his attention to detail was from start to finish. Absolutely blew it out of the park!!!!!",
    date: ""
  },
  {
    id: "review-15",
    name: "Tyla Hodgson",
    rating: 5,
    text: "Hayden was fantastic, he effortlessly replaced my aircon unit and was professional and friendly at every touch point. Highly recommend! Thanks again Hayden.",
    date: ""
  },
  {
    id: "review-16",
    name: "Lachy Holliday",
    rating: 5,
    text: "Hayden was quick, efficient, knowledgeable and paid great attention to detail in ensuring the best outcome for my job. I will definitely be using HD Trade Services again!",
    date: ""
  },
  {
    id: "review-17",
    name: "Tasha Sundholm",
    rating: 5,
    text: "Hayden came around do provide a quote on an air con install. Some extra work was required, which he was upfront with and the price was probably better than reasonable. The job was completed that same day, and everyone who had spoken to him commented on how polite, respectful and well mannered he was while working. I am saving his details for future work I hope to get done.",
    date: ""
  },
  {
    id: "review-18",
    name: "Carmel Stanford",
    rating: 5,
    text: "A big thanks to Hayden from HD Trade services. We had our gas cooktop installed and it was a very neat job and well priced. Highly recommended.",
    date: ""
  },
  {
    id: "review-19",
    name: "Margaret Lawrence",
    rating: 5,
    text: "Hayden provided an outstanding service for my elderly mother recently when she moved into her new home. There were serious overland flow drainage issues which he has rectified with new drains that fall properly and additional sumps. He also cleaned the roof and gutters that were completely blocked with leaf litter. He was super professional and friendly, prompt and very communicative and we would highly recommend him. Thanks for the peace of mind, Hayden.",
    date: ""
  },
  {
    id: "review-20",
    name: "Dede",
    rating: 5,
    text: "Brilliant service! Hayden has done several plumbing jobs for us Including bathroom, hotwater service and roofing. Awesome work ethic thank you Hayden!",
    date: ""
  },
  {
    id: "review-21",
    name: "Charlie Downey",
    rating: 5,
    text: "Friendly on time service was excellent, and quick to install",
    date: ""
  },
  {
    id: "review-22",
    name: "Aarti Rani",
    rating: 5,
    text: "I want give 5 stars to Hayden's service. He had done plumbing service in our newly built office, and he did amazing work. Highly recommended",
    date: ""
  },
  {
    id: "review-23",
    name: "Phil Hume",
    rating: 5,
    text: "Quick and easy. Hayden was pleasant and went above and beyond to get the job done asap.",
    date: ""
  },
  {
    id: "review-24",
    name: "Wang Bourne",
    rating: 5,
    text: "Wonderful job, quick done, professional",
    date: ""
  },
  {
    id: "review-25",
    name: "Duncan Hamilton",
    rating: 5,
    text: "Did a great job replacing some down pipes and some roof repairs. Recommend to anyone",
    date: ""
  },
  {
    id: "review-26",
    name: "m9i4c",
    rating: 5,
    text: "Recently had a bad experience with Metropolitan plumbing where I was overcharged for a new hot water system (and that's putting it nicely) which ended up leaking. Luckily I made the decision to contact HD Trade Services who fixed the system at a much more customer friendly price. Best be sure I will be continuing to use their services moving forward!",
    date: ""
  },
  {
    id: "review-27",
    name: "Josiah C",
    rating: 5,
    text: "Fixed my blocked toilet, did an awesome job",
    date: ""
  },
  {
    id: "review-28",
    name: "Junior Tangianau",
    rating: 5,
    text: "Had Hayden from HD Services out at my house to repair burst pipe. Arrived on time and had the problem repaired within the hour. The nicest bloke. Would recommend him to all family and friends.",
    date: ""
  },
  {
    id: "review-29",
    name: "Brendan",
    rating: 5,
    text: "Recently had Hayden from HD Trade Services out to our property for some plumbing and roof work. Hayden was on time, professional and explained every clearly so we understood what was required to fix our problems. He gave us a price up front and carried out the work on the spot. I would highly recommend this company to anyone and would use them again.",
    date: ""
  },
  {
    id: "review-30",
    name: "Mark Hunt",
    rating: 5,
    text: "Hayden recently came out and replaced my gas hot water heater that was no longer working very easy to work with and efficient would recommend 10/10",
    date: ""
  },
  {
    id: "review-31",
    name: "Rhys",
    rating: 5,
    text: "This is the second time using HD Trade services and I must say I'm very impressed with the work carried out, the plumbing technician sent me a message to say he was on the way and he arrived on time, the price was very reasonable. I will recommend this service to everyone! Thank you!",
    date: ""
  },
  {
    id: "review-32",
    name: "Dylan",
    rating: 5,
    text: "Great service! On time, professional and knowledgable. No messing about. A clear artisan in his craft. After a previous bad experience with other tradesmen, engaging HD Trade was a breath of fresh air. He was even able to fit me in same day that I called. I will be recommending you to all my friends and family. Thanks again for your work Hayden!",
    date: ""
  },
  {
    id: "review-33",
    name: "Bron Hanley",
    rating: 5,
    text: "Excellent service! Would give 10 stars if I could! Hayden arrived promptly, diagnosed our issue quickly and we were back up and running in no time! He even gave us a few handy tips for our upcoming bathroom reno! Would recommend to friends and family. Best plumber in Brisbane!",
    date: ""
  }
];

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex justify-start gap-1" aria-label={`Rating: ${rating} out of 5 stars`}>
    {[...Array(5)].map((_, i) => (
      <svg
        key={i}
        viewBox="0 0 576 512"
        className="h-4 w-4 fill-yellow-400 filter drop-shadow-glow"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
      </svg>
    ))}
  </div>
);

const TestimonialCard = ({ review }: { review: Review }) => (
  <motion.div
    className="bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-800 hover:border-gray-700 transition-all duration-300 hover:relative hover:z-10"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    whileHover={{ scale: 1.02, boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)" }}
  >
    <div className="flex items-center mb-4">
      <div className="flex-1">
        <h3 className="text-white font-medium text-lg mb-1">{review.name}</h3>
        <StarRating rating={review.rating} />
      </div>
    </div>
    <p className="text-gray-400 text-sm leading-relaxed">{review.text}</p>
  </motion.div>
);

const TestimonialColumn = ({ reviews, direction = "up", duration }: { 
  reviews: Review[],
  direction?: "up" | "down",
  duration: number
}) => {
  const columnRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (columnRef.current) {
      const column = columnRef.current;
      const height = column.scrollHeight / 2;
      
      // Set the scroll height based on direction
      column.style.setProperty("--scroll-height", `-${height}px`);
      column.style.setProperty("--scroll-duration", `${duration}s`);
    }
  }, [duration]);

  // Create a custom animation style based on direction
  const animationStyle = {
    animationName: direction === "down" ? "scroll-down" : "scroll-up",
    animationDuration: `${duration}s`,
    animationTimingFunction: "linear",
    animationIterationCount: "infinite",
    animationPlayState: "running",
  };

  // Define keyframes in a style tag
  useEffect(() => {
    // Create a style element if it doesn't exist
    let styleElement = document.getElementById("testimonial-keyframes");
    if (!styleElement) {
      styleElement = document.createElement("style");
      styleElement.id = "testimonial-keyframes";
      document.head.appendChild(styleElement);
    }

    // Define keyframes for both directions
    styleElement.textContent = `
      @keyframes scroll-up {
        from { transform: translateY(0); }
        to { transform: translateY(var(--scroll-height)); }
      }
      
      @keyframes scroll-down {
        from { transform: translateY(var(--scroll-height)); }
        to { transform: translateY(0); }
      }
    `;

    // Clean up
    return () => {
      if (styleElement && document.head.contains(styleElement)) {
        document.head.removeChild(styleElement);
      }
    };
  }, []);

  return (
    <div 
      className="relative h-full overflow-hidden group" 
      style={{
        maskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)"
      }}
    >
      <div
        ref={columnRef}
        className="flex flex-col gap-6"
        style={{
          ...animationStyle,
          // Pause animation on hover
          ...{ animationPlayState: "var(--play-state, running)" },
        }}
        onMouseEnter={() => {
          if (columnRef.current) {
            columnRef.current.style.setProperty("--play-state", "paused");
          }
        }}
        onMouseLeave={() => {
          if (columnRef.current) {
            columnRef.current.style.setProperty("--play-state", "running");
          }
        }}
      >
        {/* Double the reviews to create a seamless loop */}
        {[...reviews, ...reviews].map((review, index) => (
          <TestimonialCard key={`${review.id}-${index}`} review={review} />
        ))}
      </div>
    </div>
  );
};

export const Testimonials = () => {
  // Split reviews into three roughly equal groups
  const columnSize = Math.ceil(reviews.length / 3);
  const column1 = reviews.slice(0, columnSize);
  const column2 = reviews.slice(columnSize, columnSize * 2);
  const column3 = reviews.slice(columnSize * 2);

  return (
    <section className="py-16 bg-black relative overflow-hidden" aria-label="Customer testimonials section">
      <div className="container max-w-7xl mx-auto px-4">
        {/* Header */}
        <header className="text-center mb-12 relative z-10">
          <h2 className="text-4xl font-bold text-white mb-4">
            What Our Customers Say
          </h2>
        </header>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-[600px] relative z-10">
          <TestimonialColumn reviews={column1} direction="up" duration={50} />
          <TestimonialColumn reviews={column2} direction="down" duration={50} />
          <TestimonialColumn reviews={column3} direction="up" duration={50} />
        </div>

        {/* Sparkles effect */}
        <div className="absolute bottom-0 left-0 w-full h-32 z-0">
          <SparklesCore
            className="w-full h-full"
            particleColor="#00E6CA"
            particleDensity={100}
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
};

Testimonials.displayName = "Testimonials";