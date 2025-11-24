import { useEffect, useState } from "react";
import { getAllFlashcards } from "../api/flashcardService";

export default function FlashcardsPage() {
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFlashcards() {
      try {
        const data = await getAllFlashcards();
        setFlashcards(data);
      } catch (err) {
        console.error("Error loading flashcards:", err);
      } finally {
        setLoading(false);
      }
    }
    loadFlashcards();
  }, []);

  if (loading)
    return <p className="text-center mt-10 text-gray-600">Loading flashcards...</p>;

  // function for difficulty colors
  const difficultyColor = {
    EASY: "bg-green-500",
    MEDIUM: "bg-yellow-500",
    HARD: "bg-red-500",
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-7xl px-4 py-6">
        <h1 className="text-4xl font-extrabold mb-8 text-gray-800 text-center">
          All Flashcards
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {flashcards.map((card) => (
            <div
              key={card.id}
              className="
                p-6 
                rounded-2xl 
                shadow-lg 
                bg-gradient-to-br 
                from-blue-500 
                to-purple-600 
                text-white 
                transition-transform 
                hover:scale-105 
                hover:shadow-2xl 
              "
            >
              <h2 className="text-xl font-bold mb-2">{card.question}</h2>

              <p className="opacity-90 mb-4">{card.answer}</p>

              <div className="mt-4 flex flex-col gap-2">
                <span className="text-sm bg-black/20 px-2 py-1 rounded-md inline-block">
                  Category: {card.category?.name || "N/A"}
                </span>

                <span
                  className={`text-sm px-2 py-1 rounded-md inline-block text-white ${difficultyColor[card.difficulty]}`}
                >
                  Difficulty: {card.difficulty}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
