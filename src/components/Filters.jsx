import React, { useState } from "react";
import FormRange from "./FormRange";
import FormSelect from "./FormSelect";
import FormCheckbox from "./FormCheckbox";

const Filters = () => {
  const [selectCategoryList, setSelectCategoryList] = useState([
    "all",
    "Shoes",
    "slippers",
    "heels",
    "T-Shirt",
    "jackets",
    "caps",
    "shorts",
    "sweaters",
    "sneakers",
    "shirts",
    "boots",
    "overshirts",
    "Underwear",
    "Jeans",
    "Hoodie",
    "Belts",
    "Dress",
  ]);

  return (
    <form className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4  gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center">
      {/* Category */}
      <FormSelect
        label="select category"
        name="category"
        list={selectCategoryList}
        size="select-sm"
        defaultValue="all"
      />

      {/* Order */}
      <FormSelect
        label="sort by"
        name="order"
        list={["none", "high to low", "low to high"]}
        size="select-sm"
        defaultValue="a-z"
      />

      {/* Price */}
      <FormRange
        name="price"
        label="select price"
        size="range-sm"
        price={2000}
      />

      {/* In stock */}
      <FormCheckbox
        label="Only products in stock"
        name="stock"
        defaultChecked // This sets the default value to true
      />

      {/* Search */}
      {/* You can add a search component here if needed */}

      {/* Submit Button */}
      <button
        type="submit"
        className="btn bg-blue-600 hover:bg-blue-500 text-white btn-sm"
      >
        Search
      </button>
    </form>
  );
};

export default Filters;
