import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllCategories, createCategory } from "../api/categoryService";

export default function Dashboard() {
const navigate = useNavigate();
const [categories, setCategories] = useState([]);
const [newCategory, setNewCategory] = useState("");

useEffect(() => {
const token = localStorage.getItem("token");
if (!token) {
navigate("/login");
} else {
fetchCategories();
}
}, [navigate]);

const fetchCategories = async () => {
try {
const data = await getAllCategories();
setCategories(data);
} catch (err) {
console.error(err.response?.data || err);
alert("Failed to fetch categories");
}
};

const addCategory = async () => {
if (!newCategory.trim()) return;
try {
await createCategory(newCategory);
setNewCategory("");
fetchCategories();
} catch (err) {
console.error(err.response?.data || err);
alert("Failed to add category");
}
};

return ( <div className="min-h-screen bg-gray-100 flex justify-center items-start pt-10"> <div className="w-full max-w-6xl px-4"> <div className="flex flex-col md:flex-row items-center justify-between mb-8"> <h1 className="text-4xl font-bold text-gray-800 mb-4 md:mb-0">
Categories </h1> </div>

    <div className="flex flex-col md:flex-row items-center gap-4 mb-10">

  <input
    type="text"
    placeholder="Add new category..."
    className="
      flex-1 
      px-5 
      py-4 
      rounded-xl 
      bg-white 
      shadow-md 
      border border-gray-200 
      text-gray-700 
      focus:outline-none 
      focus:ring-2 
      focus:ring-purple-500 
      focus:border-transparent 
      transition-all
      placeholder-gray-400
    "
    value={newCategory}
    onChange={(e) => setNewCategory(e.target.value)}
    onKeyDown={(e) => e.key === 'Enter' && addCategory()}
  />

  <button
    onClick={addCategory}
    className="
      px-7 
      py-4 
      rounded-xl 
      shadow-md 
      bg-gradient-to-r 
      from-green-500 
      to-green-600 
      text-white 
      font-semibold 
      hover:scale-105 
      hover:shadow-lg 
      transition-all">
    Add
  </button>
</div>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {categories.length === 0 && (
        <p className="text-gray-500 col-span-full text-center">
          No categories found. Add one above.
        </p>
      )}
      {categories.map((cat) => (
      <Link
    key={cat.id}
    to={`/flashcards/${cat.id}`}
    className="
      rounded-xl 
      p-6 
      shadow-md 
      border 
      transition-all 
      bg-gradient-to-br 
      from-blue-500 
      to-purple-600 
      text-white 
      hover:scale-105 
      hover:shadow-xl">
    <h2 className="text-2xl font-bold mb-2">{cat.name}</h2>
    <p className="text-sm opacity-90">Click to view flashcards</p>
  </Link>

      ))}
    </div>
  </div>
</div>
);
}
