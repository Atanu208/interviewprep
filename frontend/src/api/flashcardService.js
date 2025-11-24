import axiosInstance from "./axiosInstance";

const API_BASE = "/flashcards";

export const getAllFlashcards = async () => {
  const response = await axiosInstance.get(API_BASE);
  return response.data;
};

export const getFlashcardsByCategory = async (categoryId) => {
  const response = await axiosInstance.get(`${API_BASE}/category/${categoryId}`);
  return response.data;
};

export const createFlashcard = async (flashcard) => {
  const response = await axiosInstance.post(API_BASE, flashcard);
  return response.data;
};

export const updateFlashcard = async (id, flashcard) => {
  const response = await axiosInstance.put(`${API_BASE}/${id}`, flashcard);
  return response.data;
};

export const deleteFlashcard = async (id) => {
  const response = await axiosInstance.delete(`${API_BASE}/${id}`);
  return response.data;
};

export const getRandomFlashcard = async (categoryId) => {
  const res = await axiosInstance.get(`/flashcards/practice/random/${categoryId}`);
  return res.data;
};

export const markFlashcardKnown = async (id) => {
  const res = await axiosInstance.put(`/flashcards/practice/${id}/known`);
  return res.data;
};

export const markFlashcardWeak = async (id) => {
  const res = await axiosInstance.put(`/flashcards/practice/${id}/weak`);
  return res.data;
};

