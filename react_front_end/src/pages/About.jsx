import React from "react";
import "../style/About.css";

export default function About() {
    return (
        <>
            <main>
                <section className="hh-a-content">
                    <h1>
                        <span className="hh-welcome">Welcome to </span>
                        <span className="hh-helpinghand">HelpingHand!</span>
                    </h1>
                    <div className="hh-box">
                        <p className="hh-intro">
                            The ultimate student-powered marketplace where dreams meet deals! Designed exclusively for CDO students to sell their unique creations, pre-loved items, and innovative services, HelpingHand is your go-to platform for affordable, one-of-a-kind finds. 
                            Whether you're hunting for textbooks, handmade crafts, tech gadgets, or even tutoring sessions, our community connects you directly to talented students from CDO offering quality products at budget-friendly prices. For students, it’s the perfect space to turn your skills and unused items into cash while building entrepreneurial experience.                     
                            Join HelpingHand today, where students thrive, and everyone scores amazing deals!
                        </p>
                    </div>
                </section>
            </main>
        </>
    );
}

