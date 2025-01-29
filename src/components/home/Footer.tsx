import Link from "next/link";
import React from "react";
import { animateScroll as scroll } from "react-scroll";
import ScrollAnimation from "react-animate-on-scroll";

const Footer = () => {
  const handleScrollToTop = () => {
    scroll.scrollToTop({
      duration: 1000, // Duration in ms
      smooth: "easeInOutQuad", // You can change the easing effect
    });
  };

  return (
    <footer>
      <div className="footer-area">
        <div className="container">
          <div className="footer-scroll-wrap">
            <button
              title="scroll to top"
              className="scroll-to-target"
              data-target="html"
              onClick={handleScrollToTop}
            >
              <i className="fas fa-arrow-up"></i>
            </button>
          </div>
          <div className="footer-top">
            <div className="row">
              <div className="col-xl-3 col-lg-4 col-md-6">
                <ScrollAnimation animateIn="fadeInUp">
                  <div
                    className="footer-widget wow fadeInUp logo"
                    data-wow-delay=".2s"
                  >
                    <Link href="/">
                      <img src="/assetz/img/logo/logo.png" alt="Logo" />
                    </Link>
                    <div className="footer-content">
                      <p>
                        Sign up today to access our full suite of AI bots,
                        trading tools, decentralized marketplace, and more.
                        Embrace the future of blockchain-powered intelligence
                        with Acrypto Cloud—the ultimate platform for AI and
                        crypto innovation.
                      </p>
                      <ul className="footer-social">
                        <li>
                          <Link href="/">
                            <i className="fab fa-youtube"></i>
                          </Link>
                        </li>
                        <li>
                          <Link href="/">
                            <i className="fab fa-twitter"></i>
                          </Link>
                        </li>
                        <li>
                          <Link href="/">
                            <i className="fab fa-facebook-f"></i>
                          </Link>
                        </li>
                        <li>
                          <Link href="/">
                            <i className="fab fa-skype"></i>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </ScrollAnimation>
              </div>
              <div className="col-xl-3 col-lg-5 col-sm-6">
                <ScrollAnimation animateIn="fadeInUp">
                  <div
                    className="footer-widget wow fadeInUp"
                    data-wow-delay=".4s"
                  >
                    <h4 className="fw-title">Useful Links</h4>
                    <div className="footer-link">
                      <ul>
                        <li>
                          <Link
                            href="https://realworldaihub.co.uk/public/acryptoclouditepaper.pdf"
                            target="_blank"
                          >
                            Litepaper
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="https://realworldaihub.co.uk/whitepaper.pdf"
                            target="_blank"
                          >
                            Whitepaper
                          </Link>
                        </li>
                        <li>
                          <Link href="/login">Login / Signup</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </ScrollAnimation>
              </div>
              <div className="col-xl-2 col-lg-3 col-sm-6">
                <ScrollAnimation animateIn="fadeInUp">
                  <div
                    className="footer-widget wow fadeInUp"
                    data-wow-delay=".6s"
                  >
                    <h4 className="fw-title">Features</h4>
                    <div className="footer-link">
                      <ul>
                        <li>
                          <Link href="#">Spot Trading</Link>
                        </li>
                        <li>
                          <Link href="#">Forex Trading</Link>
                        </li>
                        <li>
                          <Link href="#">Futures Trading</Link>
                        </li>
                        <li>
                          <Link href="#">AI Investments</Link>
                        </li>
                        <li>
                          <Link href="#">P2P Trading</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </ScrollAnimation>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6">
                <ScrollAnimation animateIn="fadeInUp">
                  <div
                    className="footer-widget wow fadeInUp"
                    data-wow-delay=".8s"
                  >
                    <h4 className="fw-title">Subscribe Newsletter</h4>
                    <div className="footer-newsletter">
                      <p>
                        Subscribe to our newsletter to receive latest news and
                        updates
                      </p>
                      <form action="#">
                        <input
                          type="email"
                          placeholder="support@acrypto.cloud"
                          required
                        />
                        <button type="submit">
                          <i className="fas fa-paper-plane"></i>
                        </button>
                      </form>
                    </div>
                  </div>
                </ScrollAnimation>
              </div>
            </div>
          </div>
          <div
            className="footer-bottom"
            style={{ fontSize: "12px", lineHeight: "1.5" }}
          >
            In acceding to or using the Platform and the Site, you represent and
            warrant that you are fully aware of the risks associated with the
            transactions involving Digital Assets or the use of Platform. You
            agree and understand that you are solely responsible for determining
            the nature, potential value, suitability, and appropriateness of
            these risks for yourself, and that the Company does not give advice
            or recommendations regarding any Digital Asset, including the
            suitability and appropriateness of, and investment strategies for,
            any Digital Asset. You agree and understand that you access and use
            the Platform and the Site at your own risk.
            <br />
            <span style={{ fontSize: "12px" }}>
              AcryptoCloud 2024 © All rights reserved
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
