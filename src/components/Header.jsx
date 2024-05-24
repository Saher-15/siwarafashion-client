import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaHeadphones } from "react-icons/fa6";
import { FaRegEnvelope } from "react-icons/fa6";
import { HiMiniBars3BottomLeft } from "react-icons/hi2";
import { FaHeart } from "react-icons/fa6";
import { AiFillShopping } from "react-icons/ai";
import { FaSun } from "react-icons/fa6";
import { FaMoon } from "react-icons/fa6";
import { FaWindowClose } from "react-icons/fa";
import { FaRegClock } from 'react-icons/fa';
import { FaRegUser } from 'react-icons/fa';

import "../styles/Header.css";
import { useDispatch, useSelector } from "react-redux";
import { changeMode } from "../features/auth/authSlice";
import { store } from "../store";
import axios from "axios";

const Header = () => {
  // const { amount } = useSelector((state) => state.cart);
  const { total } = useSelector((state) => state.cart);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [id, setId] = useState(localStorage.getItem("id"));
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage menu open/close

  const loginState = useSelector((state) => state.auth.isLoggedIn);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle menu state
  };


  useEffect(() => {
    setIsLoggedIn(loginState);

    // fetchWishlist();

  }, [loginState]);

  const handleLogout = () => {
    // Clear local storage or any other logout operations
    localStorage.removeItem("id");
    localStorage.removeItem("user_Data");
    dispatch(logout());
  };

  return (
    <>
      <div className="topbar border-b border-gray-800">
        <ul>
          <li>
            <FaHeadphones className="text-2xl max-sm:text-lg text-accent-content" />
            <span className="text-2xl max-sm:text-lg text-accent-content">
              +972 528788695
            </span>
          </li>
          <li>
            <FaRegEnvelope className="text-2xl max-sm:text-lg text-accent-content" />{" "}
            <span className="text-2xl max-sm:text-lg text-accent-content">
              siwarastore@gmail.com
            </span>
          </li>
          <li>
            <FaRegClock className="text-2xl max-sm:text-lg text-accent-content" />

            <span className="text-2xl max-sm:text-lg text-accent-content">
              Monday-Saturday / 11:30-21:00
            </span>
          </li>

        </ul>
      </div>
      <div className="navbar bg-base-100 max-w-7xl mx-auto">
        <div className="flex-1">
          <Link
            to="/"
            className="btn btn-ghost normal-case text-2xl font-black text-accent-content"
          >
            <AiFillShopping />
            SiwaraFashion
          </Link>
        </div>
        <div className="flex-none">
          <button
            className="text-accent-content btn btn-ghost btn-circle text-xl"
            onClick={() => dispatch(changeMode())}
          >
            {darkMode ? <FaMoon /> : <FaSun />}
          </button>
          {isLoggedIn && (
            <Link
              to="/wishlist"
              className="btn btn-ghost btn-circle text-accent-content "
            >
              <FaHeart className="text-xl" />
            </Link>
          )}
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle" onClick={toggleMenu}>
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
            </label>
            {isMenuOpen && ( // Render menu content conditionally based on isMenuOpen state
              <div className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
                <div className="card-body">
                  <span className="text-info text-accent-content">
                    Subtotal: ₪{total.toFixed(2)}
                  </span>
                  <div className="card-actions">
                    <Link
                      to="/cart"
                      className="btn bg-blue-600 btn-block text-white hover:bg-blue-500 text-base-content"
                    >
                      View cart
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
          {isLoggedIn && (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div>
                  <FaRegUser className="text-2xl max-sm:text-lg text-accent-content" />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link
                    to="/user-profile"
                    className="justify-between text-accent-content"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to="/order-history" className="text-accent-content">
                    Order history
                  </Link>
                </li>
                <li>
                  <Link to="/" onClick={handleLogout} className="text-accent-content">
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>

      <div className="container text-2xl navlinks-container">
        <NavLink className="text-accent-content" to="/">
          Home
        </NavLink>
        <NavLink className="text-accent-content" to="/shop?stock=true">
          Shop
        </NavLink>
        <NavLink className="text-accent-content" to="/about-us">
          About us
        </NavLink>
        {/* <NavLink className="text-accent-content" to="/contact">
            Contact
          </NavLink> */}
        {!isLoggedIn && (
          <>
            <NavLink className="text-accent-content" to="/login">
              Login
            </NavLink>
            <NavLink className="text-accent-content" to="/register">
              Register
            </NavLink>
          </>
        )}
      </div>
    </div >
    </>
  );
};

export default Header;
