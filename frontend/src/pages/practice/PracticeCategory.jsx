import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function PracticeCategory() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Failed to load categories:", err));
  }, []);

  if (categories.length === 0)
    return <p className="p-6">No categories found.</p>;

  // Optional gradient colors
  const gradients = [
    "from-blue-500 to-purple-600",
    "from-green-500 to-emerald-600",
    "from-orange-500 to-red-600",
    "from-pink-500 to-fuchsia-600",
    "from-cyan-500 to-blue-600",
    "from-indigo-500 to-purple-700",
  ];

  return (
    <div className="p-6">
      <h2 className="text-3xl font-extrabold mb-6 text-gray-800 text-center">
        Choose Category
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((c, index) => (
          <button
            key={c.id}
            onClick={() => navigate(`/practice/questions/${c.id}`)}
            className={`
              p-6 
              rounded-xl 
              shadow-lg 
              text-white 
              font-semibold 
              bg-gradient-to-br
              ${gradients[index % gradients.length]}
              transform 
              transition-all 
              hover:scale-105 
              hover:shadow-2xl 
            `}
          >
            <div className="text-lg">{c.name}</div>
            <div className="text-sm opacity-80 mt-2">Start practicing →</div>
          </button>
        ))}
      </div>
    </div>
  );
}
