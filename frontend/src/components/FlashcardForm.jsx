import { useState } from "react";

export default function FlashcardForm({ onSubmit, initialData }) {
  const [question, setQuestion] = useState(initialData?.question || "");
  const [answer, setAnswer] = useState(initialData?.answer || "");
  const [difficulty, setDifficulty] = useState(initialData?.difficulty || "EASY");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ question, answer, difficulty });
    setQuestion("");
    setAnswer("");
    setDifficulty("EASY");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-4">
      <input
        type="text"
        placeholder="Question"
        className="border p-2 mb-2 w-full"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        required
      />
      <textarea
        placeholder="Answer"
        className="border p-2 mb-2 w-full"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        required
      />
      <select
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
        className="border p-2 mb-2 w-full"
      >
        <option value="EASY">EASY</option>
        <option value="MEDIUM">MEDIUM</option>
        <option value="HARD">HARD</option>
      </select>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
        {initialData ? "Update" : "Add"} Flashcard
      </button>
    </form>
  );
}
