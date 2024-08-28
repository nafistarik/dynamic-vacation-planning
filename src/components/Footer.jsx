import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>
          &copy; {new Date().getFullYear()} HolidayHorizon. All rights reserved.
        </p>
        <p>
          Contact us at:{" "}
          <a href="mailto:contact@holidayhorizon.com">
            contact@holidayhorizon.com
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
