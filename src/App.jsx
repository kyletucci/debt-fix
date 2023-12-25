import "./App.css";
import Header from "./components/Header/index";
import Categories from "./components/Categories/index";
import { useState, useEffect } from "react";

const LOCAL_STORAGE_KEY = "Categories";

function App() {
  const [categories, setCategories] = useState([]);
  const [totalBudget, setTotalBudget] = useState(0);

  const loadSavedCategories = () => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      setCategories(JSON.parse(saved));
      setTotalBudget(JSON.parse(saved).reduce((a, c) => a + +c.budget, 0));
    }
  };

  useEffect(() => {
    loadSavedCategories();
    loadSavedTotalBudget();
  }, [totalBudget]);

  const addCategory = (categoryTitle) => {
    if (categoryTitle !== "") {
      setCategoriesAndSave([
        ...categories,
        {
          title: categoryTitle,
          id: crypto.randomUUID(),
          budget: 0,
        },
      ]);
    }
  };

  const deleteCategoryById = (categoryId) => {
    const newCategories = categories.filter(
      (category) => category.id !== categoryId
    );
    setCategoriesAndSave(newCategories);
    setTotalBudgetAndSave(newCategories.reduce((a, c) => a + +c.budget, 0));
  };

  const setCategoriesAndSave = (newCategories) => {
    setCategories(newCategories);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newCategories));
  };

  const updateBudget = (categoryId, budget, event) => {
    event.preventDefault();
    const newCategories = categories.map((category) => {
      if (categoryId === category.id) {
        return { ...category, budget: budget };
      }
      return category;
    });
    setCategoriesAndSave(newCategories);
    setTotalBudgetAndSave(newCategories.reduce((a, c) => a + +c.budget, 0));
  };

  const setTotalBudgetAndSave = (newTotalBudget) => {
    setTotalBudget(newTotalBudget);
    localStorage.setItem("Total Budget", JSON.stringify(newTotalBudget));
  };

  const loadSavedTotalBudget = () => {
    const saved = localStorage.getItem("Total Budget");
    if (saved) {
      setTotalBudget(JSON.parse(saved));
    }
  };

  return (
    <div className="app-container">
      <Header onAddCategory={addCategory} />
      <Categories
        categories={categories}
        onDelete={deleteCategoryById}
        updateBudget={updateBudget}
      />
      <div className="summary-container">
        <span>Total Monthly = {totalBudget}</span>
        <span>Total Annual = {totalBudget * 12}</span>
        <span>Annual Fee = </span>
        <span>Annual - Fee = </span>
      </div>
    </div>
  );
}

export default App;
