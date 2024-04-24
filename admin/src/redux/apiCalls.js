import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { publicRequest, userRequest } from "../requestMethods";
import {
  addProductStart,
  addProductSuccess,
  addProductfailure,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductfailure,
  getProductStart,
  getProductSuccess,
  getProductfailure,
  updateProductStart,
  updateProductSuccess,
  updateProductfailure,
} from "./productRedux";
export const login = async (dispatch, user) => {
  //here this dispatch comes from useDisptch hook
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

//for product component in admin panel

export const getProducts = async (dispatch) => {
  //here this dispatch comes from useDisptch hook
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get("/products");
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductfailure());
  }
};
//for deleting product
export const deleteProduct = async (id, dispatch) => {
  //here this dispatch comes from useDisptch hook
  dispatch(deleteProductStart());
  try {
    const res = await userRequest.delete(`/products/${id}`);
    dispatch(deleteProductSuccess(id));
  } catch (err) {
    dispatch(deleteProductfailure());
  }
};

//update product
export const updateProduct = async (id, product, dispatch) => {
  //here this dispatch comes from useDisptch hook
  dispatch(updateProductStart());
  try {
    // const res = await userRequest.delete(`/products/${id}`);
    dispatch(updateProductSuccess({ id, product }));
  } catch (err) {
    dispatch(updateProductfailure());
  }
};

//add product
export const addProduct = async (product, dispatch) => {
  //here this dispatch comes from useDisptch hook
  dispatch(addProductStart());
  try {
    const res = await userRequest.post(`/products/`, product);
    dispatch(addProductSuccess(res.data));
  } catch (err) {
    dispatch(addProductfailure());
  }
};
