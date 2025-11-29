import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  const [meals, setMeals] = useState([]);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (!user || !user.id) return;

    fetch(`https://nutridash-backend.onrender.com/food/${user.id}?date=${today}`)
      .then((res) => res.json())
      .then((data) => setMeals(data.entries))
      .catch((err) => console.error("Dashboard Fetch Error:", err));
  }, [user]);

  // CALORIES
  const calories = meals.reduce((sum, m) => sum + m.calories, 0);

  // VITAMINS
  const targets = {
    vitaminA: 900,
    vitaminC: 90,
    vitaminD: 20,
    vitaminE: 15,
    vitaminK: 120,
  };

  const vitaminTotals = {
    vitaminA: meals.reduce((s, m) => s + m.vitaminA, 0),
    vitaminC: meals.reduce((s, m) => s + m.vitaminC, 0),
    vitaminD: meals.reduce((s, m) => s + m.vitaminD, 0),
    vitaminE: meals.reduce((s, m) => s + m.vitaminE, 0),
    vitaminK: meals.reduce((s, m) => s + m.vitaminK, 0),
  };

  const vitaminPercentages = Object.keys(targets).map((key) => {
    const pct = (vitaminTotals[key] / targets[key]) * 100;
    return Math.min(100, Math.round(pct));
  });

  const dietCompletion =
    vitaminPercentages.reduce((a, b) => a + b, 0) / vitaminPercentages.length || 0;

  return (
    <div className="dashboard-page">
      {/* Banner */}
      <div
        className="banner"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/3296541/pexels-photo-3296541.jpeg')",
        }}
      >
        <div>
          <h1>Your Nutrition Dashboard</h1>
          <p>Track your daily nutrition and stay healthy</p>
        </div>
      </div>

      {/* Cards */}
      <div className="cards" style={{ marginTop: "25px" }}>
        
        {/* DIET COMPLETION */}
        <div className="card">
          <h3>Diet Completion (Vitamin Intake)</h3>
          <div className="big-number">{dietCompletion.toFixed(1)}%</div>
          <p style={{ opacity: 0.6 }}>
            Based on average of {Object.keys(targets).length} vitamin goals
          </p>

          <div className="progress" style={{ marginTop: "10px" }}>
            <div
              className="progress-fill"
              style={{ width: `${dietCompletion}%` }}
            ></div>
          </div>
        </div>

        {/* CALORIES */}
        <div className="card">
          <h3>Today's Calories</h3>
          <div className="big-number">{calories}</div>
          <p style={{ opacity: 0.6 }}>Target: 2000 cal</p>

          <div className="progress" style={{ marginTop: "10px" }}>
            <div
              className="progress-fill"
              style={{ width: `${(calories / 2000) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* WATER CARD (unchanged) */}
        <div className="card">
          <h3>Water Intake</h3>
          <div className="big-number">6 glasses</div>
          <p style={{ opacity: 0.6 }}>Target: 8 glasses</p>

          <div className="progress" style={{ marginTop: "10px" }}>
            <div className="progress-fill" style={{ width: "75%" }}></div>
          </div>
        </div>

        {/* FRUITS & VEGGIES (unchanged) */}
        <div className="card">
          <h3>Fruits & Veggies</h3>
          <div className="big-number">4 servings</div>
          <p style={{ opacity: 0.6 }}>Target: 5 servings</p>

          <div className="progress" style={{ marginTop: "10px" }}>
            <div className="progress-fill" style={{ width: "80%" }}></div>
          </div>
        </div>

      </div>
    </div>
  );
}
