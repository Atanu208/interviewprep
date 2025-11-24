import { useState, useEffect } from "react";
import axios from "../../api/axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditFlashcard() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get(`/flashcards/${id}`).then((res) => {
      setQuestion(res.data.question);
      setAnswer(res.data.answer);
      setCategoryId(res.data.category.id);
    });
    axios.get("/categories").then((res) => setCategories(res.data));
  }, []);

  const updateCard = async (e) => {
    e.preventDefault();
    await axios.put(`/flashcards/${id}`, { question, answer, categoryId });
    navigate("/flashcards");
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-4">Edit Flashcard</h1>

      <form className="space-y-4" onSubmit={updateCard}>
        <input
          className="w-full p-2 border rounded"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <input
          className="w-full p-2 border rounded"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />

        <select
          className="w-full p-2 border rounded"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Update
        </button>
      </form>
    </div>
  );
}
