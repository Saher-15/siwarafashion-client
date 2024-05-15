import React from "react";
import { SectionTitle } from "../components";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div>
      <SectionTitle title="About Us" path="Home | About" />
      <div className="about-content text-center max-w-2xl mx-auto mt-5">
        <h2 className="text-6xl text-center mb-10 max-sm:text-3xl text-accent-content">We love our customers!</h2>
        <p className="text-lg text-left max-sm:text-sm max-sm:px-2 text-accent-content">
          Welcome to Siwarafashion, where style meets sophistication, and every woman finds her perfect fit.

          At Siwarafashion, we believe that fashion is not just about clothing; it's a statement of confidence, expression, and individuality. Founded by a team of passionate fashion enthusiasts, our store is dedicated to curating a diverse collection of apparel that empowers women to embrace their unique style.

          Our journey began with a simple vision: to create a shopping experience that celebrates every woman's beauty and authenticity. From trendy streetwear to timeless classics, our carefully selected pieces cater to a wide range of tastes, ensuring that there's something for everyone.

          But we're more than just a clothing store. We're a community of women who uplift and inspire each other through fashion. Whether you're a trendsetter, a minimalist, or somewhere in between, you'll find a warm and welcoming atmosphere at Siwarafashion.

          Quality is at the heart of everything we do. We partner with trusted suppliers and designers to bring you only the finest fabrics and craftsmanship. From luxurious silk blouses to cozy knitwear, each garment is meticulously crafted to exceed your expectations.

          At Siwarafashion, customer satisfaction is our top priority. Our knowledgeable and friendly staff are here to assist you every step of the way, whether you need help finding the perfect outfit or styling advice for a special occasion.

          We're committed to sustainability and ethical practices. We strive to minimize our environmental footprint by choosing eco-friendly materials and supporting ethical manufacturing processes. With every purchase you make, you're not just buying clothes – you're making a positive impact on the world.

          Thank you for choosing Siwarafashion as your go-to destination for all things fashion. We're honored to be a part of your style journey and look forward to helping you look and feel your best, every day.

          Happy shopping!

          Siwarafashion Team
        </p>

        {/* <Link to="/contact" className="btn btn-wide bg-blue-600 hover:bg-blue-500 text-white mt-5">Contact Us</Link> */}
      </div>
    </div>
  );
};

export default About;
