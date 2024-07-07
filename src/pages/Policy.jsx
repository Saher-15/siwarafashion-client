// src/PrivacyPolicy.js
import React from 'react';
import '../styles/PrivatePolicy.css'; // Optional: Create a CSS file for styling

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-container">
      <h1>Privacy Policy</h1>
      <p>Last updated: [Date]</p>

      <section>
        <h2>Introduction</h2>
        <p>Welcome to [Your Company Name]. We value your privacy and are committed to protecting your personal data.</p>
      </section>

      <section>
        <h2>Information We Collect</h2>
        <p>We collect various types of information in connection with the services we provide, including:</p>
        <ul>
          <li>Personal Information (e.g., name, email address)</li>
          <li>Usage Data (e.g., pages visited, time spent on the site)</li>
        </ul>
      </section>

      <section>
        <h2>How We Use Your Information</h2>
        <p>We use the information we collect for various purposes, including:</p>
        <ul>
          <li>To provide and maintain our service</li>
          <li>To notify you about changes to our service</li>
          <li>To allow you to participate in interactive features of our service</li>
        </ul>
      </section>

      <section>
        <h2>Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us:</p>
        <ul>
          <li>By email: contact@example.com</li>
          <li>By visiting this page on our website: [Your Contact URL]</li>
        </ul>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
