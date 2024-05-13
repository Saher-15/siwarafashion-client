/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  Filters,
  Pagination,
  ProductElement,
  SectionTitle,
} from "../components";
import "../styles/Shop.css";
import axios from "axios";
import { useLoaderData, useNavigate, useSearchParams } from "react-router-dom";
import { nanoid } from "nanoid";

export const shopLoader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  // /posts?title=json-server&author=typicode
  // GET /posts?_sort=views&_order=asc
  // GET /posts/1/comments?_sort=votes&_order=asc

  const filterObj = {
    category: params.category ?? "all",
    order: params.order ?? "",
    price: params.price ?? "all",
    search: params.search ?? "",
    in_stock: params.stock === undefined ? false : true,
    current_page: Number(params.page) || 1
  };
  const itemsPerPage = 12;

  // set params in get apis
  let parameter = (`?_start=${(filterObj.current_page - 1) * 12}&_limit=12`) + // pre defined that limit of response is 12 & page number count 1
    (filterObj.category !== 'all' ? `&category=${filterObj.category}` : "") +
    ((filterObj.search != '') ? `&q=${encodeURIComponent(filterObj.search)}` : ``) +
    (filterObj.order ? `&_sort=price.current.value` : "") + // Check if the order exists, then sort it in ascending order. After that, the API response will be modified if descending order or any other filter is selected.
    (filterObj.in_stock ? (`&isInStock`) : '') +
    (filterObj.price !== 'all' ? `&price.current.value_lte=${filterObj.price}` : ``) 
  try {
    const response = await axios(
      `https://siwarafashion-server-59dda37c29fa.herokuapp.com/product/getNProducts?page=${filterObj.current_page}&size=${itemsPerPage}`

    );
    let data = response.data.data;
console.log(data);
    // sorting in descending order
    if (filterObj.order && !(filterObj.order === "none" || filterObj.order === "price low")) data.sort((a, b) => b.price - a.price)
    return { productsData: data, productsLength: data.length, page: filterObj.current_page };
  } catch (error) {
    console.log(error.response);
  }
  // /posts?views_gte=10

  return null;
};




const Shop = () => {

  const productLoaderData = useLoaderData();


  return (
    <>
      <SectionTitle title="Shop" path="Home | Shop" />
      <div className="max-w-7xl mx-auto mt-5">
        <Filters />
        {productLoaderData.productsData.length === 0 && <h2 className="text-accent-content text-center text-4xl my-10">No products found for this filter</h2>}
        <div className="grid grid-cols-4 px-2 gap-y-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 shop-products-grid">
          {productLoaderData.productsData.length !== 0 &&
            productLoaderData.productsData.map((product) => (
              <ProductElement
                key={product._id}
                id={product._id}
                title={product.name}
                image={product.imageUrl}
                price={product.price}
              />
            ))}
        </div>
      </div>

      <Pagination />
    </>
  );
};

export default Shop;
