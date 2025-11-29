import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Analysis() {
  const { user } = useAuth();
  const [meals, setMeals] = useState([]);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (!user || !user.id) return;

    fetch(`https://nutridash-backend.onrender.com/food/${user.id}?date=${today}`)
      .then((res) => res.json())
      .then((data) => setMeals(data.entries))
      .catch((err) => console.error("Analysis Fetch Error:", err));
  }, [user]);

  // ----------- TOTALS --------------
  const totalCalories = meals.reduce((s, f) => s + f.calories, 0);
  const protein = meals.reduce((s, f) => s + f.protein, 0);
  const carbs = meals.reduce((s, f) => s + f.carbohydrates, 0);
  const fat = meals.reduce((s, f) => s + f.fat, 0);

  const vitA = meals.reduce((s, f) => s + f.vitaminA, 0);
  const vitC = meals.reduce((s, f) => s + f.vitaminC, 0);
  const vitD = meals.reduce((s, f) => s + f.vitaminD, 0);
  const vitE = meals.reduce((s, f) => s + f.vitaminE, 0);
  const vitK = meals.reduce((s, f) => s + f.vitaminK, 0);

  // ----------- TARGETS --------------
  const targets = {
    calories: 2000,
    protein: 50,
    carbs: 250,
    fat: 70,
    vitaminA: 900,
    vitaminC: 90,
    vitaminD: 20,
    vitaminE: 15,
    vitaminK: 120,
  };

  const pct = (value, target) =>
    Math.min(100, Math.round((value / target) * 100));

  const nutrients = [
    ["Calories", totalCalories, targets.calories, "kal"],
    ["Protein", protein, targets.protein, "g"],
    ["Carbohydrates", carbs, targets.carbs, "g"],
    ["Fat", fat, targets.fat, "g"],
  ];

  const vitamins = [
    ["Vitamin A", vitA, targets.vitaminA, "mg"],
    ["Vitamin C", vitC, targets.vitaminC, "mg"],
    ["Vitamin D", vitD, targets.vitaminD, "mg"],
    ["Vitamin E", vitE, targets.vitaminE, "mg"],
    ["Vitamin K", vitK, targets.vitaminK, "mg"],
  ];

  return (
    <div className="analysis-page">
      <h1 style={{ marginBottom: "20px" }}>Nutrition Analysis</h1>

      {/* SUMMARY BOX */}
      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          border: "1px solid #e5e7eb",
          marginBottom: "30px",
        }}
      >
        <h2>Daily Summary</h2>
        <p style={{ opacity: 0.7 }}>Automatically calculated from today’s meals</p>

        <div
          style={{
            marginTop: "20px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "20px",
          }}
        >
          {nutrients.map(([name, value, target, unit]) => (
            <div key={name} className="card">
              <h3>{name}</h3>
              <div className="big-number">
                {value} {unit}
              </div>
              <p>Target: {target} {unit}</p>
              <div className="progress">
                <div
                  className="progress-fill"
                  style={{ width: pct(value, target) + "%" }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* VITAMINS */}
      <div style={{ marginBottom: "30px" }}>
        <h2>Vitamin Analysis</h2>
        <p style={{ opacity: 0.7, marginBottom: "20px" }}>
          Breakdown of vitamins consumed today
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "20px",
          }}
        >
          {vitamins.map(([name, value, target, unit]) => (
            <div key={name} className="card">
              <h3>{name}</h3>
              <div className="big-number">
                {value} {unit}
              </div>
              <p>Target: {target} {unit}</p>
              <div className="progress">
                <div
                  className="progress-fill"
                  style={{ width: pct(value, target) + "%" }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

    {/* TABLE OF ALL MEALS */}
<h2 style={{ marginTop: "40px" }}>Today's Meal Breakdown</h2>

<div className="meal-table-container">
  <table className="meal-table">
    <thead>
      <tr>
        <th>Food</th>
        <th>Calories</th>
        <th>Protein (g)</th>
        <th>Carbs (g)</th>
        <th>Fat (g)</th>
        <th>Vit A (mg)</th>
        <th>Vit C (mg)</th>
        <th>Vit D (mg)</th>
        <th>Vit E (mg)</th>
        <th>Vit K (mg)</th>
      </tr>
    </thead>

    <tbody>
      {meals.map((m, i) => (
        <tr key={i}>
          <td>{m.food}</td>
          <td>{m.calories}</td>
          <td>{m.protein}</td>
          <td>{m.carbohydrates}</td>
          <td>{m.fat}</td>
          <td>{m.vitaminA}</td>
          <td>{m.vitaminC}</td>
          <td>{m.vitaminD}</td>
          <td>{m.vitaminE}</td>
          <td>{m.vitaminK}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

    </div>
  );
}
