import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useParams, Link } from "react-router-dom";

export default function ViewFlashcard() {
  const { id } = useParams();
  const [card, setCard] = useState(null);

  useEffect(() => {
    axios.get(`/flashcards/${id}`).then((res) => setCard(res.data));
  }, []);

  if (!card) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-xl font-bold">{card.question}</h1>
      <p className="mt-4 text-gray-700">{card.answer}</p>

      <Link
        to="/flashcards"
        className="block mt-6 text-blue-600"
      >
        Back
      </Link>
    </div>
  );
}
