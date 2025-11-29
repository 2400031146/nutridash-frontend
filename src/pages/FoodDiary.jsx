import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export default function FoodDiary() {
  const { user } = useAuth();
  const todayDate = new Date().toISOString().split("T")[0];

  const [foods, setFoods] = useState([]);

  // ---------------- FORM STATE ----------------
  const [foodName, setFoodName] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fat, setFat] = useState("");

  const [vitA, setVitA] = useState("");
  const [vitC, setVitC] = useState("");
  const [vitD, setVitD] = useState("");
  const [vitE, setVitE] = useState("");
  const [vitK, setVitK] = useState("");

  const [error, setError] = useState("");

  // ---------------- LOAD TODAY’S MEALS ----------------
  useEffect(() => {
    if (!user || !user.id) return;

    fetch(`https://nutridash-backend.onrender.com/food/${user.id}?date=${todayDate}`)
      .then((res) => res.json())
      .then((data) => setFoods(data.entries))
      .catch((err) => console.error("Load error:", err));
  }, [user]);

  // ---------------- VALIDATION ----------------
  const validateFields = () => {
    if (
      !foodName ||
      !calories ||
      !protein ||
      !carbs ||
      !fat ||
      !vitA ||
      !vitC ||
      !vitD ||
      !vitE ||
      !vitK
    ) {
      setError("⚠ All fields are required. No empty fields allowed.");
      return false;
    }
    setError("");
    return true;
  };

  // ---------------- ADD ENTRY ----------------
  const addEntry = async () => {
    if (!validateFields()) return;

    if (!user || !user.id) {
      alert("User not logged in.");
      return;
    }

    const entry = {
      userId: user.id,
      date: todayDate,
      food: foodName,
      calories: Number(calories),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),

      protein: Number(protein),
      carbohydrates: Number(carbs),
      fat: Number(fat),

      vitaminA: Number(vitA),
      vitaminC: Number(vitC),
      vitaminD: Number(vitD),
      vitaminE: Number(vitE),
      vitaminK: Number(vitK),
    };

    console.log("🚀 Sending entry:", entry);

    const res = await fetch("http://localhost:5000/food/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(entry),
    });

    let data;
    try {
      data = await res.json();
    } catch (e) {
      alert("Backend returned invalid JSON. Check server logs.");
      return;
    }

    if (!data.success) {
      alert("Error saving entry: " + data.message);
      return;
    }

    setFoods((prev) => [...prev, data.entry]);
    resetForm();
  };

  // ---------------- RESET FORM ----------------
  const resetForm = () => {
    setFoodName("");
    setCalories("");
    setProtein("");
    setCarbs("");
    setFat("");

    setVitA("");
    setVitC("");
    setVitD("");
    setVitE("");
    setVitK("");
  };

  // ---------------- DELETE ENTRY ----------------
  const deleteEntry = async (id) => {
    await fetch(`http://localhost:5000/food/${id}`, { method: "DELETE" });
    setFoods((prev) => prev.filter((f) => f._id !== id));
  };

  return (
    <div className="food-diary-page">

      <div className="banner"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg')",
        }}>
        <h1>Food Diary</h1>
        <p>Log everything you eat</p>
      </div>

      <div className="food-diary-content">

        {/* LEFT SIDE — ADD FOOD FORM */}
        <div className="add-food-box">
          <h2>+ Add Food</h2>

          {error && <p style={{ color: "red", fontSize: "13px" }}>{error}</p>}

          <input placeholder="Food name" value={foodName} onChange={(e) => setFoodName(e.target.value)} />
          <input placeholder="Calories" type="number" value={calories} onChange={(e) => setCalories(e.target.value)} />

          <h4>Macronutrients (grams)</h4>
          <input placeholder="Protein" type="number" value={protein} onChange={(e) => setProtein(e.target.value)} />
          <input placeholder="Carbohydrates" type="number" value={carbs} onChange={(e) => setCarbs(e.target.value)} />
          <input placeholder="Fat" type="number" value={fat} onChange={(e) => setFat(e.target.value)} />

          <h4>Vitamins (mg)</h4>
          <input placeholder="Vitamin A" type="number" value={vitA} onChange={(e) => setVitA(e.target.value)} />
          <input placeholder="Vitamin C" type="number" value={vitC} onChange={(e) => setVitC(e.target.value)} />
          <input placeholder="Vitamin D" type="number" value={vitD} onChange={(e) => setVitD(e.target.value)} />
          <input placeholder="Vitamin E" type="number" value={vitE} onChange={(e) => setVitE(e.target.value)} />
          <input placeholder="Vitamin K" type="number" value={vitK} onChange={(e) => setVitK(e.target.value)} />

          <button className="add-btn" onClick={addEntry}>
            Add Meal
          </button>
        </div>

        {/* RIGHT SIDE — TODAY'S MEALS */}
        <div className="meals-box">
          <h2>Today's Meals</h2>

          {foods.map((f) => (
            <div className="meal-item" key={f._id}>
              <div className="meal-left">
                <div className="meal-time">⏱ {f.time}</div>
                <div className="meal-name">{f.food}</div>

                <div className="nutrient-tags">
                  <span className="tag">{f.calories} cal</span>
                  <span className="tag">{f.protein}g Protein</span>
                  <span className="tag">{f.carbohydrates}g Carbs</span>
                  <span className="tag">{f.fat}g Fat</span>
                </div>
              </div>

              <div className="meal-right">
                <span className="delete-btn" onClick={() => deleteEntry(f._id)}>✖</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
