"use client";

import NextLink from "next/link";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-scroll";
import ScrollAnimation from "react-animate-on-scroll";

const Main: React.FC = () => {
  const symbols = ["BTCUSDT", "ETHUSDT", "BNBUSDT"];

  useEffect(() => {
    symbols.forEach((symbol, index) => {
      const container = document.getElementById(`tradingview-${index}`);
      if (container) {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.async = true;
        script.src =
          "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js";
        script.innerHTML = JSON.stringify({
          symbol: `KUCOIN:${symbol}`,
          width: 400,
          height: 250,
          locale: "en",
          dateRange: "12M",
          colorTheme: "dark",
          trendLineColor: "#00c4f4",
          underLineColor: "#00c4f4",
          underLineBottomColor: "rgba(41, 98, 255, 0)",
          isTransparent: true,
          autosize: false,
          largeChartUrl: "",
        });
        container.appendChild(script);
      }
    });

    return () => {
      // Cleanup to avoid memory leaks
      symbols.forEach((_, index) => {
        const container = document.getElementById(`tradingview-${index}`);
        if (container) {
          container.innerHTML = "";
        }
      });
    };
  }, [symbols]);

  return (
    <main className="fix">
      <section className="banner-area banner-bg">
        <div className="banner-shape-wrap">
          <img
            src="/assetz/img/banner/banner_shape01.png"
            alt=""
            className="img-one"
          />
          <img
            src="/assetz/img/banner/banner_shape02.png"
            alt=""
            className="img-two"
          />
          <img
            src="/assetz/img/banner/banner_shape03.png"
            alt=""
            className="img-three"
          />
        </div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                }}
                className="banner-content text-center"
              >
                <img
                  src="/assetz/img/icon/fire.png"
                  alt=""
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    margin: "0 auto",
                  }}
                />
                <h2 className="title">
                  The Next Generation of <span>AI-Driven</span> Blockchain
                  Solutions
                </h2>
              </div>
              <div
                className="livecoinwatch-widget-5"
                lcw-base="USD"
                lcw-color-tx="#00c4f4"
                lcw-marquee-1="coins"
                lcw-marquee-2="movers"
                lcw-marquee-items="30"
              ></div>
            </div>
          </div>
        </div>
      </section>

      <div className="partner-area pt-40 pb-130">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="section-title text-center mb-10">
                <span className="sub-title">
                  Embrace AI-Driven Crypto <span>Forex,</span> and Futures
                  Trading All in 1
                </span>
              </div>
            </div>
          </div>

          <div className="row">
            {symbols.map((_, index) => (
              <div
                className="tradingview-widget-container"
                id={`tradingview-${index}`}
                key={index}
              >
                <div className="tradingview-widget-container__widget"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section id="about" className="about-area pt-130 pb-130">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <ScrollAnimation animateIn="fadeIn">
                <div className="about-img">
                  <img src="/assetz/img/images/about_img01.png" alt="" />
                  <img
                    src="/assetz/img/images/about_img02.png"
                    alt=""
                    className="img-two"
                  />
                </div>
              </ScrollAnimation>
            </div>
            <div className="col-lg-6">
              <ScrollAnimation animateIn="fadeIn">
                <div className="about-content">
                  <div className="section-title mb-30">
                    <span className="sub-title">Who we are</span>
                    <h2 className="title">Welcome to Acrypto</h2>
                    <h2 className="title">Cloud</h2>
                  </div>
                  <p>
                    Your all-in-one platform for advanced AI, blockchain, and
                    decentralized finance. We offer a powerful suite of
                    crypto-native AI tools, multi-platform chatbots,
                    decentralized marketplaces, trading solutions, and more, all
                    underpinned by the <span>$REAI</span> token.Whether you’re a
                    trader, developer, or blockchain enthusiast, Acrypto Cloud
                    is here to empower your journey with cutting-edge,
                    blockchain-secured AI technology.
                  </p>
                  <NextLink href="/login" className="btn">
                    Trade Now
                  </NextLink>
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </div>
      </section>

      <div className="partner-area pb-130">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="section-title text-center mb-10">
                <span className="sub-title">Our top partner</span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="partner-wrap">
                <ul>
                  <li>
                    <img src="/assetz/img/partner/partner_img01.png" alt="" />
                  </li>
                  <li>
                    <img src="/assetz/img/partner/partner_img02.png" alt="" />
                  </li>
                  <li>
                    <img src="/assetz/img/partner/partner_img03.png" alt="" />
                  </li>
                  <li>
                    <img src="/assetz/img/partner/partner_img04.png" alt="" />
                  </li>
                  <li>
                    <img src="/assetz/img/partner/partner_img05.png" alt="" />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="choose-area pb-130">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-6">
              <div className="section-title text-center mb-50">
                <span className="sub-title">Why Choose Acrypto Cloud?</span>
                <h2 className="title">
                  All-In-One <span>AI and Blockchain Platform</span>
                </h2>
              </div>
            </div>
          </div>
          <div className="row choose-active">
            <div className="col-lg-3">
              <div className="choose-item">
                <div className="choose-icon">
                  <img src="/assetz/img/icon/choose_icon01.svg" alt="" />
                </div>
                <div className="choose-content">
                  <h2 className="title">
                    <a href="#">Decentralized, Community-Driven Governance</a>
                  </h2>
                  <p>
                    The $REAI token empowers our community to influence the
                    platform’s growth, ensuring Acrypto Cloud evolves with user
                    needs. Staking and governance opportunities give users
                    direct control and incentives for contributing to the
                    ecosystem.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="choose-item">
                <div className="choose-icon">
                  <img src="/assetz/img/icon/choose_icon02.svg" alt="" />
                </div>
                <div className="choose-content">
                  <h2 className="title">
                    <a href="#">
                      Developer-Friendly with Extensive API and Integration
                    </a>
                  </h2>
                  <p>
                    With open APIs for AI, trading, and data, plus a secure
                    testing sandbox, Acrypto Cloud is the go-to choice for
                    developers looking to build innovative blockchain
                    applications.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="choose-item">
                <div className="choose-icon">
                  <img src="/assetz/img/icon/choose_icon02.svg" alt="" />
                </div>
                <div className="choose-content">
                  <h2 className="title">
                    <a href="#">
                      Ready to Dive into the Future of AI and Blockchain
                    </a>
                  </h2>
                  <p>
                    Join the thousands of users who rely on Acrypto Cloud for
                    their blockchain and AI needs. From traders and developers
                    to businesses and crypto enthusiasts, our platform offers
                    the tools, insights, and innovation needed to thrive in a
                    decentralized world.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="choose-item">
                <div className="choose-icon">
                  <img src="/assetz/img/icon/choose_icon03.svg" alt="" />
                </div>
                <div className="choose-content">
                  <h2 className="title">
                    <a href="#">Privacy-Focused and Blockchain-Backed</a>
                  </h2>
                  <p>
                    Protect your data with decentralized storage and advanced
                    anonymization tools that ensure privacy, user sovereignty,
                    and data ownership.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="choose-item">
                <div className="choose-icon">
                  <img src="/assetz/img/icon/choose_icon04.svg" alt="" />
                </div>
                <div className="choose-content">
                  <h2 className="title">
                    <a href="#">
                      Trusted by the Crypto and Blockchain Community
                    </a>
                  </h2>
                  <p>
                    Acrypto Cloud incorporates the best features of leading
                    blockchain AI projects, offering a complete solution that
                    integrates their capabilities and more—all within a secure,
                    user-centric platform.
                  </p>
                </div>
              </div>
              <div className="slide-progress" role="progressbar">
                <span className="slider__label sr-only"></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="sales" className="chart-area chart-bg jarallax">
        <div className="container">
          <div className="chart-inner">
            <div className="row align-items-center justify-content-center">
              {/* Chart Wrap Section */}
              <div className="col-lg-6 col-md-10 order-0 order-lg-2">
                <ScrollAnimation animateIn="fadeInRight">
                  <div
                    className="chart-wrap wow fadeInRight"
                    data-wow-delay=".2s"
                  >
                    <img src="/assetz/img/images/chart.png" alt="Chart" />
                    <ul>
                      <li>$REAI Tokenomics Overview</li>
                      <li>Total Supply: 21 million $REAI</li>
                      <li>Token Distribution:</li>
                      <li>Founders and Team: 20% (vested over 3 years)</li>
                      <li>Public Sale: 30%</li>
                      <li>Staking Rewards: 20%</li>
                      <li>Ecosystem Growth: 20%</li>
                      <li>Liquidity Pool: 10%</li>
                    </ul>
                  </div>
                </ScrollAnimation>
              </div>

              {/* Chart Content Section */}
              <div className="col-lg-6 col-md-10">
                <ScrollAnimation animateIn="fadeInLeft">
                  <div
                    className="chart-content wow fadeInLeft"
                    data-wow-delay=".2s"
                  >
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link active"
                          id="funding-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#funding"
                          type="button"
                          role="tab"
                          aria-controls="funding"
                          aria-selected="true"
                        >
                          Unlock the Power of AI and Blockchain in One Platform
                        </button>
                      </li>
                    </ul>

                    <div className="tab-content" id="myTabContent">
                      <div
                        className="tab-pane fade show active"
                        id="funding"
                        role="tabpanel"
                        aria-labelledby="funding-tab"
                      >
                        <div className="chart-content-inner">
                          <h2 className="title">At Acrypto Cloud</h2>
                          <p>
                            We combine the capabilities of Acrypto Cloud and
                            RealWorld AI Hub to deliver a complete,
                            blockchain-powered AI ecosystem. With everything
                            from AI bots and data analytics to self-sovereign
                            identity management and extensive API access, our
                            platform covers all your AI and blockchain needs.
                            Backed by the $REAI governance token, Acrypto Cloud
                            is designed to offer decentralized, community-driven
                            solutions that keep you at the forefront of crypto
                            and blockchain innovation.
                          </p>
                          <NextLink href="/login" className="btn">
                            Buy Crypto
                          </NextLink>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollAnimation>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="area-bg">
        <section id="roadmap" className="roadmap-area pt-130 pb-130">
          <div className="container custom-container-two">
            <div className="row justify-content-center">
              <div className="col-xl-5 col-lg-8">
                <div className="section-title text-center mb-60">
                  <span className="sub-title">Our Roadmap</span>
                  <h2 className="title">
                    <span>Acrypto Cloud</span> Strategy and Real World AI Hub
                    <br /> Project Plan
                  </h2>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="bt-roadmap_x">
                  <div className="bt-roadmap-wrap">
                    <div className="bt-roadmap-item">
                      <span className="roadmap-title">End of Q4 2023</span>
                      <div className="roadmap-content">
                        <span className="dot"></span>
                        <h4 className="title">
                          Development and Initial Launch
                        </h4>
                        <span>
                          Finalize the development of core AI tools and
                          integrate them with the Real-World AI Hub platform.
                          Initiate the private beta testing phase.
                        </span>
                      </div>
                    </div>
                    <div className="bt-roadmap-item">
                      <span className="roadmap-title">Start of Q1 2024</span>
                      <div className="roadmap-content">
                        <span className="dot"></span>
                        <h4 className="title">
                          Launch the AcryptoCloud Exchange
                        </h4>
                        <span>
                          with support for cryptocurrency trading. Begin public
                          sale of $REAI tokens.
                        </span>
                      </div>
                    </div>
                    <div className="bt-roadmap-item">
                      <span className="roadmap-title">Mid of Q1 2024</span>
                      <div className="roadmap-content">
                        <span className="dot"></span>
                        <h4 className="title">Expand AcryptoCloud</h4>
                        <span>
                          include forex and futures trading. Launch the public
                          version of the Real-World AI Hub platform.
                        </span>
                      </div>
                    </div>
                    <div className="bt-roadmap-item">
                      <span className="roadmap-title">Mid of Q2 2024</span>
                      <div className="roadmap-content">
                        <span className="dot"></span>
                        <h4 className="title">
                          Introduce staking and governance features
                        </h4>
                        <span>
                          $REAI token holders. Initiate partnerships with key
                          industry players in AI and finance.
                        </span>
                      </div>
                    </div>
                    <div className="bt-roadmap-item">
                      <span className="roadmap-title">Mid of Q2 2024</span>
                      <div className="roadmap-content">
                        <span className="dot"></span>
                        <h4 className="title">Platform Expansion</h4>
                        <span>
                          Develop and integrate additional AI tools focused on
                          specialized sectors such as healthcare, finance, and
                          education.
                        </span>
                      </div>
                    </div>
                    <div className="bt-roadmap-item">
                      <span className="roadmap-title">Mid of Q3 2024</span>
                      <div className="roadmap-content">
                        <span className="dot"></span>
                        <h4 className="title">Launch mobile applications</h4>
                        <span>
                          both Real-World AI Hub and AcryptoCloud, enhancing
                          accessibility.
                        </span>
                      </div>
                    </div>
                    <div className="bt-roadmap-item">
                      <span className="roadmap-title">Mid of Q4 2024</span>
                      <div className="roadmap-content">
                        <span className="dot"></span>
                        <h4 className="title">
                          Expand marketing efforts globally
                        </h4>
                        <span>
                          targeting key markets in North America, Europe, and
                          Asia.
                        </span>
                      </div>
                    </div>
                    <div className="bt-roadmap-item">
                      <span className="roadmap-title">End of Q4 2024</span>
                      <div className="roadmap-content">
                        <span className="dot"></span>
                        <h4 className="title">
                          {" "}
                          Introduce decentralized finance (DeFi)
                        </h4>
                        <span>
                          features on AcryptoCloud, including yield farming,
                          lending, and borrowing services.
                        </span>
                      </div>
                    </div>
                    <div className="bt-roadmap-item">
                      <span className="roadmap-title">Start of Q1 2025</span>
                      <div className="roadmap-content">
                        <span className="dot"></span>
                        <h4 className="title">
                          Global Adoption and Innovation
                        </h4>
                        <span>
                          Expand the AI toolset to include industry-specific
                          solutions and advanced machine learning models.
                          Establish strategic partnerships with educational
                          institutions and government agencies.
                        </span>
                      </div>
                    </div>
                    <div className="bt-roadmap-item">
                      <span className="roadmap-title">Mid of Q1 2025</span>
                      <div className="roadmap-content">
                        <span className="dot"></span>
                        <h4 className="title">
                          Continue to evolve the platform
                        </h4>
                        <span>
                          based on user feedback, emerging technologies, and
                          market trends. Focus on scaling operations and
                          enhancing platform capabilities to serve a global user
                          base.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* <section className="document-area pt-60">
    <div className="container">
        <div class="row justify-content-center">
            <div class="col-lg-7 order-2 order-lg-0">
                <div class="document-img text-center wow fadeInUp" data-wow-delay=".2s">
                    <img src="/assetz/img/images/document_img.png" alt="">
                </div>
            </div>
            <div class="col-lg-5 col-md-7">
                <div class="document-content mt-50 wow fadeInRight" data-wow-delay=".2s">
                    <div class="section-title mb-35">
                        <span class="sub-title">Coming Soon</span>
                        <h2 class="title">Acrypto Cloud <span>Mobile</span> App</h2>
                    </div>
                    <div class="download-btn">
                        <a href="#"><img src="/assetz/img/images/download_btn01.png" alt=""></a>
                        <a href="#"><img src="/assetz/img/images/download_btn02.png" alt=""></a>
                    </div>
                    <a href="#" class="btn">Download App</a>
                </div>
            </div>
        </div>
    </div>
</section> */}
      </div>
      <section className="choose-area pb-130">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-6">
              <div className="section-title text-center mb-50">
                <span className="sub-title">
                  Everything AI and Blockchain in one place
                </span>
                <h2 className="title">Explore Our Full Range of Services</h2>
              </div>
            </div>
          </div>
          <div className="row choose-active">
            <div className="col-lg-3">
              <div className="choose-item">
                <div className="choose-icon">
                  <img src="/assetz/img/icon/choose_icon03.svg" alt="" />
                </div>
                <div className="choose-content">
                  <h2 className="title">
                    <NextLink href="#">Blockchain-Integrated AI Tools</NextLink>
                  </h2>
                  <p>
                    Our blockchain-enabled AI tools are designed to give you
                    data privacy,
                    <br />
                    security, and actionable insights:
                  </p>
                  <p>
                    <strong>DeFi and On-Chain Data Analytics:</strong> Access AI
                    tools that integrate directly
                    <br />
                    with blockchain data, giving you real-time DeFi protocol
                    insights,
                    <br />
                    NFT analytics, and more.
                  </p>
                  <p>
                    <strong>Smart Contract and Oracle Integration:</strong>{" "}
                    Build and deploy AI-powered
                    <br />
                    smart contracts and oracles to automate transactions and
                    bring
                    <br />
                    external data on-chain.
                  </p>
                  <p>
                    <strong>
                      Self-Sovereign Identity and Data Anonymization:
                    </strong>{" "}
                    Maintain control over
                    <br />
                    your identity and data privacy with blockchain-based
                    self-sovereign
                    <br />
                    identity and anonymization tools.
                  </p>
                  <p>
                    <strong>AI Model Monetization and Customization:</strong>{" "}
                    Developers can list and monetize
                    <br />
                    AI models, while users can access tools tailored to their
                    specific
                    <br />
                    crypto or AI needs.
                  </p>
                  <p>
                    <strong>$REAI-Enabled Payments and Royalties:</strong> Use
                    $REAI for seamless marketplace
                    <br />
                    transactions, creator royalties, and staking rewards.
                  </p>
                  <p>
                    <strong>Crowdsourced Innovation:</strong> Engage in
                    open-source and community-driven
                    <br />
                    AI development, where contributors earn rewards for their
                    work.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="choose-item">
                <div className="choose-icon">
                  <img src="/assetz/img/icon/choose_icon02.svg" alt="" />
                </div>
                <div className="choose-content">
                  <h2 className="title">
                    <NextLink href="#">Developer Tools and API Access</NextLink>
                  </h2>
                  <p>
                    Unlock the potential of Acrypto Cloud’s AI and trading
                    solutions with
                    <br />
                    extensive API access:
                  </p>
                  <p>
                    <strong>Open APIs for AI and Trading:</strong> Developers
                    can integrate Acrypto Cloud’s tools,
                    <br />
                    exchange functionalities, and trading solutions into their
                    own applications.
                  </p>
                  <p>
                    <strong>Sandbox Testing Environment:</strong> Experiment and
                    refine models with a secure
                    <br />
                    sandbox environment before deploying them live.
                  </p>
                  <p>
                    <strong>Extensive Documentation and Support:</strong> Our
                    comprehensive API documentation
                    <br />
                    and dedicated support make integration seamless and
                    developer-friendly.
                  </p>
                  <p>
                    <strong>Decentralized Data Storage:</strong> Secure,
                    decentralized storage keeps your
                    <br />
                    data safe and under your control.
                  </p>
                  <p>
                    <strong>Anonymization and User-Centric Privacy:</strong>{" "}
                    Control how your data is used
                    <br />
                    with advanced anonymization tools that protect your privacy
                    <br />
                    without compromising functionality.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="choose-item">
                <div className="choose-icon">
                  <img src="/assetz/img/icon/choose_icon02.svg" alt="" />
                </div>
                <div className="choose-content">
                  <h2 className="title">
                    <NextLink href="#">
                      Comprehensive AI Bots for Crypto, Trading, and More
                    </NextLink>
                  </h2>
                  <p>
                    Leverage our advanced AI bots across every platform for
                    real-time insights,
                    <br />
                    content generation, and market intelligence:
                  </p>
                  <p>
                    <strong>Market Analysis and Crypto Trading Bots:</strong>{" "}
                    Gain competitive insights
                    <br />
                    into the crypto market with real-time data, predictive
                    analysis, and
                    <br />
                    custom trading signals for spot, futures, and forex markets.
                  </p>
                  <p>
                    <strong>Multi-Platform Chatbots:</strong> Our AI bots
                    provide 24/7 assistance on
                    <br />
                    platforms like Telegram, Discord, and WhatsApp, giving you
                    personalized
                    <br />
                    updates and insights whenever you need them.
                  </p>
                  <p>
                    <strong>NFT and Creative Bots:</strong> Automate NFT
                    creation, analyze digital assets,
                    <br />
                    and generate custom content for social media, all with
                    AI-powered bots
                    <br />
                    tailored for the crypto community.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="choose-item">
                <div className="choose-icon">
                  <img src="/assetz/img/icon/choose_icon03.svg" alt="" />
                </div>
                <div className="choose-content">
                  <h2 className="title">
                    <NextLink href="#">Decentralized AI Marketplace</NextLink>
                  </h2>
                  <p>
                    Access an open marketplace for AI models, data, and services
                    with built-in
                    <br />
                    security and decentralization:
                  </p>
                  <p>
                    <strong>AI Model Monetization and Customization:</strong>{" "}
                    Developers can list and monetize
                    <br />
                    AI models, while users can access tools tailored to their
                    specific
                    <br />
                    crypto or AI needs.
                  </p>
                  <p>
                    <strong>$REAI-Enabled Payments and Royalties:</strong> Use
                    $REAI for seamless marketplace
                    <br />
                    transactions, creator royalties, and staking rewards.
                  </p>
                  <p>
                    <strong>Crowdsourced Innovation:</strong> Engage in
                    open-source and community-driven
                    <br />
                    AI development, where contributors earn rewards for their
                    work.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="choose-item">
                <div className="choose-icon">
                  <img src="/assetz/img/icon/choose_icon03.svg" alt="" />
                </div>
                <div className="choose-content">
                  <h2 className="title">
                    <NextLink href="#">
                      Advanced Trading Solutions for Crypto, Forex, Spot, and
                      Futures
                    </NextLink>
                  </h2>
                  <p>
                    Trade with confidence across a variety of markets with our
                    AI-enhanced
                    <br />
                    trading solutions:
                  </p>
                  <p>
                    <strong>Real-Time Market Insights:</strong> Get
                    up-to-the-second data and AI-powered
                    <br />
                    insights for spot, futures, and forex trading.
                  </p>
                  <p>
                    <strong>AI-Driven Risk Management:</strong> Manage market
                    volatility and risks with
                    <br />
                    AI algorithms tailored for different trading types.
                  </p>
                  <p>
                    <strong>Social and Copy Trading:</strong> Follow and
                    replicate the trades of
                    <br />
                    top-performing AI-managed portfolios, directly from your
                    dashboard.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="choose-item">
                <div className="choose-icon">
                  <img src="/assetz/img/icon/choose_icon01.svg" alt="" />
                </div>
                <div className="choose-content">
                  <h2 className="title">
                    <NextLink href="#">The $REAI Governance Token</NextLink>
                  </h2>
                  <p>
                    The <strong>$REAI</strong> token powers our entire
                    ecosystem, enabling community-driven governance and
                    rewarding active participation:
                  </p>
                  <p>
                    <strong>Governance and Voting:</strong> $REAI holders help
                    shape the platform’s future
                    <br />
                    by voting on new features, improvements, and marketplace
                    additions.
                  </p>
                  <p>
                    <strong>Staking and Rewards:</strong> Earn rewards by
                    staking $REAI,
                    <br />
                    supporting a thriving community of developers, creators, and
                    users.
                  </p>
                  <p>
                    <strong>Seamless Marketplace Payments:</strong> Use $REAI
                    for efficient,
                    <br />
                    secure payments and transactions across the decentralized
                    marketplace.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="choose-item">
                <div className="choose-icon">
                  <img src="/assetz/img/icon/choose_icon04.svg" alt="" />
                </div>
                <div className="choose-content">
                  <h2 className="title">
                    <NextLink href="#">
                      Data Privacy, Security, and Ownership
                    </NextLink>
                  </h2>
                  <p>
                    Data privacy and user sovereignty are at the heart of
                    Acrypto Cloud:
                  </p>
                  <p>
                    <strong>Decentralized Data Storage:</strong> Secure,
                    decentralized storage keeps your
                    <br />
                    data safe and under your control.
                  </p>
                  <p>
                    <strong>Anonymization and User-Centric Privacy:</strong>{" "}
                    Control how your data is used
                    <br />
                    with advanced anonymization tools that protect your privacy
                    <br />
                    without compromising functionality.
                  </p>
                </div>
              </div>
              <div className="slide-progress" role="progressbar">
                <span className="slider__label sr-only"></span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Main;
