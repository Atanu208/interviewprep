import { useEffect, useState } from "react";
import axios from "../../api/axiosInstance";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
  LabelList
} from "recharts";

export default function AnalyticsDashboard() {
  const [categoryStats, setCategoryStats] = useState([]);

  useEffect(() => {
    axios.get("/practice/stats/category").then(res => setCategoryStats(res.data));
  }, []);

  const COLORS = ["#22c55e", "#f97316"]; // Known = green, Weak = orange

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Practice Progress Dashboard</h1>

      {/* Category Bar Chart */}
      <div className="mt-10 bg-white p-6 rounded shadow max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Category wise Stats</h2>

        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={categoryStats} margin={{ top: 20 }}>
            <XAxis dataKey="category" />
            <YAxis />
            <Legend />

            <Bar dataKey="known" fill={COLORS[0]} name="Known">
              <LabelList dataKey="known" position="top" />
            </Bar>

            <Bar dataKey="weak" fill={COLORS[1]} name="Weak">
              <LabelList dataKey="weak" position="top" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
