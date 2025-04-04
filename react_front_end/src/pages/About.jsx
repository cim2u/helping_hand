import React from "react";
import { useNavigate } from "react-router-dom"; // Import navigation hook
import "../style/About.css";
import "../style/Logo.module.css";
import logo from "../assets/Logo.png"; // Ensure correct path
import helpinghand from "../assets/HELPINGHand.png"; // Ensure correct path

function About() {
  const navigate = useNavigate(); // Hook for navigation

  return (
    <div className="about-container">
      <div className="about-header">
        <div className="about-header-1"></div> {/* Background Layer */}

        {/* Logo Positioned on Top */}
        <div className="logo-container">
          <img src={logo} alt="HelpingHand Logo" className="logo" />
        </div>

        <nav className="nav-links">
          <a href="#">About</a>
          <a href="#">Support</a>
          <a href="#">Home</a>
        </nav>
      </div>

      <div className="about-content">
        <div className="text-section">
          <h1 className="welcome-text">Welcome to</h1>
          <img src={helpinghand} alt="HelpingHand!" className="helping-hand-icon" />

          <p>
            The ultimate student-powered marketplace where dreams meet deals!
            Designed exclusively for CDO students to sell their unique creations, pre-loved items, and innovative services, HelpingHand is your go-to platform for affordable, one-of-a-kind finds.
            Whether you're hunting for textbooks, handmade crafts, tech gadgets, or even tutoring sessions, our community connects you directly to talented students from CDO offering quality products at budget-friendly prices.
            For students, it’s the perfect space to turn your skills and unused items into cash while building entrepreneurial experience.
            Join HelpingHand today, where students thrive, and everyone scores amazing deals!
          </p>  {/* ✅ Fixed Closing Tag */}

          {/* Sign Up Button Navigates to SignUp Page */}
          <button className="signup-btn" onClick={() => navigate("/signup")}>
            SIGN UP
          </button>
        </div>

        {/* Image Sections */}
        <div className="image-section">
          <img
            src="https://s3-alpha-sig.figma.com/img/cddc/c69c/3f6f0a76202e9185950e2cc3030ddcf5?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=kjxOMWUN80t2rVIumnkecxzwLsr-ege4Pdssqp2ylLLyryEBQ6FCkK-EYu8hPgpX~zsB3St5pn3QbHvtdyMTovGHTaDyHkfqhTAwR0fDnnZt6bF4do6Sdk4RbbEymd9jYvn9cHJZr2z8NCj4UDlvPY4frYGJSeqjsqLVf-HWu20YWfYI80epiKANjvYPt9kJ0tRF1USum4wMSjBXxGgrZaJjpRaUpY9djLUFx7pP~FRIMONo4-Lb5cmqj9YGDSWEVq1ft3STthhualXDryXf3xgGLxAXK2q2h9RvnjckWR8xl3~BlsgiPEpIn22d2tRlHnBbuzs~Wmz7pcBj9U7I~g__"
            alt="Helping Hand"
            className="about-image"
          />
        </div>
        <div className="image-section-1">
          <img
            src="https://s3-alpha-sig.figma.com/img/cddc/c69c/3f6f0a76202e9185950e2cc3030ddcf5?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=kjxOMWUN80t2rVIumnkecxzwLsr-ege4Pdssqp2ylLLyryEBQ6FCkK-EYu8hPgpX~zsB3St5pn3QbHvtdyMTovGHTaDyHkfqhTAwR0fDnnZt6bF4do6Sdk4RbbEymd9jYvn9cHJZr2z8NCj4UDlvPY4frYGJSeqjsqLVf-HWu20YWfYI80epiKANjvYPt9kJ0tRF1USum4wMSjBXxGgrZaJjpRaUpY9djLUFx7pP~FRIMONo4-Lb5cmqj9YGDSWEVq1ft3STthhualXDryXf3xgGLxAXK2q2h9RvnjckWR8xl3~BlsgiPEpIn22d2tRlHnBbuzs~Wmz7pcBj9U7I~g__"
            alt="Helping Hand"
            className="about-image-1"
          />
        </div>
        <div className="image-section-2">
          <img
            src="https://s3-alpha-sig.figma.com/img/cddc/c69c/3f6f0a76202e9185950e2cc3030ddcf5?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=kjxOMWUN80t2rVIumnkecxzwLsr-ege4Pdssqp2ylLLyryEBQ6FCkK-EYu8hPgpX~zsB3St5pn3QbHvtdyMTovGHTaDyHkfqhTAwR0fDnnZt6bF4do6Sdk4RbbEymd9jYvn9cHJZr2z8NCj4UDlvPY4frYGJSeqjsqLVf-HWu20YWfYI80epiKANjvYPt9kJ0tRF1USum4wMSjBXxGgrZaJjpRaUpY9djLUFx7pP~FRIMONo4-Lb5cmqj9YGDSWEVq1ft3STthhualXDryXf3xgGLxAXK2q2h9RvnjckWR8xl3~BlsgiPEpIn22d2tRlHnBbuzs~Wmz7pcBj9U7I~g__"
            alt="Helping Hand"
            className="about-image-2"
          />
        </div>
      </div>
    </div>
  );
}

export default About;
