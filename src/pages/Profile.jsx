import React, { useState, useEffect } from "react";
import { SectionTitle } from "../components";
import { toast } from "react-toastify";
import axios from "axios"; // Import Axios

const Profile = () => {
  const [userFormData, setUserFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    street:""
  });

  useEffect(() => {
    // Retrieve user data from local storage
    const userData = localStorage.getItem("user_Data");

    if (userData) {
      const parsedUserData = JSON.parse(userData);
      setUserFormData({
        firstName: parsedUserData.firstName,
        lastName: parsedUserData.lastName,
        email: parsedUserData.email,
        phone: parsedUserData.phone,
        city: parsedUserData.city,
        street: parsedUserData.street,
      });
    } else {
      toast.error("User data not found in local storage");
    }
  }, []);

  const updateProfile = async (e) => {
    e.preventDefault();
    console.log(userFormData);
    try {
      // Make an HTTP request to update user profile
      const response = await axios.patch(`https://siwarafashion-server-59dda37c29fa.herokuapp.com/user/update_user_info/${localStorage.getItem("id")}`, userFormData);
      
      // Handle success
      toast.success("Profile updated successfully");
    } catch (error) {
      // Handle error
      toast.error("Failed to update profile");
    }
  };

  return (
    <>
      <SectionTitle title="User Profile" path="Home | User Profile" />
      <form className="max-w-7xl mx-auto text-center px-10" onSubmit={updateProfile}>
        <div className="grid grid-cols-3 max-lg:grid-cols-1">
          <div className="form-control w-full lg:max-w-xs">
            <label className="label">
              <span className="label-text">Your Name</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full lg:max-w-xs"
              value={userFormData.firstName}
              onChange={(e) => {setUserFormData({...userFormData, firstName: e.target.value})}}
            />
          </div>

          <div className="form-control w-full lg:max-w-xs">
            <label className="label">
              <span className="label-text">Your Lastname</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full lg:max-w-xs"
              value={userFormData.lastName}
              onChange={(e) => {setUserFormData({...userFormData, lastName: e.target.value})}}
            />
          </div>

          <div className="form-control w-full lg:max-w-xs">
            <label className="label">
              <span className="label-text">Your Email</span>
            </label>
            <input
              type="email"
              placeholder="Type here"
              className="input input-bordered w-full lg:max-w-xs"
              value={userFormData.email}
              // onChange={(e) => {setUserFormData({...userFormData, email: e.target.value})}}
            />
          </div>

          <div className="form-control w-full lg:max-w-xs">
            <label className="label">
              <span className="label-text">Your Phone</span>
            </label>
            <input
              type="tel"
              placeholder="Type here"
              className="input input-bordered w-full lg:max-w-xs"
              value={userFormData.phone}
              onChange={(e) => {setUserFormData({...userFormData, phone: e.target.value})}}
            />
          </div>

          <div className="form-control w-full lg:max-w-xs">
            <label className="label">
              <span className="label-text">Your City</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full lg:max-w-xs"
              value={userFormData.city}
              onChange={(e) => {setUserFormData({...userFormData, city: e.target.value})}}
            />
          </div>

          <div className="form-control w-full lg:max-w-xs">
            <label className="label">
              <span className="label-text">Your Street</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full lg:max-w-xs"
              value={userFormData.street}
              onChange={(e) => {setUserFormData({...userFormData, street: e.target.value})}}
            />
          </div>

          {/* <div className="form-control w-full lg:max-w-xs">
            <label className="label">
              <span className="label-text">Your Password</span>
            </label>
            <input
              type="password"
              placeholder="Type here"
              className="input input-bordered w-full lg:max-w-xs"
              value={userFormData.password}
              onChange={(e) => {setUserFormData({...userFormData, password: e.target.value})}}
            />
          </div> */}
        </div>
        <button
          className="btn btn-lg bg-blue-600 hover:bg-blue-500 text-white mt-10"
          type="submit"
        >
          Update Profile
        </button>
      </form>
    </>
  );
};

export default Profile;
