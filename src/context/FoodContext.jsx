import { createContext, useContext, useState, useEffect } from "react";

const FoodContext = createContext();
export const useFood = () => useContext(FoodContext);

export function FoodProvider({ children }) {
  const [entries, setEntries] = useState([]);

  // Load from LocalStorage on refresh
  useEffect(() => {
    const saved = localStorage.getItem("food-diary");
    if (saved) {
      setEntries(JSON.parse(saved));
    }
  }, []);

  // Save to LocalStorage whenever entries change
  useEffect(() => {
    localStorage.setItem("food-diary", JSON.stringify(entries));
  }, [entries]);

  // Add new entry
  const addEntry = (entry) => {
    setEntries([...entries, entry]);
  };

  // Delete entry
  const deleteEntry = (id) => {
    setEntries(entries.filter((e) => e.id !== id));
  };

  // Edit entry
  const updateEntry = (updated) => {
    setEntries(entries.map((e) => (e.id === updated.id ? updated : e)));
  };

  return (
    <FoodContext.Provider
      value={{ entries, addEntry, deleteEntry, updateEntry }}
    >
      {children}
    </FoodContext.Provider>
  );
}
