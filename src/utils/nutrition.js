// src/utils/nutrition.js

// This function looks at all food entries and finds which nutrients are low
export function getDeficientNutrients(entries) {
  // If there are no entries, no recommendations
  if (entries.length === 0) return [];

  // Total nutrients from diary
  const totals = {
  protein: 0,
  carbs: 0,
  fat: 0,

  calcium: 0,
  iron: 0,
  potassium: 0,

  fiber: 0,

  vitaminA: 0,
  vitaminB: 0,
  vitaminC: 0,
  vitaminD: 0,
  vitaminE: 0,
  vitaminK: 0,
};


  entries.forEach((e) => {
    totals.protein += e.protein || 0;
    totals.carbs += e.carbs || 0;
    totals.fat += e.fat || 0;
    totals.calcium += e.calcium || 0;
    totals.fiber += e.fiber || 0;
    totals.vitaminD += e.vitaminD || 0;
  });


  const targets = {
  
  protein: 60,      
  carbs: 300,       
  fat: 70,          

  
  calcium: 1000,   
  iron: 18,        
  potassium: 3500,  
  fiber: 25,        

  vitaminA: 0.9,     
  vitaminB: 1.3,    
  vitaminC: 90,      
  vitaminD: 0.015,   

  vitaminE: 15,     
  vitaminK: 0.12     
};


  const deficient = [];

  // Compare totals vs targets
  Object.keys(totals).forEach((key) => {
    const total = totals[key];
    const target = targets[key];

    // If less than 50% of requirement → mark as deficient
    if (total < target * 0.5) {
      deficient.push(key);
    }
  });

  return deficient; // e.g. ["calcium", "vitaminD"]
}
