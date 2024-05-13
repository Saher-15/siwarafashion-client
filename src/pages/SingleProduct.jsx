import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  QuantityInput,
  SectionTitle,
  SelectSize,
} from "../components";
import { FaHeart } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6";
import { Link, useLoaderData } from "react-router-dom";
import parse from "html-react-parser";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import {
  updateWishlist,
  removeFromWishlist,
} from "../features/wishlist/wishlistSlice";
import { toast } from "react-toastify";
import { store } from "../store";

export const singleProductLoader = async ({ params }) => {
  const { id } = params;
  const response = await axios(`https://siwarafashion-server-59dda37c29fa.herokuapp.com/product/getProduct/${id}`);
  return { productData: response.data };
};

const SingleProduct = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(0);
  const { wishItems } = useSelector((state) => state.wishlist);
  const { userId } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.auth.isLoggedIn);
  const { productData } = useLoaderData();

  useEffect(() => {
    // Check if the product is in the wishlist when component mounts
    isProductInWishlist();
  }, []);

  async function isProductInWishlist() {
    try {
      const getResponse = await axios.get(
        `https://siwarafashion-server-59dda37c29fa.herokuapp.com/user/get_wishlist/${localStorage.getItem("id")}`
      );
      const data = getResponse.data;
      console.log(getResponse);
      
      // Check if the product is in the wishlist
      const isInWishlist = data.findIndex((item) => item.id === productData?._id) !== -1;
      setProduct({
        ...product,
        isInWishList: isInWishlist
      });
    } catch (error) {
      console.error(error);
    }
  }

  const [product, setProduct] = useState({
    id: productData?._id,
    name: productData?.name,
    imageUrl: productData?.imageUrl,
    price: productData?.price,
    selectedSize: size || productData?.availableSizes[0],
    isInWishList: false
  });

  const addToWishlistHandler = async () => {
    try {
      // If product is not in wishlist, add it
      if (!product.isInWishList) {
        const response = await axios.patch(
          `https://siwarafashion-server-59dda37c29fa.herokuapp.com/user/add_to_wishlist/${localStorage.getItem("id")}`,
          product
        );
        toast.success("Product added to the wishlist!");
        setProduct({
          ...product,
          isInWishList: true
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const removeFromWishlistHandler = async () => {
    try {
      // If product is in wishlist, remove it
      if (product.isInWishList) {
        const response = await axios.patch(
          `https://siwarafashion-server-59dda37c29fa.herokuapp.com/user/remove_from_wishlist/${localStorage.getItem("id")}`,
          product
        );
        toast.success("Product removed from the wishlist!");
        setProduct({
          ...product,
          isInWishList: false
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <SectionTitle title="Product page" path="Home | Shop | Product page" />
      <div className="grid grid-cols-2 max-w-7xl mx-auto mt-5 max-lg:grid-cols-1 max-lg:mx-5">
        <div className="product-images flex flex-col justify-center max-lg:justify-start">
          <img
            src={`${productData?.additionalImageUrls[currentImage]}`}
            className="w-96 text-center border border-gray-600 cursor-pointer"
            alt={productData.name}
          />
          <div className="other-product-images mt-1 grid grid-cols-3 w-96 gap-y-1 gap-x-2 max-sm:grid-cols-2 max-sm:w-64">
            {productData?.additionalImageUrls.map((imageObj, index) => (
              <img
                src={`${imageObj}`}
                key={nanoid()}
                onClick={() => setCurrentImage(index)}
                alt={productData.name}
                className="w-32 border border-gray-600 cursor-pointer"
              />
            ))}
          </div>
        </div>
        <div className="single-product-content flex flex-col gap-y-5 max-lg:mt-2">
          <h2 className="text-5xl max-sm:text-3xl text-accent-content">
            {productData?.name}
          </h2>
          <p className="text-3xl text-error">
            ₪{productData?.price}
          </p>
          <div className="text-xl max-sm:text-lg text-accent-content">
            {parse(productData?.description)}
          </div>
          <div className="text-2xl">
            <SelectSize
              sizeList={productData?.availableSizes}
              size={size}
              setSize={setSize}
            />
          </div>
          <div className="flex flex-row gap-x-2 max-sm:flex-col max-sm:gap-x">
            <button
              className="btn bg-blue-600 hover:bg-blue-500 text-white"
              onClick={() => {
                if (loginState) {
                  dispatch(addToCart(product));
                } else {
                  toast.error(
                    "You must be logged in to add products to the cart"
                  );
                }
              }}
            >
              <FaCartShopping className="text-xl mr-1" />
              Add to cart
            </button>

            {product?.isInWishList ? (
              <button
                className="btn bg-blue-600 hover:bg-blue-500 text-white"
                onClick={() => {
                  if (loginState) {
                    removeFromWishlistHandler(product);
                  } else {
                    toast.error(
                      "You must be logged in to remove products from the wishlist"
                    );
                  }
                }}
              >
                <FaHeart className="text-xl mr-1" />
                Remove from wishlist
              </button>
            ) : (
              <button
                className="btn bg-blue-600 hover:bg-blue-500 text-white"
                onClick={() => {
                  if (loginState) {
                    addToWishlistHandler(product);
                  } else {
                    toast.error(
                      "You must be logged in to add products to the wishlist"
                    );
                  }
                }}
              >
                <FaHeart className="text-xl mr-1" />
                Add to wishlist
              </button>
            )}
          </div>
          <div className="other-product-info flex flex-col gap-x-2">
            <div
              className={
                productData?.isInStock
                  ? "badge bg-gray-700 badge-lg font-bold text-white p-5 mt-2"
                  : "badge bg-gray-700 badge-lg font-bold text-white p-5 mt-2"
              }
            >
              In Stock: {productData?.isInStock ? "Yes" : "No"}
            </div>
            
            <div className="badge bg-gray-700 badge-lg font-bold text-white p-5 mt-2">
              Category: {productData?.category}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
