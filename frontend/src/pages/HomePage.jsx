import { Link } from "react-router-dom";

export default function HomePage() {
return ( <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-4"> <h1 className="text-4xl font-bold mb-4 text-center">Welcome to Flashcards App</h1> <p className="text-gray-700 mb-6 text-center">Learn and practice efficiently!</p> <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0"> <Link
       to="/login"
       className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded shadow text-center"
     >
Login </Link> <Link
       to="/register"
       className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded shadow text-center"
     >
Register </Link> </div> </div>
);
}
