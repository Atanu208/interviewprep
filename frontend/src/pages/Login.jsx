// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "../api/axiosInstance";

// export default function Login() {
// const navigate = useNavigate();
// const [username, setUsername] = useState("");
// const [password, setPassword] = useState("");

// const handleLogin = async (e) => {
// e.preventDefault();
// try {
// const res = await axios.post("/auth/login", { username, password });
// localStorage.setItem("token", res.data.token);
// navigate("/dashboard");
// } catch (err) {
// alert(err.response?.data || "Login failed");
// }
// };

// return ( <div className="flex items-center justify-center h-screen bg-gray-100"> <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-80"> <h2 className="text-2xl font-bold mb-4">Login</h2>
// <input
// type="text"
// placeholder="Username"
// className="border p-2 mb-3 w-full"
// value={username}
// onChange={(e) => setUsername(e.target.value)}
// />
// <input
// type="password"
// placeholder="Password"
// className="border p-2 mb-3 w-full"
// value={password}
// onChange={(e) => setPassword(e.target.value)}
// /> <button
//        type="submit"
//        className="bg-blue-500 text-white w-full p-2 rounded"
//      >
// Login </button> </form> </div>
// );
// }


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axiosInstance";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/login", { username, password });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4">Login</h2>

        <input
          type="text"
          placeholder="Username"
          className="border p-2 mb-3 w-full"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 mb-3 w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="bg-blue-500 text-white w-full p-2 rounded mb-3"
        >
          Login
        </button>

        {/* New Register Button */}
        <button
          type="button"
          className="bg-green-500 text-white w-full p-2 rounded"
          onClick={() => window.location.href = "http://localhost:5173/register"}
        >
          Register
        </button>
      </form>
    </div>
  );
}
