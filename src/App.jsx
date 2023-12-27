import "./App.css";
import "nes.css/css/nes.min.css";
import Header from "./components/Header/index";
import Categories from "./components/Categories/index";
import Debts from "./components/Debts";
import { useState, useEffect } from "react";

const LOCAL_STORAGE_KEY = "Categories";

function App() {
  const [categories, setCategories] = useState([]);
  const [totalBudget, setTotalBudget] = useState(0);
  const [income, setIncome] = useState(0);

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
    loadSavedIncome();
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

  const handleIncomeChange = (event) => {
    setIncomeAndSave(event.target.value);
  };

  const setIncomeAndSave = (newIncome) => {
    setIncome(newIncome);
    localStorage.setItem("Income", JSON.stringify(newIncome));
  };

  const loadSavedIncome = () => {
    const saved = localStorage.getItem("Income");
    if (saved) {
      setIncome(JSON.parse(saved));
    }
  };

  return (
    <div className="app-container">
      <div className="nes-container is-dark with-title app">
        <p className="title">Budget Calculator</p>
        <Header onAddCategory={addCategory} />
        <Categories
          categories={categories}
          onDelete={deleteCategoryById}
          updateBudget={updateBudget}
        />
        <div className="spend-container">
          <span className="monthly-income">
            <p>Monthly Income</p>
            <p>=</p>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                handleIncomeChange;
                document.activeElement.blur();
              }}
            >
              <label className="income-label" htmlFor="income-input">
                $
              </label>
              <input
                name="income-input"
                className="nes-input"
                type="text"
                value={income}
                onChange={handleIncomeChange}
                onClick={(event) => event.target.select()}
              />
            </form>
          </span>
          <span>
            <p>Monthly Spend</p>
            <p>=</p>
            <p>${totalBudget}</p>
          </span>
          <span>
            <p>Disposable Income</p>
            <p>=</p>
            <p>${income - totalBudget}</p>
          </span>
        </div>
      </div>
      <Debts addCategory={addCategory} />
    </div>
  );
}

export default App;
