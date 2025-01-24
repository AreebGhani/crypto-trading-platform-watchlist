import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useTranslation } from "next-i18next";
import { useDashboardStore } from "@/stores/dashboard";
import Image from "next/image";

const BannerSection: React.FC = () => {
  const headingRef = useRef(null);
  const linkRef = useRef(null);
  const [isHeadingVisible, setHeadingVisible] = useState(false);
  const [isLinkVisible, setLinkVisible] = useState(false);
  const isHeadingInView = useInView(headingRef);
  const isLinkInView = useInView(linkRef);
  const { t } = useTranslation();
  const { profile } = useDashboardStore();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentTable, setCurrentTable] = useState(0);
  const [currentRoadmapPage, setCurrentRoadmapPage] = useState(0);

  useEffect(() => {
    setHeadingVisible(isHeadingInView);
  }, [isHeadingInView]);

  useEffect(() => {
    setLinkVisible(isLinkInView);
  }, [isLinkInView]);

  useEffect(() => {
    if (profile && profile.firstName) {
      setIsLoggedIn(true);
    }
  }, [profile]);

  const toggleTable = (direction: "left" | "right") => {
    if (direction === "right") {
      setCurrentTable((prev) => (prev === 2 ? 0 : prev + 1));
    } else {
      setCurrentTable((prev) => (prev === 0 ? 2 : prev - 1));
    }
  };

  const toggleRoadmapPage = (direction: "left" | "right") => {
    if (direction === "right") {
      setCurrentRoadmapPage((prev) => (prev === 1 ? 0 : prev + 1));
    } else {
      setCurrentRoadmapPage((prev) => (prev === 0 ? 1 : prev - 1));
    }
  };

  const roadmapItems = [
    {
      period: "End of Q4 2023",
      title: "Development and Initial Launch",
      description: "Finalize the development of core AI tools and integrate them with the Real-World AI Hub platform. Initiate the private beta testing phase."
    },
    {
      period: "Start of Q1 2024",
      title: "Launch the AcryptoCloud Exchange",
      description: "with support for cryptocurrency trading. Begin public sale of $REAI tokens."
    },
    {
      period: "Mid of Q1 2024",
      title: "Expand AcryptoCloud",
      description: "include forex and futures trading. Launch the public version of the Real-World AI Hub platform."
    },
    {
      period: "Mid of Q2 2024",
      title: "Introduce staking and governance features",
      description: "$REAI token holders. Initiate partnerships with key industry players in AI and finance."
    },
    {
      period: "Mid of Q2 2024",
      title: "Platform Expansion",
      description: "Develop and integrate additional AI tools focused on specialized sectors such as healthcare, finance, and education."
    },
    {
      period: "Mid of Q3 2024",
      title: "Launch mobile applications",
      description: "both Real-World AI Hub and AcryptoCloud, enhancing accessibility."
    },
    {
      period: "Mid of Q4 2024",
      title: "Expand marketing efforts globally",
      description: "targeting key markets in North America, Europe, and Asia."
    },
    {
      period: "End of Q4 2024",
      title: "Introduce decentralized finance (DeFi)",
      description: "features on AcryptoCloud, including yield farming, lending, and borrowing services."
    },
    {
      period: "Start of Q1 2025",
      title: "Global Adoption and Innovation",
      description: "Expand the AI toolset to include industry-specific solutions and advanced machine learning models. Establish strategic partnerships with educational institutions and government agencies."
    },
    {
      period: "Mid of Q1 2025",
      title: "Continue to evolve the platform",
      description: "based on user feedback, emerging technologies, and market trends. Focus on scaling operations and enhancing platform capabilities to serve a global user base."
    }
  ];

  const roadmapPage1 = roadmapItems.slice(0, 5);
  const roadmapPage2 = roadmapItems.slice(5);

  return (
    <section className="w-full pb-10 px-4 sm:px-6 lg:px-8 md:pb-20 mx-auto dark:bg-black bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2] md:h-auto relative pt-16">
      {/* Background Layer */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

      {/* Banner Section */}
      <div className="max-w-7xl relative pt-6 lg:pt-0 px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="relative rounded-xl p-5 sm:py-16 bg-muted-100 dark:bg-neutral-950">
          <div className="absolute inset-0 dark:hidden">
            <Image
              src="/img/home/banner-bg.svg"
              alt="Banner Background"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="absolute inset-0 hidden dark:block"></div>

          {/* Banners */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
            {["100+ Airdrops", "Stake Your Crypto", "Sign up Friends", "$15 Million Airdrops"].map(
              (title, index) => (
                <div
                  key={index}
                  className="p-6 bg-blue-500 text-white rounded-lg shadow-md"
                >
                  <h4 className="text-xl font-bold mb-2">{title}</h4>
                  <p className="text-sm mb-4">
                    {index === 0
                      ? "Every month to Acrypto Kickstarter members for free!"
                      : index === 1
                      ? "4% - 40% APR Staking on Acrypto!"
                      : index === 2
                      ? "Up to 20% commission signing up friends on Acrypto!"
                      : "Hold 250,000 REAI to enjoy our Kickstarter program and share in $15 Million in token airdrops!"}
                  </p>
                  <Link href="#" className="text-white font-semibold">
                    Learn More →
                  </Link>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="max-w-7xl mx-auto mt-10 relative">
        {/* Section Title */}
        <h2 className="text-3xl font-bold text-center mb-8 text-white">
          Explore Our Products
        </h2>

        {/* Table Content */}
        <div className="relative">
          {/* First Table */}
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 gap-4 relative ${
              currentTable === 0 ? "block" : "hidden"
            }`}
          >
            {/* Left Navigation Arrow */}
            <button
              onClick={() => toggleTable("left")}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white bg-gray-800 hover:bg-gray-700 p-2 rounded z-10"
            >
              ←
            </button>

            {[
              "Future Trading",
              "Spot Trading",
              "Buy Crypto via Card",
              "Earn/Saving",
              "Trading Bot",
              "Demo Trading",
            ].map((title, index) => (
              <div
                key={index}
                className="p-6 bg-blue-500 text-white rounded-lg shadow-md"
              >
                <h4 className="text-xl font-bold mb-2">{title}</h4>
                <p className="text-white mb-4">
                  {index === 0
                    ? "Advanced platform featuring up to 125X leverage, constant access, and superior risk management."
                    : index === 1
                    ? "User-friendly platform with real-time market access and 600 crypto pairs."
                    : index === 2
                    ? "Purchase digital assets with ease using credit cards or over 60 fiat currencies."
                    : index === 3
                    ? "Earn passive income on your digital assets with our savings feature."
                    : index === 4
                    ? "Enhance trading strategies and optimize trades for maximum opportunities."
                    : "Hone trading skills without risk in a simulated environment."}
                </p>
                <Link href="#" className="text-white font-semibold hover:text-gray-200">
                  {index % 2 === 0 ? "Learn More →" : "Trade Now →"}
                </Link>
              </div>
            ))}

            {/* Right Navigation Arrow */}
            <button
              onClick={() => toggleTable("right")}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white bg-gray-800 hover:bg-gray-700 p-2 rounded z-10"
            >
              →
            </button>
          </div>

          {/* Second Table */}
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 gap-4 relative ${
              currentTable === 1 ? "block" : "hidden"
            }`}
          >
            {/* Left Navigation Arrow */}
            <button
              onClick={() => toggleTable("left")}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white bg-gray-800 hover:bg-gray-700 p-2 rounded z-10"
            >
              ←
            </button>

            {[
              "NFT Marketplace",
              "DeFi Yield Farming",
              "Crypto Loans",
              "Crypto Insurance",
              "Crypto Mining",
              "Blockchain Education",
            ].map((title, index) => (
              <div
                key={index}
                className="p-6 bg-blue-500 text-white rounded-lg shadow-md"
              >
                <h4 className="text-xl font-bold mb-2">{title}</h4>
                <p className="text-white mb-4">
                  {index === 0
                    ? "Buy, sell, and trade digital collectibles securely."
                    : index === 1
                    ? "Earn rewards by staking your tokens in decentralized finance protocols."
                    : index === 2
                    ? "Access quick, secure crypto loans with minimal paperwork."
                    : index === 3
                    ? "Safeguard your digital assets with comprehensive coverage."
                    : index === 4
                    ? "Utilize your hardware to mine popular cryptocurrencies efficiently."
                    : "Expand your knowledge of blockchain technology with our courses."}
                </p>
                <Link href="#" className="text-white font-semibold hover:text-gray-200">
                  {index % 2 === 0 ? "Learn More →" : "Join Now →"}
                </Link>
              </div>
            ))}

            {/* Right Navigation Arrow */}
            <button
              onClick={() => toggleTable("right")}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white bg-gray-800 hover:bg-gray-700 p-2 rounded z-10"
            >
              →
            </button>
          </div>

          {/* Third Table */}
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 gap-4 relative ${
              currentTable === 2 ? "block" : "hidden"
            }`}
          >
            {/* Left Navigation Arrow */}
            <button
              onClick={() => toggleTable("left")}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white bg-gray-800 hover:bg-gray-700 p-2 rounded z-10"
            >
              ←
            </button>

            {[
              "Global P2P Trading",
              "Web3 Wallet",
              "Crypto Payment Gateway",
              "Social Trading",
              "Token Launchpad",
              "Multi-Chain Support",
            ].map((title, index) => (
              <div
                key={index}
                className="p-6 bg-blue-500 text-white rounded-lg shadow-md"
              >
                <h4 className="text-xl font-bold mb-2">{title}</h4>
                <p className="text-white mb-4">
                  {index === 0
                    ? "Secure peer-to-peer trading platform with global reach."
                    : index === 1
                    ? "Integrated Web3 wallet for seamless crypto management."
                    : index === 2
                    ? "Accept crypto payments easily across multiple platforms."
                    : index === 3
                    ? "Copy top traders' strategies and learn from experts."
                    : index === 4
                    ? "Launch and invest in promising new crypto projects."
                    : "Support for multiple blockchain networks and cryptocurrencies."}
                </p>
                <Link href="#" className="text-white font-semibold hover:text-gray-200">
                  {index % 2 === 0 ? "Learn More →" : "Explore Now →"}
                </Link>
              </div>
            ))}

            {/* Right Navigation Arrow */}
            <button
              onClick={() => toggleTable("right")}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white bg-gray-800 hover:bg-gray-700 p-2 rounded z-10"
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* Roadmap Section */}
      <section id="roadmap" className="roadmap-area pt-10 pb-10 relative">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-sm text-gray-400 uppercase">Our Roadmap</span>
            <h2 className="text-3xl font-bold mt-2 text-white">
              <span>Acrypto Cloud</span> Strategy and Real World AI Hub Project Plan
            </h2>
          </div>
          
          {/* Left Navigation Arrow */}
          <button
            onClick={() => toggleRoadmapPage("left")}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-gray-800 hover:bg-gray-700 p-2 rounded z-10"
          >
            ←
          </button>
{/* Right Navigation Arrow */}
          <button
            onClick={() => toggleRoadmapPage("right")}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-gray-800 hover:bg-gray-700 p-2 rounded z-10"
          >
            →
          </button>

          <div className="space-y-4">
            {currentRoadmapPage === 0 
              ? roadmapPage1.map((item, index) => (
                  <div 
                    key={index} 
                    className="flex items-start space-x-4 p-4 bg-blue-500 rounded-lg"
                  >
                    <div className="w-1/4 text-white">
                      <span className="font-semibold">{item.period}</span>
                    </div>
                    <div className="w-3/4">
                      <h4 className="text-xl font-bold mb-2 text-white">{item.title}</h4>
                      <p className="text-white">{item.description}</p>
                    </div>
                  </div>
                ))
              : roadmapPage2.map((item, index) => (
                  <div 
                    key={index} 
                    className="flex items-start space-x-4 p-4 bg-blue-500 rounded-lg"
                  >
                    <div className="w-1/4 text-white">
                      <span className="font-semibold">{item.period}</span>
                    </div>
                    <div className="w-3/4">
                      <h4 className="text-xl font-bold mb-2 text-white">{item.title}</h4>
                      <p className="text-white">{item.description}</p>
                    </div>
                  </div>
                ))
            }
          </div>

          {/* Page Indicator */}
          <div className="flex justify-center mt-4">
            <div className="flex space-x-2">
              <span 
                className={`h-2 w-2 rounded-full ${currentRoadmapPage === 0 ? 'bg-white' : 'bg-gray-500'}`}
              ></span>
              <span 
                className={`h-2 w-2 rounded-full ${currentRoadmapPage === 1 ? 'bg-white' : 'bg-gray-500'}`}
              ></span>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default BannerSection;