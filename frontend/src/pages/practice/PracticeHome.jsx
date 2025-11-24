import { Link } from "react-router-dom";

export default function PracticeHome() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4">
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-10 text-center shadow-2xl w-full max-w-xl">
        
        <h1 className="text-3xl font-extrabold text-white mb-4 tracking-wide">
          Practice Interview Questions
        </h1>

        <p className="text-gray-300 mb-8">
          Sharpen your skills with category-wise interview questions.
        </p>

        <Link
          to="/practice/category"
          className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-lg font-semibold transition-all shadow-lg hover:shadow-xl hover:scale-105"
        >
          Start Practice
        </Link>
      </div>
    </div>
  );
}
