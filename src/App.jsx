import "./App.css";
import Category from "./components/Category/index";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";

function App() {
  const [categories, setCategories] = useState([]);
  const [categoryInput, setCategoryInput] = useState("");

  const categoryInputChange = (event) => {
    setCategoryInput(event.target.value);
  };

  const addCategory = () => {
    setCategories([...categories, { category: categoryInput, id: nanoid() }]);
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

  console.log(categories);

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
    </>
  );
}

export default App;
