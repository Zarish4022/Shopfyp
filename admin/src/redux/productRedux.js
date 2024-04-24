import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "user",
  initialState: {
    products: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //Get all data
    getProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products = action.payload;
    },
    getProductfailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //Delete all data
    deleteProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products.splice(
        state.products.findIndex((item) => item._id === action.payload),
        1
      );
    },
    deleteProductfailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE PRODUCT
    updateProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products[
        state.products.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.product;
    },
    updateProductfailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //Add PRODUCT
    addProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products.push(action.payload); //adds the new item in array
    },
    addProductfailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getProductStart,
  getProductSuccess,
  getProductfailure,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductfailure,
  updateProductStart,
  updateProductSuccess,
  updateProductfailure,
  addProductStart,
  addProductSuccess,
  addProductfailure,
} = productSlice.actions;
export default productSlice.reducer;
