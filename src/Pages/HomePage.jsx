import { Link } from "react-router-dom";
import { ReactTyped } from "react-typed";
import CountUp from "react-countup";
import HomePageImage from "../assets/Images/homePageMainImage.png";

import "./HomePage.css";

function HomePage() {
  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-container">
          <h2 className="logo">FuseLab</h2>
          <ul className="nav-links">
            <li><a href="#hero">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#stats">Stats</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="hero">
        <div className="hero-left">
          <h1>
            Welcome to{" "}
            <span className="highlight">
              <ReactTyped
                strings={["FuseLab", "Innovation", "Technology", "Future Ready"]}
                typeSpeed={100}
                backSpeed={50}
                loop
              />
            </span>
            <br />
            Empowering Businesses with Technology
          </h1>
          <p>
            We deliver cutting-edge software solutions, tailored to your
            business needs, with a focus on quality and innovation.
          </p>
          <div className="hero-buttons">
            <a href="#projects" >
              <button className="btn-primary">Explore Projects</button>
            </a>
            <a href="#contact">
              <button className="btn-outline">Contact Us</button>
            </a>
          </div>
        </div>
        <div className="hero-right">
          <img src={HomePageImage} alt="homepage illustration" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <h2>About Us</h2>
        <p>
          At FuseLab, we specialize in delivering innovative and scalable
          solutions. Our mission is to empower businesses with the latest
          technology, ensuring growth and success in the digital era.
        </p>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects">
        <h2>Our Projects</h2>
        <div className="projects-marquee">
          <div className="projects-track">
            <div className="card"><h3>Project A</h3><p>AI-powered platform transforming customer experience.</p></div>
            <div className="card"><h3>Project B</h3><p>Fintech solution handling secure transactions seamlessly.</p></div>
            <div className="card"><h3>Project C</h3><p>Cloud-native system enabling businesses to scale fast.</p></div>
            <div className="card"><h3>Project D</h3><p>E-commerce platform with smart recommendation engine.</p></div>
            <div className="card"><h3>Project E</h3><p>EdTech LMS with video streaming & AI assessments.</p></div>
            <div className="card"><h3>Project F</h3><p>IoT-based smart monitoring system for industries.</p></div>
            <div className="card"><h3>Project G</h3><p>Healthcare app with telemedicine & AI diagnostics.</p></div>
            {/* Repeat projects to enable infinite scrolling */}
            <div className="card"><h3>Project A</h3><p>AI-powered platform transforming customer experience.</p></div>
            <div className="card"><h3>Project B</h3><p>Fintech solution handling secure transactions seamlessly.</p></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="stats">
        <div className="stats-items">
          <div>
            <CountUp end={120} duration={5} suffix="+" />
            <p>Projects Delivered</p>
          </div>
          <div>
            <CountUp end={50} duration={5} suffix="+" />
            <p>Happy Clients</p>
          </div>
          <div>
            <CountUp end={10} duration={5} suffix="+" />
            <p>Countries Served</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <h2>Contact Us</h2>
        <form className="contact-form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" rows="5" required></textarea>
          <button type="submit" className="btn-primary">Send Message</button>
        </form>
      </section>

      {/* Footer */}
      <footer id="footer" className="footer">
        <p>© {new Date().getFullYear()} FuseLab. All Rights Reserved.</p>
      </footer>
    </>
  );
}

export default HomePage;
