import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa6";
import { TbBrandGoogleMaps } from "react-icons/tb";
import { useSelector } from "react-redux";

const Footer = () => {

  const handleClickInsta = () => {
    window.open('https://www.instagram.com/siwarafashion?igsh=bnpvOGo0aWkybHly', '_blank');
  };

  const handleClickMap = () => {
    window.open('https://l.instagram.com/?u=https%3A%2F%2Fmaps.google.com%2F%3Fq%3D32.699356%252C35.300732&e=AT15GcPA6PxvRnYeTXi1SDFBSCQWFlrPNcmPVBZI0eQnSf8cWuKqn4vFF6kOlmhClN5HAKxtIVuJ_jFFajpzfhG-QN3NFtOaZmF43YEqWq2wR4RDSLJkzA', '_blank');
  };

  const loginState = useSelector((state) => state.auth.isLoggedIn);

  return (
    <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded mt-10 max-md:px-0">
      <nav className="grid grid-flow-col max-sm:grid-flow-row gap-4">
        <Link to="/" className="link link-hover text-2xl max-md:text-xl text-accent-content" onClick={() => window.scrollTo(0, 0)}>
          Home
        </Link>
        <Link to="/shop?stock=true" className="link link-hover text-2xl max-md:text-xl text-accent-content">
          Shop
        </Link>
        <Link to="/about" className="link link-hover text-2xl max-md:text-xl text-accent-content" onClick={() => window.scrollTo(0, 0)}>
          About us
        </Link>
        {!loginState && (
          <>
            <Link
              to="/login"
              className="link link-hover text-2xl max-md:text-xl text-accent-content"
              onClick={() => window.scrollTo(0, 0)}
            >
              Login
            </Link>
            <Link
              to="/register"
              className="link link-hover text-2xl max-md:text-xl text-accent-content"
              onClick={() => window.scrollTo(0, 0)}
            >
              Register
            </Link>
          </>
        )}
      </nav>
      <nav>
        <div className="grid grid-flow-col gap-4">
          <FaInstagram className="text-6xl max-sm:text-4xl text-accent-content" onClick={handleClickInsta} />
          <TbBrandGoogleMaps className="text-6xl max-sm:text-4xl text-accent-content" onClick={handleClickMap} />
        </div>
      </nav>
      <aside>
        <p className="text-2xl max-sm:text-sm text-accent-content">
          Copyright © 2024 - All right reserved by SiwaraFashion
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
