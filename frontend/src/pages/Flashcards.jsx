import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axiosInstance";

export default function FlashcardPage() {
  const { categoryId } = useParams();
  const [flashcards, setFlashcards] = useState([]);

  useEffect(() => {
    const fetchFlashcards = async () => {
      const res = await axios.get(`/flashcards/category/${categoryId}`);
      setFlashcards(res.data);
    };
    fetchFlashcards();
  }, [categoryId]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Flashcards</h1>
      {flashcards.map((fc) => (
        <div key={fc.id} className="bg-white p-4 mb-3 rounded shadow">
          <h2 className="font-bold">{fc.question}</h2>
          <p className="mt-2">{fc.answer}</p>
          <span className="text-sm text-gray-500">Difficulty: {fc.difficulty}</span>
        </div>
      ))}
    </div>
  );
}
