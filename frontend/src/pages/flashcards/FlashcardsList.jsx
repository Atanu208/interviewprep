import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { Link } from "react-router-dom";

export default function FlashcardsList() {
  const [flashcards, setFlashcards] = useState([]);

  const loadFlashcards = async () => {
    const res = await axios.get("/flashcards");
    setFlashcards(res.data);
  };

  const deleteCard = async (id) => {
    if (!confirm("Delete this flashcard?")) return;

    await axios.delete(`/flashcards/${id}`);
    loadFlashcards();
  };

  useEffect(() => {
    loadFlashcards();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Flashcards</h1>
        <Link
          to="/flashcards/add"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Add Flashcard
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {flashcards.map((card) => (
          <div
            key={card.id}
            className="border p-4 rounded-lg shadow bg-white"
          >
            <h2 className="font-bold text-xl">{card.question}</h2>
            <p className="mt-2 text-gray-600">{card.answer}</p>

            <div className="flex gap-3 mt-4">
              <Link
                to={`/flashcards/view/${card.id}`}
                className="text-blue-600"
              >
                View
              </Link>
              <Link
                to={`/flashcards/edit/${card.id}`}
                className="text-green-600"
              >
                Edit
              </Link>
              <button
                onClick={() => deleteCard(card.id)}
                className="text-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
