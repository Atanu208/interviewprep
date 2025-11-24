import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getFlashcardsByCategory,
  createFlashcard,
  updateFlashcard,
  deleteFlashcard
} from "../api/flashcardService";
import FlashcardForm from "../components/FlashcardForm";

export default function FlashcardPage() {
  const { categoryId } = useParams();
  const [flashcards, setFlashcards] = useState([]);
  const [editing, setEditing] = useState(null);

  const fetchFlashcards = async () => {
    const data = await getFlashcardsByCategory(categoryId);
    setFlashcards(data);
  };

  useEffect(() => {
    fetchFlashcards();
  }, [categoryId]);

  const handleAdd = async (data) => {
    await createFlashcard({ ...data, category: { id: categoryId } });
    fetchFlashcards();
  };

  const handleUpdate = async (id, data) => {
    await updateFlashcard(id, { ...data, category: { id: categoryId } });
    setEditing(null);
    fetchFlashcards();
  };

  const handleDelete = async (id) => {
    await deleteFlashcard(id);
    fetchFlashcards();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-5xl px-4 py-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Flashcards</h1>

        <FlashcardForm
          onSubmit={editing ? (data) => handleUpdate(editing.id, data) : handleAdd}
          initialData={editing}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {flashcards.map((fc) => (
            <div key={fc.id} className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition-shadow">
              <h2 className="font-bold text-gray-900">{fc.question}</h2>
              <p className="text-gray-700 mt-2">{fc.answer}</p>
              <span className="text-sm text-gray-500 mt-2 block">
                Difficulty: {fc.difficulty}
              </span>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => setEditing(fc)}
                  className="bg-yellow-400 hover:bg-yellow-500 px-3 py-1 rounded text-white"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(fc.id)}
                  className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
