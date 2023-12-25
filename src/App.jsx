import "./App.css";
import Header from "./components/Header/index";
import Categories from "./components/Categories/index";
import { useState, useEffect } from "react";

const LOCAL_STORAGE_KEY = "Categories";

function App() {
  const [categories, setCategories] = useState([]);

  const loadSavedCategories = () => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    console.log(saved);
    if (saved) {
      setCategories(JSON.parse(saved));
    }
  };

  useEffect(() => {
    loadSavedCategories();
  }, []);

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
  };

  const setCategoriesAndSave = (newCategories) => {
    setCategories(newCategories);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newCategories));
  };

  return (
    <div className="app-container">
      <Header onAddCategory={addCategory} />
      <Categories categories={categories} onDelete={deleteCategoryById} />
    </div>
  );
}

export default App;
