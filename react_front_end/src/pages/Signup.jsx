import React from "react";
import styles from "../style/Logo.module.css"; // Import CSS module
import logoImage from "../assets/Logo.png"; // Assuming the logo is an image
import "../style/SignUp.css";


const SignUp = () => {
  return (
    <div className="flex h-screen">
      {/* Left Panel - Signup Form */}
      <div className="relative w-full sm:w-1/3 bg-black bg-opacity-50 flex flex-col justify-center p-8 rounded-r-2xl">
        {/* Logo and Title */}
        <div className="flex justify-center mb-6">
          <img src={logoImage} alt="HelpingHand Logo" className={styles.logoLarge} />
        </div>
       
        <p className="text-white mt-4 text-center">
          Create a free account and join our growing community!
        </p>

        {/* Form */}
        <form className="mt-6 space-y-4">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <input
              type="text"
              placeholder="First Name"
              className="input-field w-full sm:w-1/2"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="input-field w-full sm:w-1/2"
            />
          </div>
          <input type="email" placeholder="Email" className="input-field" />
          <input type="text" placeholder="Username" className="input-field" />
          <input type="password" placeholder="Password" className="input-field" />
          <input type="password" placeholder="Confirm Password" className="input-field" />

          <button className="w-full bg-cyan-400 text-white py-2 rounded-lg hover:bg-cyan-500 transition">
            Submit
          </button>
        </form>

        <p className="text-white mt-4 text-sm text-center">
          Already have an account? <a href="#" className="text-cyan-300">Login</a>
        </p>

        <p className="text-gray-300 text-xs mt-4 text-center">
          By creating an account, you agree to HelpingHand's{" "}
          <a href="#" className="text-cyan-300">Terms of Service</a> and{" "}
          <a href="#" className="text-cyan-300">Privacy Policy</a>.
        </p>
      </div>

      {/* Right Panel - Background Image */}
      <div
        className="image-back"
        style={{
          backgroundImage: "url('https://s3-alpha-sig.figma.com/img/cddc/c69c/3f6f0a76202e9185950e2cc3030ddcf5?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=kjxOMWUN80t2rVIumnkecxzwLsr-ege4Pdssqp2ylLLyryEBQ6FCkK-EYu8hPgpX~zsB3St5pn3QbHvtdyMTovGHTaDyHkfqhTAwR0fDnnZt6bF4do6Sdk4RbbEymd9jYvn9cHJZr2z8NCj4UDlvPY4frYGJSeqjsqLVf-HWu20YWfYI80epiKANjvYPt9kJ0tRF1USum4wMSjBXxGgrZaJjpRaUpY9djLUFx7pP~FRIMONo4-Lb5cmqj9YGDSWEVq1ft3STthhualXDryXf3xgGLxAXK2q2h9RvnjckWR8xl3~BlsgiPEpIn22d2tRlHnBbuzs~Wmz7pcBj9U7I~g__')",
          height: "100vh",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="h-full w-full bg-black bg-opacity-30"></div>
      </div>
    </div>
  );
};

export default SignUp;

