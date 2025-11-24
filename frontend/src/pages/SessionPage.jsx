import { useEffect, useState } from "react";
import axios from "../api/axiosInstance";

export default function SessionPage({ categoryId }) {
  const [flashcards, setFlashcards] = useState([]);
  const [answers, setAnswers] = useState({});
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    const startSession = async () => {
      const res = await axios.post("/sessions/start", { categoryId });
      setSessionId(res.data.id);

      const cards = await axios.get(`/flashcards/category/${categoryId}`);
      setFlashcards(cards.data.slice(0, 10)); // take 10 questions
    };
    startSession();
  }, [categoryId]);

  const handleSubmit = async () => {
    for (let card of flashcards) {
      await axios.post("/sessions/response", {
        sessionId,
        questionId: card.id,
        answerText: answers[card.id] || "",
      });
    }
    alert("Session completed!");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Interview Session</h1>
      {flashcards.map((fc) => (
        <div key={fc.id} className="bg-white p-4 mb-3 rounded shadow">
          <h2>{fc.question}</h2>
          <input
            type="text"
            placeholder="Your answer"
            className="border p-2 w-full mt-2"
            value={answers[fc.id] || ""}
            onChange={(e) => setAnswers({ ...answers, [fc.id]: e.target.value })}
          />
        </div>
      ))}
      <button onClick={handleSubmit} className="bg-green-500 text-white p-2 rounded">
        Submit Session
      </button>
    </div>
  );
}
