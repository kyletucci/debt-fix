import "./App.css";
import Category from "./components/Category/index";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";

function App() {
  const [categories, setCategories] = useState([]);
  const [categoryInput, setCategoryInput] = useState("");
  const [totalBudget, setTotalBudget] = useState(0);

  const categoryInputChange = (event) => {
    setCategoryInput(event.target.value);
  };

  const addCategory = () => {
    if (categoryInput !== "") {
      setCategories([
        ...categories,
        { category: categoryInput, id: nanoid(), budget: 0 },
      ]);
    }
    saveCategories();
    setCategoryInput("");
  };

  const deleteCategory = (id) => {
    setCategories(categories.filter((category) => category.category !== id));
    saveCategories();
  };

  const saveCategories = () => {
    localStorage.setItem("categories", JSON.stringify(categories));
  };

  useEffect(() => {
    const categories = localStorage.getItem("categories");
    if (categories) {
      setCategories(JSON.parse(categories));
    }
  }, []);

  useEffect(() => {
    const totalBudget = localStorage.getItem("totalBudget");
    if (totalBudget) {
      setTotalBudget(JSON.parse(totalBudget));
    }
  }, []);

  return (
    <>
      <ul>
        {categories.map((category) => (
          <Category
            onDelete={deleteCategory}
            key={category.id}
            category={category.category}
          />
        ))}
      </ul>
      <form className="category-form" onSubmit={addCategory} action="#">
        <input
          type="text"
          value={categoryInput}
          onChange={categoryInputChange}
        />
        <button onClick={addCategory}>Add</button>
      </form>
      <span>Total Budget: {totalBudget}</span>
    </>
  );
}

export default App;
