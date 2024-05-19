import React, { useEffect } from "react";
import "../styles/Landing.css";
import { Hero, ProductElement } from "../components";
import { useLoaderData, useNavigate } from "react-router-dom";
import axios from "axios";

export const landingLoader = async () => {
  const response = await axios.get(
    `https://siwarafashion-server-59dda37c29fa.herokuapp.com/product/get_trending_products`
  );
  const data = response.data;
  console.log(response);

  console.log(data);
  return { products: data };
};

const Landing = () => {
  const { products } = useLoaderData();
  const navigate = useNavigate();

  return (
    <main>
      <Hero />

      <div className="selected-products">
        <h2 className="text-6xl text-center my-12 max-md:text-4xl text-accent-content">
          Trending Products
        </h2>
        <div className="selected-products-grid max-w-7xl mx-auto">
          {products.map((product) => (
            <ProductElement
                key={product._id}
                id={product._id}
                title={product.name}
                image={product.imageUrl}
                price={
                  product.discount < 1 ? (
                    <>
                      <span style={{ textDecoration: 'line-through' }}>
                        {product.price}
                      </span>
                      &nbsp;
                      <span>{(product.price * product.discount)}</span>
                    </>
                  ) : (
                    `${product.price}`
                  )
                }
              />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Landing;
