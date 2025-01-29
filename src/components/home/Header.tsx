import NextLink from "next/link";
import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";

const Header: React.FC = () => {
  const [isSticky, setIsSticky] = useState(false);

  const handleScroll = () => {
    const scroll = window.scrollY;
    if (scroll < 245) {
      setIsSticky(false);
    } else {
      setIsSticky(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header id="header">
      <div id="header-fixed-height"></div>
      <div className="container custom-container">
        <div className="row">
          <div className="col-12">
            {/* Mobile Navigation Toggler */}
            <div className="mobile-nav-toggler">
              <i className="fas fa-bars"></i>
            </div>

            {/* Main Menu */}
            <div className="menu-wrap">
              <nav className="menu-nav">
                {/* Logo */}
                <div className="logo">
                  <NextLink href="/">
                    <img src="/assetz/img/logo/logo.png" alt="Logo" />
                  </NextLink>
                </div>

                {/* Navbar Links */}
                <div className="navbar-wrap main-menu d-none d-lg-flex">
                  <ul className="navigation">
                    <li
                      style={{ cursor: "pointer", }}
                      className="active menu-item-has-children"
                    >
                      <Link to="header" smooth={true} duration={1000}>
                        Home
                      </Link>
                    </li>
                    <li style={{ cursor: "pointer", color:"#fff" }}>
                      <Link to="about" smooth={true} duration={1000}>
                        About us
                      </Link>
                    </li>
                    <li style={{ cursor: "pointer",color:"#fff" }}>
                      <Link to="sales" smooth={true} duration={1000}>
                        Sales
                      </Link>
                    </li>
                    <li style={{ cursor: "pointer", color:"#fff" }}>
                      <Link to="contact" smooth={true} duration={1000}>
                        Contact us
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Header Action */}
                <div className="header-action d-none d-md-block">
                  <ul>
                    <li className="header-btn">
                      <div className="new-header-div">
                        <NextLink href="/login" className="btn">
                          TRADE NOW
                        </NextLink>
                      </div>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>

            {/* Mobile Menu */}
            <div className="mobile-menu">
              <nav className="menu-box">
                <div className="close-btn">
                  <i className="fas fa-times"></i>
                </div>

                {/* Mobile Logo */}
                <div className="nav-logo">
                  <NextLink href="/">
                    <img
                      src="/assetz/img/logo/logo.png"
                      alt="Logo"
                      title="Logo"
                    />
                  </NextLink>
                </div>

                {/* Social Links */}
                <div className="social-links">
                  <ul className="clearfix">
                    <li>
                      <NextLink href="#">
                        <i className="fab fa-facebook-f"></i>
                      </NextLink>
                    </li>
                    <li>
                      <NextLink href="#">
                        <i className="fab fa-twitter"></i>
                      </NextLink>
                    </li>
                    <li>
                      <NextLink href="#">
                        <i className="fab fa-instagram"></i>
                      </NextLink>
                    </li>
                    <li>
                      <NextLink href="#">
                        <i className="fab fa-linkedin-in"></i>
                      </NextLink>
                    </li>
                    <li>
                      <NextLink href="#">
                        <i className="fab fa-youtube"></i>
                      </NextLink>
                    </li>
                  </ul>
                  <br />
                  <br />
                  <NextLink href="/login" className="btn">
                    TRADE NOW
                  </NextLink>
                </div>
              </nav>
            </div>

            {/* Mobile Menu Backdrop */}
            <div className="menu-backdrop"></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
