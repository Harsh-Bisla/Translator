import React from "react";
import "./About.css";

const About = () => {
  return (
    <section className="about-section">
      <h1>About</h1>
      <p>
        Welcome to our Translator — a powerful, user-friendly web app designed
        to seamlessly translate text between Hindi and English in both
        directions. Whether you're learning a new language, communicating across
        cultures, or just curious, this tool is built to make translation fast
        and accessible.
      </p>

      <h2>Features</h2>
      <ul>
        <li>
          🔁 Bidirectional Translation: Instantly convert text from Hindi to
          English and vice versa.
        </li>
        <li>
          🗣️Speak & Listen Functionality: Hear the translated text spoken aloud
          with native-like pronunciation.
        </li>
        <li>
          📋 Copy & Clear: Easily copy translated text or clear the fields with
          a single click.
        </li>
        <li>
          🌙 Dark Mode: Switch to a comfortable dark theme for night-time use or
          personal preference.
        </li>
        <li>
          🧠 Intelligent Language Handling: Ensures accurate results with simple
          and clean UI.
        </li>
      </ul>

      <h2>Customization</h2>
      <p>
        Switching between Light Mode and Dark Mode is super easy: Find the Mode
        Toggle Icon Look for the 🌞 or 🌙 icon (usually at the top-right corner
        of the page). Click the Icon If you're in Light Mode, clicking it will
        activate Dark Mode for a more eye-friendly experience. If you're in Dark
        Mode, clicking it again will bring back Light Mode. Enjoy Your Preferred
        Look Your selected mode stays active as you use the site, making it more
        comfortable for your eyes day or night.
      </p>

      <h2>Thank You</h2>
      <p>
        Thank you for choosing Translator as your text translator. We hope you
        enjoy using it as much as we enjoyed creating it.
      </p>
    </section>
  );
};

export default About;
