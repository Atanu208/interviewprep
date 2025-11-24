import axiosInstance from "./axiosInstance";

const API_BASE = "/categories";

export const getAllCategories = async () => {
  const res = await axiosInstance.get(API_BASE);
  return res.data;
};

export const createCategory = async (name) => {
  const res = await axiosInstance.post(API_BASE, { name: name });
  return res.data;
};
