import React from "react";
import './Footer.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                {/* Logo & Description */}
                <div className="footer-about">
                    <h2>MyWebsite</h2>
                    <p>Building a better future, one step at a time.</p>
                </div>

                {/* Quick Links */}
                <div className="footer-links">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Services</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </div>

                {/* Social Media Icons */}
                <div className="footer-social">
                    <h3>Follow Us</h3>
                    <div className="social-icons">
                        <a href="#"><FontAwesomeIcon icon={faFacebook} /></a>
                        <a href="#"><FontAwesomeIcon icon={faTwitter} /></a>
                        <a href="#"><FontAwesomeIcon icon={faInstagram} /></a>
                        <a href="#"><FontAwesomeIcon icon={faLinkedin} /></a>
                    </div>
                </div>
            </div>

            {/* Copyright Section */}
            <div className="footer-bottom">
                <p>© {new Date().getFullYear()} MyWebsite. All Rights Reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
