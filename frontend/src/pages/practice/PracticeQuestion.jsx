import { useEffect, useState } from "react";
import axios from "../../api/axiosInstance";
import { useParams, useNavigate } from "react-router-dom";

export default function PracticeQuestion() {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [loadingMark, setLoadingMark] = useState(false);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const res = await axios.get(`/flashcards/category/${categoryId}`);

        if (res.data.length === 0) {
          setQuestions([]);
          return;
        }

        setQuestions(res.data);
        setIndex(0);
        setShowAnswer(false);
        setFinished(false);
      } catch (err) {
        console.error("Failed to load questions:", err);
      }
    };

    loadQuestions();
  }, [categoryId]);

  if (questions.length === 0) {
    return <p className="p-6">No questions found in this category.</p>;
  }

  // Completed screen
  if (finished) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">
        <div className="bg-white shadow-2xl rounded-2xl p-10 text-center max-w-lg border border-gray-200 animate-fade-in">

          <h1 className="text-3xl font-extrabold text-green-600 mb-4">
            🎉 Practice Completed!
          </h1>

          <p className="text-gray-700 mb-6 text-lg">
            Great job! You finished all questions in this category.
          </p>

          <button
            onClick={() => navigate("/practice/category")}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl text-lg font-semibold shadow hover:bg-blue-700 transform hover:scale-105 transition-all"
          >
            Back to Categories
          </button>
        </div>
      </div>
    );
  }

  const question = questions[index];

  // MARK KNOWN
  const markKnown = async () => {
    setLoadingMark(true);
    try {
      await axios.put(`/flashcards/practice/${question.id}/known`);
      goNextAuto();
    } catch (err) {
      console.error("Failed to mark known", err);
    }
    setLoadingMark(false);
  };

  // MARK UNKNOWN
  const markUnknown = async () => {
    setLoadingMark(true);
    try {
      await axios.put(`/flashcards/practice/${question.id}/weak`);
      goNextAuto();
    } catch (err) {
      console.error("Failed to mark unknown", err);
    }
    setLoadingMark(false);
  };

  // Auto-next
  const goNextAuto = () => {
    if (index < questions.length - 1) {
      setIndex(index + 1);
      setShowAnswer(false);
    } else {
      setFinished(true);
    }
  };

  const goNext = () => {
    if (index < questions.length - 1) {
      setIndex(index + 1);
      setShowAnswer(false);
    } else {
      setFinished(true);
    }
  };

  const goPrev = () => {
    if (index > 0) {
      setIndex(index - 1);
      setShowAnswer(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-6 bg-gray-100">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-3xl w-full border border-gray-200">

        <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
          Practice Question ({index + 1} / {questions.length})
        </h1>

        {/* QUESTION BOX */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-xl shadow-lg text-white mb-6">
          <p className="text-xl font-semibold">{question.question}</p>
        </div>

        {/* ANSWER BOX (UPDATED STYLE) */}
        {showAnswer && (
          <div
            className="
              mt-4 p-6 rounded-xl 
              bg-white shadow-xl border border-gray-200 
              text-gray-900 text-lg
              transition-all duration-300 
              animate-fadeIn
            "
          >
            <p className="leading-relaxed">{question.answer}</p>
          </div>
        )}

        <div className="mt-8 flex flex-col gap-4">

          {/* Show Answer button */}
          {!showAnswer && (
            <button
              onClick={() => setShowAnswer(true)}
              className="px-6 py-3 bg-gray-900 text-white rounded-xl shadow font-semibold hover:bg-black transform hover:scale-105 transition-all mx-auto"
            >
              Show Answer
            </button>
          )}

          {/* Know / Don't Know buttons */}
          {showAnswer && (
            <div className="flex gap-4 justify-center">
              <button
                disabled={loadingMark}
                onClick={markKnown}
                className="px-6 py-3 bg-green-600 text-white rounded-xl shadow font-semibold hover:bg-green-700 transform hover:scale-105 transition-all"
              >
                ✓ I Know This
              </button>

              <button
                disabled={loadingMark}
                onClick={markUnknown}
                className="px-6 py-3 bg-red-600 text-white rounded-xl shadow font-semibold hover:bg-red-700 transform hover:scale-105 transition-all"
              >
                ✗ I Don’t Know
              </button>
            </div>
          )}

          {/* Navigation */}
          <div className="mt-6 flex justify-between">

            {index > 0 && (
              <button
                onClick={goPrev}
                className="px-6 py-3 bg-gray-500 text-white rounded-xl shadow hover:bg-gray-600 transform hover:scale-105 transition-all"
              >
                ← Previous
              </button>
            )}

            {index < questions.length - 1 && (
              <button
                onClick={goNext}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transform hover:scale-105 transition-all"
              >
                Next →
              </button>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
